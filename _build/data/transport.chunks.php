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
$chunks = array();

$chunks[1]= $modx->newObject('modChunk');
$chunks[1]->fromArray(array(
    'id' => 1,
    'name' => 'modBlogLatestPostTpl',
    'description' => 'The tpl row for the latest post. Duplicate this to override it.',
    'snippet' => file_get_contents($sources['chunks'].'modbloglatestpost.chunk.tpl'),
));

$chunks[2]= $modx->newObject('modChunk');
$chunks[2]->fromArray(array(
    'id' => 2,
    'name' => 'modBlogPostRowTpl',
    'description' => 'The tpl row for each post when listed on the main blog page. Duplicate this to override it.',
    'snippet' => file_get_contents($sources['chunks'].'modblogpostrow.chunk.tpl'),
));

$chunks[3]= $modx->newObject('modChunk');
$chunks[3]->fromArray(array(
    'id' => 3,
    'name' => 'modBlogRss',
    'description' => 'The tpl for the RSS feed. Duplicate this to override it.',
    'snippet' => file_get_contents($sources['chunks'].'modblogrss.chunk.tpl'),
));

$chunks[4]= $modx->newObject('modChunk');
$chunks[4]->fromArray(array(
    'id' => 4,
    'name' => 'modBlogRssItem',
    'description' => 'The tpl row for each RSS feed item. Duplicate this to override it.',
    'snippet' => file_get_contents($sources['chunks'].'modblogrssitem.chunk.tpl'),
));

return $chunks;