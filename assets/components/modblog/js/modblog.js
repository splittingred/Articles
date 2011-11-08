var modBlog = function(config) {
    config = config || {};
    modBlog.superclass.constructor.call(this,config);
};
Ext.extend(modBlog,Ext.Component,{
    page:{},window:{},grid:{},tree:{},panel:{},combo:{},config: {},view: {}
    ,connector_url: ''
});
Ext.reg('modBlog',modBlog);

modBlog = new modBlog();


modBlog.combo.PublishStatus = function(config) {
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
    modBlog.combo.PublishStatus.superclass.constructor.call(this,config);
};
Ext.extend(modBlog.combo.PublishStatus,MODx.combo.ComboBox);
Ext.reg('modblog-combo-publish-status',modBlog.combo.PublishStatus);
