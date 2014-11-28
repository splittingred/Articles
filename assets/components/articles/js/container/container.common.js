


Articles.panel.ContainerAdvancedSettings = function(config) {
    config = config || {};
    var oc = {
        'change':{fn:MODx.fireResourceFormChange}
        ,'select':{fn:MODx.fireResourceFormChange}
    };
    var twitterAuthedLexiconKey = config.record && !Ext.isEmpty(config.record.setting_notifyTwitterAccessToken) ? 'articles.setting.notifyTwitter_desc' : 'articles.setting.notifyTwitter_notyet_desc';
    Ext.applyIf(config,{
        id: 'articles-panel-container-advanced-settings'
        ,border: false
        ,plain: true
        ,deferredRender: false
        ,anchor: '97%'
        ,items: [{
            title: _('articles.settings_general')
            ,anchor: '100%'
            ,defaults: {
                msgTarget: 'under'
            }
            ,items: [{
                xtype: 'combo-boolean'
                ,name: 'setting_updateServicesEnabled'
                ,hiddenName: 'setting_updateServicesEnabled'
                ,id: 'articles-setting-updateServicesEnabled'
                ,fieldLabel: _('articles.setting.updateServicesEnabled')
                ,description: MODx.expandHelp ? '' : _('articles.setting.updateServicesEnabled_desc')
                ,anchor: '40%'
                ,value: true
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-updateServicesEnabled'
                ,html: _('articles.setting.updateServicesEnabled_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'numberfield'
                ,name: 'menuindex'
                ,id: 'articles-menuindex'
                ,fieldLabel: _('resource_menuindex')
                ,description: MODx.expandHelp ? '' : _('resource_menuindex_help')
                ,allowNegative: false
                ,allowDecimals: false
                ,width: 120
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-menuindex'
                ,html: _('resource_menuindex_help')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'longtitle'
                ,id: 'articles-longtitle'
                ,fieldLabel: _('resource_longtitle')
                ,description: MODx.expandHelp ? '' : _('resource_longtitle_help')
                ,anchor: '100%'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-longtitle'
                ,html: _('resource_longtitle_help')
                ,cls: 'desc-under'

            },{
                xtype: 'combo-boolean'
                ,name: 'setting_articlesPublished'
                ,hiddenName: 'setting_articlesPublished'
                ,id: 'articles-published'
                ,fieldLabel: _('resource_published')
                ,description: MODx.expandHelp ? '' : _('resource_published_help') + ' ' + _('articles.setting.published_desc')
                ,width: 120
                ,listeners: oc
                ,value: MODx.config.publish_default
            },{
                xtype: 'combo-boolean'
                ,name: 'setting_articlesRichtext'
                ,hiddenName: 'setting_articlesRichtext'
                ,id: 'articles-richtext'
                ,fieldLabel: _('resource_richtext')
                ,description: MODx.expandHelp ? '' : _('resource_richtext_help') + ' ' + _('articles.setting.richtext_desc')
                ,width: 120
                ,listeners: oc
                ,value: 1
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-richtext'
                ,html: _('resource_richtext_help') + ' ' + _('articles.setting.richtext_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_sortBy'
                ,id: 'articles-setting-sortBy'
                ,fieldLabel: _('articles.setting.sortBy')
                ,description: MODx.expandHelp ? '' : _('articles.setting.sortBy_desc')
                ,anchor: '100%'
                ,value: 'publishedon'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-sortBy'
                ,html: _('articles.setting.sortBy_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_sortDir'
                ,id: 'articles-setting-sortDir'
                ,fieldLabel: _('articles.setting.sortDir')
                ,description: MODx.expandHelp ? '' : _('articles.setting.sortDir_desc')
                ,anchor: '100%'
                ,value: 'DESC'
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-sortDir'
                ,html: _('articles.setting.sortDir_desc')
                ,cls: 'desc-under'
                ,listeners: oc

            },{
                xtype: 'combo-boolean'
                ,name: 'setting_archivesIncludeTVs'
                ,hiddenName: 'setting_archivesIncludeTVs'
                ,id: 'articles-setting-archivesIncludeTVs'
                ,fieldLabel: _('articles.setting.archivesIncludeTVs')
                ,description: MODx.expandHelp ? '' : _('articles.setting.archivesIncludeTVs_desc')
                ,anchor: '30%'
                ,value: 1
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-archivesIncludeTVs'
                ,html: _('articles.setting.archivesIncludeTVs_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_includeTVsList'
                ,id: 'articles-setting-includeTVsList'
                ,fieldLabel: _('articles.setting.includeTVsList')
                ,description: MODx.expandHelp ? '' : _('articles.setting.includeTVsList_desc')
                ,anchor: '100%'
                ,value: ''
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-includeTVsList'
                ,html: _('articles.setting.includeTVsList_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'combo-boolean'
                ,name: 'setting_archivesProcessTVs'
                ,hiddenName: 'setting_archivesProcessTVs'
                ,id: 'articles-setting-archivesProcessTVs'
                ,fieldLabel: _('articles.setting.archivesProcessTVs')
                ,description: MODx.expandHelp ? '' : _('articles.setting.archivesProcessTVs_desc')
                ,anchor: '30%'
                ,value: 0
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-archivesProcessTVs'
                ,html: _('articles.setting.archivesProcessTVs_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_processTVsList'
                ,id: 'articles-setting-processTVsList'
                ,fieldLabel: _('articles.setting.processTVsList')
                ,description: MODx.expandHelp ? '' : _('articles.setting.processTVsList_desc')
                ,anchor: '100%'
                ,value: ''
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-includeTVsList'
                ,html: _('articles.setting.includeTVsList_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_otherGetArchives'
                ,id: 'articles-setting-otherGetArchives'
                ,fieldLabel: _('articles.setting.otherGetArchives')
                ,description: MODx.expandHelp ? '' : _('articles.setting.otherGetArchives_desc')
                ,anchor: '100%'
                ,value: ''
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-otherGetArchives'
                ,html: _('articles.setting.otherGetArchives_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_articleUriTemplate'
                ,id: 'articles-setting-articleUriTemplate'
                ,fieldLabel: _('articles.setting.articleUriTemplate')
                ,description: MODx.expandHelp ? '' : _('articles.setting.articleUriTemplate_desc')
                ,anchor: '100%'
                ,value: '%Y/%m/%d/%alias/'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-articleUriTemplate'
                ,html: _('articles.setting.articleUriTemplate_desc')
                ,cls: 'desc-under'

            }]
        },{
            title: _('articles.settings_pagination')
            ,anchor: '100%'
            ,defaults: {
                msgTarget: 'under'
            }
            ,items: [{
                xtype: 'numberfield'
                ,name: 'setting_articlesPerPage'
                ,id: 'articles-setting-articlesPerPage'
                ,fieldLabel: _('articles.setting.articlesPerPage')
                ,description: MODx.expandHelp ? '' : _('articles.setting.articlesPerPage_desc')
                ,allowNegative: false
                ,allowDecimals: false
                ,width: 120
                ,value: 10
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-articlesPerPage'
                ,html: _('articles.setting.articlesPerPage_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'numberfield'
                ,name: 'setting_pageLimit'
                ,id: 'articles-setting-pageLimit'
                ,fieldLabel: _('articles.setting.pageLimit')
                ,description: MODx.expandHelp ? '' : _('articles.setting.pageLimit_desc')
                ,allowNegative: false
                ,allowDecimals: false
                ,width: 120
                ,value: 5
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-pageLimit'
                ,html: _('articles.setting.pageLimit_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_pageNavTpl'
                ,id: 'articles-setting-pageNavTpl'
                ,fieldLabel: _('articles.setting.pageNavTpl')
                ,description: MODx.expandHelp ? '' : _('articles.setting.pageNavTpl_desc')
                ,anchor: '100%'
                ,value: '<li[[+classes]]><a[[+classes]][[+title]] href="[[+href]]">[[+pageNo]]</a></li>'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-pageNavTpl'
                ,html: _('articles.setting.pageNavTpl_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_pageActiveTpl'
                ,id: 'articles-setting-pageActiveTpl'
                ,fieldLabel: _('articles.setting.pageActiveTpl')
                ,description: MODx.expandHelp ? '' : _('articles.setting.pageActiveTpl_desc')
                ,anchor: '100%'
                ,value: '<li[[+activeClasses]]><a[[+activeClasses:default=` class="active"`]][[+title]] href="[[+href]]">[[+pageNo]]</a></li>'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-pageActiveTpl'
                ,html: _('articles.setting.pageActiveTpl_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_pageFirstTpl'
                ,id: 'articles-setting-pageFirstTpl'
                ,fieldLabel: _('articles.setting.pageFirstTpl')
                ,description: MODx.expandHelp ? '' : _('articles.setting.pageFirstTpl_desc')
                ,anchor: '100%'
                ,value: '<li class="control"><a[[+classes]][[+title]] href="[[+href]]">First</a></li>'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-pageFirstTpl'
                ,html: _('articles.setting.pageFirstTpl_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_pageLastTpl'
                ,id: 'articles-setting-pageLastTpl'
                ,fieldLabel: _('articles.setting.pageLastTpl')
                ,description: MODx.expandHelp ? '' : _('articles.setting.pageLastTpl_desc')
                ,anchor: '100%'
                ,value: '<li class="control"><a[[+classes]][[+title]] href="[[+href]]">Last</a></li>'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-pageLastTpl'
                ,html: _('articles.setting.pageLastTpl_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_pagePrevTpl'
                ,id: 'articles-setting-pagePrevTpl'
                ,fieldLabel: _('articles.setting.pagePrevTpl')
                ,description: MODx.expandHelp ? '' : _('articles.setting.pagePrevTpl_desc')
                ,anchor: '100%'
                ,value: '<li class="control"><a[[+classes]][[+title]] href="[[+href]]">&lt;&lt;</a></li>'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-pagePrevTpl'
                ,html: _('articles.setting.pagePrevTpl_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_pageNextTpl'
                ,id: 'articles-setting-pageNextTpl'
                ,fieldLabel: _('articles.setting.pageNextTpl')
                ,description: MODx.expandHelp ? '' : _('articles.setting.pageNextTpl_desc')
                ,anchor: '100%'
                ,value: '<li class="control"><a[[+classes]][[+title]] href="[[+href]]">&gt;&gt;</a></li>'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-pageNextTpl'
                ,html: _('articles.setting.pageNextTpl_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'numberfield'
                ,name: 'setting_pageOffset'
                ,id: 'articles-setting-pageOffset'
                ,fieldLabel: _('articles.setting.pageOffset')
                ,description: MODx.expandHelp ? '' : _('articles.setting.pageOffset_desc')
                ,anchor: '30%'
                ,minWidth: 100
                ,allowNegative: false
                ,allowDecimals: false
                ,value: 0
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-pageOffset'
                ,html: _('articles.setting.pageOffset_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_pageVarKey'
                ,id: 'articles-setting-pageVarKey'
                ,fieldLabel: _('articles.setting.pageVarKey')
                ,description: MODx.expandHelp ? '' : _('articles.setting.pageVarKey_desc')
                ,anchor: '100%'
                ,value: 'page'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-pageVarKey'
                ,html: _('articles.setting.pageVarKey_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_pageTotalVar'
                ,id: 'articles-setting-pageTotalVar'
                ,fieldLabel: _('articles.setting.pageTotalVar')
                ,description: MODx.expandHelp ? '' : _('articles.setting.pageTotalVar_desc')
                ,anchor: '100%'
                ,value: 'total'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-pageTotalVar'
                ,html: _('articles.setting.pageTotalVar_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_pageNavVar'
                ,id: 'articles-setting-pageNavVar'
                ,fieldLabel: _('articles.setting.pageNavVar')
                ,description: MODx.expandHelp ? '' : _('articles.setting.pageNavVar_desc')
                ,anchor: '100%'
                ,value: 'page.nav'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-pageNavVar'
                ,html: _('articles.setting.pageNavVar_desc')
                ,cls: 'desc-under'

            }]
        },{
            title: _('articles.settings_archiving')
            ,anchor: '100%'
            ,defaults: {
                msgTarget: 'under'
            }
            ,items: [{
                xtype: 'textfield'
                ,name: 'setting_tplArchiveMonth'
                ,id: 'articles-setting-tplArchiveMonth'
                ,fieldLabel: _('articles.setting.tplArchiveMonth')
                ,description: MODx.expandHelp ? '' : _('articles.setting.tplArchiveMonth_desc')
                ,anchor: '100%'
                ,value: 'row'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-tplArchiveMonth'
                ,html: _('articles.setting.tplArchiveMonth_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'numberfield'
                ,name: 'setting_archiveListingsLimit'
                ,id: 'articles-setting-archiveListingsLimit'
                ,fieldLabel: _('articles.setting.archiveListingsLimit')
                ,description: MODx.expandHelp ? '' : _('articles.setting.archiveListingsLimit_desc')
                ,allowNegative: false
                ,allowDecimals: false
                ,width: 120
                ,value: 10
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-archiveListingsLimit'
                ,html: _('articles.setting.archiveListingsLimit_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'combo-boolean'
                ,name: 'setting_archiveByMonth'
                ,hiddenName: 'setting_archiveByMonth'
                ,id: 'articles-setting-archiveByMonth'
                ,fieldLabel: _('articles.setting.archiveByMonth')
                ,description: MODx.expandHelp ? '' : _('articles.setting.archiveByMonth_desc')
                ,anchor: '30%'
                ,value: 1
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-archiveByMonth'
                ,html: _('articles.setting.archiveByMonth_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_archiveCls'
                ,id: 'articles-setting-archiveCls'
                ,fieldLabel: _('articles.setting.archiveCls')
                ,description: MODx.expandHelp ? '' : _('articles.setting.archiveCls_desc')
                ,anchor: '100%'
                ,valie: 'arc-row'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-archiveCls'
                ,html: _('articles.setting.archiveCls_desc')
                ,cls: 'desc-under'
            },{
                xtype: 'textfield'
                ,name: 'setting_archiveAltCls'
                ,id: 'articles-setting-archiveAltCls'
                ,fieldLabel: _('articles.setting.archiveAltCls')
                ,description: MODx.expandHelp ? '' : _('articles.setting.archiveAltCls_desc')
                ,anchor: '100%'
                ,value: 'arc-row-alt'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-archiveAltCls'
                ,html: _('articles.setting.archiveAltCls_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'combo-boolean'
                ,name: 'setting_archiveGroupByYear'
                ,hiddenName: 'setting_archiveGroupByYear'
                ,id: 'articles-setting-archiveGroupByYear'
                ,fieldLabel: _('articles.setting.archiveGroupByYear')
                ,description: MODx.expandHelp ? '' : _('articles.setting.archiveGroupByYear_desc')
                ,anchor: '30%'
                ,value: 0
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-archiveGroupByYear'
                ,html: _('articles.setting.archiveGroupByYear_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_archiveGroupByYearTpl'
                ,id: 'articles-setting-archiveGroupByYearTpl'
                ,fieldLabel: _('articles.setting.archiveGroupByYearTpl')
                ,description: MODx.expandHelp ? '' : _('articles.setting.archiveGroupByYearTpl_desc')
                ,anchor: '100%'
                ,value: 'sample.ArchiveGroupByYear'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-archiveGroupByYearTpl'
                ,html: _('articles.setting.archiveGroupByYearTpl_desc')
                ,cls: 'desc-under'

            }]
        },{
            title: _('articles.settings_tagging')
            ,anchor: '100%'
            ,defaults: {
                msgTarget: 'under'
            }
            ,items: [{
                xtype: 'textfield'
                ,name: 'setting_tplTagRow'
                ,id: 'articles-setting-tplTagRow'
                ,fieldLabel: _('articles.setting.tplTagRow')
                ,description: MODx.expandHelp ? '' : _('articles.setting.tplTagRow_desc')
                ,anchor: '100%'
                ,value: 'tag'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-tplTagRow'
                ,html: _('articles.setting.tplTagRow_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'numberfield'
                ,name: 'setting_tagsLimit'
                ,id: 'articles-setting-tagsLimit'
                ,fieldLabel: _('articles.setting.tagsLimit')
                ,description: MODx.expandHelp ? '' : _('articles.setting.tagsLimit_desc')
                ,allowNegative: false
                ,allowDecimals: false
                ,width: 120
                ,value: 10
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-tagsLimit'
                ,html: _('articles.setting.tagsLimit_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_tagCls'
                ,id: 'articles-setting-tagCls'
                ,fieldLabel: _('articles.setting.tagCls')
                ,description: MODx.expandHelp ? '' : _('articles.setting.tagCls_desc')
                ,anchor: '100%'
                ,value: 'tl-tag'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-tagCls'
                ,html: _('articles.setting.tagCls_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_tagAltCls'
                ,id: 'articles-setting-tagAltCls'
                ,fieldLabel: _('articles.setting.tagAltCls')
                ,description: MODx.expandHelp ? '' : _('articles.setting.tagAltCls_desc')
                ,anchor: '100%'
                ,value: 'tl-tag-alt'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-tagAltCls'
                ,html: _('articles.setting.tagAltCls_desc')
                ,cls: 'desc-under'

            }]
        },{
            title: _('articles.settings_rss')
            ,anchor: '100%'
            ,defaults: {
                msgTarget: 'under'
            }
            ,items: [{
                xtype: 'textfield'
                ,name: 'setting_rssAlias'
                ,id: 'articles-setting-rssAlias'
                ,fieldLabel: _('articles.setting.rssAlias')
                ,description: MODx.expandHelp ? '' : _('articles.setting.rssAlias_desc')
                ,anchor: '100%'
                ,value: 'feed.rss,rss'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-rssAlias'
                ,html: _('articles.setting.rssAlias_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_rssItems'
                ,id: 'articles-setting-rssItems'
                ,fieldLabel: _('articles.setting.rssItems')
                ,description: MODx.expandHelp ? '' : _('articles.setting.rssItems_desc')
                ,width: 120
                ,value: 10
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-rssItems'
                ,html: _('articles.setting.rssItems_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_tplRssFeed'
                ,id: 'articles-setting-tplRssFeed'
                ,fieldLabel: _('articles.setting.tplRssFeed')
                ,description: MODx.expandHelp ? '' : _('articles.setting.tplRssFeed_desc')
                ,anchor: '100%'
                ,value: 'sample.ArticlesRss'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-tplRssFeed'
                ,html: _('articles.setting.tplRssFeed_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_tplRssItem'
                ,id: 'articles-setting-tplRssItem'
                ,fieldLabel: _('articles.setting.tplRssItem')
                ,description: MODx.expandHelp ? '' : _('articles.setting.tplRssItem_desc')
                ,anchor: '100%'
                ,value: 'sample.ArticlesRssItem'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-tplRssItem'
                ,html: _('articles.setting.tplRssItem_desc')
                ,cls: 'desc-under'

            }]
        },{
            title: _('articles.settings_latest_posts')
            ,anchor: '100%'
            ,defaults: {
                msgTarget: 'under'
            }
            ,items: [{
                xtype: 'textfield'
                ,name: 'setting_latestPostsTpl'
                ,id: 'articles-setting-latestPostsTpl'
                ,fieldLabel: _('articles.setting.latestPostsTpl')
                ,description: MODx.expandHelp ? '' : _('articles.setting.latestPostsTpl_desc')
                ,anchor: '100%'
                ,value: 'sample.ArticlesLatestPostTpl'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-latestPostsTpl'
                ,html: _('articles.setting.latestPostsTpl_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'numberfield'
                ,name: 'setting_latestPostsLimit'
                ,id: 'articles-setting-latestPostsLimit'
                ,fieldLabel: _('articles.setting.latestPostsLimit')
                ,description: MODx.expandHelp ? '' : _('articles.setting.latestPostsLimit_desc')
                ,width: 120
                ,allowNegative: false
                ,allowDecimals: false
                ,value: 5
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-latestPostsLimit'
                ,html: _('articles.setting.latestPostsLimit_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'numberfield'
                ,name: 'setting_latestPostsOffset'
                ,id: 'articles-setting-latestPostsOffset'
                ,fieldLabel: _('articles.setting.latestPostsOffset')
                ,description: MODx.expandHelp ? '' : _('articles.setting.latestPostsOffset_desc')
                ,width: 120
                ,allowNegative: false
                ,allowDecimals: false
                ,value: 0
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-latestPostsOffset'
                ,html: _('articles.setting.latestPostsOffset_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_otherLatestPosts'
                ,id: 'articles-setting-otherLatestPosts'
                ,fieldLabel: _('articles.setting.otherLatestPosts')
                ,description: MODx.expandHelp ? '' : _('articles.setting.otherLatestPosts_desc')
                ,anchor: '100%'
                ,value: ''
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-latestPostsOffset'
                ,html: _('articles.setting.latestPostsOffset_desc')
                ,cls: 'desc-under'

            }]
        },{
            title: _('articles.settings_notifications')
            ,anchor: '100%'
            ,defaults: {
                msgTarget: 'under'
            }
            ,items: [{
                xtype: 'combo-boolean'
                ,name: 'setting_notifyTwitter'
                ,hiddenName: 'setting_notifyTwitter'
                ,id: 'articles-setting-notifyTwitter'
                ,fieldLabel: _('articles.setting.notifyTwitter')
                ,description: MODx.expandHelp ? '' : _(twitterAuthedLexiconKey,{
                    authUrl: Articles.assets_url+'twitter.auth.php?container='+MODx.request.id
                })
                ,anchor: '30%'
                ,value: false
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-notifyTwitter'
                ,html: _(twitterAuthedLexiconKey,{
                    authUrl: Articles.assets_url+'twitter.auth.php?container='+MODx.request.id
                })
                ,cls: 'desc-under'

            },{
                xtype: 'text-password'
                ,name: 'setting_notifyTwitterConsumerKey'
                ,id: 'articles-setting-notifyTwitterConsumerKey'
                ,fieldLabel: _('articles.setting.notifyTwitterConsumerKey')
                ,description: MODx.expandHelp ? '' : _('articles.setting.notifyTwitterConsumerKey_desc')
                ,anchor: '100%'
                ,value: ''
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-notifyTwitterConsumerKey'
                ,html: _('articles.setting.notifyTwitterConsumerKey_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'text-password'
                ,name: 'setting_notifyTwitterConsumerKeySecret'
                ,id: 'articles-setting-notifyTwitterConsumerKeySecret'
                ,fieldLabel: _('articles.setting.notifyTwitterConsumerKeySecret')
                ,description: MODx.expandHelp ? '' : _('articles.setting.notifyTwitterConsumerKeySecret_desc')
                ,anchor: '100%'
                ,value: ''
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-notifyTwitterConsumerKeySecret'
                ,html: _('articles.setting.notifyTwitterConsumerKeySecret_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_notifyTwitterTpl'
                ,id: 'articles-setting-notifyTwitterTpl'
                ,fieldLabel: _('articles.setting.notifyTwitterTpl')
                ,description: MODx.expandHelp ? '' : _('articles.setting.notifyTwitterTpl_desc')
                ,anchor: '100%'
                ,value: ''
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-notifyTwitterTpl'
                ,html: _('articles.setting.notifyTwitterTpl_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'numberfield'
                ,name: 'setting_notifyTwitterTagLimit'
                ,id: 'articles-setting-notifyTwitterTagLimit'
                ,fieldLabel: _('articles.setting.notifyTwitterTagLimit')
                ,description: MODx.expandHelp ? '' : _('articles.setting.notifyTwitterTagLimit_desc')
                ,anchor: '30%'
                ,value: 3
                ,allowNegative: false
                ,allowDecimals: false
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-notifyTwitterTagLimit'
                ,html: _('articles.setting.notifyTwitterTagLimit_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'articles-combo-shorteners'
                ,name: 'setting_shorteningService'
                ,hiddenName: 'setting_shorteningService'
                ,id: 'articles-setting-shorteningService'
                ,fieldLabel: _('articles.setting.shorteningService')
                ,description: MODx.expandHelp ? '' : _('articles.setting.shorteningService_desc')
                ,anchor: '30%'
                ,value: 'tinyurl'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-shorteningService'
                ,html: _('articles.setting.shorteningService_desc')
                ,cls: 'desc-under'

            }]
        },{
            title: _('articles.settings_comments')
            ,anchor: '100%'
            ,defaults: {
                msgTarget: 'under'
            }
            ,items: [{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsEnabled'
                ,hiddenName: 'setting_commentsEnabled'
                ,id: 'articles-setting-commentsEnabled'
                ,fieldLabel: _('articles.setting.commentsEnabled')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsEnabled_desc')
                ,anchor: '30%'
                ,value: 1
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsEnabled'
                ,html: _('articles.setting.commentsEnabled_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsThreaded'
                ,hiddenName: 'setting_commentsThreaded'
                ,id: 'articles-setting-commentsThreaded'
                ,fieldLabel: _('articles.setting.commentsThreaded')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsThreaded_desc')
                ,anchor: '30%'
                ,value: 0
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsThreaded'
                ,html: _('articles.setting.commentsThreaded_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_commentsReplyResourceId'
                ,id: 'articles-setting-commentsReplyResourceId'
                ,fieldLabel: _('articles.setting.commentsReplyResourceId')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsReplyResourceId_desc')
                ,anchor: '30%'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsReplyResourceId'
                ,html: _('articles.setting.commentsReplyResourceId_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'numberfield'
                ,name: 'setting_commentsMaxDepth'
                ,id: 'articles-setting-commentsMaxDepth'
                ,fieldLabel: _('articles.setting.commentsMaxDepth')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsMaxDepth_desc')
                ,anchor: '30%'
                ,allowDecimals: false
                ,allowNegative: false
                ,value: 5
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsMaxDepth'
                ,html: _('articles.setting.commentsMaxDepth_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsRequirePreview'
                ,hiddenName: 'setting_commentsRequirePreview'
                ,id: 'articles-setting-commentsRequirePreview'
                ,fieldLabel: _('articles.setting.commentsRequirePreview')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsRequirePreview_desc')
                ,anchor: '30%'
                ,value: 0
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsRequirePreview'
                ,html: _('articles.setting.commentsRequirePreview_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'numberfield'
                ,name: 'setting_commentsCloseAfter'
                ,id: 'articles-setting-commentsCloseAfter'
                ,fieldLabel: _('articles.setting.commentsCloseAfter')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsCloseAfter_desc')
                ,anchor: '30%'
                ,allowDecimals: false
                ,allowNegative: false
                ,value: 0
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsCloseAfter'
                ,html: _('articles.setting.commentsCloseAfter_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_commentsDateFormat'
                ,id: 'articles-setting-commentsDateFormat'
                ,fieldLabel: _('articles.setting.commentsDateFormat')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsDateFormat_desc')
                ,anchor: '100%'
                ,value: '%b %d, %Y at %I:%M %p'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsDateFormat'
                ,html: _('articles.setting.commentsDateFormat_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsAutoConvertLinks'
                ,hiddenName: 'setting_commentsAutoConvertLinks'
                ,id: 'articles-setting-commentsAutoConvertLinks'
                ,fieldLabel: _('articles.setting.commentsAutoConvertLinks')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsAutoConvertLinks_desc')
                ,anchor: '30%'
                ,value: 1
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsAutoConvertLinks'
                ,html: _('articles.setting.commentsAutoConvertLinks_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'numberfield'
                ,name: 'setting_commentsLimit'
                ,id: 'articles-setting-commentsLimit'
                ,fieldLabel: _('articles.setting.commentsLimit')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsLimit_desc')
                ,anchor: '30%'
                ,allowDecimals: false
                ,allowNegative: false
                ,value: 0
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsLimit'
                ,html: _('articles.setting.commentsLimit_desc')
                ,cls: 'desc-under'

            }]
        },{
            title: ' &#8212; '+_('articles.settings_comments_display')
            ,anchor: '100%'
            ,defaults: {
                msgTarget: 'under'
            }
            ,items: [{
                xtype: 'textfield'
                ,name: 'setting_commentsTplComment'
                ,id: 'articles-setting-commentsTplComment'
                ,fieldLabel: _('articles.setting.commentsTplComment')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsTplComment_desc')
                ,anchor: '100%'
                ,value: 'quipComment'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsTplComment'
                ,html: _('articles.setting.commentsTplComment_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_commentsTplCommentOptions'
                ,id: 'articles-setting-commentsTplCommentOptions'
                ,fieldLabel: _('articles.setting.commentsTplCommentOptions')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsTplCommentOptions_desc')
                ,anchor: '100%'
                ,value: 'quipCommentOptions'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsTplCommentOptions'
                ,html: _('articles.setting.commentsTplCommentOptions_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_commentsTplComments'
                ,id: 'articles-setting-commentsTplComments'
                ,fieldLabel: _('articles.setting.commentsTplComments')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsTplComments_desc')
                ,anchor: '100%'
                ,value: 'quipComments'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsTplComments'
                ,html: _('articles.setting.commentsTplComments_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_commentsTplAddComment'
                ,id: 'articles-setting-commentsAddComment'
                ,fieldLabel: _('articles.setting.commentsTplAddComment')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsTplAddComment_desc')
                ,anchor: '100%'
                ,value: 'quipAddComment'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsTplAddComment'
                ,html: _('articles.setting.commentsTplAddComment_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_commentsTplLoginToComment'
                ,id: 'articles-setting-commentsTplLoginToComment'
                ,fieldLabel: _('articles.setting.commentsTplLoginToComment')
                ,description: MODx.expandHelp ? '' : _('articles.commentsTplLoginToComment_desc')
                ,anchor: '100%'
                ,value: 'quipLoginToComment'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsTplLoginToComment'
                ,html: _('articles.setting.commentsTplLoginToComment_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_commentsTplPreview'
                ,id: 'articles-setting-commentsTplPreview'
                ,fieldLabel: _('articles.setting.commentsTplPreview')
                ,description: MODx.expandHelp ? '' : _('articles.commentsTplPreview_desc')
                ,anchor: '100%'
                ,value: 'quipPreviewComment'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsTplPreview'
                ,html: _('articles.setting.commentsTplPreview_desc')
                ,cls: 'desc-under'

            },{
                html: '<hr />'
                ,border: false
            },{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsUseCss'
                ,hiddenName: 'setting_commentsUseCss'
                ,id: 'articles-setting-commentsUseCss'
                ,fieldLabel: _('articles.setting.commentsUseCss')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsUseCss_desc')
                ,anchor: '30%'
                ,value: 1
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsUseCss'
                ,html: _('articles.setting.commentsUseCss_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_commentsAltRowCss'
                ,id: 'articles-setting-commentsAltRowCss'
                ,fieldLabel: _('articles.setting.commentsAltRowCss')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsAltRowCss_desc')
                ,anchor: '100%'
                ,value: 'quip-comment-alt'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsAltRowCss'
                ,html: _('articles.setting.commentsAltRowCss_desc')
                ,cls: 'desc-under'

            }
			,{
                xtype: 'textfield'
                ,name: 'setting_commentsSortDir'
                ,id: 'articles-setting-commentsSortDir'
                ,fieldLabel: _('articles.setting.commentsSortDir')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsSortDir_desc')
                ,anchor: '100%'
                ,value: 'ASC'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsSortDir'
                ,html: _('articles.setting.commentsSortDir_desc')
                ,cls: 'desc-under'

            }]
        },{
            title: ' &#8212; '+_('articles.settings_comments_moderation')
            ,anchor: '100%'
            ,defaults: {
                msgTarget: 'under'
            }
            ,items: [{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsRequireAuth'
                ,hiddenName: 'setting_commentsRequireAuth'
                ,id: 'articles-setting-commentsRequireAuth'
                ,fieldLabel: _('articles.setting.commentsRequireAuth')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsRequireAuth_desc')
                ,anchor: '30%'
                ,value: 0
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsRequireAuth'
                ,html: _('articles.setting.commentsRequireAuth_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsModerate'
                ,hiddenName: 'setting_commentsModerate'
                ,id: 'articles-setting-commentsModerate'
                ,fieldLabel: _('articles.setting.commentsModerate')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsModerate_desc')
                ,anchor: '30%'
                ,value: 1
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsModerate'
                ,html: _('articles.setting.commentsModerate_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_commentsModerators'
                ,id: 'articles-setting-commentsModerators'
                ,fieldLabel: _('articles.setting.commentsModerators')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsModerators_desc')
                ,anchor: '100%'
                ,value: ''
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsModerators'
                ,html: _('articles.setting.commentsModerators_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_commentsModeratorGroup'
                ,id: 'articles-setting-commentsModeratorGroup'
                ,fieldLabel: _('articles.setting.commentsModeratorGroup')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsModeratorGroup_desc')
                ,anchor: '100%'
                ,value: 'Administrator'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsModeratorGroup'
                ,html: _('articles.setting.commentsModeratorGroup_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsModerateAnonymousOnly'
                ,hiddenName: 'setting_commentsModerateAnonymousOnly'
                ,id: 'articles-setting-commentsModerateAnonymousOnly'
                ,fieldLabel: _('articles.setting.commentsModerateAnonymousOnly')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsModerateAnonymousOnly_desc')
                ,anchor: '30%'
                ,value: 0
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsModerateAnonymousOnly'
                ,html: _('articles.setting.commentsModerateAnonymousOnly_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsModerateFirstPostOnly'
                ,hiddenName: 'setting_commentsModerateFirstPostOnly'
                ,id: 'articles-setting-commentsModerateFirstPostOnly'
                ,fieldLabel: _('articles.setting.commentsModerateFirstPostOnly')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsModerateFirstPostOnly_desc')
                ,anchor: '30%'
                ,value: 1
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsModerateFirstPostOnly'
                ,html: _('articles.setting.commentsModerateFirstPostOnly_desc')
                ,cls: 'desc-under'

            },{
                html: '<hr />'
                ,border: false
            },{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsReCaptcha'
                ,hiddenName: 'setting_commentsReCaptcha'
                ,id: 'articles-setting-commentsReCaptcha'
                ,fieldLabel: _('articles.setting.commentsReCaptcha')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsReCaptcha_desc')
                ,anchor: '30%'
                ,value: 0
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsReCaptcha'
                ,html: _('articles.setting.commentsReCaptcha_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsDisableReCaptchaWhenLoggedIn'
                ,hiddenName: 'setting_commentsDisableReCaptchaWhenLoggedIn'
                ,id: 'articles-setting-commentsDisableReCaptchaWhenLoggedIn'
                ,fieldLabel: _('articles.setting.commentsDisableReCaptchaWhenLoggedIn')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsDisableReCaptchaWhenLoggedIn_desc')
                ,anchor: '30%'
                ,value: 1
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsDisableReCaptchaWhenLoggedIn'
                ,html: _('articles.setting.commentsDisableReCaptchaWhenLoggedIn_desc')
                ,cls: 'desc-under'

            },{
                html: '<hr />'
                ,border: false
            },{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsAllowRemove'
                ,hiddenName: 'setting_commentsAllowRemove'
                ,id: 'articles-setting-commentsAllowRemove'
                ,fieldLabel: _('articles.setting.commentsAllowRemove')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsAllowRemove_desc')
                ,anchor: '30%'
                ,value: 1
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsAllowRemove'
                ,html: _('articles.setting.commentsAllowRemove_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'numberfield'
                ,name: 'setting_commentsRemoveThreshold'
                ,id: 'articles-setting-commentsRemoveThreshold'
                ,fieldLabel: _('articles.setting.commentsRemoveThreshold')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsRemoveThreshold_desc')
                ,anchor: '30%'
                ,allowDecimals: false
                ,allowNegative: false
                ,value: 3
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsRemoveThreshold'
                ,html: _('articles.setting.commentsRemoveThreshold_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsAllowReportAsSpam'
                ,hiddenName: 'setting_commentsAllowReportAsSpam'
                ,id: 'articles-setting-commentsAllowReportAsSpam'
                ,fieldLabel: _('articles.setting.commentsAllowReportAsSpam')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsAllowReportAsSpam_desc')
                ,anchor: '30%'
                ,value: 1
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsAllowReportAsSpam'
                ,html: _('articles.setting.commentsAllowReportAsSpam_desc')
                ,cls: 'desc-under'

            }]
        },{
            title: ' &#8212; '+_('articles.settings_comments_latest')
            ,anchor: '100%'
            ,defaults: {
                msgTarget: 'under'
            }
            ,items: [{
                xtype: 'textfield'
                ,name: 'setting_latestCommentsTpl'
                ,id: 'articles-setting-latestCommentsTpl'
                ,fieldLabel: _('articles.setting.latestCommentsTpl')
                ,description: MODx.expandHelp ? '' : _('articles.setting.latestCommentsTpl_desc')
                ,anchor: '100%'
                ,value: 'quipLatestComment'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-latestCommentsTpl'
                ,html: _('articles.setting.latestCommentsTpl_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'numberfield'
                ,name: 'setting_latestCommentsLimit'
                ,id: 'articles-setting-latestCommentsLimit'
                ,fieldLabel: _('articles.setting.latestCommentsLimit')
                ,description: MODx.expandHelp ? '' : _('articles.setting.latestCommentsLimit_desc')
                ,width: 120
                ,allowNegative: false
                ,allowDecimals: false
                ,value: 10
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-latestCommentsLimit'
                ,html: _('articles.setting.latestCommentsLimit_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_latestCommentsBodyLimit'
                ,id: 'articles-setting-latestCommentsBodyLimit'
                ,fieldLabel: _('articles.setting.latestCommentsBodyLimit')
                ,description: MODx.expandHelp ? '' : _('articles.setting.latestCommentsBodyLimit_desc')
                ,width: 150
                ,allowNegative: false
                ,allowDecimals: false
                ,value: 300
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-latestCommentsBodyLimit'
                ,html: _('articles.setting.latestCommentsBodyLimit_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_latestCommentsRowCss'
                ,id: 'articles-setting-latestCommentsRowCss'
                ,fieldLabel: _('articles.setting.latestCommentsRowCss')
                ,description: MODx.expandHelp ? '' : _('articles.setting.latestCommentsRowCss_desc')
                ,anchor: '100%'
                ,value: 'quip-latest-comment'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-latestCommentsRowCss'
                ,html: _('articles.setting.latestCommentsRowCss_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_latestCommentsAltRowCss'
                ,id: 'articles-setting-latestCommentsAltRowCss'
                ,fieldLabel: _('articles.setting.latestCommentsAltRowCss')
                ,description: MODx.expandHelp ? '' : _('articles.setting.latestCommentsAltRowCss_desc')
                ,anchor: '100%'
                ,value: 'quip-latest-comment-alt'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-latestCommentsAltRowCss'
                ,html: _('articles.setting.latestCommentsAltRowCss_desc')
                ,cls: 'desc-under'

            }]
        },{
            title: ' &#8212; '+_('articles.settings_comments_other')
            ,anchor: '100%'
            ,defaults: {
                msgTarget: 'under'
            }
            ,items: [{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsGravatar'
                ,hiddenName: 'setting_commentsGravatar'
                ,id: 'articles-setting-commentsGravatar'
                ,fieldLabel: _('articles.setting.commentsGravatar')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsGravatar_desc')
                ,anchor: '30%'
                ,value: 1
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsGravatar'
                ,html: _('articles.setting.commentsGravatar_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_commentsGravatarIcon'
                ,id: 'articles-setting-commentsGravatarIcon'
                ,fieldLabel: _('articles.setting.commentsGravatarIcon')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsGravatarIcon_desc')
                ,anchor: '100%'
                ,value: 'identicon'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsGravatarIcon'
                ,html: _('articles.setting.commentsGravatarIcon_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'numberfield'
                ,name: 'setting_commentsGravatarSize'
                ,id: 'articles-setting-commentsGravatarSize'
                ,fieldLabel: _('articles.setting.commentsGravatarSize')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsGravatarSize_desc')
                ,anchor: '100%'
                ,allowNegative: false
                ,value: 50
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsGravatarSize'
                ,html: _('articles.setting.commentsGravatarSize_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_commentsNameField'
                ,id: 'articles-setting-commentsNameField'
                ,fieldLabel: _('articles.setting.commentsNameField')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsNameField_desc')
                ,anchor: '100%'
                ,value: 'name'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsNameField'
                ,html: _('articles.setting.commentsNameField_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsShowAnonymousName'
                ,hiddenName: 'setting_commentsShowAnonymousName'
                ,id: 'articles-setting-commentsShowAnonymousName'
                ,fieldLabel: _('articles.setting.commentsShowAnonymousName')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsShowAnonymousName')
                ,anchor: '30%'
                ,value: 0
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsShowAnonymousName'
                ,html: _('articles.setting.commentsShowAnonymousName_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_commentsAnonymousName'
                ,id: 'articles-setting-commentsAnonymousName'
                ,fieldLabel: _('articles.setting.commentsAnonymousName')
                ,description: MODx.expandHelp ? '' : _('articles.setting.commentsAnonymousName_desc')
                ,anchor: '100%'
                ,value: 'Anonymous'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-commentsAnonymousName'
                ,html: _('articles.setting.commentsAnonymousName_desc')
                ,cls: 'desc-under'

            }]
        }]
    });
    Articles.panel.ContainerAdvancedSettings.superclass.constructor.call(this,config);
};
Ext.extend(Articles.panel.ContainerAdvancedSettings,MODx.VerticalTabs,{

});
Ext.reg('articles-tab-advanced-settings',Articles.panel.ContainerAdvancedSettings);

Articles.panel.ContainerTemplateSettings = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'articles-panel-container-template-settings'
        ,layout: 'column'
        ,border: false
        ,anchor: '100%'
        ,defaults: {
            layout: 'form'
            ,labelAlign: 'top'
            ,anchor: '100%'
            ,border: false
            ,labelSeparator: ''
        }
        ,items: this.getItems(config)
    });
    Articles.panel.ContainerTemplateSettings.superclass.constructor.call(this,config);
};
Ext.extend(Articles.panel.ContainerTemplateSettings,MODx.Panel,{
    getItems: function(config) {
        var oc = {
            'change':{fn:MODx.fireResourceFormChange}
            ,'select':{fn:MODx.fireResourceFormChange}
        };
        var flds = [];
        flds.push({
            xtype: 'modx-combo-template'
            ,fieldLabel: _('resource_template')
            ,description: MODx.expandHelp ? '' : '<b>[[*template]]</b><br />'+_('resource_template_help')
            ,name: 'template'
            ,id: 'modx-resource-template'
            ,anchor: '100%'
            ,editable: false
            ,value: config.record.template || MODx.config['articles.default_container_template']
            ,listeners: oc
        },{
            xtype: MODx.expandHelp ? 'label' : 'hidden'
            ,forId: 'modx-resource-template'
            ,id: 'modx-resource-template-label'
            ,html: _('articles.template_desc')
            ,cls: 'desc-under'
        });
        var ct = this.getContentField(config);
        for (var f in ct) {
            flds.push(ct[f]);
        }
        return [{
            columnWidth: .5
            ,items: flds
        },{
            columnWidth: .5
            ,items: [{
                xtype: 'modx-combo-template'
                ,name: 'setting_articleTemplate'
                ,hiddenName: 'setting_articleTemplate'
                ,id: 'articles-setting-articleTemplate'
                ,fieldLabel: _('articles.setting.articleTemplate')
                ,description: MODx.expandHelp ? '' : _('articles.setting.articleTemplate_desc')
                ,anchor: '100%'
                ,value: config.record.setting_articleTemplate || MODx.config['articles.default_article_template']
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-articleTemplate'
                ,html: _('articles.setting.articleTemplate_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_tplArticleRow'
                ,id: 'articles-setting-tplArticleRow'
                ,fieldLabel: _('articles.setting.tplArticleRow')
                ,description: MODx.expandHelp ? '' : _('articles.setting.tplArticleRow_desc')
                ,anchor: '100%'
                ,value: config.record.setting_tplArticleRow || 'sample.ArticleRowTpl'
                ,listeners: oc
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'articles-setting-tplArticleRow'
                ,html: _('articles.setting.tplArticleRow_desc')
                ,cls: 'desc-under'

            }]
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
            ,fieldLabel: _('articles.content')
            ,anchor: '100%'
            ,height: 250
            ,grow: false
            ,border: false
            ,value: config.record && config.record.content ? config.record.content : "[[+articles]]\n\n[[!+page.nav:notempty=`\n<div class='paging'>\n\t<ul class='pageList'>\n\t\t[[+paging]]\n\t</ul>\n</div>\n`]]"
        },{
            id: 'modx-content-below'
            ,border: false
        }];
    }
});
Ext.reg('articles-tab-template-settings',Articles.panel.ContainerTemplateSettings);

Articles.combo.Shorteners = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        store: new Ext.data.SimpleStore({
            fields: ['d','v']
            ,data: [
                [_('none'),'']
                ,['Tinyurl','tinyurl']
                ,['Digg','digg']
                ,['Isgd','isgd']
            /*    ,['Bit.ly','bitly'] */
            ]
        })
        ,displayField: 'd'
        ,valueField: 'v'
        ,mode: 'local'
        ,triggerAction: 'all'
        ,editable: false
        ,selectOnFocus: false
        ,preventRender: true
        ,forceSelection: true
        ,enableKeyEvents: true
    });
    Articles.combo.Shorteners.superclass.constructor.call(this,config);
};
Ext.extend(Articles.combo.Shorteners,MODx.combo.ComboBox);
Ext.reg('articles-combo-shorteners',Articles.combo.Shorteners);
