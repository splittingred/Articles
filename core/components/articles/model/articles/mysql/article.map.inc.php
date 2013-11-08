<?php
/**
 * @package articles
 */
$xpdo_meta_map['Article']= array (
  'package' => 'articles',
  'version' => '1.1',
  'extends' => 'modResource',
  'fields' => 
  array (
  ),
  'fieldMeta' => 
  array (
  ),
  'aggregates' => 
  array (
    'Container' => 
    array (
      'class' => 'ArticlesContainer',
      'local' => 'parent',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
  ),
);
