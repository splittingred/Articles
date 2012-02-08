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
 * Displays a list of posts for a container
 *
 * @var modX $modx
 * @var array $scriptProperties
 *
 * @package articles
 */
$modx->lexicon->load('articles:frontend');

$container = $modx->getOption('container',$scriptProperties,0);
if (empty($container)) return '';
/** @var ArticlesContainer $container */
$container = $modx->getObject('ArticlesContainer',$container);
if (empty($container)) return '';

$placeholderPrefix = $modx->getOption('placeholderPrefix',$scriptProperties,'');

$container->getPostListingCall($placeholderPrefix);
$container->getArchivistCall($placeholderPrefix);
$container->getTagListerCall($placeholderPrefix);
$container->getLatestPostsCall($placeholderPrefix);
$settings = $container->getContainerSettings();
if ($modx->getOption('commentsEnabled',$settings,true)) {
    $container->getLatestCommentsCall($placeholderPrefix);
    $modx->setPlaceholder($placeholderPrefix.'comments_enabled',1);
} else {
    $modx->setPlaceholder($placeholderPrefix.'comments_enabled',0);
}
return '';