<?php
class modBlogPostGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'modResource';
    public $defaultSortField = 'pagetitle';
    public $defaultSortDirection = 'ASC';
    public $checkListPermission = true;
    public $objectType = 'post';
    public $languageTopics = array('resource','modblog:default');

    public function prepareQueryBeforeCount(xPDOQuery $c) {
        $parent = $this->getProperty('parent',null);
        if ($parent !== null) {
            $c->where(array(
                'parent' => $parent,
            ));
        }
        return $c;
    }

    public function prepareRow(xPDOObject $object) {
        $charset = $this->modx->getOption('modx_charset',null,'UTF-8');
        $objectArray = $object->toArray();
        $resourceArray['pagetitle'] = htmlentities($objectArray['pagetitle'],ENT_COMPAT,$charset);
        $resourceArray['publishedon'] = strftime('%b %d, %Y %H:%I %p',strtotime($resourceArray['publishedon']));
        return $objectArray;
    }
}
return 'modBlogPostGetListProcessor';