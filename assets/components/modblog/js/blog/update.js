
modBlog.page.UpdateBlog = function(config) {
    config = config || {record:{}};
    config.record = config.record || {};
    Ext.applyIf(config,{
        panelXType: 'modx-panel-blog'
    });
    config.canDuplicate = false;
    config.canDelete = false;
    modBlog.page.UpdateBlog.superclass.constructor.call(this,config);
};
Ext.extend(modBlog.page.UpdateBlog,MODx.page.UpdateResource,{

});
Ext.reg('modblog-page-blog-update',modBlog.page.UpdateBlog);



modBlog.panel.Blog = function(config) {
    config = config || {};
    modBlog.panel.Blog.superclass.constructor.call(this,config);
};
Ext.extend(modBlog.panel.Blog,MODx.panel.Resource,{
    getFields: function(config) {
        var it = [];
        it.push({
            title: _('modblog.blog')
            ,id: 'modx-resource-settings'
            ,cls: 'modx-resource-tab'
            ,layout: 'form'
            ,labelAlign: 'top'
            ,labelSeparator: ''
            ,bodyCssClass: 'tab-panel-wrapper main-wrapper'
            ,autoHeight: true
            ,defaults: {
                border: false
                ,msgTarget: 'side'
                ,width: 400
            }
            ,items: this.getMainFields(config)
        });
        it.push({
            title: _('modblog.settings')
            ,id: 'modx-blog-settings'
            ,cls: 'modx-resource-tab'
            ,layout: 'form'
            ,labelAlign: 'top'
            ,labelSeparator: ''
            ,bodyCssClass: 'tab-panel-wrapper main-wrapper'
            ,autoHeight: true
            ,defaults: {
                border: false
                ,msgTarget: 'side'
                ,width: 400
            }
            ,items: this.getBlogSettings(config)
        });
        it.push({
            title: _('modblog.comments')
            ,autoHeight: true
            ,items: [{
                html: _('modblog.comments.intro_msg')
                ,border: false
                ,bodyCssClass: 'panel-desc'
            },{
                xtype: 'panel'
                ,bodyCssClass: 'main-wrapper'
                ,autoHeight: true
                ,border: false
                ,items: [{
                    html: '<p>Comments grid goes here.</p>'
                    ,border: false
                }]
            }]
        });
        if (config.show_tvs && MODx.config.tvs_below_content != 1) {
            it.push(this.getTemplateVariablesPanel(config));
        }
        if (config.access_permissions) {
            it.push(this.getAccessPermissionsTab(config));
        }
        var its = [];
        its.push(this.getPageHeader(config),{
            id:'modx-resource-tabs'
            ,xtype: 'modx-tabs'
            ,forceLayout: true
            ,deferredRender: false
            ,collapsible: true
            ,itemId: 'tabs'
            ,items: it
        });
        var ct = this.getPosts(config);
        if (ct) {
            its.push({
                title: _('modblog.posts')
                ,id: 'modx-blog-posts'
                ,layout: 'form'
                ,bodyCssClass: 'main-wrapper'
                ,autoHeight: true
                ,collapsible: true
                ,hideMode: 'offsets'
                ,items: ct
                ,style: 'margin-top: 10px'
            });
        }
        if (MODx.config.tvs_below_content == 1) {
            var tvs = this.getTemplateVariablesPanel(config);
            tvs.style = 'margin-top: 10px';
            its.push(tvs);
        }
        return its;
    }
    ,getPosts: function(config) {
        return [{
            xtype: 'modblog-grid-blog-posts'
            ,resource: config.resource
            ,border: false
        }];
    }

    ,getBlogSettings: function(config) {
        return [{
            xtype: 'modx-combo-template'
            ,name: 'setting_post_template'
            ,hiddenName: 'setting_post_template'
            ,id: 'modblog-setting-post-template'
            ,fieldLabel: _('modblog.setting.post_template')
            ,description: MODx.expandHelp ? '' : _('modblog.setting.post_template_desc')
        },{
            xtype: 'label'
            ,forId: 'modblog-setting-post-template'
            ,html: _('modblog.setting.post_template_desc')
            ,cls: 'desc-under'
        }];
    }


    ,getMainLeftFields: function(config) {
        config = config || {record:{}};
        var flds = [{
            xtype: 'textfield'
            ,fieldLabel: _('modblog.blog_title')+'<span class="required">*</span>'
            ,description: '<b>[[*pagetitle]]</b><br />'+_('modblog.blog_title_help')
            ,name: 'pagetitle'
            ,id: 'modx-resource-pagetitle'
            ,maxLength: 255
            ,anchor: '100%'
            ,allowBlank: false
            ,enableKeyEvents: true
            ,listeners: {
                'keyup': {scope:this,fn:function(f,e) {
                    var titlePrefix = MODx.request.a == MODx.action['resource/create'] ? _('new_document') : _('document');
                    var title = Ext.util.Format.stripTags(f.getValue());
                    Ext.getCmp('modx-resource-header').getEl().update('<h2>'+title+'</h2>');
                }}
            }

        },{
            xtype: 'textarea'
            ,fieldLabel: _('modblog.blog_description')
            ,description: '<b>[[*description]]</b><br />'+_('modblog.blog_description_help')
            ,name: 'description'
            ,id: 'modx-resource-description'
            ,maxLength: 255
            ,anchor: '100%'
            ,value: config.record.description || ''

        }];

        /*flds.push({
            id: 'modx-content-above'
            ,border: false
        });*/
        var ct = this.getContentField(config);
        for (var f in ct) {
            flds.push(ct[f]);
        }
        return flds;
    }

    ,getContentField: function(config) {
        return [{
            id: 'modx-content-above'
            ,border: false
        },{
            xtype: 'textarea'
            ,name: 'ta'
            ,id: 'ta'
            ,fieldLabel: _('modblog.content')
            ,anchor: '100%'
            ,height: 300
            ,grow: false
            ,value: (config.record.content || config.record.ta) || ''
            ,border: false
        },{
            id: 'modx-content-below'
            ,border: false
        }];
    }



    ,getMainRightFields: function(config) {
        config = config || {};
        return [{
            xtype: 'modx-combo-template'
            ,fieldLabel: _('resource_template')
            ,description: '<b>[[*template]]</b><br />'+_('resource_template_help')
            ,name: 'template'
            ,id: 'modx-resource-template'
            ,anchor: '100%'
            ,editable: false
            ,baseParams: {
                action: 'getList'
                ,combo: '1'
            }
            ,listeners: {
                'select': {fn: this.templateWarning,scope: this}
            }
        },{
            xtype: 'textfield'
            ,fieldLabel: _('modblog.blog_alias')
            ,description: '<b>[[*alias]]</b><br />'+_('modblog.blog_alias_help')
            ,name: 'alias'
            ,id: 'modx-resource-alias'
            ,maxLength: 100
            ,anchor: '100%'
            ,value: config.record.alias || ''

        },{
            xtype: 'textfield'
            ,fieldLabel: _('resource_menutitle')
            ,description: '<b>[[*menutitle]]</b><br />'+_('resource_menutitle_help')
            ,name: 'menutitle'
            ,id: 'modx-resource-menutitle'
            ,maxLength: 255
            ,anchor: '100%'
            ,value: config.record.menutitle || ''

        },{
            xtype: 'textfield'
            ,fieldLabel: _('resource_link_attributes')
            ,description: '<b>[[*link_attributes]]</b><br />'+_('resource_link_attributes_help')
            ,name: 'link_attributes'
            ,id: 'modx-resource-link-attributes'
            ,maxLength: 255
            ,anchor: '100%'
            ,value: config.record.link_attributes || ''

        },{
            xtype: 'xcheckbox'
            ,boxLabel: _('resource_hide_from_menus')
            ,hideLabel: true
            ,description: '<b>[[*hidemenu]]</b><br />'+_('resource_hide_from_menus_help')
            ,name: 'hidemenu'
            ,id: 'modx-resource-hidemenu'
            ,inputValue: 1
            ,checked: parseInt(config.record.hidemenu) || false

        },{
            xtype: 'xcheckbox'
            ,boxLabel: _('resource_published')
            ,hideLabel: true
            ,description: '<b>[[*published]]</b><br />'+_('resource_published_help')
            ,name: 'published'
            ,id: 'modx-resource-published'
            ,inputValue: 1
            ,checked: parseInt(config.record.published)
        }]
    }


});
Ext.reg('modx-panel-blog',modBlog.panel.Blog);