<?php
/**
 * @package articles
 */
$xpdo_meta_map['ArticlesContainer']= array (
  'package' => 'Articles',
  'fields' => 
  array (
    'articles_container_settings' => NULL,
  ),
  'fieldMeta' => 
  array (
    'articles_container_settings' =>
    array (
      'dbtype' => 'mediumtext',
      'phptype' => 'json',
      'null' => true,
    ),
  ),
  'composites' => 
  array (
    'Articles' =>
    array (
      'class' => 'Article',
      'local' => 'id',
      'foreign' => 'articles_container',
      'cardinality' => 'many',
      'owner' => 'local',
    ),
  ),
);
