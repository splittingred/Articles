<?php
class modBlogPostGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'modBlogPost';
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
            /** @var modResource $parent */
            $parent = $this->modx->getObject('modBlog',$parent);
            $ids = $this->modx->getChildIds($parent->get('id'),5,array('context' => $parent->get('context_key')));
            $c->where(array(
                'id:IN' => $ids,
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
        $c->where(array(
            'class_key' => 'modBlogPost',
            'deleted' => $this->getProperty('deleted',false),
        ));
        $c->innerJoin('modUser','CreatedBy');
        return $c;
    }

    public function prepareQueryAfterCount(xPDOQuery $c) {
        $c->select($this->modx->getSelectColumns('modBlogPost','modBlogPost'));
        $c->select(array(
            'createdby_username' => 'CreatedBy.username'
        ));
        return $c;
    }

    /**
     * @param xPDOObject|modBlogPost $object
     * @return array
     */
    public function prepareRow(xPDOObject $object) {
        $resourceArray = parent::prepareRow($object);
        $resourceArray['tags'] = $object->getTVValue('modblogtags');

        if (!empty($resourceArray['publishedon'])) {
            $resourceArray['publishedon'] = strftime('%b %d, %Y %H:%I %p',strtotime($resourceArray['publishedon']));
            $resourceArray['publishedon_date'] = strftime('%b %d',strtotime($resourceArray['publishedon']));
            $resourceArray['publishedon_time'] = strftime('%H:%I %p',strtotime($resourceArray['publishedon']));
        }
        $resourceArray['action_edit'] = '?a='.$this->editAction->get('id').'&action=post/update&id='.$resourceArray['id'];

        $resourceArray['actions'] = array();
        $resourceArray['actions'][] = array(
            'className' => 'edit',
            'text' => $this->modx->lexicon('edit'),
        );
        $resourceArray['actions'][] = array(
            'className' => 'delete',
            'text' => $this->modx->lexicon('delete'),
        );
        if (!empty($resourceArray['published'])) {
            $resourceArray['actions'][] = array(
                'className' => 'unpublish',
                'text' => $this->modx->lexicon('unpublish'),
            );
        } else {
            $resourceArray['actions'][] = array(
                'className' => 'publish orange',
                'text' => $this->modx->lexicon('publish'),
            );
        }
        return $resourceArray;
    }
}
return 'modBlogPostGetListProcessor';