<?php
/**
 * @package articles
 */
$xpdo_meta_map['Article']= array (
  'package' => 'Articles',
  'fields' => 
  array (
    'articles_container' => 0,
    'articles_container_settings' => NULL,
  ),
  'fieldMeta' => 
  array (
    'articles_container' =>
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'phptype' => 'integer',
      'null' => false,
      'default' => 0,
      'index' => 'index',
    ),
    'articles_container_settings' =>
    array (
      'dbtype' => 'mediumtext',
      'phptype' => 'json',
      'null' => true,
    ),
  ),
  'indexes' => 
  array (
    'articles_container' =>
    array (
      'alias' => 'articles_container',
      'primary' => false,
      'unique' => false,
      'type' => 'BTREE',
      'columns' => 
      array (
        'articles_container' =>
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
    'Container' =>
    array (
      'class' => 'ArticlesContainer',
      'local' => 'articles_container',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
  ),
);
