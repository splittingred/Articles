<?php
/**
 * @var modX $modx
 */
switch ($modx->event->name) {
    case 'OnManagerPageInit':
        $cssFile = $modx->getOption('modblog.assets_url',$modx->getOption('assets_url').'components/modblog/').'css/mgr.css';
        $modx->regClientCSS($cssFile);
        break;
}
return;