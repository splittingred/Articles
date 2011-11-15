<?php
/**
 * modBlog
 *
 * Copyright 2011-12 by Shaun McCormick <shaun+modblog@modx.com>
 *
 * modBlog is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later
 * version.
 *
 * modBlog is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * modBlog; if not, write to the Free Software Foundation, Inc., 59 Temple
 * Place, Suite 330, Boston, MA 02111-1307 USA
 *
 * @package modblog
 */
/**
 * @var modX $modx
 * @var array $sources
 * @package modblog
 * @subpackage build
 */
$templates = array();

$templates[1]= $modx->newObject('modTemplate');
$templates[1]->fromArray(array(
    'id' => 1,
    'templatename' => 'modBlogTemplate',
    'description' => 'The default Template for the blog. Duplicate this to override it.',
    'content' => file_get_contents($sources['templates'].'modblogtemplate.tpl'),
));

$templates[2]= $modx->newObject('modTemplate');
$templates[2]->fromArray(array(
    'id' => 2,
    'templatename' => 'modBlogPostTemplate',
    'description' => 'The default Template for Blog Posts. Duplicate this to override it.',
    'content' => file_get_contents($sources['templates'].'modblogposttemplate.tpl'),
));

return $templates;