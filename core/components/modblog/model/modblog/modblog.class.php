<?php
require_once MODX_CORE_PATH.'model/modx/modprocessor.class.php';
require_once MODX_CORE_PATH.'model/modx/processors/resource/create.class.php';
require_once MODX_CORE_PATH.'model/modx/processors/resource/update.class.php';
/**
 * @package modBlog
 */
class modBlog extends modResource {
    function __construct(& $xpdo) {
        parent :: __construct($xpdo);
        $this->set('class_key','modBlog');
        $this->set('hide_children_in_tree',true);
        $this->showInContextMenu = true;
    }

    public static function getControllerPath(xPDO &$modx) {
        return $modx->getOption('modblog.core_path',null,$modx->getOption('core_path').'components/modblog/').'controllers/blog/';
    }

    public function getContextMenuText() {
        $this->xpdo->lexicon->load('modblog:default');
        return array(
            'text_create' => $this->xpdo->lexicon('modblog.blog'),
            'text_create_here' => $this->xpdo->lexicon('modblog.blog_create_here'),
        );
    }

    public function getResourceTypeName() {
        $this->xpdo->lexicon->load('modblog:default');
        return $this->xpdo->lexicon('modblog.blog');
    }

    public function getContent(array $options = array()) {
        $content = parent::getContent($options);
        return $content;
    }

    public function getBlogSettings() {
        $settings = $this->get('settings');
        if (!empty($settings)) {
            $settings = $this->xpdo->fromJSON($settings);
        }
        return !empty($settings) ? $settings : array();
    }
}

/**
 * Overrides the modResourceCreateProcessor to provide custom processor functionality for the modBlog type
 *
 * @package modblog
 */
class modBlogCreateProcessor extends modResourceCreateProcessor {
    public function beforeSave() {
        $properties = $this->getProperties();
        $settings = $this->object->get('blog_settings');
        foreach ($properties as $k => $v) {
            if (substr($k,0,8) == 'setting_') {
                $key = substr($k,8);
                $settings[$key] = $v;
            }
        }
        $this->object->set('blog_settings',$settings);
        return parent::beforeSave();
    }
}

/**
 * Overrides the modResourceUpdateProcessor to provide custom processor functionality for the modBlog type
 *
 * @package modblog
 */
class modBlogUpdateProcessor extends modResourceUpdateProcessor {
    public function beforeSave() {
        $properties = $this->getProperties();
        $settings = $this->object->get('blog_settings');
        foreach ($properties as $k => $v) {
            if (substr($k,0,8) == 'setting_') {
                $key = substr($k,8);
                $settings[$key] = $v;
            }
        }
        $this->object->set('blog_settings',$settings);
        return parent::beforeSave();
    }
}