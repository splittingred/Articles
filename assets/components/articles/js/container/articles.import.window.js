
Articles.window.ArticlesImport = function(config) {
    config = config || {};
    this.ident = config.ident || 'arimp'+Ext.id();
    Ext.applyIf(config,{
        title: _('articles.articles_import')
        ,id: this.ident
        // ,height: 150
        // ,width: '75%'
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
            ,store: [['MODX','MODX'],['WordPress','WordPress'],['Blogger','Blogger']]
            ,name: 'service'
            ,hiddenName: 'service'
            ,fieldLabel: _('articles.import_service')
            ,forceSelection: true
            ,editable: false
            ,triggerAction: 'all'
            ,id: this.ident+'-service'
            ,value: 'MODX'
            ,anchor: '100%'
            ,listeners: {
                'select':{fn:this.changeService,scope:this}
            }
        },{
            xtype: MODx.expandHelp ? 'label' : 'hidden'
            ,forId: this.ident+'-service'
            ,html: _('articles.import_service_desc')
            ,cls: 'desc-under'

        },{
            xtype: 'articles-panel-import-MODX'
        },{
            xtype: 'articles-panel-import-WordPress'
            ,hidden: true
        },{
            xtype: 'articles-panel-import-Blogger'
            ,hidden: true
        }]
    });
    Articles.window.ArticlesImport.superclass.constructor.call(this,config);
    this.on('activate',function() {
        Ext.getCmp(this.activeOptions).hide();
        Ext.getCmp('articles-options-MODX').show();
        this.activeOptions = 'articles-options-MODX';
    },this);
};
Ext.extend(Articles.window.ArticlesImport,MODx.Window,{
    activeOptions: 'articles-options-MODX'
    ,changeService: function(cb,s) {
        var nv = cb.getValue();
        var op = Ext.getCmp(this.activeOptions);

        var nop = 'articles-options-'+nv;
        var p = Ext.getCmp(nop);
        if (p) {
            op.hide();
            p.show();
            this.activeOptions = nop;
        }
        return true;
    }
});
Ext.reg('articles-window-import',Articles.window.ArticlesImport);

Articles.panel.ImportOptionsWordPress = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'articles-options-WordPress'
        ,xtype: 'fieldset'
        ,title: _('articles.import_options')
        ,defaults: {
            msgTarget: 'under'
        }
        ,items: [{
            xtype: (MODx.config.connector_url) ? 'fileuploadfield' : 'textfield' // check for 2.3
            ,buttonText: _('upload.buttons.upload')
            ,name: 'wp-file'
            ,fieldLabel: _('articles.import_wp_file')
            ,inputType: (MODx.config.connector_url) ? 'text' : 'file' // check for 2.3
            ,id: this.ident+'-wp-file'
            ,anchor: (MODx.config.connector_url) ? '100%' : '98%' // check for 2.3
        },{
            xtype: MODx.expandHelp ? 'label' : 'hidden'
            ,forId: this.ident+'-wp-file'
            ,html: _('articles.import_wp_file_desc')
            ,cls: 'desc-under'
        },{
            xtype: 'textfield'
            ,name: 'wp-file-server'
            ,fieldLabel: _('articles.import_wp_file_server')
            ,description: MODx.expandHelp ? '' : _('articles.import_wp_file_server')
            ,id: this.ident+'-wp-file-server'
            ,anchor: (MODx.config.connector_url) ? '100%' : '98%' // check for 2.3
            ,value: '{core_path}import/'
        },{
            xtype: MODx.expandHelp ? 'label' : 'hidden'
            ,forId: this.ident+'-wp-file-server'
            ,html: _('articles.import_wp_file_server_desc')
            ,cls: 'desc-under'
        }]
    });
    Articles.panel.ImportOptionsWordPress.superclass.constructor.call(this,config);
};
Ext.extend(Articles.panel.ImportOptionsWordPress,Ext.form.FieldSet);
Ext.reg('articles-panel-import-WordPress',Articles.panel.ImportOptionsWordPress);


Articles.panel.ImportOptionsMODX = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'articles-options-MODX'
        ,title: _('articles.import_options')
        ,defaults: {
            msgTarget: 'under'
        }
        ,items: [{
            html: '<p>'+_('articles.import_modx_intro')+'</p>'
            ,bodyCssClass: 'articles-import-intro'
            ,border: false
        },{
            layout: 'column'
            ,border: false
            ,defaults: {
                layout: 'form'
                ,labelAlign: 'top'
                ,anchor: '100%'
                ,border: false
                ,labelSeparator: ''
            }
            ,items: [{
                columnWidth: .5
                ,items: [{
                    xtype: 'textfield'
                    ,fieldLabel: _('articles.import_modx_parents')
                    ,description: MODx.expandHelp ? '' : _('articles.import_modx_parents_desc')
                    ,name: 'modx-parents'
                    ,id: this.ident+'-modx-parents'
                    ,value: ''
                    ,anchor: '100%'
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: this.ident+'-modx-parents'
                    ,html: _('articles.import_modx_parents_desc')
                    ,cls: 'desc-under'
                },{
                    xtype: 'textfield'
                    ,fieldLabel: _('articles.import_modx_resources')
                    ,description: MODx.expandHelp ? '' : _('articles.import_modx_resources_desc')
                    ,name: 'modx-resources'
                    ,id: this.ident+'-modx-resources'
                    ,value: ''
                    ,anchor: '100%'
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: this.ident+'-modx-resources'
                    ,html: _('articles.import_modx_resources_desc')
                    ,cls: 'desc-under'
                },{
                    xtype: 'textfield'
                    ,fieldLabel: _('articles.import_modx_tagsField')
                    ,description: MODx.expandHelp ? '' : _('articles.import_modx_tagsField_desc')
                    ,name: 'modx-tagsField'
                    ,id: this.ident+'-modx-tagsField'
                    ,value: 'tv.tags'
                    ,anchor: '100%'
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: this.ident+'-modx-tagsField'
                    ,html: _('articles.import_modx_tagsField_desc')
                    ,cls: 'desc-under'
                }]
            },{
                columnWidth: .5
                ,items: [{
                    xtype: 'modx-combo-template'
                    ,fieldLabel: _('articles.import_modx_template')
                    ,description: MODx.expandHelp ? '' : _('articles.import_modx_template_desc')
                    ,name: 'modx-template'
                    ,hiddenName: 'modx-template'
                    ,id: this.ident+'-modx-template'
                    ,value: ''
                    ,anchor: '100%'
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: this.ident+'-modx-template'
                    ,html: _('articles.import_modx_template_desc')
                    ,cls: 'desc-under'
                },{
                    xtype: 'textfield'
                    ,fieldLabel: _('articles.import_modx_commentsThreadNameFormat')
                    ,description: MODx.expandHelp ? '' : _('articles.import_modx_commentsThreadNameFormat_desc')
                    ,name: 'modx-commentsThreadNameFormat'
                    ,id: this.ident+'-modx-commentsThreadNameFormat'
                    ,value: 'blog-post-[[*id]]'
                    ,anchor: '100%'
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: this.ident+'-modx-commentsThreadNameFormat'
                    ,html: _('articles.import_modx_commentsThreadNameFormat_desc')
                    ,cls: 'desc-under'
                },{
                    xtype: 'checkbox'
                    ,boxLabel: _('articles.import_modx_hidemenu')
                    ,description: MODx.expandHelp ? '' : _('articles.import_modx_hidemenu_desc')
                    ,name: 'modx-hidemenu'
                    ,id: this.ident+'-modx-hidemenu'
                    ,inputValue: 1
                    ,checked: false
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: this.ident+'-modx-hidemenu'
                    ,html: _('articles.import_modx_hidemenu_desc')
                    ,cls: 'desc-under'
                },{
                    xtype: 'checkbox'
                    ,boxLabel: _('articles.import_modx_unpublished')
                    ,description: MODx.expandHelp ? '' : _('articles.import_modx_unpublished_desc')
                    ,name: 'modx-unpublished'
                    ,id: this.ident+'-modx-unpublished'
                    ,inputValue: 1
                    ,checked: true
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: this.ident+'-modx-unpublished'
                    ,html: _('articles.import_modx_unpublished_desc')
                    ,cls: 'desc-under'
                },{
                    xtype: 'checkbox'
                    ,boxLabel: _('articles.import_modx_change_template')
                    ,description: MODx.expandHelp ? '' : _('articles.import_modx_change_template_desc')
                    ,name: 'modx-change-template'
                    ,id: this.ident+'-modx-change-template'
                    ,inputValue: 1
                    ,checked: true
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: this.ident+'-modx-change-template'
                    ,html: _('articles.import_modx_change_template_desc')
                    ,cls: 'desc-under'
                }]
            }]
        }]
    });
    Articles.panel.ImportOptionsMODX.superclass.constructor.call(this,config);
};
Ext.extend(Articles.panel.ImportOptionsMODX,Ext.form.FieldSet);
Ext.reg('articles-panel-import-MODX',Articles.panel.ImportOptionsMODX);

Articles.panel.ImportOptionsBlogger = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'articles-options-Blogger'
        ,xtype: 'fieldset'
        ,title: _('articles.import_options')
        ,defaults: {
            msgTarget: 'under'
        }
        ,items: [{
            xtype: (MODx.config.connector_url) ? 'fileuploadfield' : 'textfield' // check for 2.3
            ,buttonText: _('upload.buttons.upload')
            ,name: 'blogger-file'
            ,fieldLabel: _('articles.import_blogger_file')
            ,inputType: (MODx.config.connector_url) ? 'text' : 'file' // check for 2.3
            ,id: this.ident+'-blogger-file'
            ,anchor: (MODx.config.connector_url) ? '100%' : '98%' // check for 2.3
        },{
            xtype: MODx.expandHelp ? 'label' : 'hidden'
            ,forId: this.ident+'-blogger-file'
            ,html: _('articles.import_blogger_file_desc')
            ,cls: 'desc-under'
        },{
            xtype: 'textfield'
            ,name: 'blogger-file-server'
            ,fieldLabel: _('articles.import_blogger_file_server')
            ,description: MODx.expandHelp ? '' : _('articles.import_blogger_file_server')
            ,id: this.ident+'-blogger-file-server'
            ,anchor: (MODx.config.connector_url) ? '100%' : '98%' // check for 2.3
            ,value: '{core_path}import/'
        },{
            xtype: MODx.expandHelp ? 'label' : 'hidden'
            ,forId: this.ident+'-blogger-file-server'
            ,html: _('articles.import_blogger_file_server_desc')
            ,cls: 'desc-under'
        }]
    });
    Articles.panel.ImportOptionsBlogger.superclass.constructor.call(this,config);
};
Ext.extend(Articles.panel.ImportOptionsBlogger,Ext.form.FieldSet);
Ext.reg('articles-panel-import-Blogger',Articles.panel.ImportOptionsBlogger);