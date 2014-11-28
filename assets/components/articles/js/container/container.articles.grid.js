Articles.grid.ContainerArticles = function(config) {
    config = config || {};
    this.sm = new Ext.grid.CheckboxSelectionModel();
    this.exp = new Ext.grid.RowExpander({
        tpl : new Ext.Template(
            '<p class="desc">{content}</p>'
        )
    });
    Ext.applyIf(config,{
        id: 'articles-grid-container-articles'
        ,title: _('articles.articles')
        ,url: Articles.connector_url
        ,baseParams: {
            action: 'article/getList'
            ,'parent': config.resource
        }
        ,saveParams: {
            resource: config.resource
        }
        ,fields: ['id','pagetitle',
                  'publishedon','publishedon_date','publishedon_time',
                  'uri','uri_override','preview_url',
                  'createdby','createdby_username','tags','categories',
                  'actions','action_edit','content','comments']
        ,paging: true
        ,remoteSort: true
        ,cls: 'articles-grid'
        ,bodyCssClass: 'grid-with-buttons'
        ,sm: this.sm
        ,plugins: [this.exp]
        ,emptyText: _('articles.articles_none')
        ,columns: [this.sm,this.exp,{
            header: _('articles.publishedon')
            ,dataIndex: 'publishedon'
            ,width: 80
            ,sortable: true
            ,renderer: {fn:this._renderPublished,scope:this}
        },{
            header: _('articles.article_title')
            ,dataIndex: 'pagetitle'
			,id: 'main'
            ,width: 200
            ,sortable: true
            ,renderer: {fn:this._renderPageTitle,scope:this}
        },{
            header: _('articles.author')
            ,dataIndex: 'createdby_username'
            ,width: 150
            ,sortable: true
            ,renderer: {fn:this._renderAuthor,scope:this}
        },{
            header: '<img src="'+Articles.assets_url+'images/comments-icon-w.png" alt="" class="articles-comments-col-header" />'
            ,dataIndex: 'comments'
            ,width: 50
            ,sortable: true
            ,hidden: !Articles.commentsEnabled
            ,renderer: {fn:this._renderComments,scope:this}
        },{
            header: _('articles.tags')
            ,dataIndex: 'tags'
            ,width: 200
            ,sortable: true
        }]
        ,tbar: [{
            text: _('articles.article_create')
            ,cls: 'primary-button'
            ,handler: this.createArticle
            ,scope: this
        },{
            text: _('bulk_actions')
            ,menu: [{
                text: _('articles.article_selected_publish')
                ,handler: this.publishSelected
                ,scope: this
            },{
                text: _('articles.article_selected_unpublish')
                ,handler: this.unpublishSelected
                ,scope: this
            },'-',{
                text: _('articles.article_selected_delete')
                ,handler: this.deleteSelected
                ,scope: this
            },{
                text: _('articles.article_selected_undelete')
                ,handler: this.undeleteSelected
                ,scope: this
            }]
        },'-',{
            text: _('articles.articles_import')
            ,handler: this.importArticles
            ,scope: this

        },'->',{
            xtype: 'articles-combo-filter-status'
            ,id: 'articles-grid-filter-status'
            ,value: ''
            ,listeners: {
                'select': {fn:this.filterStatus,scope:this}
            }
        },{
            xtype: 'textfield'
            ,name: 'search'
            ,id: 'articles-article-search'
            ,cls: 'x-form-filter'
            ,emptyText: _('search_ellipsis')
            ,listeners: {
                'change': {fn: this.search, scope: this}
                ,'render': {fn: function(cmp) {
                    new Ext.KeyMap(cmp.getEl(), {
                        key: Ext.EventObject.ENTER
                        ,fn: function() {
                            this.fireEvent('change',this.getValue());
                            this.blur();
                            return true;}
                        ,scope: cmp
                    });
                },scope:this}
            }
        },{
            xtype: 'button'
            ,id: 'modx-filter-clear'
            ,cls: 'x-form-filter-clear'
            ,text: _('filter_clear')
            ,listeners: {
                'click': {fn: this.clearFilter, scope: this}
            }
        }]
    });
    Articles.grid.ContainerArticles.superclass.constructor.call(this,config);
    this._makeTemplates();
    //this.on('rowclick',MODx.fireResourceFormChange);
    this.on('click', this.handleButtons, this);
};
Ext.extend(Articles.grid.ContainerArticles,MODx.grid.Grid,{
    getMenu: function() {
        var r = this.getSelectionModel().getSelected();
        var p = r.data.perm;

        var m = [];

        m.push({
           text: _('articles.article_edit')
           ,handler: this.editArticle
        });
        m.push({
           text: _('articles.article_duplicate')
           ,handler: this.duplicateArticle
        });
        return m;
    }
    ,filterStatus: function(cb,nv,ov) {
        this.getStore().baseParams.filter = Ext.isEmpty(nv) || Ext.isObject(nv) ? cb.getValue() : nv;
        this.getBottomToolbar().changePage(1);
        this.refresh();
        return true;
    }
    
    ,search: function(tf,newValue,oldValue) {
        var nv = newValue || tf;
        this.getStore().baseParams.query = Ext.isEmpty(nv) || Ext.isObject(nv) ? '' : nv;
        this.getBottomToolbar().changePage(1);
        this.refresh();
        return true;
    }
    ,clearFilter: function() {
    	this.getStore().baseParams = {
            action: 'article/getList'
            ,'parent': this.config.resource
    	};
        Ext.getCmp('articles-article-search').reset();
    	this.getBottomToolbar().changePage(1);
        this.refresh();
    }

    ,_makeTemplates: function() {
        this.tplPublished = new Ext.XTemplate('<tpl for=".">'
            +'<div class="articles-grid-date">{publishedon_date}<span class="articles-grid-time">{publishedon_time}</span></div>'
        +'</tpl>',{
			compiled: true
		});
        this.tplComments = new Ext.XTemplate('<tpl for=".">'
            +'<div class="articles-grid-comments"><span>{comments}</span></div>'
        +'</tpl>',{
			compiled: true
		});
        this.tplPageTitle = new Ext.XTemplate('<tpl for="."><div class="article-title-column">'
										    +'<h3 class="main-column"><a href="{action_edit}" title="Edit {pagetitle}">{pagetitle}</a><span class="article-id">({id})</span></h3>'
												+'<tpl if="actions">'
													+'<ul class="actions">'
														+'<tpl for="actions">'
															+'<li><a href="#" class="controlBtn {className}">{text}</a></li>'
														+'</tpl>'
													+'</ul>'
												+'</tpl>'
											+'</div></tpl>',{
			compiled: true
		});
    }

	,_renderPublished:function(v,md,rec) {
		return this.tplPublished.apply(rec.data);
	}
	,_renderPageTitle:function(v,md,rec) {
		return this.tplPageTitle.apply(rec.data);
	}
	,_renderComments:function(v,md,rec) {
		return this.tplComments.apply(rec.data);
	}

    ,editArticle: function(btn,e) {
        MODx.loadPage(MODx.request.a, 'id='+this.menu.record.id);
    }
    ,createArticle: function(btn,e) {
        var tpl = '';
        var panel = Ext.getCmp('modx-panel-resource');
        var createPage = MODx.action ? MODx.action['resource/create'] : 'resource/create';
        if (panel && panel.record) {
            tpl = '&template=' + panel.record.articles_container_settings.articleTemplate
        }
        MODx.loadPage(createPage, 'class_key=Article&parent='+MODx.request.id+'&context_key='+MODx.ctx+tpl);
    }
    ,viewArticle: function(btn,e) {
        window.open(this.menu.record.data.preview_url);
        return false;
    }
    ,duplicateArticle: function(btn,e) {
        var r = {
            resource: this.menu.record.id
            ,is_folder: false
            ,name: _('duplicate_of',{name: this.menu.record.pagetitle})
        };
        var w = MODx.load({
            xtype: 'modx-window-resource-duplicate'
            ,resource: this.menu.record.id
            ,hasChildren: false
            ,listeners: {
                'success': {fn:function() {this.refresh();},scope:this}
            }
        });
        w.config.hasChildren = false;
        w.setValues(r);
        w.show(e.target);
        return false;
    }

    ,importArticles: function(btn,e) {
        var r = {
            'id': MODx.request.id
            ,'service': 'MODX'
        };
        if (!this.windows.importArticles) {
            this.windows.importArticles = MODx.load({
                xtype: 'articles-window-import'
                ,record: r
                ,listeners: {
                    'success': {fn:function(r) {
                        this.refresh();
                    },scope:this}
                }
            });
        }
        this.windows.importArticles.setValues(r);
        this.windows.importArticles.show(e.target);
    }

    ,deleteArticle: function(btn,e) {
        MODx.msg.confirm({
            title: _('articles.article_delete')
            ,text: _('articles.article_delete_confirm')
            ,url: (MODx.config.connector_url) ? MODx.config.connector_url : MODx.config.connectors_url+'resource/index.php'
            ,params: {
                action: (MODx.config.connector_url) ? 'resource/delete' : 'delete'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success':{fn:this.refresh,scope:this}
            }
        });
    }

    ,deleteSelected: function(btn,e) {
        var cs = this.getSelectedAsList();
        if (cs === false) return false;

        MODx.msg.confirm({
            title: _('articles.article_delete_multiple')
            ,text: _('articles.article_delete_multiple_confirm')
            ,url: this.config.url
            ,params: {
                action: 'article/deleteMultiple'
                ,ids: cs
            }
            ,listeners: {
                'success': {fn:function(r) {
                    this.getSelectionModel().clearSelections(true);
                    this.refresh();
                },scope:this}
            }
        });
        return true;
    }

    ,undeleteSelected: function(btn,e) {
        var cs = this.getSelectedAsList();
        if (cs === false) return false;

        MODx.Ajax.request({
            url: this.config.url
            ,params: {
                action: 'article/undeleteMultiple'
                ,ids: cs
            }
            ,listeners: {
                'success': {fn:function(r) {
                    this.getSelectionModel().clearSelections(true);
                    this.refresh();
                },scope:this}
            }
        });
        return true;
    }

    ,undeleteArticle: function(btn,e) {
        MODx.Ajax.request({
            url: (MODx.config.connector_url) ? MODx.config.connector_url : MODx.config.connectors_url+'resource/index.php'
            ,params: {
                action: (MODx.config.connector_url) ? 'resource/undelete' : 'undelete'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success':{fn:this.refresh,scope:this}
            }
        });
    }

    ,publishSelected: function(btn,e) {
        var cs = this.getSelectedAsList();
        if (cs === false) return false;

        MODx.Ajax.request({
            url: this.config.url
            ,params: {
                action: 'article/publishMultiple'
                ,ids: cs
            }
            ,listeners: {
                'success': {fn:function(r) {
                    this.getSelectionModel().clearSelections(true);
                    this.refresh();
                },scope:this}
            }
        });
        return true;
    }

    ,unpublishSelected: function(btn,e) {
        var cs = this.getSelectedAsList();
        if (cs === false) return false;

        MODx.Ajax.request({
            url: this.config.url
            ,params: {
                action: 'article/unpublishMultiple'
                ,ids: cs
            }
            ,listeners: {
                'success': {fn:function(r) {
                    this.getSelectionModel().clearSelections(true);
                    this.refresh();
                },scope:this}
            }
        });
        return true;
    }

    ,publishArticle: function(btn,e) {
        MODx.Ajax.request({
            url: (MODx.config.connector_url) ? MODx.config.connector_url : MODx.config.connectors_url+'resource/index.php'
            ,params: {
                action: (MODx.config.connector_url) ? 'resource/publish' : 'publish'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success':{fn:this.refresh,scope:this}
            }
        });
    }

    ,unpublishArticle: function(btn,e) {
        MODx.Ajax.request({
            url: (MODx.config.connector_url) ? MODx.config.connector_url : MODx.config.connectors_url+'resource/index.php'
            ,params: {
                action: (MODx.config.connector_url) ? 'resource/unpublish' : 'unpublish'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success':{fn:this.refresh,scope:this}
            }
        });
    }


	,handleButtons: function(e){
		var t = e.getTarget();
		var elm = t.className.split(' ')[0];
		if(elm == 'controlBtn') {
			var action = t.className.split(' ')[1];
			var record = this.getSelectionModel().getSelected();
            this.menu.record = record;
			switch (action) {
                case 'delete':
                    this.deleteArticle();
                    break;
                case 'undelete':
                    this.undeleteArticle();
                    break;
                case 'edit':
					this.editArticle();
                    break;
				case 'publish':
					this.publishArticle();
					break;
				case 'unpublish':
					this.unpublishArticle();
					break;
				case 'view':
					this.viewArticle();
					break;
				default:
					window.location = record.data.edit_action;
					break;
            }
		}
	}
});
Ext.reg('articles-grid-container-articles',Articles.grid.ContainerArticles);
