Articles.combo.Tag = function(config, getStore) {
    config = config || {};
    Ext.applyIf(config,{
        name: 'fake_tags'
        ,hiddenName: 'fake_tags'
        ,displayField: 'tag'
        ,valueField: 'tag'
        ,fields: ['tag']
        ,mode: 'remote'
        ,allowAddNewData: true
        ,addNewDataOnBlur : false
        ,itemDelimiterKey: 188
        ,triggerAction: 'all'
        ,typeAheadDelay: 50
        ,minChars: 1
        ,typeAhead: true
        ,editable: true
        ,forceSelection: false
        ,pageSize: 20
        ,url: Articles.connector_url
        ,baseParams: {action: 'extras/gettags'}
    });
    Ext.applyIf(config,{
        store: new Ext.data.JsonStore({
            url: config.url
            ,root: 'results'
            ,totalProperty: 'total'
            ,fields: config.fields
            ,errorReader: MODx.util.JSONReader
            ,baseParams: config.baseParams || {}
            ,remoteSort: config.remoteSort || false
            ,autoDestroy: true
        })
    });
    if (getStore === true) {
        config.store.load();
        return config.store;
    }
    Articles.combo.Tag.superclass.constructor.call(this,config);

    this.on('newitem', function(bs,v,f){
        v = v.split(',');
        Ext.each(v, function(item){
            item = item.replace(/^\s+|\s+$/g, '');
            var newObj = {
                tag: item
            };
            bs.addNewItem(newObj);
        });
    });

    this.on('removeitem', function(combo){
        combo.lastQuery = '';
        MODx.fireResourceFormChange();
    });

    this.on('blur', function(combo){
        if(combo.lastQuery){
            var v = combo.lastQuery.split(',');
            Ext.each(v, function(item){
                item = item.replace(/^\s+|\s+$/g, '');
                var newObj = {
                    tag: item
                };
                combo.addNewItem(newObj);
            });
        }
    });

    this.config = config;
    return this;
};
Ext.extend(Articles.combo.Tag,Ext.ux.form.SuperBoxSelect,{
    setValue : function(value){
        if(!this.rendered){
            this.value = value;
            return;
        }

        this.removeAllItems().resetStore();
        this.remoteLookup = [];

        if(Ext.isEmpty(value)){
            return;
        }

        var values = value;
        if(!Ext.isArray(value)){
            value = '' + value;
            values = value.split(this.valueDelimiter);
        }

        Ext.each(values,function(val){
            val = val.replace(/^\s+|\s+$/g, '');
            var record = this.findRecord(this.valueField, val);
            if(record){
                this.addRecord(record);
            }else if(this.mode === 'remote'){
                this.remoteLookup.push(val);
            }
        },this);

        if(this.mode === 'remote'){
            var q = this.remoteLookup.join(this.queryValuesDelimiter);
            this.doQuery(q,false, true); //3rd param to specify a values query
        }

    }
});
Ext.reg('articles-combo-tag',Articles.combo.Tag);