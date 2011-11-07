<?php
/**
 * @package modBlog
 */
require_once (strtr(realpath(dirname(dirname(__FILE__))), '\\', '/') . '/modblog.class.php');
class modBlog_mysql extends modBlog {}
?>