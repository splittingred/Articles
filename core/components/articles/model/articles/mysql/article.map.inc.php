<?php
/**
 * @package Articles
 */
$xpdo_meta_map['Article']= array (
  'package' => 'Articles',
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
