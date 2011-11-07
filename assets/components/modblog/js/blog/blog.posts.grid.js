modBlog.grid.BlogPosts = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'modblog-grid-blog-posts'
        ,title: _('modblog.posts')
        ,url: modBlog.connector_url
        ,baseParams: {
            action: 'post/getList'
            ,'parent': config.resource
        }
        ,saveParams: {
            resource: config.resource
        }
        ,fields: ['id','pagetitle','publishedon']
        ,paging: true
        ,remoteSort: true
        ,columns: [{
            header: _('modblog.post_title')
            ,dataIndex: 'pagetitle'
            ,width: 200
            ,sortable: true
        },{
            header: _('modblog.publishedon')
            ,dataIndex: 'publishedon'
            ,width: 200
            ,sortable: true
        }]
    });
    modBlog.grid.BlogPosts.superclass.constructor.call(this,config);
    this.on('rowclick',MODx.fireResourceFormChange);
};
Ext.extend(modBlog.grid.BlogPosts,MODx.grid.Grid);
Ext.reg('modblog-grid-blog-posts',modBlog.grid.BlogPosts);