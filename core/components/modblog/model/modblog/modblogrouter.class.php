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
class modBlogRouter {
    /** @var modX $modx */
    public $modx;
    /** @var array $config */
    public $config = array();
    
    function __construct(modX &$modx,array $config = array()) {
        $this->modx =& $modx;
        $this->config = array_merge(array(

        ),$config);
    }

    /**
     * Route the URL request based on the blog IDs
     * @return boolean
     */
    public function route() {
        $blogIds = $this->modx->getOption('modblog.blog_ids',null,'');
        if (empty($blogIds)) return false;
        $blogIds = explode(',',$blogIds);

        /* handle redirects */
        $search = $_SERVER['REQUEST_URI'];
        $base_url = $this->modx->getOption('base_url');
        if ($base_url != '/') {
            $search = str_replace($base_url,'',$search);
        }
        $search = trim($search, '/');

        /* get resource to redirect to */
        $resourceId = false;
        $prefix = 'arc_';
        foreach ($blogIds as $archive) {
            $archive = explode(':',$archive);
            $archiveId = $archive[0];
            $alias = array_search($archiveId,$this->modx->aliasMap);
            if ($alias && strpos($search,$alias) !== false) {
                $search = str_replace($alias,'',$search);
                $resourceId = $archiveId;
                if (isset($archive[1])) $prefix = $archive[1];
            }
        }
        if (!$resourceId) return false;

        /* figure out archiving */
        $params = explode('/', $search);
        if (count($params) < 1) return false;

        /* tag handling! */
        if ($params[0] == 'tags') {
            $_REQUEST['tag'] = $params[1];
        } else if ($params[0] == 'user' || $params[0] == 'author') {
            $_REQUEST['arc_user'] = $params[1];
        } else {
            /* set Archivist parameters for date-based archives */
            $_REQUEST[$prefix.'year'] = $params[0];
            if (isset($params[1])) $_REQUEST[$prefix.'month'] = $params[1];
            if (isset($params[2])) $_REQUEST[$prefix.'day'] = $params[2];
        }

        /* forward */
        $this->modx->sendForward($resourceId);
        return true;
    }
}
