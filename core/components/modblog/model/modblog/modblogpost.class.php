<?php
/**
 * @package modBlog
 */
class modBlogPost extends modResource {
    function __construct(& $xpdo) {
        parent :: __construct($xpdo);
        $this->set('class_key','modBlogPost');
        $this->set('show_in_tree',false);
    }
}