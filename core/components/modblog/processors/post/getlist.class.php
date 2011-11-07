<?php
class modBlogPostGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'modResource';
    public $defaultSortField = 'pagetitle';
    public $defaultSortDirection = 'ASC';
    public $checkListPermission = true;
    public $objectType = 'post';
    public $languageTopics = array('resource','modblog:default');

    /** @var modAction $editAction */
    public $editAction;

    public function initialize() {
        $this->editAction = $this->modx->getObject('modAction',array(
            'namespace' => 'core',
            'controller' => 'resource/update',
        ));
        return parent::initialize();
    }

    public function prepareQueryBeforeCount(xPDOQuery $c) {
        $parent = $this->getProperty('parent',null);
        if ($parent !== null) {
            $c->where(array(
                'parent' => $parent,
            ));
        }
        $query = $this->getProperty('query',null);
        if (!empty($query)) {
            $c->where(array(
                'pagetitle:LIKE' => '%'.$query.'%',
                'OR:description:LIKE' => '%'.$query.'%',
                'OR:introtext:LIKE' => '%'.$query.'%',
            ));
        }
        $c->innerJoin('modUser','CreatedBy');
        return $c;
    }

    public function prepareQueryAfterCount(xPDOQuery $c) {
        $c->select($this->modx->getSelectColumns('modResource','modResource'));
        $c->select(array(
            'createdby_username' => 'CreatedBy.username'
        ));
        return $c;
    }

    public function prepareRow(xPDOObject $object) {
        $resourceArray = parent::prepareRow($object);
        $resourceArray['publishedon'] = strftime('%b %d, %Y %H:%I %p',strtotime($resourceArray['publishedon']));
        $resourceArray['publishedon_date'] = strftime('%b %d',strtotime($resourceArray['publishedon']));
        $resourceArray['publishedon_time'] = strftime('%H:%I %p',strtotime($resourceArray['publishedon']));
        $resourceArray['action_edit'] = '?a='.$this->editAction->get('id').'&action=post/update&id='.$resourceArray['id'];
        $resourceArray['tags'] = 'blogs,fun,modx';
        $resourceArray['categories'] = 'Technology';

        $resourceArray['actions'] = array();
        $resourceArray['actions'][] = array(
            'className' => 'edit',
            'text' => 'Edit',
        );
        $resourceArray['actions'][] = array(
            'className' => 'delete',
            'text' => 'Delete',
        );
        if (!empty($resourceArray['published'])) {
            $resourceArray['actions'][] = array(
                'className' => 'unpublish',
                'text' => 'Unpublish',
            );
        } else {
            $resourceArray['actions'][] = array(
                'className' => 'publish orange',
                'text' => 'Publish',
            );
        }
        return $resourceArray;
    }
}
return 'modBlogPostGetListProcessor';