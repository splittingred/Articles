<?php
/**
 * @package Articles
 */
$xpdo_meta_map['ArticlesContainer']= array (
  'package' => 'Articles',
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
