<?php
/**
 * @package modBlog
 */
require_once (strtr(realpath(dirname(dirname(__FILE__))), '\\', '/') . '/modblogpost.class.php');
class modBlogPost_mysql extends modBlogPost {}
?>