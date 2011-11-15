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
 * @package modblog
 * @subpackage build
 */
$settings = array();
$settings['modblog.blog_ids']= $modx->newObject('modSystemSetting');
$settings['modblog.blog_ids']->fromArray(array(
    'key' => 'modblog.blog_ids',
    'value' => '',
    'xtype' => 'textfield',
    'namespace' => 'modblog',
    'area' => 'furls',
),'',true,true);
$settings['modblog.default_blog_template']= $modx->newObject('modSystemSetting');
$settings['modblog.default_blog_template']->fromArray(array(
    'key' => 'modblog.default_blog_template',
    'value' => 0,
    'xtype' => 'textfield',
    'namespace' => 'modblog',
    'area' => 'site',
),'',true,true);
$settings['modblog.default_blog_post_template']= $modx->newObject('modSystemSetting');
$settings['modblog.default_blog_post_template']->fromArray(array(
    'key' => 'modblog.default_blog_post_template',
    'value' => 0,
    'xtype' => 'textfield',
    'namespace' => 'modblog',
    'area' => 'site',
),'',true,true);


return $settings;