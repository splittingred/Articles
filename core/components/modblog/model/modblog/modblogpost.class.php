<?php
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

}