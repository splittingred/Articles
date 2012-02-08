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
class ArticleCreateManagerController extends ResourceCreateManagerController {

    public function loadCustomCssJs() {
        $articlesAssetsUrl = $this->modx->getOption('articles.assets_url',null,$this->modx->getOption('assets_url',null,MODX_ASSETS_URL).'components/articles/');
        $connectorUrl = $articlesAssetsUrl.'connector.php';
        $articlesJsUrl = $articlesAssetsUrl.'js/';
        $mgrUrl = $this->modx->getOption('manager_url',null,MODX_MANAGER_URL);
        $this->addJavascript($mgrUrl.'assets/modext/util/datetime.js');
        $this->addJavascript($mgrUrl.'assets/modext/widgets/element/modx.panel.tv.renders.js');
        $this->addJavascript($mgrUrl.'assets/modext/widgets/resource/modx.grid.resource.security.js');
        $this->addJavascript($mgrUrl.'assets/modext/widgets/resource/modx.panel.resource.tv.js');
        $this->addJavascript($mgrUrl.'assets/modext/widgets/resource/modx.panel.resource.js');
        $this->addJavascript($mgrUrl.'assets/modext/sections/resource/create.js');
        $this->addJavascript($articlesJsUrl.'articles.js');
        $this->addLastJavascript($articlesJsUrl.'article/create.js');
        $this->addHtml('
        <script type="text/javascript">
        // <![CDATA[
        Articles.assets_url = "'.$articlesAssetsUrl.'";
        Articles.connector_url = "'.$connectorUrl.'";
        MODx.config.publish_document = "'.$this->canPublish.'";
        MODx.onDocFormRender = "'.$this->onDocFormRender.'";
        MODx.ctx = "'.$this->ctx.'";
        Ext.onReady(function() {
            MODx.load({
                xtype: "articles-page-article-create"
                ,record: '.$this->modx->toJSON($this->resourceArray).'
                ,publish_document: "'.$this->canPublish.'"
                ,canSave: "'.($this->modx->hasPermission('save_document') ? 1 : 0).'"
                ,show_tvs: '.(!empty($this->tvCounts) ? 1 : 0).'
                ,mode: "create"
            });
        });
        // ]]>
        </script>');
        /* load RTE */
        if (!empty($this->resourceArray['richtext'])) {
            $this->loadRichTextEditor();
        }
    }

    public function getLanguageTopics() {
        return array('resource','articles:default');
    }


    public function process(array $scriptProperties = array()) {
        $placeholders = parent::process($scriptProperties);
        $this->resourceArray['published'] = 0;
        $this->getDefaultContainerSettings();
        return $placeholders;
    }

    public function getDefaultContainerSettings() {
        /** @var ArticlesContainer $container */
        $container = $this->modx->getObject('ArticlesContainer',array(
            'id' => $this->parent->get('id'),
        ));
        if ($container) {
            $settings = $container->getProperties('articles');
            $this->resourceArray['template'] = $this->modx->getOption('articleTemplate',$settings,0);
            $this->resourceArray['richtext'] = $this->modx->getOption('articlesRichtext',$settings,1);
        }
    }
}