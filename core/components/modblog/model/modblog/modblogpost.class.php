<?php
require_once MODX_CORE_PATH.'model/modx/modprocessor.class.php';
require_once MODX_CORE_PATH.'model/modx/processors/resource/create.class.php';
require_once MODX_CORE_PATH.'model/modx/processors/resource/update.class.php';
/**
 * @package modBlog
 */
class modBlogPost extends modResource {
    function __construct(& $xpdo) {
        parent :: __construct($xpdo);
        $this->set('class_key','modBlogPost');
        $this->set('show_in_tree',false);
        $this->set('richtext',true);
        $this->set('searchable',true);
    }
    public static function getControllerPath(xPDO &$modx) {
        return $modx->getOption('modblog.core_path',null,$modx->getOption('core_path').'components/modblog/').'controllers/post/';
    }

    public function getContent(array $options = array()) {
        $content = parent::getContent($options);
        /*
        if ($this->xpdo instanceof modX) {
            $settings = $this->get('blog_settings');
            $this->getCommentsCall($settings);
            $this->getCommentsReplyCall($settings);
        }*/
        return $content;
    }

    /*
     * Delayed for a future release...
     * 
    public function getCommentsCall(array $settings = array()) {
        $call = '[[!Quip?
  &thread=`modblogpost-b'.$this->get('blog').'-'.$this->get('id').'`
  &replyResourceId=`19`
  &closeAfter=`'.$this->xpdo->getOption('commentsCloseAfter',$settings,0).'`
  &threaded=`'.$this->xpdo->getOption('commentsThreaded',$settings,1).'`
  &maxDepth=`'.$this->xpdo->getOption('commentsMaxDepth',$settings,5).'`
  &dateFormat=`'.$this->xpdo->getOption('commentsDateFormat',$settings,'%b %d, %Y at %I:%M %p').'`
  &requireAuth=`'.$this->xpdo->getOption('commentsRequireAuth',$settings,0).'`
  &useCss=`'.$this->xpdo->getOption('commentsUseCss',$settings,1).'`
]]';
        $this->xpdo->setPlaceholder('comments',$call);
    }

    public function getCommentsReplyCall(array $settings = array()) {
        $call = '[[!QuipReply?
   &thread=`modblogpost-b'.$this->get('blog').'-'.$this->get('id').'`
   &recaptcha=`'.$this->xpdo->getOption('commentsReCaptcha',$settings,0).'`
   &moderate=`'.$this->xpdo->getOption('commentsModerate',$settings,1).'`
   &closeAfter=`'.$this->xpdo->getOption('commentsCloseAfter',$settings,0).'`
]]';
        $this->xpdo->setPlaceholder('comments_form',$call);
    }
    */
}

/**
 * Overrides the modResourceCreateProcessor to provide custom processor functionality for the modBlogPost type
 *
 * @package modblog
 */
class modBlogPostCreateProcessor extends modResourceCreateProcessor {
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
        $this->unsetProperty('blog_settings');
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
                $this->modx->log(modX::LOG_LEVEL_ERROR,'Failed to set URI for new post.');
            }
        }
        
        /** @var modBlog $blog */
        $blog = $this->modx->getObject('modBlog',$this->object->get('blog'));
        if ($blog) {
            $this->object->set('blog_settings',$blog->get('blog_settings'));
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
        $this->object->set('blog',$this->parentResource->get('id'));

        $date = $this->object->get('published') ? $this->object->get('publishedon') : $this->object->get('createdon');
        $year = date('Y',strtotime($date));
        $month = date('m',strtotime($date));
        $day = date('d',strtotime($date));

        $blogUri = $this->parentResource->get('uri');
        $uri = rtrim($blogUri,'/').'/'.$year.'/'.$month.'/'.$day.'/'.$this->object->get('alias');

        $this->object->set('uri',$uri);
        $this->object->set('uri_override',true);
        return $uri;
    }
}

/**
 * Overrides the modResourceUpdateProcessor to provide custom processor functionality for the modBlogPost type
 *
 * @package modblog
 */
class modBlogPostUpdateProcessor extends modResourceUpdateProcessor {
    /** @var modResource $yearParent */
    public $yearParent;
    /** @var modResource $monthParent */
    public $monthParent;
    /** @var modResource $dayParent */
    public $dayParent;

    public function beforeSet() {
        $this->setProperty('clearCache',true);
        $this->unsetProperty('blog_settings');
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

        /** @var modBlog $blog */
        $blog = $this->modx->getObject('modBlog',$this->object->get('blog'));
        if ($blog) {
            $this->object->set('blog_settings',$blog->get('blog_settings'));
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
                'name' => 'modblogtags',
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
        $this->object->set('blog',$this->parentResource->get('id'));

        $date = $this->object->get('published') ? $this->object->get('publishedon') : $this->object->get('createdon');
        $year = date('Y',strtotime($date));
        $month = date('m',strtotime($date));
        $day = date('d',strtotime($date));

        $blogUri = $this->parentResource->get('uri');
        $uri = rtrim($blogUri,'/').'/'.$year.'/'.$month.'/'.$day.'/'.$this->object->get('alias');

        $this->object->set('uri',$uri);
        $this->object->set('uri_override',true);
        return $uri;
    }
}