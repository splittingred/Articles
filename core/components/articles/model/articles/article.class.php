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
class Article extends modResource {
    function __construct(xPDO &$xpdo) {
        parent :: __construct($xpdo);
        $this->set('class_key','Article');
        $this->set('show_in_tree',false);
        $this->set('richtext',true);
        $this->set('searchable',true);
    }
    public static function getControllerPath(xPDO &$modx) {
        return $modx->getOption('articles.core_path',null,$modx->getOption('core_path').'components/articles/').'controllers/article/';
    }

    public function getContent(array $options = array()) {
        $content = parent::getContent($options);
        if ($this->xpdo instanceof modX) {
            $settings = $this->getContainerSettings();
            $this->getCommentsCall($settings);
            $this->getCommentsReplyCall($settings);
        }
        return $content;
    }

    /**
     * @return array
     */
    public function getContainerSettings() {
        $settings = $this->get('articles_container_settings');
        /** @var ArticlesContainer $container */
        $container = $this->getOne('Container');
        if ($container) {
            $settings = $container->getContainerSettings();
        }
        return $settings;
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
     * @param array $settings
     * @return string
     */
    public function getCommentsCall(array $settings = array()) {
        $call = '[[!Quip?
   &thread=`article-b'.$this->get('articles_container').'-'.$this->get('id').'`
   &threaded=`'.$this->xpdo->getOption('commentsThreaded',$settings,1).'`
   &replyResourceId=`'.$this->xpdo->getOption('commentsReplyResourceId',$settings,0).'`
   &maxDepth=`'.$this->xpdo->getOption('commentsMaxDepth',$settings,5).'`

   &tplComment=`'.$this->xpdo->getOption('commentsTplComment',$settings,'quipComment').'`
   &tplCommentOptions=`'.$this->xpdo->getOption('commentsTplCommentOptions',$settings,'quipCommentOptions').'`
   &tplComments=`'.$this->xpdo->getOption('commentsTplComments',$settings,'quipComments').'`

   &dateFormat=`'.$this->xpdo->getOption('commentsDateFormat',$settings,'%b %d, %Y at %I:%M %p').'`
   &closeAfter=`'.$this->xpdo->getOption('commentsCloseAfter',$settings,0).'`

   &useCss=`'.$this->xpdo->getOption('commentsUseCss',$settings,1).'`
   &altRowCss=`'.$this->xpdo->getOption('commentsAltRowCss',$settings,'quip-comment-alt').'`

   &zzrequireAuth=`'.$this->xpdo->getOption('commentsRequireAuth',$settings,0).'`

   &nameField=`'.$this->xpdo->getOption('commentsNameField',$settings,'username').'`
   &showAnonymousName=`'.$this->xpdo->getOption('commentsShowAnonymousName',$settings,0).'`
   &anonymousName=`'.$this->xpdo->getOption('commentsAnonymousName',$settings,'Anonymous').'`

   &allowRemove=`'.$this->xpdo->getOption('commentsAllowRemove',$settings,1).'`
   &removeThreshold=`'.$this->xpdo->getOption('commentsRemoveThreshold',$settings,3).'`
   &allowReportAsSpam=`'.$this->xpdo->getOption('commentsAllowReportAsSpam',$settings,1).'`

   &useGravatar=`'.$this->xpdo->getOption('commentsGravatar',$settings,1).'`
   &gravatarIcon=`'.$this->xpdo->getOption('commentsGravatarIcon',$settings,'identicon').'`
   &gravatarSize=`'.$this->xpdo->getOption('commentsGravatarSize',$settings,50).'`

   &limit=`'.$this->xpdo->getOption('commentsLimit',$settings,0).'`
]]';
        $this->xpdo->setPlaceholder('comments',$call);
        return $call;
    }

    /**
     * @param array $settings
     * @return string
     */
    public function getCommentsReplyCall(array $settings = array()) {
        $call = '[[!QuipReply?
   &thread=`article-b'.$this->get('articles_container').'-'.$this->get('id').'`

   &tplAddComment=`'.$this->xpdo->getOption('commentsTplAddComment',$settings,'quipAddComment').'`
   &tplLoginToComment=`'.$this->xpdo->getOption('commentsTplLoginToComment',$settings,'quipLoginToComment').'`
   &tplPreview=`'.$this->xpdo->getOption('commentsTplPreview',$settings,'quipPreviewComment').'`

   &requirePreview=`'.$this->xpdo->getOption('commentsRequirePreview',$settings,0).'`
   &zzrequireAuth=`'.$this->xpdo->getOption('commentsRequireAuth',$settings,0).'`

   &recaptcha=`'.$this->xpdo->getOption('commentsReCaptcha',$settings,0).'`
   &disableRecaptchaWhenLoggedIn=`'.$this->xpdo->getOption('commentsDisabledReCaptchaWhenLoggedIn',$settings,1).'`

   &moderate=`'.$this->xpdo->getOption('commentsModerate',$settings,1).'`
   &moderateAnonymousOnly=`'.$this->xpdo->getOption('commentsModerateAnonymousOnly',$settings,0).'`
   &moderateFirstPostOnly=`'.$this->xpdo->getOption('commentsModerateFirstPostOnly',$settings,1).'`
   &moderators=`'.$this->xpdo->getOption('commentsModerators',$settings,'').'`
   &moderatorGroup=`'.$this->xpdo->getOption('commentsModeratorGroup',$settings,'Administrator').'`

   &closeAfter=`'.$this->xpdo->getOption('commentsCloseAfter',$settings,0).'`
   &dateFormat=`'.$this->xpdo->getOption('commentsDateFormat',$settings,'%b %d, %Y at %I:%M %p').'`
   &autoConvertLinks=`'.$this->xpdo->getOption('commentsAutoConvertLinks',$settings,1).'`

   &useGravatar=`'.$this->xpdo->getOption('commentsGravatar',$settings,1).'`
   &gravatarIcon=`'.$this->xpdo->getOption('commentsGravatarIcon',$settings,'identicon').'`
   &gravatarSize=`'.$this->xpdo->getOption('commentsGravatarSize',$settings,50).'`
]]';
        $this->xpdo->setPlaceholder('comments_form',$call);
        return $call;
    }
}

/**
 * Overrides the modResourceCreateProcessor to provide custom processor functionality for the Article type
 *
 * @package articles
 */
class ArticleCreateProcessor extends modResourceCreateProcessor {
    /** @var modResource $yearParent */
    public $yearParent;
    /** @var modResource $monthParent */
    public $monthParent;
    /** @var modResource $dayParent */
    public $dayParent;


    public function beforeSet() {
        $this->setProperty('searchable',true);
        $this->setProperty('richtext',true);
        $this->setProperty('isfolder',false);
        $this->setProperty('cacheable',true);
        $this->setProperty('clearCache',true);
        $this->setProperty('class_key','Article');
        $this->unsetProperty('articles_container_settings');
        return parent::beforeSet();
    }
    
    /**
     * Override modResourceUpdateProcessor::beforeSave to provide archiving
     *
     * {@inheritDoc}
     * @return boolean
     */
    public function beforeSave() {
        $beforeSave = parent::beforeSave();
        if ($this->object->get('published')) {
            if (!$this->setArchiveUri()) {
                $this->modx->log(modX::LOG_LEVEL_ERROR,'Failed to set URI for new Article.');
            }
        }
        
        /** @var ArticlesContainer $container */
        $container = $this->modx->getObject('ArticlesContainer',$this->object->get('articles_container'));
        if ($container) {
            $this->object->set('articles_container_settings',$container->get('articles_container_settings'));
        }
        return $beforeSave;
    }

    /**
     * Set the friendly URL archive by forcing it into the URI.
     * @return bool|string
     */
    public function setArchiveUri() {
        if (!$this->parentResource) {
            $this->parentResource = $this->object->getOne('Parent');
            if (!$this->parentResource) {
                return false;
            }
        }
        $this->object->set('articles_container',$this->parentResource->get('id'));

        $date = $this->object->get('published') ? $this->object->get('publishedon') : $this->object->get('createdon');
        $year = date('Y',strtotime($date));
        $month = date('m',strtotime($date));
        $day = date('d',strtotime($date));

        $containerUri = $this->parentResource->get('uri');
        $uri = rtrim($containerUri,'/').'/'.$year.'/'.$month.'/'.$day.'/'.$this->object->get('alias');

        $this->object->set('uri',rtrim($uri,'/').'/');
        $this->object->set('uri_override',true);
        return $uri;
    }

    public function afterSave() {
        $afterSave = parent::afterSave();
        $this->saveTemplateVariables();
        $this->clearContainerCache();
        return $afterSave;
    }

    /**
     * Clears the container cache to ensure that the container listing is updated
     * @return void
     */
    public function clearContainerCache() {
        $this->modx->cacheManager->refresh(array(
            'db' => array(),
            'auto_publish' => array('contexts' => array($this->object->get('context_key'))),
            'context_settings' => array('contexts' => array($this->object->get('context_key'))),
            'resource' => array('contexts' => array($this->object->get('context_key'))),
        ));
    }
    
    /**
     * Extend the saveTemplateVariables method and provide handling for the 'tags' type to store in a hidden TV
     * @return array|mixed
     */
    public function saveTemplateVariables() {
        $tags = $this->getProperty('tags',null);
        if ($tags !== null) {
            /** @var modTemplateVar $tv */
            $tv = $this->modx->getObject('modTemplateVar',array(
                'name' => 'articlestags',
            ));
            if ($tv) {
                $defaultValue = $tv->processBindings($tv->get('default_text'),$this->object->get('id'));
                if (strcmp($tags,$defaultValue) != 0) {
                    /* update the existing record */
                    $tvc = $this->modx->getObject('modTemplateVarResource',array(
                        'tmplvarid' => $tv->get('id'),
                        'contentid' => $this->object->get('id'),
                    ));
                    if ($tvc == null) {
                        /** @var modTemplateVarResource $tvc add a new record */
                        $tvc = $this->modx->newObject('modTemplateVarResource');
                        $tvc->set('tmplvarid',$tv->get('id'));
                        $tvc->set('contentid',$this->object->get('id'));
                    }
                    $tvc->set('value',$tags);
                    $tvc->save();

                /* if equal to default value, erase TVR record */
                } else {
                    $tvc = $this->modx->getObject('modTemplateVarResource',array(
                        'tmplvarid' => $tv->get('id'),
                        'contentid' => $this->object->get('id'),
                    ));
                    if (!empty($tvc)) {
                        $tvc->remove();
                    }
                }
            }
        }
        return true;
    }

}

/**
 * Overrides the modResourceUpdateProcessor to provide custom processor functionality for the Article type
 *
 * @package articles
 */
class ArticleUpdateProcessor extends modResourceUpdateProcessor {
    /** @var modResource $yearParent */
    public $yearParent;
    /** @var modResource $monthParent */
    public $monthParent;
    /** @var modResource $dayParent */
    public $dayParent;

    public function beforeSet() {
        $this->setProperty('clearCache',true);
        $this->unsetProperty('articles_container_settings');
        return parent::beforeSet();
    }

    /**
     * Override modResourceUpdateProcessor::beforeSave to provide archiving
     * 
     * {@inheritDoc}
     * @return boolean
     */
    public function beforeSave() {
        $afterSave = parent::beforeSave();
        if ($this->object->get('published')) {
            if (!$this->setArchiveUri()) {
                $this->modx->log(modX::LOG_LEVEL_ERROR,'Failed to set date URI.');
            }
        }

        /** @var ArticlesContainer $container */
        $container = $this->modx->getObject('ArticlesContainer',$this->object->get('articles_container'));
        if ($container) {
            $this->object->set('articles_container_settings',$container->get('articles_container_settings'));
        }
        return $afterSave;
    }

    /**
     * Extend the saveTemplateVariables method and provide handling for the 'tags' type to store in a hidden TV
     * @return array|mixed
     */
    public function saveTemplateVariables() {
        $saved = parent::saveTemplateVariables();
        $tags = $this->getProperty('tags',null);
        if ($tags !== null) {
            /** @var modTemplateVar $tv */
            $tv = $this->modx->getObject('modTemplateVar',array(
                'name' => 'articlestags',
            ));
            if ($tv) {
                $defaultValue = $tv->processBindings($tv->get('default_text'),$this->object->get('id'));
                if (strcmp($tags,$defaultValue) != 0) {
                    /* update the existing record */
                    $tvc = $this->modx->getObject('modTemplateVarResource',array(
                        'tmplvarid' => $tv->get('id'),
                        'contentid' => $this->object->get('id'),
                    ));
                    if ($tvc == null) {
                        /** @var modTemplateVarResource $tvc add a new record */
                        $tvc = $this->modx->newObject('modTemplateVarResource');
                        $tvc->set('tmplvarid',$tv->get('id'));
                        $tvc->set('contentid',$this->object->get('id'));
                    }
                    $tvc->set('value',$tags);
                    $tvc->save();

                /* if equal to default value, erase TVR record */
                } else {
                    $tvc = $this->modx->getObject('modTemplateVarResource',array(
                        'tmplvarid' => $tv->get('id'),
                        'contentid' => $this->object->get('id'),
                    ));
                    if (!empty($tvc)) {
                        $tvc->remove();
                    }
                }
            }
        }
        return $saved;
    }

    /**
     * Set the friendly URL archive by forcing it into the URI.
     * @return bool|string
     */
    public function setArchiveUri() {
        if (!$this->parentResource) {
            $this->parentResource = $this->object->getOne('Parent');
            if (!$this->parentResource) {
                return false;
            }
        }
        $this->object->set('articles_container',$this->parentResource->get('id'));

        $date = $this->object->get('published') ? $this->object->get('publishedon') : $this->object->get('createdon');
        $year = date('Y',strtotime($date));
        $month = date('m',strtotime($date));
        $day = date('d',strtotime($date));

        $containerUri = $this->parentResource->get('uri');
        $uri = rtrim($containerUri,'/').'/'.$year.'/'.$month.'/'.$day.'/'.$this->object->get('alias');

        $this->object->set('uri',rtrim($uri,'/').'/');
        $this->object->set('uri_override',true);
        return $uri;
    }

    public function afterSave() {
        $afterSave = parent::afterSave();
        $this->clearContainerCache();
        return $afterSave;
    }

    /**
     * Clears the container cache to ensure that the container listing is updated
     * @return void
     */
    public function clearContainerCache() {
        $this->modx->cacheManager->refresh(array(
            'db' => array(),
            'auto_publish' => array('contexts' => array($this->object->get('context_key'))),
            'context_settings' => array('contexts' => array($this->object->get('context_key'))),
            'resource' => array('contexts' => array($this->object->get('context_key'))),
        ));
    }
}