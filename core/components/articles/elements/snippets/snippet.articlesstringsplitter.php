<?php
/**
 * @var modX $modx
 * @var array $scriptProperties
 */
$string = $modx->getOption('string',$scriptProperties,'');
$delimiter = $modx->getOption('delimiter',$scriptProperties,',');
$tpl = $modx->getOption('tpl',$scriptProperties,'articlerssitem');
$outputSeparator = $modx->getOption('outputSeparator',$scriptProperties,"\n");
$outputSeparator = str_replace('\\n',"\n",$outputSeparator);
$toPlaceholder = $modx->getOption('toPlaceholder',$scriptProperties,'');

$items = explode($delimiter,$string);
$items = array_unique($items);
$list = array();
foreach ($items as $item) {
    $list[] = $modx->getChunk($tpl,array(
        'item' => $item,
    ));
}

$output = implode($outputSeparator,$list);
if (!empty($toPlaceholder)) {
    $modx->setPlaceholder($toPlaceholder,$output);
    return '';
}
return $output;