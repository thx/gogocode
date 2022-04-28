/*md5:e7de27e186833ada072a35ded7bf62d8*/
/**
 * 妈妈bp view分析插件
 */

import Magix from 'magix';
import * as $ from '$';

const projectName = Magix.config('projectName')
let viewMap = {
    sendList: [],
    tId: null
}
const MaxLength = 10
const DELAYTIME = 100
const MUSTRUNTIME = 1000

let Router = Magix.Router
let Loader = Magix.mix({
    hook() {
        try {
            let pool = {};
            let prefix = '';
            let loc = Router.parse();
            seajs.on('exec', e => {
                try {
                    if (!prefix) {
                        prefix = e.uri.replace(e.id + '.js', '');
                    }
                    let start = pool[e.uri];
                    delete pool[e.uri];
                    if (e.id && start) {
                        Loader.fire('resload', {
                            viewpath: e.id,
                            start: start.now,
                            end: performance.now(),
                            href: start.href,
                            spma: start.spma,
                            spmb: start.spmb
                        });
                    }

                    let serviceReg = /\/services\/service\.js$/;
                    if (serviceReg.test(e.uri)) {
                        let exports = e.exports;
                        if (exports) {
                            if (exports.__esModule) {
                                exports = exports.default;
                            }
                        }
                        if (exports) {
                            let hookAPI = name => {
                                let old = exports[name];
                                exports[name] = function (models, ...args) {
                                    try {
                                        if (!$.isArray(models)) {
                                            models = [models];
                                        }
                                        let path = this.owner && this.owner.path || '';
                                        let url = Magix.parseUrl(path);
                                        let getUrl = () => url.path;
                                        for (let i = models.length; i--;) {
                                            let m = models[i];
                                            if (!$.isPlainObject(m)) {
                                                m = {
                                                    name: m
                                                };
                                                models[i] = m;
                                            }
                                            m['@{get.owner.view}'] = getUrl;
                                        }
                                        return old.apply(this, [models].concat(args));
                                    } catch (error) {

                                    }
                                }
                            };
                            hookAPI('fetch');
                            hookAPI('save');
                        }
                    }
                } catch (error) {
                    console.log(error)
                }

            });
            seajs.on('error', e => {
                try {
                    let start = pool[e.uri];
                    if (start) {
                        delete pool[e.uri];
                        let uri = e.uri;
                        if (prefix) {
                            uri = uri.replace(prefix, '').replace(/\.js$/, '');
                        }
                        Loader.fire('resload', {
                            error: true,
                            viewpath: uri,
                            start: start.now,
                            end: performance.now(),
                            href: start.href,
                            spma: start.spma,
                            spmb: start.spmb
                        });
                    }
                } catch (error) {

                }

            });
            seajs.on('fetch', e => {
                try {
                    pool[e.uri] = {
                        href: encodeURIComponent(loc.href),
                        now: performance.now(),
                        spma: window.goldlog && window.goldlog.spm_ab ? window.goldlog.spm_ab[0] : '',
                        spmb: window.goldlog && window.goldlog.spm_ab ? window.goldlog.spm_ab[1] : ''
                    };
                } catch (error) {

                }
            });
            return Loader;
        } catch (error) {
            console.log(error)
        }
    }
}, Magix.Event);
let View = Magix.mix({
    hook() {
        try {
            Magix.View.merge({
                ctor() {
                    let loc = Router.parse();
                    this.on('rendercall', e => {
                        this['@{render.start}'] = performance.now();
                    });
                    this.on('dompatch', e => {
                        try {
                            let path = this.owner && this.owner.path || '';
                            let url = Magix.parseUrl(path);
                            let parent = this.owner.parent()
                            let parentPath = parent && parent.path ? Magix.parseUrl(parent.path) : {}
                            let globalPath = loc.hash.path
                            View.fire('startrender', {
                                viewpath: url.path,
                                parentPath: parentPath.path,
                                globalPath,
                                isFirst: !this['@{dom.patched}'],
                                start: this['@{render.start}'],
                                end: performance.now(),
                                href: encodeURIComponent(loc.href),
                                spma: window.goldlog && window.goldlog.spm_ab ? window.goldlog.spm_ab[0] : '',
                                spmb: window.goldlog && window.goldlog.spm_ab ? window.goldlog.spm_ab[1] : ''
                            });
                            this['@{dom.diff.start}'] = performance.now();
                        } catch (error) {

                        }

                    });
                    this.on('domready', e => {
                        try {
                            let path = this.owner && this.owner.path || '';
                            let url = Magix.parseUrl(path);
                            View.fire('update', {
                                viewpath: url.path,
                                isFirst: !this['@{dom.patched}'],
                                start: this['@{dom.diff.start}'],
                                end: performance.now(),
                                href: encodeURIComponent(loc.href),
                                spma: window.goldlog && window.goldlog.spm_ab ? window.goldlog.spm_ab[0] : '',
                                spmb: window.goldlog && window.goldlog.spm_ab ? window.goldlog.spm_ab[1] : ''
                            });
                            this['@{dom.patched}'] = 1;
                        } catch (error) {

                        }
                    });
                }
            });
            return View;
        } catch (error) {
            console.log(error)
        }

    }
}, Magix.Event);

let VOM = Magix.mix({
    hook() {
        try {
            let rootId = Magix.config('rootId');
            let now = performance.now();
            let loc = Router.parse();
            let resume = (vf) => {
                vf.on('created', () => {
                    try {
                        VOM.fire('pageready', {
                            start: now,
                            end: performance.now(),
                            href: encodeURIComponent(loc.href),
                            spma: window.goldlog && window.goldlog.spm_ab ? window.goldlog.spm_ab[0] : '',
                            spmb: window.goldlog && window.goldlog.spm_ab ? window.goldlog.spm_ab[1] : ''
                        });
                    } catch (error) {

                    }

                });
                vf.on('alter', () => {
                    now = performance.now();
                });
            }
            let watch = e => {
                rootId = Magix.config('rootId');
                if (e.vframe.id == rootId) {
                    Magix.Vframe.off('add', watch);
                    resume(e.vframe);
                }
            };
            let vf = Magix.Vframe.get(rootId);
            if (vf) {
                resume(vf);
            } else {
                Magix.Vframe.on('add', watch);
            }
            return VOM;
        } catch (error) {
            console.log(error)
        }
    }
}, Magix.Event);

let Service = Magix.mix({
    hook() {
        try {

            let loc = Router.parse();
            let hookService = (service) => {
                //console.log(service);
                service.on('begin', e => {
                    try {
                        e.bag.set('@{request.start}', {
                            now: performance.now(),
                            href: encodeURIComponent(loc.href),
                            spma: window.goldlog && window.goldlog.spm_ab ? window.goldlog.spm_ab[0] : '',
                            spmb: window.goldlog && window.goldlog.spm_ab ? window.goldlog.spm_ab[1] : ''
                        });
                    } catch (error) {

                    }

                });
                service.on('end', e => {
                    try {
                        let bag = e.bag;
                        let start = bag.get(['@{request.start}']);
                        if (start) {
                            let getUrl = bag.get(['@{get.owner.view}']);
                            if (getUrl) {
                                let xhr = bag.get('xhr') || {}
                                let eagleeyeId = ''
                                if (xhr.getResponseHeader) {
                                    eagleeyeId = xhr.getResponseHeader('eagleeye-traceid')
                                }
                                Service.fire('complete', {
                                    viewpath: getUrl(),
                                    url: bag.get('url'),
                                    method: bag.get('method'),
                                    // apiParams: JSON.stringify(bag.get('params')),
                                    eagleeyeId,
                                    error: e.error || false,
                                    start: start.now,
                                    end: performance.now(),
                                    href: start.href,
                                    spma: start.spma,
                                    spmb: start.spmb
                                });
                            }
                        } else {
                            console.error('请检查请求，联系：浩添')
                        }
                    } catch (error) {

                    }
                });
            }

            let old = Magix.Service.extend;
            Magix.Service.extend = (...args) => {
                let s = old(...args);
                hookService(s);
                return s;
            };
            return Service;
        } catch (error) {
            console.log(error)
        }
    }
}, Magix.Event);

let sendData = e => {
    try {
        let uuid = localStorage.getItem('uuid');
        let user = Magix.config(projectName + '.user') || {}
        let userId = user.meta && user.meta.memberId || user.loginUser && user.loginUser.userId || user.custId || user.userId || user.empId

        let str = ''
        for (let o in e) {
            str = str + o + '=' + e[o] + '&'
        }
        e.site = projectName
        e.uuid = uuid
        e.userId = userId
        viewMap.sendList.push(e)
        if (window.goldlog && window.goldlog.spm_ab && window.goldlog.record) {
            throttle(() => {
                let viewArgs = `viewArgs=${JSON.stringify(viewMap.sendList)}`
                window.goldlog.record('/alimama_bp.1.1', 'OTHER', viewArgs, 'POST')
            }, DELAYTIME, MUSTRUNTIME, viewMap.sendList, () => {
                viewMap.sendList = []
            })()
        }
    } catch (error) {
        console.log(error)
    }

}

let throttle = (fn, delay, mustRunDelay, list, callback) => {
    return function () {
        let context = this, args = arguments, t_curr = +new Date();
        clearTimeout(viewMap.tid);
        if (!viewMap.startTime) {
            viewMap.startTime = t_curr;
        }
        if (t_curr - viewMap.startTime >= mustRunDelay || list.length > MaxLength) {
            fn.apply(context, args);
            callback();
            viewMap.startTime = t_curr;
        }
        else {
            viewMap.tid = setTimeout(function () {
                fn.apply(context, args);
                callback();
            }, delay);
        }
    };
};

let Analysis = {
    start() {
        try {
            Loader.hook().on('resload', e => {
                sendData(e)
            });
            View.hook().on('update', e => {
                sendData(e)
            }).on('startrender', e => {
                sendData(e)
            });
            Service.hook().on('complete', e => {
                sendData(e)
            });
            VOM.hook().on('pageready', e => {
                sendData(e)
            });
        } catch (error) {
            console.log(error)
        }

    }
};

Analysis.start();