
Articles.page.UpdateArticle = function(config) {
    config = config || {record:{}};
    config.record = config.record || {};
    Ext.applyIf(config,{
        panelXType: 'modx-panel-article'
    });
    config.canDuplicate = false;
    config.canDelete = false;
    Articles.page.UpdateArticle.superclass.constructor.call(this,config);
};
Ext.extend(Articles.page.UpdateArticle,MODx.page.UpdateResource,{
	doesButtonExist: function(btnArray, lexiconKey) {
		var exists = false, _k = 0;
		btnArray.map(function(item) {
			if(lexiconKey == item.text) exists = _k;
			_k++;
		});
		return exists;
	}
    ,getButtons: function(cfg) {
		var btns = MODx.page.UpdateResource.prototype.getButtons(cfg); //[];

        if (cfg.canSave == 1 && this.doesButtonExist(btns, _('save') === false)) {
            btns.push({
                process: (MODx.config.connector_url) ? 'resource/update' : 'update'
                ,text: _('save')
                ,cls: 'primary-button'
                ,method: 'remote'
                ,checkDirty: cfg.richtext || MODx.request.activeSave == 1 ? false : true
                ,keys: [{
                    key: MODx.config.keymap_save || 's'
                    ,ctrl: true
                }]
            });
            btns.push('-');
        } else if (cfg.locked && !this.doesButtonExist(btns, _('locked'))) {
            btns.push({
                text: cfg.lockedText || _('locked')
                ,handler: Ext.emptyFn
                ,disabled: true
            });
            btns.push('-');
        }
	    if(cfg.publish_document && !this.doesButtonExist(btns, _('articles.article_publish'))) {
	        btns.push({
	            text: _('articles.article_publish')
	            ,id: 'modx-article-publish'
	            ,hidden: cfg.record.published ? true : false
	            ,handler: this.publishArticle
	        });
	        btns.push({
	            text: _('articles.article_unpublish')
	            ,id: 'modx-article-unpublish'
	            ,hidden: cfg.record.published ? false : true
	            ,handler: this.unpublishArticle
	        });
		    btns.push('-');
	    }

		var _view = {
			process: 'preview'
			,text: _('view')
			,handler: this.preview
			,scope: this
		}, _idx = this.doesButtonExist(btns, _('view'));

		if(!_idx) {
			btns.push(_view);
			btns.push('-');
		} else {
			btns.splice(_idx,1, _view);
		}

		var _cnl = {
			process: 'cancel'
			,text: _('cancel')
			,handler: this.cancel
			,scope: this
		}, _idx = this.doesButtonExist(btns, _('cancel'));

		if(!_idx) {
			btns.push(_cnl);
			btns.push('-');
		} else {
			btns.splice(_idx,1, _cnl);
		}

		if(!this.doesButtonExist(btns, _('help_ex'))) {
	        btns.push({
	            text: _('help_ex')
	            ,handler: MODx.loadHelpPane
	        });
		}

		// remove duplicate spacings
		for(var i=0; i<=(btns.length - 1); i++) {
			var item = btns[i];
			if(item != '-') continue;
			if(btns[i+1] == '-' || (btns[i+1] && btns[i+1].hidden == true)) btns.splice(i,1);
		}

		return btns;
    }

    ,publishArticle: function(btn,e) {
        MODx.Ajax.request({
            url: (MODx.config.connector_url) ? MODx.config.connector_url : MODx.config.connectors_url+'resource/index.php'
            ,params: {
                action: (MODx.config.connector_url) ? 'resource/publish' : 'publish'
                ,id: MODx.request.id
            }
            ,listeners: {
                'success':{fn:function(r) {
                    var p = Ext.getCmp('modx-resource-published');
                    if (p) {
                        p.setValue(1);
                    }
                    var po = Ext.getCmp('modx-resource-publishedon');
                    if (po) {
                        po.setValue(r.object.publishedon);
                    }
                    var bp = Ext.getCmp('modx-article-publish');
                    if (bp) {
                        bp.hide();
                    }
                    var bu = Ext.getCmp('modx-article-unpublish');
                    if (bu) {
                        bu.show();
                    }
                },scope:this}
            }
        });
    }

    ,unpublishArticle: function(btn,e) {
        MODx.Ajax.request({
            url: (MODx.config.connector_url) ? MODx.config.connector_url : MODx.config.connectors_url+'resource/index.php'
            ,params: {
                action: (MODx.config.connector_url) ? 'resource/unpublish' : 'unpublish'
                ,id: MODx.request.id
            }
            ,listeners: {
                'success':{fn:function(r) {
                    var p = Ext.getCmp('modx-resource-published');
                    if (p) {
                        p.setValue(0);
                    }
                    var po = Ext.getCmp('modx-resource-publishedon');
                    if (po) {
                        po.setValue('');
                    }
                    var bp = Ext.getCmp('modx-article-publish');
                    if (bp) {
                        bp.show();
                    }
                    var bu = Ext.getCmp('modx-article-unpublish');
                    if (bu) {
                        bu.hide();
                    }
                },scope:this}
            }
        });
    }
    
    ,cancel: function(btn,e) {
        var updatePage = MODx.action ? MODx.action['resource/update'] : 'resource/update';
        var fp = Ext.getCmp(this.config.formpanel);
        if (fp && fp.isDirty()) {
            Ext.Msg.confirm(_('warning'),_('resource_cancel_dirty_confirm'),function(e) {
                if (e == 'yes') {
                    MODx.releaseLock(MODx.request.id);
                    MODx.sleep(400);
                    MODx.loadPage(updatePage, 'id='+this.config.record['parent']);
                }
            },this);
        } else {
            MODx.releaseLock(MODx.request.id);
            MODx.loadPage(updatePage, 'id='+this.config.record['parent']);
        }
    }
});
Ext.reg('articles-page-article-update',Articles.page.UpdateArticle);



Articles.panel.Article = function(config) {
    config = config || {};
    Ext.applyIf(config,{
    });
    Articles.panel.Article.superclass.constructor.call(this,config);
};
Ext.extend(Articles.panel.Article,MODx.panel.Resource,{
    getFields: function(config) {
        var it = [];
        it.push({
            title: _('articles.article')
            ,id: 'modx-resource-settings'
            ,cls: 'modx-resource-tab'
            ,layout: 'form'
            ,labelAlign: 'top'
            ,labelSeparator: ''
            ,bodyCssClass: 'tab-panel-wrapper main-wrapper'
            ,autoHeight: true
            ,defaults: {
                border: false
                ,msgTarget: 'under'
                ,width: 400
            }
            ,items: this.getMainFields(config)
        });
        if (config.record.commentsEnabled) {
            it.push({
                title: _('articles.comments')
                ,id: 'articles-tab-comments'
                ,autoHeight: true
                ,items: [{
                    html: _('articles.comments.intro_msg')
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
                        ,thread: 'article-b'+config.record['parent']+'-'+config.record.id
                        ,preventRender: true
                        ,width: '98%'
                        ,bodyStyle: 'padding: 0'
                    }]
                }]
            });
        }
        /*
        it.push({
            title: _('articles.statistics')
            ,autoHeight: true
            ,items: [{
                html: _('articles.statistics.intro_msg')
                ,border: false
                ,bodyCssClass: 'panel-desc'
            },{
                xtype: 'panel'
                ,bodyCssClass: 'main-wrapper'
                ,autoHeight: true
                ,border: false
                ,items: [{
                    html: '<p>Statistics goes here.</p>'
                    ,border: false
                }]
            }]
        });*/
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
        
        if (MODx.config.tvs_below_content == 1) {
            var tvs = this.getTemplateVariablesPanel(config);
            tvs.style = 'margin-top: 10px;visibility: visible';
            its.push(tvs);
        }
        return its;
    }
    
    ,getMainLeftFields: function(config) {
        config = config || {record:{}};
        var mlf = [{
            xtype: 'textfield'
            ,fieldLabel: _('articles.article_title')+'<span class="required">*</span>'
            ,description: '<b>[[*pagetitle]]</b><br />'+_('articles.article_title_help')
            ,name: 'pagetitle'
            ,id: 'modx-resource-pagetitle'
            ,maxLength: 255
            ,anchor: '100%'
            ,allowBlank: false
            ,enableKeyEvents: true
            ,listeners: {
                'keyup': {scope:this,fn:function(f,e) {
                    var title = Ext.util.Format.stripTags(f.getValue());
                    Ext.getCmp('modx-resource-header').getEl().update('<h2>'+title+'</h2>');
                }}
            }
        }];

        if (MODx.config['articles.article_show_longtitle']) {
            mlf.push({
                xtype: 'textfield'
                ,fieldLabel: _('resource_longtitle')
                ,description: '<b>[[*longtitle]]</b><br />'+_('resource_longtitle')
                ,name: 'longtitle'
                ,id: 'modx-resource-longtitle'
                ,anchor: '100%'
                ,value: config.record.longtitle || ''
            });
        }

        mlf.push({
            xtype: 'textarea'
            ,fieldLabel: _('articles.article_summary')
            ,description: '<b>[[*introtext]]</b><br />'+_('articles.article_summary')
            ,name: 'introtext'
            ,id: 'modx-resource-introtext'
            ,anchor: '100%'
            ,value: config.record.introtext || ''
        });


        var ct = this.getContentField(config);
        if (ct) {
            mlf.push(ct);
        }
        return mlf;
    }

    ,getContentField: function(config) {
        return [{
            id: 'modx-content-above'
            ,border: false
        },{
            xtype: 'textarea'
            ,fieldLabel: _('articles.article_content')
            ,name: 'ta'
            ,id: 'ta'
            ,anchor: '100%'
            ,height: 400
            ,grow: false
            ,value: (config.record.content || config.record.ta) || ''
            ,itemCls: 'contentblocks_replacement'
        },{
            id: 'modx-content-below'
            ,border: false
        }];
    }


    ,getMainRightFields: function(config) {
        config = config || {};
        return [{
            xtype: 'fieldset'
            ,title: _('articles.publishing_information')
            ,id: 'articles-box-publishing-information'
            ,defaults: {
                msgTarget: 'under'
            }
            ,items: [{
                xtype: 'articles-combo-publish-status'
                ,id: 'modx-resource-published'
                ,name: 'published'
                ,hiddenName: 'published'
                ,fieldLabel: _('articles.status')
            },{
                xtype: 'xdatetime'
                ,fieldLabel: _('resource_publishedon')
                ,description: '<b>[[*publishedon]]</b><br />'+_('resource_publishedon_help')
                ,name: 'publishedon'
                ,id: 'modx-resource-publishedon'
                ,allowBlank: true
                ,dateFormat: MODx.config.manager_date_format
                ,timeFormat: MODx.config.manager_time_format
                ,dateWidth: 120
                ,timeWidth: 120
                ,value: config.record.publishedon
            },{
                xtype: MODx.config.publish_document ? 'xdatetime' : 'hidden'
                ,fieldLabel: _('resource_publishdate')
                ,description: '<b>[[*pub_date]]</b><br />'+_('resource_publishdate_help')
                ,name: 'pub_date'
                ,id: 'modx-resource-pub-date'
                ,allowBlank: true
                ,dateFormat: MODx.config.manager_date_format
                ,timeFormat: MODx.config.manager_time_format
                ,dateWidth: 120
                ,timeWidth: 120
                ,value: config.record.pub_date
            },{
                xtype: MODx.config.publish_document ? 'xdatetime' : 'hidden'
                ,fieldLabel: _('resource_unpublishdate')
                ,description: '<b>[[*unpub_date]]</b><br />'+_('resource_unpublishdate_help')
                ,name: 'unpub_date'
                ,id: 'modx-resource-unpub-date'
                ,allowBlank: true
                ,dateFormat: MODx.config.manager_date_format
                ,timeFormat: MODx.config.manager_time_format
                ,dateWidth: 120
                ,timeWidth: 120
                ,value: config.record.unpub_date
            },{
                xtype: MODx.config.publish_document ? 'modx-combo-user' : 'hidden'
                ,fieldLabel: _('resource_createdby')
                ,description: '<b>[[*createdby]]</b><br />'+_('resource_createdby_help')
                ,name: 'created_by'
                ,hiddenName: 'createdby'
                ,id: 'modx-resource-createdby'
                ,allowBlank: true
                ,width: 300
                ,value: config.record.createdby
            },{
                xtype: 'xcheckbox'
                ,name: 'clearCache'  
                ,fieldLabel:_('resource_syncsite')
                ,description:_('resource_syncsite_help')
                ,id: 'modx-resource-clearcache'
                ,value: 1
                ,checked:true
            }]
        },{
            html: '<hr />'
            ,border: false
        },{
            xtype: 'fieldset'
            ,title: _('articles.article_options')
            ,id: 'articles-box-options'
            ,defaults: {
                msgTarget: 'under'
            }
            ,items: [{
                xtype: 'modx-combo-template'
                ,fieldLabel: _('resource_template')
                ,description: '<b>[[*template]]</b><br />'+_('resource_template_help')
                ,name: 'template'
                ,id: 'modx-resource-template'
                ,anchor: '100%'
                ,editable: false
            },{
                xtype: 'textfield'
                ,fieldLabel: _('articles.article_alias')
                ,description: '<b>[[*alias]]</b><br />'+_('articles.article_alias_help')
                ,name: 'alias'
                ,id: 'modx-resource-alias'
                ,maxLength: 100
                ,anchor: '100%'
                ,value: config.record.alias || ''

            },{
                xtype: 'bxr-field-tags'
                ,fieldLabel: _('articles.article_tags')
                ,description: _('articles.article_tags_help')
                ,name: 'fake_tags'
                ,id: 'modx-resource-tags'
                ,anchor: '100%'
                ,listeners: {
                    removeitem: function(){
                        MODx.fireResourceFormChange();
                    }
                    ,additem: function(){
                        MODx.fireResourceFormChange();
                    }
                    ,select: function(){
                        MODx.fireResourceFormChange();
                    }
                }
            },{
                xtype: 'hidden'
                ,name: 'menutitle'
                ,id: 'modx-resource-menutitle'
                ,value: config.record.menutitle || ''

            },{
                xtype: 'hidden'
                ,name: 'link_attributes'
                ,id: 'modx-resource-link-attributes'
                ,value: config.record.link_attributes || ''

            },{
                xtype: 'hidden'
                ,name: 'hidemenu'
                ,id: 'modx-resource-hidemenu'
                ,value: config.record.hidemenu

            }]
        },{
            html: '<hr />'
            ,border: false
        },{
            xtype: 'fieldset'
            ,title: _('articles.article_edit_options')
            ,id: 'articles-edit-options'
            ,defaults: {
                msgTarget: 'under'
            }
            ,items: [{
                xtype: 'xcheckbox'
                ,name: 'richtext'
                ,fieldLabel:_('resource_richtext')
                ,description:_('resource_richtext_help')
                ,id: 'modx-resource-richtext'
                ,value: parseInt(config.record.richtext)
                ,checked:config.record.richtext 
            }]
            
            
        }]
    }

    ,setup: function(){
        Articles.panel.Article.superclass.setup.call(this);

        var tagField = this.find('xtype', 'bxr-field-tags');

        if(tagField.length > 0){
            tagField = tagField[0];

            tagField.disable();
            var currentValue = tagField.getValue();
            tagField.setFieldValue(_('articles.loading') + '...');
            if(currentValue == '') {
                tagField.setValue(this.config.record.tags);
            }

            MODx.Ajax.request({
                url: Articles.connector_url
                ,params: {
                    action: 'extras/gettags'
                    ,container: this.config.record['parent']
                }
                ,listeners: {
                    'success':{fn:function(r){
                        tagField.store = new Ext.data.ArrayStore({
                            autoDestroy: true,
                            storeId: 'autoCompleteStore',
                            idIndex: 0,
                            fields: ['tag'],
                            data: r.object
                        });

                        tagField.setFieldValue();
                        tagField.enable();

                    },scope:this}
                }
            });
        }
    }

    ,beforeSubmit: function(o) {
        var d = {};

        var tags = this.find('xtype', 'bxr-field-tags')[0];
        if(tags) {d.tags = tags.getValue()}

        Ext.apply(o.form.baseParams,d);
    }

    ,success: function(o) {
        Articles.panel.Article.superclass.success.call(this, o);

        var tags = this.find('xtype', 'bxr-field-tags')[0];
        if(tags) {
            tags.setValue(o.result.object.tags);
        }
    }
});
Ext.reg('modx-panel-article',Articles.panel.Article);
