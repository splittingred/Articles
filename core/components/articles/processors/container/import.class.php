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
 * @package articles
 * @subpackage processors
 */
class ContainerImportProcessor extends modObjectProcessor {
    public $classKey = 'Article';
    public $objectType = 'article';
    public $languageTopics = array('resource','articles:default');
    /** @var Article $object */
    public $object;
    /** @var ArticlesImport $service */
    public $service;

    public function initialize() {
        $initialized = parent::initialize();
        $id = $this->getProperty('id',null);
        if (empty($id)) { return $this->modx->lexicon('articles.container_err_ns'); }
        $this->object = $this->modx->getObject('ArticlesContainer',$id);
        if (empty($this->object)) return $this->modx->lexicon('articles.container_err_nf');
        return $initialized;
    }

    /**
     * Import data into Articles
     * {@inheritDoc}
     * @return array|string
     */
    public function process() {
        $this->getImportService();
        if (empty($this->service)) {
            return $this->failure('[Articles] Could not load import service!');
        }

        $success = $this->service->import();

        if ($success) {
            $this->clearCache();
            return $this->success();
        } else {
            return $this->failure();
        }
    }

    /**
     * Get the specified import service
     * @return ArticlesImport
     */
    public function getImportService() {
        $serviceName = $this->getProperty('service','WordPress');

        $modelPath = $this->modx->getOption('articles.core_path',null,$this->modx->getOption('core_path').'components/articles/').'model/articles/';
        $servicePath = $modelPath.'import/articlesimport'.strtolower($serviceName).'.class.php';
        if (file_exists($servicePath)) {
            require_once $servicePath;
            $className = 'ArticlesImport'.$serviceName;
            $this->service = new $className($this->modx->articles,$this,$this->getProperties());
        }

        return $this->service;
    }

    /**
     * Clear the site cache to properly refresh the URIs
     */
    public function clearCache() {
        $this->modx->cacheManager->refresh(array(
            'db' => array(),
            'auto_publish' => array('contexts' => array($this->object->get('context_key'))),
            'context_settings' => array('contexts' => array($this->object->get('context_key'))),
            'resource' => array('contexts' => array($this->object->get('context_key'))),
        ));
    }
}
return 'ContainerImportProcessor';