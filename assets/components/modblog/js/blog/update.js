
modBlog.page.UpdateBlog = function(config) {
    config = config || {record:{}};
    config.record = config.record || {};
    Ext.applyIf(config,{
        panelXType: 'modx-panel-blog'
        ,actions: {
            'new': MODx.action['resource/create']
            ,edit: MODx.action['resource/update']
            ,preview: MODx.action['resource/preview']
        }
    });
    config.canDuplicate = false;
    config.canDelete = false;
    modBlog.page.UpdateBlog.superclass.constructor.call(this,config);
};
Ext.extend(modBlog.page.UpdateBlog,MODx.page.UpdateResource);
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
            title: _('modblog.template')
            ,id: 'modx-blog-template'
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
            ,items: this.getTemplateSettings(config)
        });
        it.push({
            title: _('modblog.advanced_settings')
            ,id: 'modx-blog-advanced-settings'
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
                    xtype: 'quip-grid-comments'
                    ,cls: 'quip-thread-grid'
                    ,family: 'b'+config.record.id
                    ,preventRender: true
                    ,width: '98%'
                    ,bodyStyle: 'padding: 0'
                }]
            }]
        });
        if (config.show_tvs && MODx.config.tvs_below_content != 1) {
            it.push(this.getTemplateVariablesPanel(config));
        }
        if (MODx.perm.resourcegroup_resource_list == 1) {
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

    ,getTemplateSettings: function(config) {
        var flds = [];
        flds.push({
            xtype: 'modx-combo-template'
            ,fieldLabel: _('resource_template')
            ,description: MODx.expandHelp ? '' : '<b>[[*template]]</b><br />'+_('resource_template_help')
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
            xtype: MODx.expandHelp ? 'label' : 'hidden'
            ,forId: 'modx-resource-template'
            ,id: 'modx-resource-template-label'
            ,html: _('modblog.template_desc')
            ,cls: 'desc-under'
        });
        var ct = this.getContentField(config);
        for (var f in ct) {
            flds.push(ct[f]);
        }
        return [{
            layout: 'column'
            ,border: false
            ,anchor: '100%'
            ,defaults: {
                layout: 'form'
                ,labelAlign: 'top'
                ,anchor: '100%'
                ,border: false
                ,labelSeparator: ''
            }
            ,items: [{
                columnWidth: .5
                ,items: flds
            },{
                columnWidth: .5
                ,items: [{
                    xtype: 'modx-combo-template'
                    ,name: 'setting_postTemplate'
                    ,hiddenName: 'setting_postTemplate'
                    ,id: 'modblog-setting-postTemplate'
                    ,fieldLabel: _('modblog.setting.postTemplate')
                    ,description: MODx.expandHelp ? '' : _('modblog.setting.postTemplate_desc')
                    ,anchor: '100%'
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: 'modblog-setting-postTemplate'
                    ,html: _('modblog.setting.postTemplate_desc')
                    ,cls: 'desc-under'

                },{
                    xtype: 'textfield'
                    ,name: 'setting_tplPostRow'
                    ,id: 'modblog-setting-tplPostRow'
                    ,fieldLabel: _('modblog.setting.tplPostRow')
                    ,description: MODx.expandHelp ? '' : _('modblog.setting.tplPostRow_desc')
                    ,anchor: '100%'
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: 'modblog-setting-tplPostRow'
                    ,html: _('modblog.setting.tplPostRow_desc')
                    ,cls: 'desc-under'

                },{
                    xtype: 'numberfield'
                    ,name: 'setting_postsPerPage'
                    ,id: 'modblog-setting-postsPerPage'
                    ,fieldLabel: _('modblog.setting.postsPerPage')
                    ,description: MODx.expandHelp ? '' : _('modblog.setting.postsPerPage_desc')
                    ,allowNegative: false
                    ,allowDecimals: false
                    ,width: 120
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: 'modblog-setting-postsPerPage'
                    ,html: _('modblog.setting.postsPerPage_desc')
                    ,cls: 'desc-under'


                }]
            }]
        }]
    }

    ,getBlogSettings: function(config) {
        return [{
            layout: 'column'
            ,border: false
            ,anchor: '100%'
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
                    ,name: 'setting_tplArchiveMonth'
                    ,id: 'modblog-setting-tplArchiveMonth'
                    ,fieldLabel: _('modblog.setting.tplArchiveMonth')
                    ,description: MODx.expandHelp ? '' : _('modblog.setting.tplArchiveMonth_desc')
                    ,anchor: '100%'
                    ,value: 'row'
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: 'modblog-setting-tplArchiveMonth'
                    ,html: _('modblog.setting.tplArchiveMonth_desc')
                    ,cls: 'desc-under'

                },{
                    xtype: 'numberfield'
                    ,name: 'setting_archiveListingsLimit'
                    ,id: 'modblog-setting-archiveListingsLimit'
                    ,fieldLabel: _('modblog.setting.archiveListingsLimit')
                    ,description: MODx.expandHelp ? '' : _('modblog.setting.archiveListingsLimit_desc')
                    ,allowNegative: false
                    ,allowDecimals: false
                    ,width: 120
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: 'modblog-setting-archiveListingsLimit'
                    ,html: _('modblog.setting.archiveListingsLimit_desc')
                    ,cls: 'desc-under'

                },{
                    xtype: 'combo-boolean'
                    ,name: 'setting_archiveByMonth'
                    ,hiddenName: 'setting_archiveByMonth'
                    ,id: 'modblog-setting-archiveByMonth'
                    ,fieldLabel: _('modblog.setting.archiveByMonth')
                    ,description: MODx.expandHelp ? '' : _('modblog.setting.archiveByMonth_desc')
                    ,width: 120
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: 'modblog-setting-archiveByMonth'
                    ,html: _('modblog.setting.archiveByMonth_desc')
                    ,cls: 'desc-under'

                },{
                    xtype: 'textfield'
                    ,name: 'setting_archiveCls'
                    ,id: 'modblog-setting-archiveCls'
                    ,fieldLabel: _('modblog.setting.archiveCls')
                    ,description: MODx.expandHelp ? '' : _('modblog.setting.archiveCls_desc')
                    ,anchor: '100%'
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: 'modblog-setting-archiveCls'
                    ,html: _('modblog.setting.archiveCls_desc')
                    ,cls: 'desc-under'
                },{
                    xtype: 'textfield'
                    ,name: 'setting_archiveAltCls'
                    ,id: 'modblog-setting-archiveAltCls'
                    ,fieldLabel: _('modblog.setting.archiveAltCls')
                    ,description: MODx.expandHelp ? '' : _('modblog.setting.archiveAltCls_desc')
                    ,anchor: '100%'
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: 'modblog-setting-archiveAltCls'
                    ,html: _('modblog.setting.archiveAltCls_desc')
                    ,cls: 'desc-under'

                }]
            },{
                columnWidth: .5
                ,items: [{
                    xtype: 'textfield'
                    ,name: 'setting_tplTagRow'
                    ,id: 'modblog-setting-tplTagRow'
                    ,fieldLabel: _('modblog.setting.tplTagRow')
                    ,description: MODx.expandHelp ? '' : _('modblog.setting.tplTagRow_desc')
                    ,anchor: '100%'
                    ,value: 'tag'
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: 'modblog-setting-tplTagRow'
                    ,html: _('modblog.setting.tplTagRow_desc')
                    ,cls: 'desc-under'

                },{
                    xtype: 'numberfield'
                    ,name: 'setting_tagsLimit'
                    ,id: 'modblog-setting-tagsLimit'
                    ,fieldLabel: _('modblog.setting.tagsLimit')
                    ,description: MODx.expandHelp ? '' : _('modblog.setting.tagsLimit_desc')
                    ,allowNegative: false
                    ,allowDecimals: false
                    ,width: 120
                    ,value: 10
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: 'modblog-setting-tagsLimit'
                    ,html: _('modblog.setting.tagsLimit_desc')
                    ,cls: 'desc-under'

                },{
                    xtype: 'textfield'
                    ,name: 'setting_tagCls'
                    ,id: 'modblog-setting-tagCls'
                    ,fieldLabel: _('modblog.setting.tagCls')
                    ,description: MODx.expandHelp ? '' : _('modblog.setting.tagCls_desc')
                    ,anchor: '100%'
                    ,value: 'tl-tag'
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: 'modblog-setting-tagCls'
                    ,html: _('modblog.setting.tagCls_desc')
                    ,cls: 'desc-under'

                },{
                    xtype: 'textfield'
                    ,name: 'setting_tagAltCls'
                    ,id: 'modblog-setting-tagAltCls'
                    ,fieldLabel: _('modblog.setting.tagAltCls')
                    ,description: MODx.expandHelp ? '' : _('modblog.setting.tagAltCls_desc')
                    ,anchor: '100%'
                    ,value: 'tl-tag-alt'
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: 'modblog-setting-tagAltCls'
                    ,html: _('modblog.setting.tagAltCls_desc')
                    ,cls: 'desc-under'

                }]
            }]
        },{
            html: '<hr />'
            ,border: false
            ,anchor: '100%'
        },{
            layout: 'column'
            ,border: false
            ,anchor: '100%'
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
                    ,name: 'setting_rssAlias'
                    ,id: 'modblog-setting-rssAlias'
                    ,fieldLabel: _('modblog.setting.rssAlias')
                    ,description: MODx.expandHelp ? '' : _('modblog.setting.rssAlias_desc')
                    ,anchor: '100%'
                    ,value: 'feed.rss,rss'
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: 'modblog-setting-rssAlias'
                    ,html: _('modblog.setting.rssAlias_desc')
                    ,cls: 'desc-under'
                },{
                    xtype: 'textfield'
                    ,name: 'setting_rssItems'
                    ,id: 'modblog-setting-rssItems'
                    ,fieldLabel: _('modblog.setting.rssItems')
                    ,description: MODx.expandHelp ? '' : _('modblog.setting.rssItems_desc')
                    ,width: 120
                    ,value: 10
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: 'modblog-setting-rssItems'
                    ,html: _('modblog.setting.rssItems_desc')
                    ,cls: 'desc-under'

                }]
            },{
                columnWidth: .5
                ,items: [{
                    xtype: 'textfield'
                    ,name: 'setting_tplRssFeed'
                    ,id: 'modblog-setting-tplRssFeed'
                    ,fieldLabel: _('modblog.setting.tplRssFeed')
                    ,description: MODx.expandHelp ? '' : _('modblog.setting.tplRssFeed_desc')
                    ,anchor: '100%'
                    ,value: 'modBlogRss'
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: 'modblog-setting-tplRssFeed'
                    ,html: _('modblog.setting.tplRssFeed_desc')
                    ,cls: 'desc-under'
                },{
                    xtype: 'textfield'
                    ,name: 'setting_tplRssItem'
                    ,id: 'modblog-setting-tplRssItem'
                    ,fieldLabel: _('modblog.setting.tplRssItem')
                    ,description: MODx.expandHelp ? '' : _('modblog.setting.tplRssItem_desc')
                    ,anchor: '100%'
                    ,value: 'modBlogRssItem'
                },{
                    xtype: MODx.expandHelp ? 'label' : 'hidden'
                    ,forId: 'modblog-setting-tplRssItem'
                    ,html: _('modblog.setting.tplRssItem_desc')
                    ,cls: 'desc-under'


                }]

            }]
        }];
    }


    ,getMainLeftFields: function(config) {
        config = config || {record:{}};
        return [{
            xtype: 'textfield'
            ,fieldLabel: _('modblog.blog_title')+'<span class="required">*</span>'
            ,description: MODx.expandHelp ? '' : '<b>[[*pagetitle]]</b><br />'+_('modblog.blog_title_desc')
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
            xtype: MODx.expandHelp ? 'label' : 'hidden'
            ,forId: 'modx-resource-pagetitle'
            ,html: _('modblog.blog_title_desc')
            ,cls: 'desc-under'

        },{
            xtype: 'textfield'
            ,fieldLabel: _('modblog.blog_alias')
            ,description: '<b>[[*alias]]</b><br />'+_('modblog.blog_alias_desc')
            ,name: 'alias'
            ,id: 'modx-resource-alias'
            ,maxLength: 100
            ,anchor: '100%'
            ,value: config.record.alias || ''
        },{
            xtype: MODx.expandHelp ? 'label' : 'hidden'
            ,forId: 'modx-resource-alias'
            ,html: _('modblog.blog_alias_desc')
            ,cls: 'desc-under'

        },{
            xtype: 'textarea'
            ,fieldLabel: _('modblog.blog_description')
            ,description: '<b>[[*description]]</b><br />'+_('modblog.blog_description_help')
            ,name: 'description'
            ,id: 'modx-resource-description'
            ,maxLength: 255
            ,anchor: '100%'
            ,value: config.record.description || ''
        },{
            xtype: MODx.expandHelp ? 'label' : 'hidden'
            ,forId: 'modx-resource-description'
            ,html: _('modblog.blog_description_desc')
            ,cls: 'desc-under'

        }];
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
            ,height: 250
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
            xtype: 'textfield'
            ,fieldLabel: _('resource_menutitle')
            ,description: MODx.expandHelp ? '' : '<b>[[*menutitle]]</b><br />'+_('modblog.blog_menutitle_desc')
            ,name: 'menutitle'
            ,id: 'modx-resource-menutitle'
            ,maxLength: 255
            ,anchor: '100%'
            ,value: config.record.menutitle || ''
        },{
            xtype: MODx.expandHelp ? 'label' : 'hidden'
            ,forId: 'modx-resource-menutitle'
            ,html: _('modblog.blog_menutitle_desc')
            ,cls: 'desc-under'

        },{
            xtype: 'textfield'
            ,fieldLabel: _('resource_link_attributes')
            ,description: MODx.expandHelp ? '' : '<b>[[*link_attributes]]</b><br />'+_('resource_link_attributes_help')
            ,name: 'link_attributes'
            ,id: 'modx-resource-link-attributes'
            ,maxLength: 255
            ,anchor: '100%'
            ,value: config.record.link_attributes || ''
        },{
            xtype: MODx.expandHelp ? 'label' : 'hidden'
            ,forId: 'modx-resource-link-attributes'
            ,html: _('resource_link_attributes_help')
            ,cls: 'desc-under'

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