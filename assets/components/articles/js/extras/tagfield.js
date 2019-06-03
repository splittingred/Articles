Articles.extra.Tags = function(config) {
    config = config || {};
    Ext.apply(config,{
        ignoreCase: false
        ,valueField: 'tag'
        ,displayField: 'tag'
        ,minChars: 3
    });

    Articles.extra.Tags.superclass.constructor.call(this,config);

    this.addEvents('additem', 'removeitem');
};
Ext.extend(Articles.extra.Tags,Ext.form.ComboBox,{
    mode: 'local'
    ,hideTrigger: true

    ,defaultAutoCreate : {tag: "input", type: "text", size: "24", autocomplete: "on"}

    ,myStore: new Ext.data.ArrayStore({
        autoDestroy: true,
        storeId: 'tagsStore',
        idIndex: 0,
        fields: ['tag']
    })

    ,store: new Ext.data.ArrayStore({
        autoDestroy: true,
        storeId: 'autoCompleteStore',
        idIndex: 0,
        fields: ['tag'],
        data: []
    })

    ,initValue : function(){
        if(this.value !== undefined){
            this.setValue(this.value);
        }else if(!Ext.isEmpty(this.el.dom.value) && this.el.dom.value != this.emptyText){
            this.setValue(this.el.dom.value);
        }
        /**
         * The original value of the field as configured in the {@link #value} configuration, or
         * as loaded by the last form load operation if the form's {@link Ext.form.BasicForm#trackResetOnLoad trackResetOnLoad}
         * setting is <code>true</code>.
         * @type mixed
         * @property originalValue
         */
        this.originalValue = this.getFieldValue();
    }

    ,onFocus : function(){
        this.preFocus();
        if(this.focusClass){
            this.el.addClass(this.focusClass);
        }
        if(!this.hasFocus){
            this.hasFocus = true;
            /**
             * <p>The value that the Field had at the time it was last focused. This is the value that is passed
             * to the {@link #change} event which is fired if the value has been changed when the Field is blurred.</p>
             * <p><b>This will be undefined until the Field has been visited.</b> Compare {@link #originalValue}.</p>
             * @type mixed
             * @property startValue
             */
            this.startValue = this.getFieldValue();
            this.fireEvent('focus', this);
        }
    }

    ,isDirty : function() {
        if(this.disabled || !this.rendered) {
            return false;
        }
        return String(this.getFieldValue()) !== String(this.originalValue);
    }

    ,append : function(v){
        this.setValue([this.getFieldValue(), v].join(''));
    }

    ,getValue: function(){
        var restValues = this.getFieldValue();
        if(restValues == '' || restValues == undefined) restValues = '';

        restValues = restValues.split(/\s*[,]\s*/);

        Ext.each(restValues, function(value){
            var record = new Ext.data.Record({tag: value}, value);
            this.myStore.add([record]);
        }, this);

        return this.myStore.collect('tag').join();
    }

    ,setValue: function(v){
        while(this.insertedTagsEl.dom.firstChild != null){
            this.insertedTagsEl.dom.firstChild.remove();
        }

        this.myStore.clearData();

        if(v instanceof Array){
            v = v.join();
        }

        this.addItems(v);
    }

    ,setFieldValue : function(v){
        var text = v;
        if(this.valueField){
            var r = this.findRecord(this.valueField, v);
            if(r){
                text = r.data[this.displayField];
            }else if(Ext.isDefined(this.valueNotFoundText)){
                text = this.valueNotFoundText;
            }
        }
        this.lastSelectionText = text;
        if(this.hiddenField){
            this.hiddenField.value = Ext.value(v, '');
        }
        Ext.form.ComboBox.superclass.setValue.call(this, text);
        this.value = v;
        return this;
    }

    ,getFieldValue: function(){
        return this.value;
    }

    ,onRender : function(ct, position){
        if(this.hiddenName && !Ext.isDefined(this.submitValue)){
            this.submitValue = false;
        }
        Ext.form.ComboBox.superclass.onRender.call(this, ct, position);

        this.el.parent().wrap({
            tag: 'div'
            ,class: 'bxr-field-tags x-superboxselect' // x-superboxselect class needed to correctly display the tag remove button/cross
        });

        this.el.parent().wrap({
            tag: 'div'
            ,class: 'bxr-field-wrapper'
        });

        this.el.parentNode = this.el.parent().parent().parent();

        Ext.DomHelper.insertAfter(this.el.parent().parent(), {tag: 'ul'});
        Ext.DomHelper.insertAfter(this.el.parent(), {tag: 'button', html: 'Add', class: 'x-btn'});

        this.addButton = this.el.parentNode.child('button');
        this.insertedTagsEl = this.el.parentNode.child('ul');

        this.insertedTagsEl.wrap({tag: 'div', class: 'inserted-tags'});

        this.addButton.on('click', this.addItemsFromField, this);

        if(this.hiddenName){
            this.hiddenField = this.el.insertSibling({tag:'input', type:'hidden', name: this.hiddenName,
                id: (this.hiddenId || Ext.id())}, 'before', true);

        }
        if(Ext.isGecko){
            this.el.dom.setAttribute('autocomplete', 'off');
        }

        if(!this.lazyInit){
            this.initList();
        }else{
            this.on('focus', this.initList, this, {single: true});
        }
    }

    ,addItemsFromField: function(){
        this.addItems(this.getFieldValue());
    }

    ,addItems: function(items){
        items = Ext.isEmpty(items) ? '' : items;
        var values = items.split(/\s*[,]\s*/);
        Ext.each(values, function (value) {
            if(this.ignoreCase){
                value = value.toLowerCase();
            }

            if(value == ''){
                return;
            }

            var item = new Articles.extra.TagsItem({
                owner: this,
                renderTo: this.insertedTagsEl,
                value: value,
                listeners: {
                    remove: function(item){
                        this.fireEvent('removeitem',this,item);
                    },scope: this
                }
            });
            item.render();
            this.fireEvent('additem',this,value);
        }, this);
        this.setFieldValue();
    }

    ,doQuery : function(q, forceAll){
        this.value = q;

        q = Ext.isEmpty(q) ? '' : q;
        q = q.split(',');
        q = q[q.length - 1];
        q = q.replace(/^\s+|\s+$/g, '');

        var qe = {
            query: q,
            forceAll: forceAll,
            combo: this,
            cancel:false
        };
        if(this.fireEvent('beforequery', qe)===false || qe.cancel){
            return false;
        }
        q = qe.query;

        forceAll = qe.forceAll;
        if(forceAll === true || (q.length >= this.minChars)){
            if(this.lastQuery !== q){
                this.lastQuery = q;
                if(this.mode == 'local'){
                    this.selectedIndex = -1;
                    if(forceAll){
                        this.store.clearFilter();
                    }else{
                        this.store.filter(this.displayField, q, true);
                    }
                    this.onLoad();
                }else{
                    this.store.baseParams[this.queryParam] = q;
                    this.store.load({
                        params: this.getParams(q)
                    });
                    this.expand();
                }
            }else{
                this.selectedIndex = -1;
                this.onLoad();
            }
        }
    }

    ,onSelect : function(record, index){
        if(this.fireEvent('beforeselect', this, record, index) !== false){

            var values = this.getFieldValue().split(/\s*[,]\s*/);
            values.pop();
            values.push(record.data[this.valueField || this.displayField]);
            values.push('');
            this.setFieldValue(values.join(', '));
            this.collapse();
            this.fireEvent('select', this, record, index);
        }
    }

});
Ext.reg('bxr-field-tags',Articles.extra.Tags);


Articles.extra.TagsItem = function(config){
    Ext.apply(this,config);
    Ext.ux.form.SuperBoxSelectItem.superclass.constructor.call(this);
    this.addEvents('remove');
};
Ext.extend(Articles.extra.TagsItem,Ext.Component, {
    renderCurrentItem: true
    ,initComponent : function(){
        Articles.extra.TagsItem.superclass.initComponent.call(this);
        this.renderCurrentItem = true;

        var itemsCount = this.owner.myStore.getCount();
        var record = new Ext.data.Record({tag: this.value}, this.value);
        this.owner.myStore.add([record]);

        if(itemsCount == this.owner.myStore.getCount()) this.renderCurrentItem = false;
    },
    onRender : function(ct, position){
        if(!this.renderCurrentItem) return true;
        Articles.extra.TagsItem.superclass.onRender.call(this, ct, position);

        var el = this.el;
        if(el){
            el.remove();
        }

        this.el = el = ct.createChild({ tag: 'li' }, ct.last());
        el.addClass('x-superboxselect-item');

        var btnEl = this.owner.navigateItemsWithTab ? ( Ext.isSafari ? 'button' : 'a') : 'span';

        Ext.apply(el, {
            focus: function(){
                var c = this.down(btnEl +'.x-superboxselect-item-close');
                if(c){
                    c.focus();
                }
            },
            preDestroy: function(){
                this.preDestroy();
            }.createDelegate(this)
        });

        el.update(this.value);

        var cfg = {
            tag: btnEl,
            'class': 'x-superboxselect-item-close',
            tabIndex : this.owner.navigateItemsWithTab ? '0' : '-1'
        };
        if(btnEl === 'a'){
            cfg.href = '#';
        }

        this.lnk = el.createChild(cfg);
        this.lnk.on('click', function(){
            var record = new Ext.data.Record({tag: this.value}, this.value);
            this.el.remove();
            this.owner.myStore.remove(this.owner.myStore.getById(this.value));

            this.fireEvent('remove',this,this.value);
        }, this);
    },
    onDestroy : function() {
        Ext.destroy(
            this.lnk,
            this.el
        );

        Articles.extra.TagsItem.superclass.onDestroy.call(this);
    }
});