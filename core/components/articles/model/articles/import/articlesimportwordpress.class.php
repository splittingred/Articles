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
        if (empty($this->container)) {
            $this->addError('blogger-file',$this->modx->lexicon('articles.import_blogger_container_err_nf'));
            return false;
        }

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
        if (empty($_FILES['wp-file']) || !empty($_FILES['wp-file']['error'])) {
            $file = isset($this->config['wp-file-server']) ? $this->config['wp-file-server'] : '';
            if (empty($file)) {
                $this->addError('wp-file-server',$this->modx->lexicon('articles.import_wp_file_err_nf'));
                return false;
            }
            $file = str_replace(array(
                '{core_path}',
                '{base_path}',
                '{assets_path}',
            ),array(
                $this->modx->getOption('core_path',null,MODX_CORE_PATH),
                $this->modx->getOption('base_path',null,MODX_BASE_PATH),
                $this->modx->getOption('assets_path',null,MODX_ASSETS_PATH),
            ),$file);
            if (!file_exists($file)) {
                $this->addError('wp-file-server',$this->modx->lexicon('articles.import_wp_file_err_nf'));
                return false;
            }
        } else {
            $file = isset($_FILES['wp-file']) ? $_FILES['wp-file'] : '';
            if (empty($file) || !file_exists($file['tmp_name'])) {
                $this->addError('wp-file',$this->modx->lexicon('articles.import_wp_file_err_nf'));
                return false;
            }
            $file = $file['tmp_name'];
        }
        $contents = file_get_contents($file);
        /** Get rid of useless WP comments */
        $contents = str_replace('<!--more-->','',$contents);
        /** Fix improper <pre> placements */
        $contents = str_replace('</pre>]]>','</pre> ]]>',$contents);
        /** Fix stupid WordPress bug with ]] tags and ~ inside content. Escape your stuff next time, WordPress. GG kthxbai. */
        $contents = preg_replace_callback('#\[\[\+(.*?)\]\]#si',array('ArticlesImportWordPress','parseMODXPlaceholders'),$contents);
        $contents = preg_replace_callback('#\[\[\~(.*?)\]\]#si',array('ArticlesImportWordPress','parseMODXLinks'),$contents);
        $contents = preg_replace_callback("#<!\[CDATA\[(.*?)\]\]>#si",array('ArticlesImportWordPress','parseCData'),$contents);
        /* get rid of all the WP-specific special characters */
        $contents = str_replace(array(
            "\xe2\x80\x98", "\xe2\x80\x99", "\xe2\x80\x9c", "\xe2\x80\x9d", "\xe2\x80\x93", "\xe2\x80\x94", "\xe2\x80\xa6"
        ),array(
            "'", "'", '"', '"', '-', '--', '&#189;'
        ),$contents);
        $xml = simplexml_load_string($contents,'ArticlesWordPressWxr');
        return $xml;
    }

    public static function parseMODXPlaceholders($matches) {
        return '&91;&91;+'.$matches[1].'&93;&93;';
    }
    public static function parseMODXLinks($matches) {
        return '&91;&91;~'.$matches[1].'&93;&93;';
    }
    public static function parseCData($matches) {
        $contents = $matches[0];
        if (!empty($matches[1])) {
            $contents = str_replace(array(
                '[',
                ']',
                '~',
                '>',
                '<',
            ),array(
                '&#91;',
                '&#93;',
                '&#182;',
                '&gt;',
                '&lt;',
            ),$matches[1]);
            $contents = '<![CDATA['.$contents.']]>';
        }
        return $contents;
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
        /** @var SimpleXMLElement $wp */
        $wp = $item->children('wp',true);
        $pubDate =  strtotime((string)$item->pubDate);
        if (empty($pubDate)) {
            $pubDate = strtotime((string)$wp->post_date);
        }

        /** @var Article $article */
        $article = $this->modx->newObject('Article');
        $article->fromArray(array(
            'parent' => $this->container->get('id'),
            'pagetitle' => $this->parseContent((string)$item->title),
            'description' => $this->parseContent((string)$item->description),
            'alias' => $this->parseContent((string)$wp->post_name),
            'template' => $this->modx->getOption('articleTemplate',$settings,0),
            'published' => $this->parsePublished($item),
            'publishedon' => $pubDate,
            'publishedby' => $creator,
            'createdby' => $creator,
            'createdon' => strtotime((string)$wp->post_date),
            'content' => $this->parseContent((string)$item->children('content',true)->encoded),
            'introtext' => $this->parseContent((string)$item->children('excerpt',true)->encoded),
            'show_in_tree' => false,
            'class_key' => 'Article',
            'context_key' => $this->container->get('context_key'),
        ));
        $article->setArchiveUri();
        $article->setProperties($settings,'articles');

        if (!$this->debug) {
            $article->save();
        }

        $this->importTags($article,$item);
        $this->importComments($article,$item);
        return $article;
    }

    public function parseContent($string) {
        $string = (string)$string;
        $string = html_entity_decode((string)$string,ENT_COMPAT);
        $string = str_replace(array(
            'Ò',
            'Ó',
            'É',
            '[[',
            ']]',
        ),array(
            '&#147;',
            '&#148;',
            '&#189;',
            '&#91;&#91;',
            '&#93;&#93;',
        ),$string);
        return $string;
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

        /** @var SimpleXMLElement $wp */
        $wp = $item->children('wp',true);

        $idMap = array();
        /** @var SimpleXMLElement $commentXml */
        foreach ($wp->comment as $commentXml) {
            $commentId = (int)$this->getXPath($commentXml,'wp:comment_id');
            $commentParent = (int)$this->getXPath($commentXml,'wp:comment_parent');

            /** @var SimpleXMLElement $commentWp */
            $commentWp = $commentXml->children('wp',true);

            /** @var quipComment $comment */
            $comment = $this->modx->newObject('quipComment');
            $comment->fromArray(array(
                'thread' => $threadKey,
                'parent' => array_key_exists($commentParent,$idMap) ? $idMap[$commentParent] : 0,
                'author' => $this->matchCreator((string)$commentWp->comment_author),
                'body' => $this->parseContent((string)$commentWp->comment_content),
                'createdon' => (string)$commentWp->comment_date,
                'approved' => (boolean)$commentWp->comment_approved,
                'name' => (string)$commentWp->comment_author,
                'email' => (string)$commentWp->comment_author_email,
                'website' => (string)$commentWp->comment_author_url,
                'ip' => (string)$commentWp->comment_author_IP,
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

class ArticlesWordPressWxr extends SimpleXMLElement {

}