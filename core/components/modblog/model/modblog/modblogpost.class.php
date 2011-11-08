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

    public function getContent(array $options) {
        $content = parent::getContent($options);
        return $content;
    }
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
        return parent::beforeSet();
    }
    
    /**
     * Override modResourceUpdateProcessor::afterSave to provide archiving
     *
     * {@inheritDoc}
     * @return boolean
     */
    public function afterSave() {
        $afterSave = parent::afterSave();
        if ($this->object->get('published')) {
            if (!$this->moveToArchiveFolder()) {
                $this->modx->log(modX::LOG_LEVEL_ERROR,'Failed to move to archive folder.');
            }
        }
        return $afterSave;
    }

    /**
     * Ensure that the resource is moved to the proper date-based URL, creating a nice archived feel.
     *
     * @return boolean
     */
    public function moveToArchiveFolder() {
        /** get the parent resource */
        if (!$this->parentResource) {
            $this->parentResource = $this->object->getOne('Parent');
            if (!$this->parentResource) {
                return false;
            }
        }

        /* if the alias of the parent is a number, we're good */
        $alias = $this->parentResource->get('alias');
        if (intval($alias) > 0) {
            return true;
        }
        /* otherwise go ahead and create the archive containers */
        $this->getYearParent();
        $this->getMonthParent();
        $this->getDayParent();

        /** set the new parent */
        $this->object->addOne($this->dayParent,'Parent');
        $this->object->set('parent',$this->dayParent->get('id'));
        $menuIndex = $this->modx->getCount('modResource',array(
            'parent' => $this->dayParent->get('id'),
        ));
        $this->object->set('menuindex',$menuIndex);
        return $this->object->save();
    }

    /**
     * Ensure that the Resource is in the proper year archive
     * @return modResource
     */
    public function getYearParent() {
        $this->yearParent = $this->modx->getObject('modResource',array(
            'parent' => $this->parentResource->get('id'),
            'alias' => date('Y',strtotime($this->object->get('publishedon'))),
        ));
        if (!$this->yearParent) {
            $date = date('Y',strtotime($this->object->get('publishedon')));
            $this->yearParent = $this->createArchiveContainer($date,$this->parentResource);
        }
        return $this->yearParent;
    }

    /**
     * Ensure that the Resource is in the proper month archive
     * @return modResource
     */
    public function getMonthParent() {
        $this->monthParent = $this->modx->getObject('modResource',array(
            'parent' => $this->yearParent->get('id'),
            'alias' => date('m',strtotime($this->object->get('publishedon'))),
        ));
        if (!$this->monthParent) {
            $date = date('m',strtotime($this->object->get('publishedon')));
            $this->monthParent = $this->createArchiveContainer($date,$this->yearParent);
        }
        return $this->monthParent;
    }

    /**
     * Ensure that the Resource is in the proper day archive
     * @return modResource
     */
    public function getDayParent() {
        $this->dayParent = $this->modx->getObject('modResource',array(
            'parent' => $this->monthParent->get('id'),
            'alias' => date('d',strtotime($this->object->get('publishedon'))),
        ));
        if (!$this->dayParent) {
            $date = date('d',strtotime($this->object->get('publishedon')));
            $this->dayParent = $this->createArchiveContainer($date,$this->monthParent);
        }
        return $this->dayParent;
    }

    /**
     * Create a archive container for a given parent and alias
     * @param string $alias
     * @param modResource $parent
     * @return modResource
     */
    protected function createArchiveContainer($alias,modResource $parent) {
        $menuIndex = $this->modx->getCount('modResource',array(
            'parent' => $parent->get('id'),
        ));

        /** @var modResource $container */
        $container = $this->modx->newObject('modResource');
        $container->fromArray(array(
            'type' => 'document',
            'contentType' => 'text/html',
            'pagetitle' => $alias,
            'longtitle' => '',
            'description' => '',
            'alias' => $alias,
            'published' => true,
            'parent' => $parent->get('id'),
            'isfolder' => true,
            'content' => '',
            'richtext' => false,
            'template' => $parent->get('template'),
            'menuindex' => $menuIndex,
            'searchable' => false,
            'cacheable' => true,
            'createdby' => $this->modx->user->get('id'),
            'createdon' => date('Y-m-d h:i:s'),
            'deleted' => false,
            'hidemenu' => true,
            'class_key' => 'modDocument',
            'context_key' => $parent->get('context_key'),
            'content_type' => $parent->get('content_type'),
            'hide_children_in_tree' => false,
            'show_in_tree' => false,
        ));
        $container->save();
        return $container;
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

    /**
     * Override modResourceUpdateProcessor::afterSave to provide archiving
     * 
     * {@inheritDoc}
     * @return boolean
     */
    public function afterSave() {
        $afterSave = parent::afterSave();
        if ($this->object->get('published')) {
            if (!$this->moveToArchiveFolder()) {
                $this->modx->log(modX::LOG_LEVEL_ERROR,'Failed to move to archive folder.');
            }
        }
        return $afterSave;
    }

    /**
     * Ensure that the resource is moved to the proper date-based URL, creating a nice archived feel.
     * 
     * @return boolean
     */
    public function moveToArchiveFolder() {
        /** get the parent resource */
        if (!$this->parentResource) {
            $this->parentResource = $this->object->getOne('Parent');
            if (!$this->parentResource) {
                return false;
            }
        }

        /* if the alias of the parent is a number, we're good */
        $alias = $this->parentResource->get('alias');
        if (intval($alias) > 0) {
            return true;
        }
        /* otherwise go ahead and create the archive containers */
        $this->getYearParent();
        $this->getMonthParent();
        $this->getDayParent();

        /** set the new parent */
        $this->object->addOne($this->dayParent,'Parent');
        $this->object->set('parent',$this->dayParent->get('id'));
        $menuIndex = $this->modx->getCount('modResource',array(
            'parent' => $this->dayParent->get('id'),
        ));
        $this->object->set('menuindex',$menuIndex);
        return $this->object->save();
    }

    /**
     * Ensure that the Resource is in the proper year archive
     * @return modResource
     */
    public function getYearParent() {
        $this->yearParent = $this->modx->getObject('modResource',array(
            'parent' => $this->parentResource->get('id'),
            'alias' => date('Y',strtotime($this->object->get('publishedon'))),
        ));
        if (!$this->yearParent) {
            $date = date('Y',strtotime($this->object->get('publishedon')));
            $this->yearParent = $this->createArchiveContainer($date,$this->parentResource);
        }
        return $this->yearParent;
    }

    /**
     * Ensure that the Resource is in the proper month archive
     * @return modResource
     */
    public function getMonthParent() {
        $this->monthParent = $this->modx->getObject('modResource',array(
            'parent' => $this->yearParent->get('id'),
            'alias' => date('m',strtotime($this->object->get('publishedon'))),
        ));
        if (!$this->monthParent) {
            $date = date('m',strtotime($this->object->get('publishedon')));
            $this->monthParent = $this->createArchiveContainer($date,$this->yearParent);
        }
        return $this->monthParent;
    }

    /**
     * Ensure that the Resource is in the proper day archive
     * @return modResource
     */
    public function getDayParent() {
        $this->dayParent = $this->modx->getObject('modResource',array(
            'parent' => $this->monthParent->get('id'),
            'alias' => date('d',strtotime($this->object->get('publishedon'))),
        ));
        if (!$this->dayParent) {
            $date = date('d',strtotime($this->object->get('publishedon')));
            $this->dayParent = $this->createArchiveContainer($date,$this->monthParent);
        }
        return $this->dayParent;
    }

    /**
     * Create a archive container for a given parent and alias
     * @param string $alias
     * @param modResource $parent
     * @return modResource
     */
    protected function createArchiveContainer($alias,modResource $parent) {
        $menuIndex = $this->modx->getCount('modResource',array(
            'parent' => $parent->get('id'),
        ));

        /** @var modResource $container */
        $container = $this->modx->newObject('modResource');
        $container->fromArray(array(
            'type' => 'document',
            'contentType' => 'text/html',
            'pagetitle' => $alias,
            'longtitle' => '',
            'description' => '',
            'alias' => $alias,
            'published' => true,
            'parent' => $parent->get('id'),
            'isfolder' => true,
            'content' => '',
            'richtext' => false,
            'template' => $parent->get('template'),
            'menuindex' => $menuIndex,
            'searchable' => false,
            'cacheable' => true,
            'createdby' => $this->modx->user->get('id'),
            'createdon' => date('Y-m-d h:i:s'),
            'deleted' => false,
            'hidemenu' => true,
            'class_key' => 'modDocument',
            'context_key' => $parent->get('context_key'),
            'content_type' => $parent->get('content_type'),
            'hide_children_in_tree' => false,
            'show_in_tree' => false,
        ));
        $container->save();
        return $container;
    }
}