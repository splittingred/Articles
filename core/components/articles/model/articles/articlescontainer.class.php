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
require_once MODX_CORE_PATH.'model/modx/modprocessor.class.php';
require_once MODX_CORE_PATH.'model/modx/processors/resource/create.class.php';
require_once MODX_CORE_PATH.'model/modx/processors/resource/update.class.php';
/**
 * @package articles
 */
class ArticlesContainer extends modResource {
    /** @var modX $xpdo */
    public $xpdo;
    public $allowListingInClassKeyDropdown = false;
    public $showInContextMenu = true;
    public $allowChildrenResources = false;
    public $oldAlias = null;
    public $salt = null;

    /**
     * Override modResource::__construct to ensure a few specific fields are forced to be set.
     * @param xPDO $xpdo
     */
    function __construct(xPDO & $xpdo) {
        parent :: __construct($xpdo);
        $this->set('class_key','Articles');
        $this->set('hide_children_in_tree',true);
        $this->salt = $xpdo->getOption('articles.twitter.salt',null,'tw1tt3rs4uth4p1ish0rribl3');
    }

    /**
     * Get the controller path for our Articles type.
     * 
     * {@inheritDoc}
     * @static
     * @param xPDO $modx
     * @return string
     */
    public static function getControllerPath(xPDO &$modx) {
        return $modx->getOption('articles.core_path',null,$modx->getOption('core_path').'components/articles/').'controllers/container/';
    }

    public function set($k, $v= null, $vType= '') {
        $oldAlias = false;
        if ($k == 'alias') {
            $oldAlias = $this->get('alias');
        }
        $set = parent::set($k,$v,$vType);
        if ($this->isDirty('alias') && !empty($oldAlias)) {
            $this->oldAlias = $oldAlias;
        }
        return $set;
    }

    public function save($cacheFlag = null) {
        $isNew = $this->isNew();
        $saved = parent::save($cacheFlag);
        if ($saved && !$isNew && !empty($this->oldAlias)) {
            $newAlias = $this->get('alias');
            $saved = $this->updateChildrenURIs($newAlias,$this->oldAlias);
        }
        return $saved;
    }

    /**
     * Update all Articles URIs to reflect the new blog alias
     *
     * @param string $newAlias
     * @param string $oldAlias
     * @return bool
     */
    public function updateChildrenURIs($newAlias,$oldAlias) {
        $useMultiByte = $this->getOption('use_multibyte',null,false) && function_exists('mb_strlen');
        $encoding = $this->getOption('modx_charset',null,'UTF-8');
        $oldAliasLength = ($useMultiByte ? mb_strlen($oldAlias,$encoding) : strlen($oldAlias)) + 1;
        $uriField = $this->xpdo->escape('uri');

        $sql = 'UPDATE '.$this->xpdo->getTableName('Article').'
            SET '.$uriField.' = CONCAT("'.$newAlias.'",SUBSTRING('.$uriField.','.$oldAliasLength.'))
            WHERE
                '.$this->xpdo->escape('parent').' = '.$this->get('id').'
            AND SUBSTRING('.$uriField.',1,'.$oldAliasLength.') = "'.$oldAlias.'/"';
        $this->xpdo->log(xPDO::LOG_LEVEL_DEBUG,$sql);
        $this->xpdo->exec($sql);
        return true;
    }

    /**
     * Provide the custom context menu for Articles.
     * {@inheritDoc}
     * @return array
     */
    public function getContextMenuText() {
        $this->xpdo->lexicon->load('articles:default');
        return array(
            'text_create' => $this->xpdo->lexicon('articles.container'),
            'text_create_here' => $this->xpdo->lexicon('articles.container_create_here'),
        );
    }

    /**
     * Provide the name of this CRT.
     * {@inheritDoc}
     * @return string
     */
    public function getResourceTypeName() {
        $this->xpdo->lexicon->load('articles:default');
        return $this->xpdo->lexicon('articles.container');
    }

    /**
     * This runs each time the tree is drawn.
     * @param array $node
     * @return array
     */
    public function prepareTreeNode(array $node = array()) {
        $this->xpdo->lexicon->load('articles:default');
        $menu = array();
        $idNote = $this->xpdo->hasPermission('tree_show_resource_ids') ? ' <span dir="ltr">('.$this->id.')</span>' : '';
        // Template ID should 1st default to the container settings for articleTemplate,
        // then to system settings for articles.default_article_template.
        // getContainerSettings() is not in scope here.
		
		// System Default
		$template_id = $this->getOption('articles.default_article_template'); 
		// Attempt to override for this container
		$container = $this->xpdo->getObject('modResource', $this->id); 
		if ($container) {
			$props = $container->get('properties');
			if ($props) {
				if (isset($props['articles']['articleTemplate']) && !empty($props['articles']['articleTemplate'])) {
					$template_id = $props['articles']['articleTemplate'];
				}
			}
		}
        $menu[] = array(
            'text' => '<b>'.$this->get('pagetitle').'</b>'.$idNote,
            'handler' => 'Ext.emptyFn',
        );
        $menu[] = '-';
        $menu[] = array(
            'text' => $this->xpdo->lexicon('articles.articles_manage'),
            'handler' => 'this.editResource',
        );
        $menu[] = array(
            'text' => $this->xpdo->lexicon('articles.articles_write_new'),
            'handler' => "function(itm,e) { 
				var at = this.cm.activeNode.attributes;
		        var p = itm.usePk ? itm.usePk : at.pk;
	
	            Ext.getCmp('modx-resource-tree').loadAction(
	                'a='+MODx.action['resource/create']
	                + '&class_key='+itm.classKey
	                + '&parent='+p
	                + '&template=".$template_id."'
	                + (at.ctx ? '&context_key='+at.ctx : '')
                );
        	}",
        );
        $menu[] = array(
            'text' => $this->xpdo->lexicon('articles.container_duplicate'),
            'handler' => 'function(itm,e) { itm.classKey = "ArticlesContainer"; this.duplicateResource(itm,e); }',
        );
        $menu[] = '-';
        if ($this->get('published')) {
            $menu[] = array(
                'text' => $this->xpdo->lexicon('articles.container_unpublish'),
                'handler' => 'this.unpublishDocument',
            );
        } else {
            $menu[] = array(
                'text' => $this->xpdo->lexicon('articles.container_publish'),
                'handler' => 'this.publishDocument',
            );
        }
        if ($this->get('deleted')) {
            $menu[] = array(
                'text' => $this->xpdo->lexicon('articles.container_undelete'),
                'handler' => 'this.undeleteDocument',
            );
        } else {
            $menu[] = array(
                'text' => $this->xpdo->lexicon('articles.container_delete'),
                'handler' => 'this.deleteDocument',
            );
        }
        $menu[] = '-';
        $menu[] = array(
            'text' => $this->xpdo->lexicon('articles.articles_view'),
            'handler' => 'this.preview',
        );

        $node['menu'] = array('items' => $menu);
        $node['hasChildren'] = true;
        return $node;
    }

    /**
     * Prevent isLazy error since Articles types have extra DB fields
     * @param string $key
     * @return bool
     */
    public function isLazy($key = '') {
        return false;
    }

    /**
     * Override modResource::process to set some custom placeholders for the Resource when rendering it in the front-end.
     * {@inheritDoc}
     * @return string
     */
    public function process() {
        if ($this->isRss()) {
            $this->set('template',0);
            $this->set('contentType','application/rss+xml');
            /** @var modContentType $contentType */
            $contentType = $this->xpdo->getObject('modContentType',array('mime_type' => 'application/rss+xml'));
            if ($contentType) {
                $this->set('content_type',$contentType->get('id'));
                $this->xpdo->response->contentType = $contentType;
            }
            $this->_content= $this->getRssCall();
            $maxIterations= intval($this->xpdo->getOption('parser_max_iterations',10));
            $this->xpdo->parser->processElementTags('', $this->_content, false, false, '[[', ']]', array(), $maxIterations);
            $this->_processed= true;
            $this->set('cacheable',false);
        } else {
            $this->xpdo->lexicon->load('articles:frontend');
            $this->getPostListingCall();
            $this->getArchivistCall();
            $this->getTagListerCall();
            $this->getLatestPostsCall();
            $settings = $this->getContainerSettings();
            if ($this->getOption('commentsEnabled',$settings,true)) {
                $this->getLatestCommentsCall();
                $this->xpdo->setPlaceholder('comments_enabled',1);
            } else {
                $this->xpdo->setPlaceholder('comments_enabled',0);
            }
            $this->_content = parent::process();
        }
        return $this->_content;
    }

    /**
     * Check to see if the request is asking for an RSS feed
     * @return boolean
     */
    public function isRss() {
        $isRss = false;
        $settings = $this->getContainerSettings();
        $feedAppendage = $this->xpdo->getOption('rssAlias',$settings,'feed.rss,rss');
        $feedAppendage = explode(',',$feedAppendage);
        $fullUri = $this->xpdo->context->getOption('base_url',null,MODX_BASE_URL).$this->get('uri');

        $hasQuery = strpos($_SERVER['REQUEST_URI'],'?');
        $requestUri = !empty($hasQuery) ? substr($_SERVER['REQUEST_URI'],0,$hasQuery) : $_SERVER['REQUEST_URI'];
        if (strpos($requestUri,$fullUri) === 0 && strlen($fullUri) != strlen($requestUri)) {
            $appendage = rtrim(str_replace($fullUri,'',$requestUri),'/');
            if (in_array($appendage,$feedAppendage)) {
                $isRss = true;
            }
        }
        return $isRss;
    }

    /**
     * Get the call for the RSS feed
     * @return string
     */
    public function getRssCall() {
        $settings = $this->getContainerSettings();
        $content = '[[!getArchives?
          &pageVarKey=`page`
          &parents=`'.$this->get('id').'`
          &where=`{"class_key":"Article","searchable":1}`
          &limit=`'.$this->xpdo->getOption('rssItems',$settings,10).'`
          &showHidden=`1`
          &includeContent=`1`
          &includeTVs=`1`
          &processTVs=`1`
          &sortby=`'.$this->xpdo->getOption('sortBy',$settings,'publishedon').'`
          &sortdir=`'.$this->xpdo->getOption('sortDir',$settings,'DESC').'`

          &tagKey=`articlestags`
          &tagSearchType=`contains`
          &makeArchive=`0`
          &cache=`0`
          &tpl=`'.$this->xpdo->getOption('tplRssItem',$settings,'sample.ArticlesRssItem').'`
        ]]';
        $content = $this->xpdo->getChunk($this->xpdo->getOption('tplRssFeed',$settings,'sample.ArticlesRss'),array(
            'content' => $content,
            'year' => date('Y'),
        ));
        return $content;
    }
    /**
     * Get the getPage and getArchives call to display listings of posts on the container.
     *
     * @param string $placeholderPrefix
     * @return string
     */
    public function getPostListingCall($placeholderPrefix = '') {
        $settings = $this->getContainerSettings();
        $where = array('class_key' => 'Article');
        if (!empty($_REQUEST['arc_user'])) {
            $userPk = $this->xpdo->sanitizeString($_REQUEST['arc_user']);
            if (intval($userPk) == 0) {
                /** @var modUser $user */
                $user = $this->xpdo->getObject('modUser',array('username' => $userPk));
                if ($user) {
                    $userPk = $user->get('id');
                } else { $userPk = false; }
            }
            if ($userPk !== false) {
                $where['createdby:='] = $userPk;
                $this->set('cacheable',false);
            }
        }

        $output = '[[!getPage?
          &elementClass=`modSnippet`
          &element=`getArchives`
          &makeArchive=`0`
          &cache=`1`
          &parents=`'.$this->get('id').'`
          &where=`'.$this->xpdo->toJSON($where).'`
          &showHidden=`1`
          &includeContent=`1`
          &includeTVs=`'.$this->xpdo->getOption('archivesIncludeTVs',$settings,0).'`
          &includeTVsList=`'.$this->xpdo->getOption('includeTVsList',$settings,'').'`
          &processTVs=`'.$this->xpdo->getOption('archivesProcessTVs',$settings,0).'`
          &processTVsList=`'.$this->xpdo->getOption('processTVsList',$settings,'').'`
          &tagKey=`articlestags`
          &tagSearchType=`contains`
          &sortby=`'.$this->xpdo->getOption('sortBy',$settings,'publishedon').'`
          &sortdir=`'.$this->xpdo->getOption('sortDir',$settings,'DESC').'`
          &tpl=`'.$this->xpdo->getOption('tplArticleRow',$settings,'sample.ArticleRowTpl').'`

          &limit=`'.$this->xpdo->getOption('articlesPerPage',$settings,10).'`
          &pageLimit=`'.$this->xpdo->getOption('pageLimit',$settings,5).'`
          &pageVarKey=`'.$this->xpdo->getOption('pageVarKey',$settings,'page').'`
          &pageNavVar=`'.$this->xpdo->getOption('pageNavVar',$settings,'page.nav').'`
          &totalVar=`'.$this->xpdo->getOption('pageTotalVar',$settings,'total').'`
          &offset=`'.$this->xpdo->getOption('pageOffset',$settings,0).'`

          &pageNavTpl=`'.$this->xpdo->getOption('pageNavTpl',$settings,'<li[[+classes]]><a[[+classes]][[+title]] href="[[+href]]">[[+pageNo]]</a></li>').'`
          &pageActiveTpl=`'.$this->xpdo->getOption('pageActiveTpl',$settings,'<li[[+activeClasses]]><a[[+activeClasses:default=` class="active"`]][[+title]] href="[[+href]]">[[+pageNo]]</a></li>').'`
          &pageFirstTpl=`'.$this->xpdo->getOption('pageFirstTpl',$settings,'<li class="control"><a[[+classes]][[+title]] href="[[+href]]">First</a></li>').'`
          &pageLastTpl=`'.$this->xpdo->getOption('pageLastTpl',$settings,'<li class="control"><a[[+classes]][[+title]] href="[[+href]]">Last</a></li>').'`
          &pagePrevTpl=`'.$this->xpdo->getOption('pagePrevTpl',$settings,'<li class="control"><a[[+classes]][[+title]] href="[[+href]]">&lt;&lt;</a></li>').'`
          &pageNextTpl=`'.$this->xpdo->getOption('pageNextTpl',$settings,'<li class="control"><a[[+classes]][[+title]] href="[[+href]]">&gt;&gt;</a></li>').'`

          '.$this->xpdo->getOption('otherGetArchives',$settings,'').'
        ]]';
        $this->xpdo->setPlaceholder($placeholderPrefix.'articles',$output);

        $this->xpdo->setPlaceholder($placeholderPrefix.'paging','[[!+page.nav:notempty=`
<div class="paging">
<ul class="pageList">
  [[!+page.nav]]
</ul>
</div>
`]]');
        return $output;
    }

    /**
     * Get the Archivist call for displaying archives in month/year format.
     *
     * @param string $placeholderPrefix
     * @return void
     */
    public function getArchivistCall($placeholderPrefix = '') {
        $settings = $this->getContainerSettings();
        $output = '[[Archivist?
            &tpl=`'.$this->xpdo->getOption('tplArchiveMonth',$settings,'row').'`
            &target=`'.$this->get('id').'`
            &parents=`'.$this->get('id').'`
            &depth=`4`
            &limit=`'.$this->xpdo->getOption('archiveListingsLimit',$settings,10).'`
            &useMonth=`'.$this->xpdo->getOption('archiveByMonth',$settings,1).'`
            &groupByYear=`'.$this->xpdo->getOption('archiveGroupByYear',$settings,0).'`
            &groupByYearTpl=`'.$this->xpdo->getOption('archiveGroupByYearTpl',$settings,'sample.ArchiveGroupByYear').'`
            &useFurls=`'.$this->xpdo->getOption('archiveWithFurls', $settings, $this->xpdo->getOption('friendly_urls', null, false)).'`
            &cls=`'.$this->xpdo->getOption('archiveCls',$settings,'').'`
            &altCls=`'.$this->xpdo->getOption('archiveAltCls',$settings,'').'`
            &setLocale=`1`
        ]]';
        $this->xpdo->setPlaceholder($placeholderPrefix.'archives',$output);
    }

    /**
     * Get the tagLister call for displaying tag listings on the front-end.
     *
     * @param string $placeholderPrefix
     * @return string
     */
    public function getTagListerCall($placeholderPrefix = '') {
        $settings = $this->getContainerSettings();
        $output = '[[tagLister?
            &tpl=`'.$this->xpdo->getOption('tplTagRow',$settings,'tag').'`
            &tv=`articlestags`
            &parents=`'.$this->get('id').'`
            &tvDelimiter=`,`
            &useTagFurl=`'.$this->xpdo->getOption('friendly_urls', null, false). '`
            &limit=`'.$this->xpdo->getOption('tagsLimit',$settings,10).'`
            &cls=`'.$this->xpdo->getOption('tagsCls',$settings,'tl-tag').'`
            &altCls=`'.$this->xpdo->getOption('tagsAltCls',$settings,'tl-tag-alt').'`
            &target=`'.$this->get('id').'`
        ]]';
        $this->xpdo->setPlaceholder($placeholderPrefix.'tags',$output);
        return $output;
    }

    /**
     * Get the call for the latest posts
     *
     * @param string $placeholderPrefix
     * @return string
     */
    public function getLatestPostsCall($placeholderPrefix = '') {
        $settings = $this->getContainerSettings();
        $output = '[[getResources?
            &parents=`'.$this->get('id').'`
            &hideContainers=`1`
            &includeContent=`1`
            &showHidden=`1`
            &tpl=`'.$this->xpdo->getOption('latestPostsTpl',$settings,'sample.ArticlesLatestPostTpl').'`
            &limit=`'.$this->xpdo->getOption('latestPostsLimit',$settings,5).'`
            &offset=`'.$this->xpdo->getOption('latestPostsOffset',$settings,0).'`
            &sortby=`publishedon`
            &where=`{"class_key":"Article"}`
          '.$this->xpdo->getOption('otherLatestPosts',$settings,'').'
        ]]';
        $this->xpdo->setPlaceholder($placeholderPrefix.'latest_posts',$output);
        return $output;
    }

    /**
     * Get the call for the latest comments
     *
     * @param string $placeholderPrefix
     * @return string
     */
    public function getLatestCommentsCall($placeholderPrefix = '') {
        $settings = $this->getContainerSettings();
        $output = '[[!QuipLatestComments?
            &type=`family`
            &family=`b'.$this->get('id').'`
            &tpl=`'.$this->xpdo->getOption('latestCommentsTpl',$settings,'quipLatestComment').'`
            &limit=`'.$this->xpdo->getOption('latestCommentsLimit',$settings,10).'`
            &bodyLimit=`'.$this->xpdo->getOption('latestCommentsBodyLimit',$settings,300).'`
            &rowCss=`'.$this->xpdo->getOption('latestCommentsRowCss',$settings,'quip-latest-comment').'`
            &altRowCss=`'.$this->xpdo->getOption('latestCommentsAltRowCss',$settings,'quip-latest-comment-alt').'`
        ]]';
        $this->xpdo->setPlaceholder($placeholderPrefix.'latest_comments',$output);
        return $output;
    }

    /**
     * Get an array of settings for the container.
     * @return array
     */
    public function getContainerSettings() {
        $settings = $this->getProperties('articles');
        if (!empty($settings)) {
            $settings = is_array($settings) ? $settings : $this->xpdo->fromJSON($settings);
        }
        return !empty($settings) ? $settings : array();
    }

    /**
     * Encrypt a string
     * @param string $str
     * @return string
     */
    public function encrypt($str) {
        $result = '';
        for($i=0; $i<strlen($str); $i++) {
            $char = substr($str, $i, 1);
            $keyChar = substr($this->salt, ($i % strlen($this->salt))-1, 1);
            $char = chr(ord($char)+ord($keyChar));
            $result .= $char;
        }
        return base64_encode($result);
    }

    /**
     * Decrypt a string
     * @param string $str
     * @return string
     */
    public function decrypt($str) {
        $result = '';
        $str = base64_decode($str);
        for($i=0; $i<strlen($str); $i++) {
            $char = substr($str, $i, 1);
            $keyChar = substr($this->salt, ($i % strlen($this->salt))-1, 1);
            $char = chr(ord($char)-ord($keyChar));
            $result.=$char;
        }
        return $result;
    }

    /**
     * Get Twitter API keys necessary for posting
     * @return array
     */
    public function getTwitterKeys() {
        $settings = $this->getContainerSettings();
        $key = !empty($settings['notifyTwitterConsumerKey']) ? $settings['notifyTwitterConsumerKey'] : 'lqTxfNnXdujbguuosYnhmsvXy6fL6Q==';
        $secret = !empty($settings['notifyTwitterConsumerKeySecret']) ? $settings['notifyTwitterConsumerKeySecret'] : 'nczipN69mNvdau7s1offYpnM35Gi15yU4pfqu3TW4arr2ZfMprl1sZ7M';
        return array(
            'consumer_key' => $this->decrypt($key),
            'consumer_key_secret' => $this->decrypt($secret),
        );
    }
}

/**
 * Overrides the modResourceCreateProcessor to provide custom processor functionality for the Articles type
 *
 * @package articles
 */
class ArticlesContainerCreateProcessor extends modResourceCreateProcessor {
    /** @var ArticlesContainer $object */
    public $object;
    /**
     * Override modResourceCreateProcessor::afterSave to provide custom functionality, saving the container settings to a
     * custom field in the manager
     * {@inheritDoc}
     * @return boolean
     */
    public function beforeSave() {
        $properties = $this->getProperties();
        $settings = $this->object->getProperties('articles');
        $notificationServices = array();
        foreach ($properties as $k => $v) {
            if (substr($k,0,8) == 'setting_') {
                $key = substr($k,8);
                if ($v === 'false') $v = 0;
                if ($v === 'true') $v = 1;

                switch ($key) {
                    case 'notifyTwitter':
                        if ($v) $notificationServices[] = 'twitter';
                        break;
                    case 'notifyTwitterConsumerKey':
                        if (!empty($v)) {
                            $v = $this->object->encrypt($v);
                        }
                        break;
                    case 'notifyTwitterConsumerKeySecret':
                        if (!empty($v)) {
                            $v = $this->object->encrypt($v);
                        }
                        break;
                    case 'notifyFacebook':
                        if ($v) $notificationServices[] = 'facebook';
                        break;
                }
                $settings[$key] = $v;
            }
        }
        $settings['notificationServices'] = implode(',',$notificationServices);
        $this->object->setProperties($settings,'articles');

        $this->object->set('class_key','ArticlesContainer');
        $this->object->set('cacheable',true);
        $this->object->set('isfolder',true);
        return parent::beforeSave();
    }

    /**
     * Override modResourceCreateProcessor::afterSave to provide custom functionality
     * {@inheritDoc}
     * @return boolean
     */
    public function afterSave() {
        $this->addContainerId();
        $this->removeFromArchivistIds();
        $this->setProperty('clearCache',true);
        return parent::afterSave();
    }

    /**
     * Add the Container ID to the articles system setting for managing container IDs for FURL redirection.
     * @return boolean
     */
    public function addContainerId() {
        $saved = true;
        /** @var modSystemSetting $setting */
        $setting = $this->modx->getObject('modSystemSetting',array('key' => 'articles.container_ids'));
        if (!$setting) {
            $setting = $this->modx->newObject('modSystemSetting');
            $setting->set('key','articles.container_ids');
            $setting->set('namespace','articles');
            $setting->set('area','furls');
            $setting->set('xtype','textfield');
        }
        $value = $setting->get('value');
        $archiveKey = $this->object->get('id').':arc_';
        $value = is_array($value) ? $value : explode(',',$value);
        if (!in_array($archiveKey,$value)) {
            $value[] = $archiveKey;
            $value = array_unique($value);
            $setting->set('value',implode(',',$value));
            $saved = $setting->save();
        }
        return $saved;
    }

    /**
     * Remove from Archivist IDs on prior versions of Archivist, to prevent conflicts
     * @return boolean
     */
    public function removeFromArchivistIds() {
        $saved = true;
        /** @var modSystemSetting $setting */
        $setting = $this->modx->getObject('modSystemSetting',array('key' => 'archivist.archive_ids'));
        if ($setting) {
            $value = $setting->get('value');
            $archiveKey = $this->object->get('id').':arc_';
            $value = is_array($value) ? $value : explode(',',$value);
            if (in_array($archiveKey,$value)) {
                $newKeys = array();
                foreach ($value as $k => $v) {
                    if ($v == $archiveKey) continue;
                    $newKeys[] = $v;
                }
                $newKeys = array_unique($newKeys);
                $setting->set('value',implode(',',$newKeys));
                $saved = $setting->save();
            }
        }
        return $saved;
    }
}

/**
 * Overrides the modResourceUpdateProcessor to provide custom processor functionality for the Articles type
 *
 * @package articles
 */
class ArticlesContainerUpdateProcessor extends modResourceUpdateProcessor {
    /** @var ArticlesContainer $object */
    public $object;
    /**
     * Override modResourceUpdateProcessor::beforeSave to provide custom functionality, saving settings for the container
     * to a custom field in the DB
     * {@inheritDoc}
     * @return boolean
     */
    public function beforeSave() {
        $properties = $this->getProperties();
        $settings = $this->object->getProperties('articles');
        $notificationServices = array();
        foreach ($properties as $k => $v) {
            if (substr($k,0,8) == 'setting_') {
                $key = substr($k,8);
                if ($v === 'false') $v = 0;
                if ($v === 'true') $v = 1;

                switch ($key) {
                    case 'notifyTwitter':
                        if ($v) $notificationServices[] = 'twitter';
                        break;
                    case 'notifyTwitterConsumerKey':
                        if (!empty($v)) {
                            $v = $this->object->encrypt($v);
                        }
                        break;
                    case 'notifyTwitterConsumerKeySecret':
                        if (!empty($v)) {
                            $v = $this->object->encrypt($v);
                        }
                        break;
                    case 'notifyFacebook':
                        if ($v) $notificationServices[] = 'facebook';
                        break;
                }
                $settings[$key] = $v;
            }
        }
        $settings['notificationServices'] = implode(',',$notificationServices);
        $this->object->setProperties($settings,'articles');
        return parent::beforeSave();
    }

    /**
     * Override modResourceUpdateProcessor::afterSave to provide custom functionality
     * {@inheritDoc}
     * @return boolean
     */
    public function afterSave() {
        $this->addContainerId();
        $this->removeFromArchivistIds();
        $this->setProperty('clearCache',true);
        $this->object->set('isfolder',true);
        return parent::afterSave();
    }

    /**
     * Add the Container ID to the articles system setting for managing IDs for FURL redirection.
     * @return boolean
     */
    public function addContainerId() {
        $saved = true;
        /** @var modSystemSetting $setting */
        $setting = $this->modx->getObject('modSystemSetting',array('key' => 'articles.container_ids'));
        if (!$setting) {
            $setting = $this->modx->newObject('modSystemSetting');
            $setting->set('key','articles.container_ids');
            $setting->set('namespace','articles');
            $setting->set('area','furls');
            $setting->set('xtype','textfield');
        }
        $value = $setting->get('value');
        $archiveKey = $this->object->get('id').':arc_';
        $value = is_array($value) ? $value : explode(',',$value);
        if (!in_array($archiveKey,$value)) {
            $value[] = $archiveKey;
            $value = array_unique($value);
            $setting->set('value',implode(',',$value));
            $saved = $setting->save();
        }
        return $saved;
    }

    /**
     * Remove from Archivist IDs on prior versions of Archivist, to prevent conflicts
     * @return boolean
     */
    public function removeFromArchivistIds() {
        $saved = true;
        /** @var modSystemSetting $setting */
        $setting = $this->modx->getObject('modSystemSetting',array('key' => 'archivist.archive_ids'));
        if ($setting) {
            $value = $setting->get('value');
            $archiveKey = $this->object->get('id').':arc_';
            $value = is_array($value) ? $value : explode(',',$value);
            if (in_array($archiveKey,$value)) {
                $newKeys = array();
                foreach ($value as $k => $v) {
                    if ($v == $archiveKey) continue;
                    $newKeys[] = $v;
                }
                $newKeys = array_unique($newKeys);
                $setting->set('value',implode(',',$newKeys));
                $saved = $setting->save();
            }
        }
        return $saved;
    }

    /**
     * Override cleanup to send only back needed params
     * @return array|string
     */
    public function cleanup() {
        $this->object->removeLock();
        $this->clearCache();

        $returnArray = $this->object->get(array_diff(array_keys($this->object->_fields), array('content','ta','introtext','description','link_attributes','pagetitle','longtitle','menutitle','articles_container_settings','properties')));
        foreach ($returnArray as $k => $v) {
            if (strpos($k,'tv') === 0) {
                unset($returnArray[$k]);
            }
            if (strpos($k,'setting_') === 0) {
                unset($returnArray[$k]);
            }
        }
        $returnArray['class_key'] = $this->object->get('class_key');
        $this->workingContext->prepare(true);
        $returnArray['preview_url'] = $this->modx->makeUrl($this->object->get('id'), $this->object->get('context_key'), '', 'full');
        return $this->success('',$returnArray);
    }
}
