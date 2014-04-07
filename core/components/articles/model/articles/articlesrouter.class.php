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
class ArticlesRouter {
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
     * Route the URL request based on the container IDs
     * @return boolean
     */
    public function route() {
        $containerIds = $this->modx->getOption('articles.container_ids',null,'');
        if (empty($containerIds)) return false;
        $containerIds = explode(',',$containerIds);

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
        foreach ($containerIds as $archive) {
	        if (empty($archive)) continue;
            $archive = explode(':',$archive);
            $archiveId = $archive[0];

            if (method_exists($this->modx->context, 'getResourceURI')) {
                 $alias = $this->modx->context->getResourceURI($archiveId);
             } else {
                 $alias = is_array($this->modx->aliasMap) ? array_search($archiveId, $this->modx->aliasMap) : '';
             }
            if ($alias && $startPageId == $archiveId) {
                $startPageResId = $archiveId;
                if (isset($archive[1])) $startPagePrefix = $archive[1];
            }
            if ($alias && strpos($search, $alias) === 0) {
                $search = substr($search, strlen($alias));
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
            $_REQUEST[$prefix.'author'] = $_GET['tag'] = urldecode($params[1]);
        /* author based */
        } else if ($params[0] == 'user' || $params[0] == 'author') {
            $_REQUEST[$prefix.'author'] = $_GET[$prefix.'author'] = urldecode($params[1]);

        /* numeric "archives/1234" */
        } else if ($params[0] == 'archives' && !empty($params[1])) {
            $resourceId = intval(trim(trim($params[1]),'/'));
            if (!empty($resourceId)) {
                $this->modx->sendForward($resourceId);
            }

        /* normal yyyy/mm/dd or yyyy/mm */
        } else {
            /* set Archivist parameters for date-based archives */

             if(is_numeric($params[0])) {
                 $_REQUEST[$prefix.'year'] = $_GET[$prefix.'year'] = $params[0];
                 if (isset($params[1]) && is_numeric($params[1])) {
                     $_REQUEST[$prefix.'month'] = $_GET[$prefix.'month'] = $params[1];
                 } else if(isset($params[1])) {
                     // Display the default 404 page if "month" is not a number
                     $this->modx->sendForward($this->modx->getOption('error_page'), 'HTTP/1.1 404 Not Found');
                 }
                 if (isset($params[2]) && is_numeric($params[2])) {
                     $_REQUEST[$prefix.'day'] = $_GET[$prefix.'day'] = $params[2];
                 } else if(isset($params[2])) {
                     // Display the default 404 page if "day" is not a number
                     $this->modx->sendForward($this->modx->getOption('error_page'), 'HTTP/1.1 404 Not Found');

                 }
             } else {
                // Display the default 404 page if nothing found
                $this->modx->sendForward($this->modx->getOption('error_page'), 'HTTP/1.1 404 Not Found');
             }

        }

        /* forward */
        $this->modx->sendForward($resourceId);
        return true;
    }
}
