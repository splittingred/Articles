<?php
/**
 * Articles
 *
 * Copyright 2011-12 by Shaun McCormick <shaun+articles@modx.com>
 *
 * Articles is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later
 * version.
 *
 * Articles is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Articles; if not, write to the Free Software Foundation, Inc., 59 Temple
 * Place, Suite 330, Boston, MA 02111-1307 USA
 *
 * @package articles
 */
require_once (dirname(__FILE__).'/articlesimport.class.php');
/**
 * @package articles
 * @subpackage import
 */
class ArticlesImportWordPress extends ArticlesImport {
    /** @var ArticlesContainer $container */
    public $container;

    public function import() {
        /** @var SimpleXMLElement $data */
        $data = $this->getData();
        if (empty($data)) return false;

        $this->createContainer();
        if (empty($this->container)) return false;

        $imported = false;
        foreach ($data->channel->item as $item) {
            $article = $this->createArticle($item);
            if (!empty($article)) {
                $imported = true;
            }
        }
        return $imported;
    }

    /**
     * Get the parsed XML
     * @return bool|SimpleXMLElement
     */
    public function getData() {
        $file = isset($_FILES['wp-file']) ? $_FILES['wp-file'] : '';
        if (empty($file) || !file_exists($file['tmp_name'])) {
            return false;
        }
        $contents = file_get_contents($file['tmp_name']);
        $xml = @simplexml_load_string($contents,'SimpleXMLElement',LIBXML_NOCDATA);
        return $xml;

    }

    /**
     * Create or select the container
     *
     * @return ArticlesContainer
     */
    public function createContainer() {
        if (!empty($this->config['id'])) {
            $this->container = $this->modx->getObject('ArticlesContainer',$this->config['id']);
        } else {
            /* @TODO Finish ability to import into new blog. */
            $this->container = $this->modx->newObject('ArticlesContainer');
            $this->container->fromArray(array(
                'parent' => $this->modx->getOption('parent',$this->config,0),
            ));
        }
        return $this->container;
    }

    /**
     * Create the article
     * @param SimpleXMLElement $item
     * @return Article|boolean
     */
    public function createArticle(SimpleXMLElement $item) {
        $postType = (string)$this->getXPath($item,'wp:post_type');
        if ($postType != 'post') return false;

        $settings = $this->container->getContainerSettings();
        $creator = $this->matchCreator((string)$item->xpath('dc:creator'.'/text()'),1);

        /** @var Article $article */
        $article = $this->modx->newObject('Article');
        $article->fromArray(array(
            'parent' => $this->container->get('id'),
            'articles_container' => $this->container->get('id'),
            'pagetitle' => (string)$item->title,
            'description' => (string)$item->description,
            'alias' => (string)$this->getXPath($item,'wp:post_name'),
            'template' => $this->modx->getOption('articleTemplate',$settings,0),
            'published' => $this->parsePublished($item),
            'publishedon' => strtotime((string)$item->pubDate),
            'publishedby' => $creator,
            'createdby' => $creator,
            'createdon' => strtotime((string)$this->getXPath($item,'wp:post_date')),
            'content' => (string)$this->getXPath($item,'content:encoded'),
            'introtext' => (string)$this->getXPath($item,'excerpt:encoded'),
            'show_in_tree' => false,
            'class_key' => 'Article',
            'context_key' => $this->container->get('context_key'),
        ));
        $article->setArchiveUri();
        $article->set('articles_container_settings',$settings);

        if (!$this->debug) {
            $article->save();
        }

        $this->importTags($article,$item);
        $this->importComments($article,$item);
        return $article;
    }

    /**
     * Get the XPath string for the XML element
     * @param SimpleXMLElement $item
     * @param string $path
     * @return SimpleXMLElement|SimpleXMLElement[]
     */
    public function getXPath(SimpleXMLElement $item,$path) {
        $data = $item->xpath($path.'/text()');
        return array_key_exists(0,$data) ? $data[0] : $data;
    }

    /**
     * Parse the WP publish status
     * @param SimpleXMLElement $item
     * @return boolean
     */
    public function parsePublished(SimpleXMLElement $item) {
        $published = false;
        $status = (string)$this->getXPath($item,'wp:status');
        switch ($status) {
            case 'publish':
                $published = true;
                break;
        }
        return $published;
    }

    /**
     * See if we can find a matching user for the comment/post
     * @param string $username
     * @param int $default
     * @return int|mixed
     */
    public function matchCreator($username,$default = 0) {
        /** @var modUser $user */
        $user = $this->modx->getObject('modUser',array('username' => $username));
        if ($user) {
            return $user->get('id');
        }
        return $default;
    }

    /**
     * Import comments into Quip
     *
     * @param Article $article
     * @param SimpleXMLElement $item
     * @return boolean
     */
    public function importComments(Article $article,SimpleXMLElement $item) {
        $settings = $this->container->getContainerSettings();

        $threadKey = 'article-b'.$this->container->get('id').'-'.$article->get('id');

        /** @var quipThread $thread */
        $thread = $this->modx->newObject('quipThread');
        $thread->fromArray(array(
            'createdon' => $article->get('publishedon'),
            'moderated' => $this->modx->getOption('commentsModerated',$settings,1),
            'moderator_group' => $this->modx->getOption('commentsModeratorGroup',$settings,'Administrator'),
            'moderators' => $this->modx->getOption('commentsModerators',$settings,''),
            'resource' => $article->get('id'),
            'idprefix' => 'qcom',
        ));
        $thread->set('name',$threadKey);
        if (!$this->debug) {
            $thread->save();
        }

        $idMap = array();
        foreach ($item->xpath('wp:comment') as $commentXml) {
            $commentId = (int)$this->getXPath($commentXml,'wp:comment_id');
            $commentParent = (int)$this->getXPath($commentXml,'wp:comment_parent');

            /** @var quipComment $comment */
            $comment = $this->modx->newObject('quipComment');
            $comment->fromArray(array(
                'thread' => $threadKey,
                'parent' => array_key_exists($commentParent,$idMap) ? $idMap[$commentParent] : 0,
                'author' => $this->matchCreator((string)$this->getXPath($commentXml,'wp:comment_author')),
                'body' => (string)$this->getXPath($commentXml,'wp:comment_content'),
                'createdon' => (string)$this->getXPath($commentXml,'wp:comment_date'),
                'approved' => (boolean)$this->getXPath($commentXml,'wp:comment_approved'),
                'name' => (string)$this->getXPath($commentXml,'wp:comment_author'),
                'email' => (string)$this->getXPath($commentXml,'wp:comment_author_email'),
                'website' => (string)$this->getXPath($commentXml,'wp:comment_author_url'),
                'ip' => (string)$this->getXPath($commentXml,'wp:comment_author_IP'),
                'resource' => $article->get('id'),
                'idprefix' => 'qcom',
            ),'',true);

            if (!$this->debug) {
                $comment->save();
            }

            $idMap[$commentId] = $comment->get('id');
        }

        return true;
    }

    /**
     * Import any WP post meta tags
     * @param Article $article
     * @param SimpleXMLElement $item
     * @return array
     */
    public function importTags(Article $article,SimpleXMLElement $item) {
        $tags = array();
        if (empty($item->category)) return;

        foreach ($item->category as $category) {
            if (empty($category['domain'])) continue;
            if ($category['domain'] == 'post_tag') {
                $tags[] = (string)$category;
            }
        }
        $article->setTVValue('articlestags',implode(',',$tags));
        return $tags;
    }
}