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
 * Handles adding custom fields to modResource table
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
            $modx->addPackage('articles',$modelPath);

            /** @var xPDOManager $manager */
            $manager = $modx->getManager();

            /** @var modSystemSetting $setting */
            $setting = $modx->getObject('modSystemSetting',array('key' => 'articles.properties_migration'));
            if (!$setting || $setting->get('value') == false) {
                $c = $modx->newQuery('ArticlesContainer');
                $c->select(array(
                    'id',
                    'articles_container_settings',
                ));
                $c->where(array(
                    'class_key' => 'ArticlesContainer',
                ));
                $c->construct();
                $sql = $c->toSql();
                $stmt = $modx->query($sql);
                if ($stmt) {
                    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $settings = $row['articles_container_settings'];
                        $settings = is_array($settings) ? $settings : $modx->fromJSON($settings);
                        $settings = !empty($settings) ? $settings : array();
                        /** @var modResource $resource */
                        $resource = $modx->getObject('modResource',$row['id']);
                        if ($resource) {
                            $resource->setProperties($settings,'articles');
                            $resource->save();
                        }
                    }
                    $stmt->closeCursor();
                }
                $manager->removeField('Article','articles_container');
                $manager->removeField('Article','articles_container_settings');
                if (!$setting) {
                    $setting = $modx->newObject('modSystemSetting');
                    $setting->set('key','articles.properties_migration');
                    $setting->set('xtype','combo-boolean');
                    $setting->set('namespace','articles');
                    $setting->set('area','system');
                }
                $setting->set('value',true);
                $setting->save();
            }
            break;
    }
}
return true;