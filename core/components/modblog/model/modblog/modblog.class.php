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

    public function process() {
        $this->xpdo->lexicon->load('modblog:frontend');
        $this->getPosts();
        $this->getArchives();
        return parent::process();
    }
    public function getContent(array $options = array()) {
        $content = parent::getContent($options);

        return $content;
    }

    public function getPosts() {
        $settings = $this->getBlogSettings();
        
        $output = '[getArchives?
          &parents=`[[*id]]`
          &where=`{"class_key":"modBlogPost"}`
          &limit=`10`
          &showHidden=`1`
          &includeContent=`1`
          &tpl=`'.$this->xpdo->getOption('tplPost',$settings,'modBlogPostRowTpl').'`
        ]';
        $this->xpdo->setPlaceholder('posts',' ['.$output.']');
    }

    public function getArchives() {
    /** @var modBlogPost $post */
        $settings = $this->getBlogSettings();
        $tpl = $this->xpdo->getOption('tplArchiveMonth',$settings,'modBlogArchiveMonthTpl');
        $output = '[[Archivist?
            &tpl=`'.$tpl.'`
            &target=`'.$this->get('id').'`
            &parents=`'.$this->get('id').'`
            &depth=`4`
            &limit=`10`
            &useMonth=`1`
            &useFurls=`1`
        ]]';
        $this->xpdo->setPlaceholder('archives',$output);
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

    public function afterSave() {
        $this->addArchivistArchive();
        return parent::afterSave();
    }

    public function addArchivistArchive() {
        $saved = true;
        /** @var modSystemSetting $setting */
        $setting = $this->modx->getObject('modSystemSetting',array('key' => 'archivist.archive_ids'));
        if (!$setting) {
            $setting = $this->modx->newObject('modSystemSetting');
            $setting->set('key','archivist.archive_ids');
            $setting->set('namespace','archivist');
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

    public function afterSave() {
        $this->addArchivistArchive();
        return parent::afterSave();
    }

    public function addArchivistArchive() {
        $saved = true;
        /** @var modSystemSetting $setting */
        $setting = $this->modx->getObject('modSystemSetting',array('key' => 'archivist.archive_ids'));
        if (!$setting) {
            $setting = $this->modx->newObject('modSystemSetting');
            $setting->set('key','archivist.archive_ids');
            $setting->set('namespace','archivist');
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
}