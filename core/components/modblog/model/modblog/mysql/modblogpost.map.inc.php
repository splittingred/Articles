<?php
/**
 * @package modBlog
 */
$xpdo_meta_map['modBlogPost']= array (
  'package' => 'modBlog',
  'fields' => 
  array (
    'blog' => 0,
  ),
  'fieldMeta' => 
  array (
    'blog' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'phptype' => 'integer',
      'null' => false,
      'default' => 0,
      'index' => 'index',
    ),
  ),
  'indexes' => 
  array (
    'blog' => 
    array (
      'alias' => 'blog',
      'primary' => false,
      'unique' => false,
      'type' => 'BTREE',
      'columns' => 
      array (
        'blog' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
  ),
  'aggregates' => 
  array (
    'Blog' => 
    array (
      'class' => 'modBlog',
      'local' => 'blog',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
  ),
);
