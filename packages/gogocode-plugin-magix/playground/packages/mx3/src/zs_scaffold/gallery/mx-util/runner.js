/*md5:beaad79bccbd4b9423c79af025b43a9e*/
let Magix = require('magix');
let SetRAF = window.requestAnimationFrame || ((fn) => {
    return setTimeout(fn, 16);
});
let CancelRAF = window.cancelAnimationFrame || clearTimeout;
let Now = Date.now || (() => {
    return new Date().getTime();
});
module.exports = {
    '@{task.list}': [],
    '@{task.add}' (interval, fn) {
        let me = this;
        me['@{task.list}'].push({
            i: interval || 15,
            f: fn,
            n: Now()
        });
        me['@{start.work}']();
    },
    '@{task.remove}' (fn) {
        let me = this;
        let q = me['@{task.list}'];
        for (let o, i = 0; i < q.length; i++) {
            o = q[i];
            if (!o.r && o.f == fn) {
                o.r = 1;
                break;
            }
        }
    },
    '@{start.work}' () {
        let me = this;
        if (!me['@{timer.id}']) {
            let run = () => {
                let q = me['@{task.list}'];
                for (let i = 0, o, now; i < q.length; i++) {
                    o = q[i];
                    if (o.r) {
                        q.splice(i--, 1);
                    } else {
                        now = Now();
                        if (now - o.n >= o.i) {
                            o.n = now;
                            Magix.toTry(o.f);
                        }
                    }
                }
                if (!q.length) {
                    CancelRAF(me['@{timer.id}']);
                    delete me['@{timer.id}'];
                } else {
                    me['@{timer.id}'] = SetRAF(run);
                }
            };
            me['@{timer.id}'] = SetRAF(run);
        }
    }
};