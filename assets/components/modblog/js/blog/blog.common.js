


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
            title: _('modblog.settings_comments')
            ,anchor: '100%'
            ,defaults: {
                msgTarget: 'under'
            }
            ,items: [{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsThreaded'
                ,hiddenName: 'setting_commentsThreaded'
                ,id: 'modblog-setting-commentsThreaded'
                ,fieldLabel: _('modblog.setting.commentsThreaded')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsThreaded_desc')
                ,anchor: '30%'
                ,value: 0
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsThreaded'
                ,html: _('modblog.setting.commentsThreaded_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_commentsReplyResourceId'
                ,id: 'modblog-setting-commentsReplyResourceId'
                ,fieldLabel: _('modblog.setting.commentsReplyResourceId')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsReplyResourceId_desc')
                ,anchor: '30%'
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsReplyResourceId'
                ,html: _('modblog.setting.commentsReplyResourceId_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'numberfield'
                ,name: 'setting_commentsMaxDepth'
                ,id: 'modblog-setting-commentsMaxDepth'
                ,fieldLabel: _('modblog.setting.commentsMaxDepth')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsMaxDepth_desc')
                ,anchor: '30%'
                ,allowDecimals: false
                ,allowNegative: false
                ,value: 5
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsMaxDepth'
                ,html: _('modblog.setting.commentsMaxDepth_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsRequirePreview'
                ,hiddenName: 'setting_commentsRequirePreview'
                ,id: 'modblog-setting-commentsRequirePreview'
                ,fieldLabel: _('modblog.setting.commentsRequirePreview')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsRequirePreview_desc')
                ,anchor: '30%'
                ,value: 0
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsRequirePreview'
                ,html: _('modblog.setting.commentsRequirePreview_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'numberfield'
                ,name: 'setting_commentsCloseAfter'
                ,id: 'modblog-setting-commentsCloseAfter'
                ,fieldLabel: _('modblog.setting.commentsCloseAfter')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsCloseAfter_desc')
                ,anchor: '30%'
                ,allowDecimals: false
                ,allowNegative: false
                ,value: 0
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsCloseAfter'
                ,html: _('modblog.setting.commentsCloseAfter_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_commentsDateFormat'
                ,id: 'modblog-setting-commentsDateFormat'
                ,fieldLabel: _('modblog.setting.commentsDateFormat')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsDateFormat_desc')
                ,anchor: '100%'
                ,value: '%b %d, %Y at %I:%M %p'
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsDateFormat'
                ,html: _('modblog.setting.commentsDateFormat_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsAutoConvertLinks'
                ,hiddenName: 'setting_commentsAutoConvertLinks'
                ,id: 'modblog-setting-commentsAutoConvertLinks'
                ,fieldLabel: _('modblog.setting.commentsAutoConvertLinks')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsAutoConvertLinks_desc')
                ,anchor: '30%'
                ,value: 1
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsAutoConvertLinks'
                ,html: _('modblog.setting.commentsAutoConvertLinks_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'numberfield'
                ,name: 'setting_commentsLimit'
                ,id: 'modblog-setting-commentsLimit'
                ,fieldLabel: _('modblog.setting.commentsLimit')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsLimit_desc')
                ,anchor: '30%'
                ,allowDecimals: false
                ,allowNegative: false
                ,value: 0
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsLimit'
                ,html: _('modblog.setting.commentsLimit_desc')
                ,cls: 'desc-under'

            }]
        },{
            title: ' &#8212; '+_('modblog.settings_comments_display')
            ,anchor: '100%'
            ,defaults: {
                msgTarget: 'under'
            }
            ,items: [{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsUseCss'
                ,hiddenName: 'setting_commentsUseCss'
                ,id: 'modblog-setting-commentsUseCss'
                ,fieldLabel: _('modblog.setting.commentsUseCss')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsUseCss_desc')
                ,anchor: '30%'
                ,value: 1
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsUseCss'
                ,html: _('modblog.setting.commentsUseCss_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_commentsAltRowCss'
                ,id: 'modblog-setting-commentsAltRowCss'
                ,fieldLabel: _('modblog.setting.commentsAltRowCss')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsAltRowCss_desc')
                ,anchor: '100%'
                ,value: 'quip-comment-alt'
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsAltRowCss'
                ,html: _('modblog.setting.commentsAltRowCss_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsGravatar'
                ,hiddenName: 'setting_commentsGravatar'
                ,id: 'modblog-setting-commentsGravatar'
                ,fieldLabel: _('modblog.setting.commentsGravatar')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsGravatar_desc')
                ,anchor: '30%'
                ,value: 1
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsGravatar'
                ,html: _('modblog.setting.commentsGravatar_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_commentsGravatarIcon'
                ,id: 'modblog-setting-commentsGravatarIcon'
                ,fieldLabel: _('modblog.setting.commentsGravatarIcon')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsGravatarIcon_desc')
                ,anchor: '100%'
                ,value: 'identicon'
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsGravatarIcon'
                ,html: _('modblog.setting.commentsGravatarIcon_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'numberfield'
                ,name: 'setting_commentsGravatarSize'
                ,id: 'modblog-setting-commentsGravatarSize'
                ,fieldLabel: _('modblog.setting.commentsGravatarSize')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsGravatarSize_desc')
                ,anchor: '100%'
                ,allowNegative: false
                ,value: 50
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsGravatarSize'
                ,html: _('modblog.setting.commentsGravatarSize_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_commentsNameField'
                ,id: 'modblog-setting-commentsNameField'
                ,fieldLabel: _('modblog.setting.commentsNameField')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsNameField_desc')
                ,anchor: '100%'
                ,value: 'name'
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsNameField'
                ,html: _('modblog.setting.commentsNameField_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsShowAnonymousName'
                ,hiddenName: 'setting_commentsShowAnonymousName'
                ,id: 'modblog-setting-commentsShowAnonymousName'
                ,fieldLabel: _('modblog.setting.commentsShowAnonymousName')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsShowAnonymousName')
                ,anchor: '30%'
                ,value: 0
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsShowAnonymousName'
                ,html: _('modblog.setting.commentsShowAnonymousName_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_commentsAnonymousName'
                ,id: 'modblog-setting-commentsAnonymousName'
                ,fieldLabel: _('modblog.setting.commentsAnonymousName')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsAnonymousName_desc')
                ,anchor: '100%'
                ,value: 'Anonymous'
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsAnonymousName'
                ,html: _('modblog.setting.commentsAnonymousName_desc')
                ,cls: 'desc-under'

            }]
        },{
            title: ' &#8212; '+_('modblog.settings_comments_moderation')
            ,anchor: '100%'
            ,defaults: {
                msgTarget: 'under'
            }
            ,items: [{
                xtype: 'hidden' /* doesnt currently work */
                ,name: 'setting_commentsRequireAuth'
                ,hiddenName: 'setting_commentsRequireAuth'
                ,id: 'modblog-setting-commentsRequireAuth'
                ,fieldLabel: _('modblog.setting.commentsRequireAuth')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsRequireAuth_desc')
                ,anchor: '30%'
                ,value: 0
            },{
                xtype: MODx.expandHelp && false ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsRequireAuth'
                ,html: _('modblog.setting.commentsRequireAuth_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsModerate'
                ,hiddenName: 'setting_commentsModerate'
                ,id: 'modblog-setting-commentsModerate'
                ,fieldLabel: _('modblog.setting.commentsModerate')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsModerate_desc')
                ,anchor: '30%'
                ,value: 1
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsModerate'
                ,html: _('modblog.setting.commentsModerate_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_commentsModerators'
                ,id: 'modblog-setting-commentsModerators'
                ,fieldLabel: _('modblog.setting.commentsModerators')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsModerators_desc')
                ,anchor: '100%'
                ,value: ''
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsModerators'
                ,html: _('modblog.setting.commentsModerators_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'setting_commentsModeratorGroup'
                ,id: 'modblog-setting-commentsModeratorGroup'
                ,fieldLabel: _('modblog.setting.commentsModeratorGroup')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsModeratorGroup_desc')
                ,anchor: '100%'
                ,value: 'Administrator'
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsModeratorGroup'
                ,html: _('modblog.setting.commentsModeratorGroup_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsModerateAnonymousOnly'
                ,hiddenName: 'setting_commentsModerateAnonymousOnly'
                ,id: 'modblog-setting-commentsModerateAnonymousOnly'
                ,fieldLabel: _('modblog.setting.commentsModerateAnonymousOnly')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsModerateAnonymousOnly_desc')
                ,anchor: '30%'
                ,value: 0
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsModerateAnonymousOnly'
                ,html: _('modblog.setting.commentsModerateAnonymousOnly_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsModerateFirstPostOnly'
                ,hiddenName: 'setting_commentsModerateFirstPostOnly'
                ,id: 'modblog-setting-commentsModerateFirstPostOnly'
                ,fieldLabel: _('modblog.setting.commentsModerateFirstPostOnly')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsModerateFirstPostOnly_desc')
                ,anchor: '30%'
                ,value: 1
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsModerateFirstPostOnly'
                ,html: _('modblog.setting.commentsModerateFirstPostOnly_desc')
                ,cls: 'desc-under'

            },{
                html: '<hr />'
                ,border: false
            },{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsReCaptcha'
                ,hiddenName: 'setting_commentsReCaptcha'
                ,id: 'modblog-setting-commentsReCaptcha'
                ,fieldLabel: _('modblog.setting.commentsReCaptcha')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsReCaptcha_desc')
                ,anchor: '30%'
                ,value: 0
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsReCaptcha'
                ,html: _('modblog.setting.commentsReCaptcha_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsDisableReCaptchaWhenLoggedIn'
                ,hiddenName: 'setting_commentsDisableReCaptchaWhenLoggedIn'
                ,id: 'modblog-setting-commentsDisableReCaptchaWhenLoggedIn'
                ,fieldLabel: _('modblog.setting.commentsDisableReCaptchaWhenLoggedIn')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsDisableReCaptchaWhenLoggedIn_desc')
                ,anchor: '30%'
                ,value: 1
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsDisableReCaptchaWhenLoggedIn'
                ,html: _('modblog.setting.commentsDisableReCaptchaWhenLoggedIn_desc')
                ,cls: 'desc-under'

            },{
                html: '<hr />'
                ,border: false
            },{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsAllowRemove'
                ,hiddenName: 'setting_commentsAllowRemove'
                ,id: 'modblog-setting-commentsAllowRemove'
                ,fieldLabel: _('modblog.setting.commentsAllowRemove')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsAllowRemove_desc')
                ,anchor: '30%'
                ,value: 1
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsAllowRemove'
                ,html: _('modblog.setting.commentsAllowRemove_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'numberfield'
                ,name: 'setting_commentsRemoveThreshold'
                ,id: 'modblog-setting-commentsRemoveThreshold'
                ,fieldLabel: _('modblog.setting.commentsRemoveThreshold')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsRemoveThreshold_desc')
                ,anchor: '30%'
                ,allowDecimals: false
                ,allowNegative: false
                ,value: 3
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsRemoveThreshold'
                ,html: _('modblog.setting.commentsRemoveThreshold_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'combo-boolean'
                ,name: 'setting_commentsAllowReportAsSpam'
                ,hiddenName: 'setting_commentsAllowReportAsSpam'
                ,id: 'modblog-setting-commentsAllowReportAsSpam'
                ,fieldLabel: _('modblog.setting.commentsAllowReportAsSpam')
                ,description: MODx.expandHelp ? '' : _('modblog.setting.commentsAllowReportAsSpam_desc')
                ,anchor: '30%'
                ,value: 1
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'modblog-setting-commentsAllowReportAsSpam'
                ,html: _('modblog.setting.commentsAllowReportAsSpam_desc')
                ,cls: 'desc-under'

            }]
        },{
            title: ' &#8212; '+_('modblog.settings_comments_latest')
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