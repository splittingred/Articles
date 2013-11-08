<?php
/**
 * @package articles
 */
$xpdo_meta_map['ArticlesContainer']= array (
  'package' => 'articles',
  'version' => '1.1',
  'extends' => 'modResource',
  'fields' => 
  array (
  ),
  'fieldMeta' => 
  array (
  ),
  'composites' => 
  array (
    'Articles' => 
    array (
      'class' => 'Article',
      'local' => 'id',
      'foreign' => 'parent',
      'cardinality' => 'many',
      'owner' => 'local',
    ),
  ),
);
