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
 * @var array $scriptProperties
 */
switch ($modx->event->name) {
    case 'OnManagerPageInit':
        $cssFile = $modx->getOption('articles.assets_url',null,$modx->getOption('assets_url').'components/articles/').'css/mgr.css';
        $modx->regClientCSS($cssFile);
        break;
    case 'OnPageNotFound':
        $corePath = $modx->getOption('articles.core_path',null,$modx->getOption('core_path').'components/articles/');
        require_once $corePath.'model/articles/articlesrouter.class.php';
        $router = new ArticlesRouter($modx);
        $router->route();
        return;
    case 'OnDocPublished':
        /** @var Article $resource */
        $resource =& $scriptProperties['resource'];
        if ($resource instanceof Article) {
            $resource->setArchiveUri();
            $resource->save();
            $modx->cacheManager->refresh(array(
                'db' => array(),
                'auto_publish' => array('contexts' => array($resource->get('context_key'))),
                'context_settings' => array('contexts' => array($resource->get('context_key'))),
                'resource' => array('contexts' => array($resource->get('context_key'))),
            ));
            $resource->notifyUpdateServices();
            $resource->sendNotifications();
        }
        break;
    case 'OnDocUnPublished':
        $resource =& $scriptProperties['resource'];
        break;

}
return;