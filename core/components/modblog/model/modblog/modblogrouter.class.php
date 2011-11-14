<?php
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
