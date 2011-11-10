<?php
/**
 * @package modBlog
 */
$xpdo_meta_map['modBlog']= array (
  'package' => 'modBlog',
  'fields' => 
  array (
    'blog_settings' => NULL,
  ),
  'fieldMeta' => 
  array (
    'blog_settings' => 
    array (
      'dbtype' => 'mediumtext',
      'phptype' => 'json',
      'null' => true,
    ),
  ),
  'composites' => 
  array (
    'Posts' => 
    array (
      'class' => 'modBlogPost',
      'local' => 'id',
      'foreign' => 'blog',
      'cardinality' => 'many',
      'owner' => 'local',
    ),
  ),
);
