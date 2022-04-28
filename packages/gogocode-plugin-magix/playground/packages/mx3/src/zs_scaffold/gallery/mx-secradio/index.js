/*md5:d964e8236ea944ceed6e113918080a18*/
let Magix = require('magix');
let I18n = require('../mx-medusa/util');
Magix.applyStyle('@index.less');
module.exports = Magix.View.extend({
    tmpl: '@index.html',
    init(extra) {
        //初始化时保存一份当前数据的快照
        this.updater.snapshot();

        this.$map = {};
        this.assign(extra);
    },
    assign(extra) {
        let that = this;
        let altered = that.updater.altered();

        let needExpand = (extra.needExpand + '' !== 'false');
        let close = (extra.close + '' === 'true');
        // 没有展开收起的时候一定是展开的
        if(!needExpand){
            close = false;
        }

        let parentTextKey = extra.parentTextKey || 'text',
            textKey = extra.textKey || 'text',
            valueKey = extra.valueKey || 'value',
            subKey = extra.subKey || 'subs';

        let list = [];
        (extra.list || []).forEach(origin => {
            let item  = {
                text: origin[parentTextKey],
                subs: origin[subKey].map(sub => {
                    return {
                        text: sub[textKey],
                        value: sub[valueKey]
                    }
                })
            }
            item.pValue = that['@{getPValue}'](item);
            item.close = that.$map[item.pValue] || close;

            list.push(item);
        })

        let selected = extra.selected || '';

        let parentPrefix = extra.parentPrefix || '',
            prefix = extra.prefix || '';
        let maxHeight = extra.maxHeight || '';
        that.updater.set({
            viewId: that.id,
            needExpand,
            close,
            parentPrefix,
            prefix,
            maxHeight,
            list,
            selected,
            text: {
                expand: I18n['secradio.expand'],
                collapse: I18n['secradio.collapse']
            }
        })

        if (!altered) {
            altered = that.updater.altered();
        }
        if (altered) {
            // 组件有更新，真个节点会全部需要重新初始化
            that.updater.snapshot();
            return true;
        }
        return false;
    },
    render: function () {
        this.updater.digest();
        let selected = this.updater.get('selected');
        $('#' + this.id).val(selected);
    },

    '@{getPValue}'(item){
        let subValues = item.subs.map(sub => {
            return sub.value + '';
        })
        return subValues.sort().join('_');
    },

    '@{toggleAll}<click>'(event) {
        let that = this;
        let close = !this.updater.get('close');
        let list = this.updater.get('list');

        list.forEach(item => {
            item.close = close;

            if(close){
                that.$map[item.pValue] = true;
            }else{
                delete that.$map[item.pValue];
            }
        })
        that.updater.digest({
            close,
            list
        })
    },
    '@{toggleOne}<click>'(event) {
        let that = this;
        let index = event.params.index;
        let close = true,
            list = this.updater.get('list');
        list.forEach((item, i) => {
            if(index == i){
                item.close = !item.close;
                if(item.close){
                    that.$map[item.pValue] = true;
                }else{
                    delete that.$map[item.pValue];
                }
            }
            close = close && item.close;
        })
        that.updater.digest({
            close,
            list
        })
    },
    '@{check}<change>'(event){
        let selected = event.params.value;
        this.updater.digest({
            selected
        })
        $('#' + this.id).val(selected)
    }
});