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
 */
switch ($modx->event->name) {
    case 'OnManagerPageInit':
        $cssFile = $modx->getOption('modblog.assets_url',$modx->getOption('assets_url').'components/modblog/').'css/mgr.css';
        $modx->regClientCSS($cssFile);
        break;
    case 'OnPageNotFound':
        $corePath = $modx->getOption('modblog.core_path',null,$modx->getOption('core_path').'components/modblog/');
        require_once $corePath.'model/modblog/modblogrouter.class.php';
        $router = new modBlogRouter($modx);
        $router->route();
        return;

}
return;