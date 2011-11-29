


modBlog.panel.BlogAdvancedSettings = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        border: false
        ,plain: true
        ,deferredRender: false
        ,id: 'modx-resource-vtabs'
        ,anchor: '97%'
        ,items: [{
            title: _('modblog.settings_archiving')
            ,anchor: '100%'
            ,defaults: {
                msgTarget: 'under'
            }
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
            title: _('modblog.settings_tagging')
            ,anchor: '100%'
            ,defaults: {
                msgTarget: 'under'
            }
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
        },{
            title: _('modblog.settings_rss')
            ,anchor: '100%'
            ,defaults: {
                msgTarget: 'under'
            }
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

            },{
                xtype: 'textfield'
                ,name: 'setting_tplRssFeed'
                ,id: 'modblog-setting-tplRssFeed'
                ,fieldLabel: _('modblog.setting.tplRssFeed')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.tplRssFeed_desc')
                ,anchor: '100%'
                ,value: 'sample.modBlogRss'
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
                ,value: 'sample.modBlogRssItem'
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-tplRssItem'
                ,html: _('modblog.setting.tplRssItem_desc')
                ,cls: 'desc-under'

            }]
        },{
            title: _('modblog.settings_latest_posts')
            ,anchor: '100%'
            ,defaults: {
                msgTarget: 'under'
            }
            ,items: [{
                xtype: 'textfield'
                ,name: 'setting_latestPostsTpl'
                ,id: 'modblog-setting-latestPostsTpl'
                ,fieldLabel: _('modblog.setting.latestPostsTpl')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.latestPostsTpl_desc')
                ,anchor: '100%'
                ,value: 'sample.modBlogLatestPostTpl'
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-latestPostsTpl'
                ,html: _('modblog.setting.latestPostsTpl_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'numberfield'
                ,name: 'setting_latestPostsLimit'
                ,id: 'modblog-setting-latestPostsLimit'
                ,fieldLabel: _('modblog.setting.latestPostsLimit')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.latestPostsLimit_desc')
                ,width: 120
                ,allowNegative: false
                ,allowDecimals: false
                ,value: 5
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-latestPostsLimit'
                ,html: _('modblog.setting.latestPostsLimit_desc')
                ,cls: 'desc-under'

            }]
        },{
            title: _('modblog.settings_comments_latest')
            ,anchor: '100%'
            ,defaults: {
                msgTarget: 'under'
            }
            ,items: [{
                xtype: 'textfield'
                ,name: 'setting_latestCommentsTpl'
                ,id: 'modblog-setting-latestCommentsTpl'
                ,fieldLabel: _('modblog.setting.latestCommentsTpl')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.latestCommentsTpl_desc')
                ,anchor: '100%'
                ,value: 'quipLatestComment'
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-latestCommentsTpl'
                ,html: _('modblog.setting.latestCommentsTpl_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'numberfield'
                ,name: 'setting_latestCommentsLimit'
                ,id: 'modblog-setting-latestCommentsLimit'
                ,fieldLabel: _('modblog.setting.latestCommentsLimit')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.latestCommentsLimit_desc')
                ,width: 120
                ,allowNegative: false
                ,allowDecimals: false
                ,value: 10
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-latestCommentsLimit'
                ,html: _('modblog.setting.latestCommentsLimit_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_latestCommentsBodyLimit'
                ,id: 'modblog-setting-latestCommentsBodyLimit'
                ,fieldLabel: _('modblog.setting.latestCommentsBodyLimit')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.latestCommentsBodyLimit_desc')
                ,width: 150
                ,allowNegative: false
                ,allowDecimals: false
                ,value: 300
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-latestCommentsBodyLimit'
                ,html: _('modblog.setting.latestCommentsBodyLimit_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_latestCommentsRowCss'
                ,id: 'modblog-setting-latestCommentsRowCss'
                ,fieldLabel: _('modblog.setting.latestCommentsRowCss')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.latestCommentsRowCss_desc')
                ,anchor: '100%'
                ,value: 'quip-latest-comment'
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-latestCommentsRowCss'
                ,html: _('modblog.setting.latestCommentsRowCss_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_latestCommentsAltRowCss'
                ,id: 'modblog-setting-latestCommentsAltRowCss'
                ,fieldLabel: _('modblog.setting.latestCommentsAltRowCss')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.latestCommentsAltRowCss_desc')
                ,anchor: '100%'
                ,value: 'quip-latest-comment-alt'
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-latestCommentsAltRowCss'
                ,html: _('modblog.setting.latestCommentsAltRowCss_desc')
                ,cls: 'desc-under'

            }]
        }]
    });
    modBlog.panel.BlogAdvancedSettings.superclass.constructor.call(this,config);
};
Ext.extend(modBlog.panel.BlogAdvancedSettings,MODx.VerticalTabs,{

});
Ext.reg('modblog-tab-advanced-settings',modBlog.panel.BlogAdvancedSettings);