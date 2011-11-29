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
 * Handles adding Articles to Extension Packages
 *
 * @var xPDOObject $object
 * @var array $options
 * @package articles
 * @subpackage build
 */
if ($object->xpdo) {
    switch ($options[xPDOTransport::PACKAGE_ACTION]) {
        case xPDOTransport::ACTION_INSTALL:
        case xPDOTransport::ACTION_UPGRADE:
            /** @var modX $modx */
            $modx =& $object->xpdo;
            $modelPath = $modx->getOption('articles.core_path',null,$modx->getOption('core_path').'components/articles/').'model/';

            /** @var modTemplateVar $tv */
            $tv = $modx->getObject('modTemplateVar',array(
                'name' => 'articlestags',
            ));
            if ($tv) {
                $templates = array('sample.ArticlesContainerTemplate','sample.ArticleTemplate');
                foreach ($templates as $templateName) {
                    /** @var modTemplate $template */
                    $template = $modx->getObject('modTemplate',array('templatename' => $templateName));
                    if ($template) {
                        /** @var modTemplateVarTemplate $templateVarTemplate */
                        $templateVarTemplate = $modx->getObject('modTemplateVarTemplate',array(
                            'templateid' => $template->get('id'),
                            'tmplvarid' => $tv->get('id'),
                        ));
                        if (!$templateVarTemplate) {
                            $templateVarTemplate = $modx->newObject('modTemplateVarTemplate');
                            $templateVarTemplate->set('templateid',$template->get('id'));
                            $templateVarTemplate->set('tmplvarid',$tv->get('id'));
                            $templateVarTemplate->save();
                        }
                    }
                }
            }
            break;
    }
}
return true;