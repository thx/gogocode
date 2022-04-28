/*md5:434146750bd1321df2b9bb270df39ed3*/
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
Magix.applyStyle('@../mx-calendar/index.less');
let parseTime = time => {
    if (!time) {
        let d = new Date();
        time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    }
    let ts = time.split(':');
    if (ts.length != 3) {
        throw new Error('bad time:' + time);
    }
    return {
        '@{hour}': parseInt(ts[0], 10) || 0,
        '@{minute}': parseInt(ts[1], 10) || 0,
        '@{second}': parseInt(ts[2], 10) || 0
    };
};
let parseType = type => {
    if (!type) {
        type = 'all';
    }
    let enables = {
        '@{hour}': true,
        '@{minute}': true,
        '@{second}': true
    };
    let keysMap = {
        hour: '@{hour}',
        minute: '@{minute}',
        second: '@{second}'
    };
    if (type != 'all') {
        for (let p in keysMap) {
            if (type.indexOf(p) === -1) {
                delete enables[keysMap[p]];
            }
        }
    }
    return enables;
};
let format = t => {
    if (t < 10) return '0' + t;
    return t;
};
export default View.extend({
    tmpl: '@content.html',
    init(extra) {

        this.assign(extra);
    },
    assign(extra) {
        let that = this;

        // 当前数据截快照
        that.updater.snapshot();

        //你可以在这里对数据data进行加工,然后通过set方法放入到updater中
        let time = parseTime(extra.time);
        let types = parseType(extra.types);
        that.updater.set({
            format,
            time,
            types
        });

        let altered = that.updater.altered();
        return altered;
    },
    render() {
        this.updater.digest();
    },
    val(v) {
        let updater = this.updater;
        if (v) {
            updater.digest({
                time: parseTime(v)
            });
        }
        let time = updater.get('time');
        return format(time['@{hour}']) + ':' + format(time['@{minute}']) + ':' + format(time['@{second}']);
    },
    '@{change.time.by.type}'(type, increase) {
        let me = this;
        let time = me.updater.get('time');
        let max = type == '@{hour}' ? 23 : 59;
        if (increase) {
            time[type]++;
        } else {
            time[type]--;
        }
        if (time[type] > max) {
            time[type] = 0;
        } else if (time[type] < 0) {
            time[type] = max;
        }
        me.updater.digest({
            time
        });
    },
    '@{fire.event}'() {
        let me = this;
        let node = $('#' + me.id);
        let time = me.updater.get('time');
        node.trigger({
            type: 'change',
            time: format(time['@{hour}']) + ':' + format(time['@{minute}']) + ':' + format(time['@{second}'])
        });
    },
    '@{change}<click>'(e) {
        let me = this;
        if (!me['@{fast.change.start}']) {
            let params = e.params;
            me['@{change.time.by.type}'](params.type, params.inc);
            me['@{fire.event}']();
        }
    },
    '@{set}<change>'(e) {
        e.stopPropagation();

        let type = e.params.type;
        let max = type == '@{hour}' ? 23 : 59;
        let value = e.eventTarget.value;
        let v = parseInt(value, 10);
        let { time } = this.updater.get();
        let fire = false;
        if (v || v === 0) {
            if (v < 0) v = 0;
            else if (v > max) v = max;
            if (v !== time[type]) {
                fire = true;
                time[type] = v;
            } else {
                time[type] = format(v);
            }
        } else {
            time[type] = format(time[type]);
        }
        this.updater.digest({
            time
        });
        if (fire) {
            this['@{fire.event}']();
        }
    },
    '@{fast.start}<mousedown>'(e) {
        let me = this;
        let params = e.params;
        me['@{long.tap.timer}'] = setTimeout(me.wrapAsync(() => {
            me['@{interval.timer}'] = setInterval(me.wrapAsync(() => {
                me['@{fast.change.start}'] = true;
                me['@{change.time.by.type}'](params.type, params.inc);
            }), 50);
        }), 250);
    },
    '@{press.check}<keydown>'(e) {
        if (e.keyCode == 38 || e.keyCode == 40) {
            e.preventDefault();
            let me = this;
            me['@{change.time.by.type}'](e.params.type, e.keyCode == 38);
            clearTimeout(me['@{event.dealy.timer}']);
            me['@{event.dealy.timer}'] = setTimeout(me.wrapAsync(() => {
                me['@{fire.event}']();
            }), 100);
        }
    },
    '$doc<mouseup>'() {
        let me = this;
        clearTimeout(me['@{long.tap.timer}']);
        clearInterval(me['@{interval.timer}']);
        setTimeout(me.wrapAsync(() => {
            if (me['@{fast.change.start}']) {
                me['@{fire.event}']();
            }
            delete me['@{fast.change.start}'];
        }), 0);
    }
});