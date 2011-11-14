<?php
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