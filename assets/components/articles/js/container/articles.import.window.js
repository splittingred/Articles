
Articles.window.ArticlesImport = function(config) {
    config = config || {};
    this.ident = config.ident || 'arimp'+Ext.id();
    Ext.applyIf(config,{
        title: _('articles.articles_import')
        ,id: this.ident
        ,height: 150
        ,width: 600
        ,url: Articles.connector_url
        ,action: 'container/import'
        ,fileUpload: true
        ,fields: [{
            xtype: 'hidden'
            ,name: 'id'
            ,value: MODx.request.id
        },{
            xtype: 'combo'
            ,store: [['WordPress','WordPress']]
            ,name: 'service'
            ,hiddenName: 'service'
            ,fieldLabel: _('articles.import_service')
            ,forceSelection: true
            ,editable: false
            ,triggerAction: 'all'
            ,id: this.ident+'-service'
            ,value: 'WordPress'
            ,anchor: '100%'
        },{
            xtype: MODx.expandHelp ? 'label' : 'hidden'
            ,forId: this.ident+'-service'
            ,html: _('articles.import_service_desc')
            ,cls: 'desc-under'

        },{
            xtype: 'textfield'
            ,inputType: 'file'
            ,name: 'file'
            ,fieldLabel: _('articles.import_wp_file')
            ,anchor: '98%'
        },{
            xtype: MODx.expandHelp ? 'label' : 'hidden'
            ,forId: this.ident+'-file'
            ,html: _('articles.import_wp_file_desc')
            ,cls: 'desc-under'

        }]
    });
    Articles.window.ArticlesImport.superclass.constructor.call(this,config);
};
Ext.extend(Articles.window.ArticlesImport,MODx.Window);
Ext.reg('articles-window-import',Articles.window.ArticlesImport);