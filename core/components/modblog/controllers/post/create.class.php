<?php
require_once $modx->getOption('manager_path',null,MODX_MANAGER_PATH).'controllers/'.$modx->getOption('manager_theme',null,'default').'/resource/create.class.php';
/**
 * @package modblog
 */
class BlogPostCreateManagerController extends ResourceCreateManagerController {

    public function loadCustomCssJs() {
        $blogAssetsUrl = $this->modx->getOption('modblog.assets_url',$this->modx->getOption('assets_url',null,MODX_ASSETS_URL).'components/modblog/');
        $connectorUrl = $blogAssetsUrl.'connector.php';
        $blogJsUrl = $blogAssetsUrl.'js/';
        $mgrUrl = $this->modx->getOption('manager_url',null,MODX_MANAGER_URL);
        $this->addJavascript($mgrUrl.'assets/modext/util/datetime.js');
        $this->addJavascript($mgrUrl.'assets/modext/widgets/element/modx.panel.tv.renders.js');
        $this->addJavascript($mgrUrl.'assets/modext/widgets/resource/modx.grid.resource.security.js');
        $this->addJavascript($mgrUrl.'assets/modext/widgets/resource/modx.panel.resource.tv.js');
        $this->addJavascript($mgrUrl.'assets/modext/widgets/resource/modx.panel.resource.js');
        $this->addJavascript($mgrUrl.'assets/modext/sections/resource/create.js');
        $this->addJavascript($blogJsUrl.'modblog.js');
        $this->addLastJavascript($blogJsUrl.'post/create.js');
        $this->addHtml('
        <script type="text/javascript">
        // <![CDATA[
        modBlog.connector_url = "'.$connectorUrl.'";
        MODx.config.publish_document = "'.$this->canPublish.'";
        MODx.onDocFormRender = "'.$this->onDocFormRender.'";
        MODx.ctx = "'.$this->ctx.'";
        Ext.onReady(function() {
            MODx.load({
                xtype: "modblog-page-blog-post-create"
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
        $this->loadRichTextEditor();
    }

    public function getLanguageTopics() {
        return array('resource','modblog:default');
    }


    public function process(array $scriptProperties = array()) {
        $placeholders = parent::process($scriptProperties);
        $this->resourceArray['richtext'] = 1;
        $this->resourceArray['tags'] = 'blogs,fun,modx';
        $this->resourceArray['categories'] = 'Technology';

        $this->getDefaultBlogSettings();
        return $placeholders;
    }

    public function getDefaultBlogSettings() {
        /** @var modBlog $blog */
        $blog = $this->modx->getObject('modBlog',array(
            'id' => $this->parent->get('id'),
        ));
        if ($blog) {
            $settings = $blog->get('blog_settings');
            $this->resourceArray['template'] = $this->modx->getOption('post_template',$settings,0);
        }
    }
}