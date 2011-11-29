<?php
/**
 * Articles
 *
 * Copyright 2011-12 by Shaun McCormick <shaun+articles@modx.com>
 *
 * Articles is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later
 * version.
 *
 * Articles is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Articles; if not, write to the Free Software Foundation, Inc., 59 Temple
 * Place, Suite 330, Boston, MA 02111-1307 USA
 *
 * @package articles
 */
/**
 * @var modX $modx
 * @var array $sources
 * @package articles
 * @subpackage build
 */
$chunks = array();

$chunks[1]= $modx->newObject('modChunk');
$chunks[1]->fromArray(array(
    'id' => 1,
    'name' => 'sample.ArticlesLatestPostTpl',
    'description' => 'The tpl row for the latest post. Duplicate this to override it.',
    'snippet' => file_get_contents($sources['chunks'].'articleslatestpost.chunk.tpl'),
));

$chunks[2]= $modx->newObject('modChunk');
$chunks[2]->fromArray(array(
    'id' => 2,
    'name' => 'sample.ArticleRowTpl',
    'description' => 'The tpl row for each post when listed on the main Articles Container page. Duplicate this to override it.',
    'snippet' => file_get_contents($sources['chunks'].'articlerow.chunk.tpl'),
));

$chunks[3]= $modx->newObject('modChunk');
$chunks[3]->fromArray(array(
    'id' => 3,
    'name' => 'sample.ArticlesRss',
    'description' => 'The tpl for the RSS feed. Duplicate this to override it.',
    'snippet' => file_get_contents($sources['chunks'].'articlesrss.chunk.tpl'),
));

$chunks[4]= $modx->newObject('modChunk');
$chunks[4]->fromArray(array(
    'id' => 4,
    'name' => 'sample.ArticlesRssItem',
    'description' => 'The tpl row for each RSS feed item. Duplicate this to override it.',
    'snippet' => file_get_contents($sources['chunks'].'articlesrssitem.chunk.tpl'),
));

return $chunks;