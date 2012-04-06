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
require_once $modx->getOption('manager_path',null,MODX_MANAGER_PATH).'controllers/default/resource/create.class.php';
/**
 * @package articles
 */
class ArticlesContainerCreateManagerController extends ResourceCreateManagerController {
    /** @var ArticlesContainer $resource */
    public $resource;
    public function loadCustomCssJs() {
        $this->prepareResource();
        $managerUrl = $this->context->getOption('manager_url', MODX_MANAGER_URL, $this->modx->_userConfig);
        $articlesAssetsUrl = $this->modx->getOption('articles.assets_url',null,$this->modx->getOption('assets_url',null,MODX_ASSETS_URL).'components/articles/');
        $connectorUrl = $articlesAssetsUrl.'connector.php';
        $articlesJsUrl = $articlesAssetsUrl.'js/';
        $this->resourceArray['articles_container_settings'] = $this->resource->getContainerSettings();
        $this->addJavascript($managerUrl.'assets/modext/util/datetime.js');
        $this->addJavascript($managerUrl.'assets/modext/widgets/element/modx.panel.tv.renders.js');
        $this->addJavascript($managerUrl.'assets/modext/widgets/resource/modx.grid.resource.security.js');
        $this->addJavascript($managerUrl.'assets/modext/widgets/resource/modx.panel.resource.tv.js');
        $this->addJavascript($managerUrl.'assets/modext/widgets/resource/modx.panel.resource.js');
        $this->addJavascript($managerUrl.'assets/modext/sections/resource/create.js');
        $this->addJavascript($articlesJsUrl.'articles.js');
        $this->addJavascript($articlesJsUrl.'container/container.common.js');
        $this->addJavascript($articlesJsUrl.'container/container.articles.grid.js');
        $this->addLastJavascript($articlesJsUrl.'container/create.js');
        $this->addHtml('
        <script type="text/javascript">
        // <![CDATA[
        Articles.assets_url = "'.$articlesAssetsUrl.'";
        Articles.connector_url = "'.$connectorUrl.'";
        MODx.config.publish_document = "'.$this->canPublish.'";
        MODx.onDocFormRender = "'.$this->onDocFormRender.'";
        MODx.ctx = "'.$this->resource->get('context_key').'";
        Ext.onReady(function() {
            MODx.load({
                xtype: "articles-page-articles-container-create"
                ,resource: "'.$this->resource->get('id').'"
                ,record: '.$this->modx->toJSON($this->resourceArray).'
                ,publish_document: "'.$this->canPublish.'"
                ,canSave: '.($this->canSave ? 1 : 0).'
                ,canEdit: '.($this->canEdit ? 1 : 0).'
                ,canCreate: '.($this->canCreate ? 1 : 0).'
                ,canDuplicate: '.($this->canDuplicate ? 1 : 0).'
                ,canDelete: '.($this->canDelete ? 1 : 0).'
                ,show_tvs: '.(!empty($this->tvCounts) ? 1 : 0).'
                ,mode: "create"
            });
        });
        // ]]>
        </script>');
        /* load RTE */
        $this->loadRichTextEditor();
    }
    public function getLanguageTopics() {
        return array('resource','articles:default');
    }

    /**
     * Used to set values on the resource record sent to the template for derivative classes
     *
     * @return void
     */
    public function prepareResource() {
        $settings = $this->resource->getProperties('articles');
        if (empty($settings)) $settings = array();
        
        $defaultContainerTemplate = $this->modx->getOption('articles.default_container_template',$settings,false);
        if (empty($defaultContainerTemplate)) {
            /** @var modTemplate $template */
            $template = $this->modx->getObject('modTemplate',array('templatename' => 'sample.ArticlesContainerTemplate'));
            if ($template) {
                $defaultContainerTemplate = $template->get('id');
            }
        }
        $this->resourceArray['template'] = $defaultContainerTemplate;

        $defaultArticleTemplate = $this->modx->getOption('articles.default_article_template',$settings,false);
        if (empty($defaultArticleTemplate)) {
            /** @var modTemplate $template */
            $template = $this->modx->getObject('modTemplate',array('templatename' => 'sample.ArticleTemplate'));
            if ($template) {
                $defaultArticleTemplate = $template->get('id');
            }
        }
        $this->resourceArray['setting_articleTemplate'] = $defaultArticleTemplate;

        foreach ($settings as $k => $v) {
            $this->resourceArray['setting_'.$k] = $v;
        }
    }
    /**
     * Return the pagetitle
     *
     * @return string
     */
    public function getPageTitle() {
        return $this->modx->lexicon('articles.container_new');
    }
}