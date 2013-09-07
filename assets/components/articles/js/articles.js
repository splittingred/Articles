var Articles = function(config) {
    config = config || {};
    Articles.superclass.constructor.call(this,config);
};
Ext.extend(Articles,Ext.Component,{
    page:{},window:{},grid:{},tree:{},panel:{},combo:{},config: {},view: {},extra: {}
    ,connector_url: ''
});
Ext.reg('Articles',Articles);

Articles = new Articles();


Articles.combo.PublishStatus = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        store: [[1,_('published')],[0,_('unpublished')]]
        ,name: 'published'
        ,hiddenName: 'published'
        ,triggerAction: 'all'
        ,editable: false
        ,selectOnFocus: false
        ,preventRender: true
        ,forceSelection: true
        ,enableKeyEvents: true
    });
    Articles.combo.PublishStatus.superclass.constructor.call(this,config);
};
Ext.extend(Articles.combo.PublishStatus,MODx.combo.ComboBox);
Ext.reg('articles-combo-publish-status',Articles.combo.PublishStatus);

Articles.combo.FilterStatus = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        store: [['',_('articles.all')],['published',_('published')],['unpublished',_('unpublished')],['deleted',_('deleted')]]
        ,name: 'filter'
        ,hiddenName: 'filter'
        ,triggerAction: 'all'
        ,editable: false
        ,selectOnFocus: false
        ,preventRender: true
        ,forceSelection: true
        ,enableKeyEvents: true
        ,emptyText: _('articles.filter_ellipsis')
    });
    Articles.combo.FilterStatus.superclass.constructor.call(this,config);
};
Ext.extend(Articles.combo.FilterStatus,MODx.combo.ComboBox);
Ext.reg('articles-combo-filter-status',Articles.combo.FilterStatus);

Articles.PanelSpacer = { html: '<br />' ,border: false, cls: 'articles-panel-spacer' };