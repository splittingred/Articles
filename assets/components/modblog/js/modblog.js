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