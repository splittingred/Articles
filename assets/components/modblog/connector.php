<?php
/**
 * modBlog Connector
 *
 * @package modblog
 */
require_once dirname(dirname(dirname(dirname(__FILE__)))).'/config.core.php';
require_once MODX_CORE_PATH.'config/'.MODX_CONFIG_KEY.'.inc.php';
require_once MODX_CONNECTORS_PATH.'index.php';

$corePath = $modx->getOption('modblog.core_path',null,$modx->getOption('core_path').'components/modblog/');
require_once $corePath.'model/modblog/modblogservice.class.php';
$modx->mbs = new modBlogService($modx);

$modx->lexicon->load('modblog:default');

/* handle request */
$path = $modx->getOption('processorsPath',$modx->mbs->config,$corePath.'processors/');
$modx->request->handleRequest(array(
    'processors_path' => $path,
    'location' => '',
));