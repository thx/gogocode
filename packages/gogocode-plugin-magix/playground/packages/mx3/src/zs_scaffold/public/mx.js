/*md5:dfd425ee67b1a9eb6653db8e26d0f445*/
//#snippet;
//#uncheck = jsThis,jsLoop;
//#exclude = loader,allProcessor;
/*!3.8.14 Licensed MIT*/
/*
author:kooboy_li@163.com
loader:cmd
enables:style,viewInit,service,ceach,router,resource,configIni,nodeAttachVframe,viewMerge,tipRouter,updater,viewProtoMixins,base,defaultView,autoEndUpdate,linkage,updateTitleRouter,urlRewriteRouter,state,updaterDOM,viewInitAsync

optionals:updaterVDOM,updaterQuick,updaterAsync,updaterTouchAttr,serviceCombine,servicePush,tipLockUrlRouter,edgeRouter,forceEdgeRouter,cnum,vframeHost,layerVframe,collectView,share,keepHTML,naked,viewChildren,dispatcherRecast
*/
define('magix', ['$'], function (require) {
    if (typeof DEBUG == 'undefined')
        window.DEBUG = true;
    var $ = require('$');
    var G_IsObject = $.isPlainObject;
    var G_IsArray = $.isArray;
    var G_COUNTER = 0;
    var G_EMPTY = '';
    var G_EMPTY_ARRAY = [];
    var G_COMMA = ',';
    var G_NULL = null;
    var G_WINDOW = window;
    var G_Undefined = void G_COUNTER;
    var G_DOCUMENT = document;
    var GA = G_DOCUMENT.documentElement.getAttribute;
    var G_GetAttribute = function (node, attr) { return GA.call(node, attr); };
    var G_DOC = $(G_DOCUMENT);
    var Timeout = G_WINDOW.setTimeout;
    var G_CHANGED = 'changed';
    var G_CHANGE = 'change';
    var G_PAGE_UNLOAD = 'pageunload';
    var G_VALUE = 'value';
    var G_Tag_Key = 'mxs';
    var G_Tag_Attr_Key = 'mxa';
    var G_Tag_View_Key = 'mxv';
    var G_HashKey = '#';
    function G_NOOP() { }
    var JSONStringify = JSON.stringify;
    var G_DOCBODY; //initilize at vframe_root
    /*
        关于spliter
        出于安全考虑，使用不可见字符\u0000，然而，window手机上ie11有这样的一个问题：'\u0000'+"abc",结果却是一个空字符串，好奇特。
     */
    var G_SPLITER = '\x1e';
    var Magix_StrObject = 'object';
    var G_PROTOTYPE = 'prototype';
    var G_PARAMS = 'params';
    var G_PATH = 'path';
    var G_MX_VIEW = 'mx-view';
    // let Magix_PathRelativeReg = /\/\.(?:\/|$)|\/[^\/]+?\/\.{2}(?:\/|$)|\/\/+|\.{2}\//; // ./|/x/../|(b)///
    // let Magix_PathTrimFileReg = /\/[^\/]*$/;
    // let Magix_ProtocalReg = /^(?:https?:)?\/\//i;
    var Magix_PathTrimParamsReg = /[#?].*$/;
    var Magix_ParamsReg = /([^=&?\/#]+)=?([^&#?]*)/g;
    var Magix_IsParam = /(?!^)=|&/;
    var G_Id = function (prefix) { return (prefix || 'mx_') + G_COUNTER++; };
    var MxGlobalView = G_Id();
    var Magix_Cfg = {
        rootId: G_Id(),
        defaultView: MxGlobalView,
        error: function (e) {
            throw e;
        }
    };
    var G_GetById = function (id) { return typeof id == Magix_StrObject ? id : G_DOCUMENT.getElementById(id); };
    var G_IsPrimitive = function (args) { return !args || typeof args != Magix_StrObject; };
    var G_Set = function (newData, oldData, keys, unchanged) {
        var changed = 0, now, old, p;
        for (p in newData) {
            now = newData[p];
            old = oldData[p];
            if ((!G_IsPrimitive(now) || old !== now) && !G_Has(unchanged, p)) {
                keys[p] = 1;
                changed = 1;
            }
            oldData[p] = now;
        }
        return changed;
    };
    var G_NodeIn = function (a, b, r) {
        a = G_GetById(a);
        b = G_GetById(b);
        if (a && b) {
            r = a == b;
            if (!r) {
                try {
                    r = (b.compareDocumentPosition(a) & 16) == 16;
                }
                catch (_magix) { }
            }
        }
        return r;
    };
    function G_Assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (G_Has(s, p))
                    t[p] = s[p];
        }
        return t;
    }
    var G_Keys = function (obj, keys, p) {
        keys = [];
        for (p in obj) {
            if (G_Has(obj, p)) {
                keys.push(p);
            }
        }
        return keys;
    };
    var Magix_HasProp = Magix_Cfg.hasOwnProperty;
    var Header = $('head');
    var View_ApplyStyle = function (key, css) {
        if (DEBUG && G_IsArray(key)) {
            for (var i = 0; i < key.length; i += 2) {
                View_ApplyStyle(key[i], key[i + 1]);
            }
            return;
        }
        if (css && !View_ApplyStyle[key]) {
            View_ApplyStyle[key] = 1;
            if (DEBUG) {
                if (key.indexOf('$throw_') === 0) {
                    throw new Error(css);
                }
                Header.append("<style id=\"" + key + "\">" + css);
            }
            else {
                Header.append("<style>" + css);
            }
        }
    };
    var IdIt = function (n) { return G_GetAttribute(n, 'id') || (n['$a'] = 1, n.id = G_Id()); };
    var G_ToTry = function (fns, args, context, r, e) {
        args = args || G_EMPTY_ARRAY;
        if (!G_IsArray(fns))
            fns = [fns];
        if (!G_IsArray(args))
            args = [args];
        for (var _i = 0, fns_1 = fns; _i < fns_1.length; _i++) {
            e = fns_1[_i];
            try {
                r = e && e.apply(context, args);
            }
            catch (x) {
                Magix_Cfg.error(x);
            }
        }
        return r;
    };
    var G_Has = function (owner, prop) { return owner && Magix_HasProp.call(owner, prop); }; //false 0 G_NULL '' undefined
    var G_TranslateData = function (data, params) {
        var p, val;
        if (G_IsPrimitive(params)) {
            p = params + G_EMPTY;
            if (p[0] == G_SPLITER && G_Has(data, p)) {
                params = data[p];
            }
        }
        else {
            for (p in params) {
                val = params[p];
                val = G_TranslateData(data, val);
                params[p] = val;
            }
        }
        return params;
    };
    var Magix_CacheSort = function (a, b) { return b.f - a.f || b.t - a.t; };
    /**
     * Magix.Cache 类
     * @name Cache
     * @constructor
     * @param {Integer} [max] 缓存最大值，默认20
     * @param {Integer} [buffer] 缓冲区大小，默认5
     * @param {Function} [remove] 当缓存的元素被删除时调用
     * @example
     * let c = new Magix.cache(5,2);//创建一个可缓存5个，且缓存区为2个的缓存对象
     * c.set('key1',{});//缓存
     * c.get('key1');//获取
     * c.del('key1');//删除
     * c.has('key1');//判断
     * //注意：缓存通常配合其它方法使用，在Magix中，对路径的解析等使用了缓存。在使用缓存优化性能时，可以达到节省CPU和内存的双赢效果
     */
    function G_Cache(max, buffer, remove, me) {
        me = this;
        me.c = [];
        me.b = buffer || 5; //buffer先取整，如果为0则再默认5
        me.x = me.b + (max || 20);
        me.r = remove;
    }
    G_Assign(G_Cache[G_PROTOTYPE], {
        /**
         * @lends Cache#
         */
        /**
         * 获取缓存的值
         * @param  {String} key
         * @return {Object} 初始设置的缓存对象
         */
        get: function (key) {
            var me = this;
            var c = me.c;
            var r = c[G_SPLITER + key];
            if (r) {
                r.f++;
                r.t = G_COUNTER++;
                //console.log(r.f);
                r = r.v;
                //console.log('hit cache:'+key);
            }
            return r;
        },
        /**
         * 循环缓存
         * @param  {Function} cb 回调
         * @param  {Object} [ops] 回调时传递的额外参数
         * @beta
         * @module ceach|service
         */
        each: function (cb, ops, me, c, i) {
            me = this;
            c = me.c;
            for (var _i = 0, c_1 = c; _i < c_1.length; _i++) {
                i = c_1[_i];
                cb(i.v, ops, me);
            }
        },
        /**
         * 设置缓存
         * @param {String} key 缓存的key
         * @param {Object} value 缓存的对象
         */
        set: function (okey, value) {
            var me = this;
            var c = me.c;
            var key = G_SPLITER + okey;
            var r = c[key];
            var t = me.b, f;
            if (!r) {
                if (c.length >= me.x) {
                    c.sort(Magix_CacheSort);
                    while (t--) {
                        r = c.pop();
                        //为什么要判断r.f>0,考虑这样的情况：用户设置a,b，主动删除了a,重新设置a,数组中的a原来指向的对象残留在列表里，当排序删除时，如果不判断则会把新设置的删除，因为key都是a
                        //
                        if (r.f > 0)
                            me.del(r.o); //如果没有引用，则删除
                    }
                }
                r = {
                    o: okey
                };
                c.push(r);
                c[key] = r;
            }
            r.v = value;
            r.f = 1;
            r.t = G_COUNTER++;
        },
        /**
         * 删除缓存
         * @param  {String} key 缓存key
         */
        del: function (k) {
            k = G_SPLITER + k;
            var c = this.c;
            var r = c[k], m = this.r;
            if (r) {
                r.f = -1;
                r.v = G_EMPTY;
                delete c[k];
                if (m) {
                    G_ToTry(m, r.o);
                }
            }
        },
        /**
         * 检测缓存中是否有给定的key
         * @param  {String} key 缓存key
         * @return {Boolean}
         */
        has: function (k) {
            return G_Has(this.c, G_SPLITER + k);
        }
    });
    var G_DefaultView;
    var G_Require = function (name, fn, params) {
        if (name) {
            if (!G_IsArray(name))
                name = [name];
            let require = Magix_Cfg.require;
            let promise;
            if (require) {
                promise = require(name, params);
            }
            if (!promise ||
                !promise.then) {
                promise = Vframe_Promise;
            }
            promise.then(() => {
                var a_1 = [], n = void 0;
                if (MxGlobalView == name) {
                    if (!G_DefaultView) {
                        G_DefaultView = View.extend();
                    }
                    fn(G_DefaultView);
                }
                else if (G_WINDOW.seajs) {
                    seajs.use(name, function () {
                        var g = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            g[_i] = arguments[_i];
                        }
                        for (var _a = 0, g_1 = g; _a < g_1.length; _a++) {
                            var m = g_1[_a];
                            a_1.push(m && m.__esModule && m["default"] || m);
                        }
                        if (fn)
                            fn.apply(void 0, a_1);
                    });
                }
                else {
                    for (var _i = 0, name_1 = name; _i < name_1.length; _i++) {
                        n = name_1[_i];
                        n = require(n);
                        a_1.push(n && n.__esModule && n["default"] || n);
                    }
                    if (fn)
                        fn.apply(void 0, a_1);
                }
            });
        }
        else {
            fn();
        }
    };
    function T() { }
    var G_Extend = function (ctor, base, props, statics, cProto) {
        //bProto.constructor = base;
        T[G_PROTOTYPE] = base[G_PROTOTYPE];
        cProto = new T();
        G_Assign(cProto, props);
        G_Assign(ctor, statics);
        cProto.constructor = ctor;
        ctor[G_PROTOTYPE] = cProto;
        return ctor;
    };
    var G_SelectorEngine = $.find || $.zepto;
    var G_TargetMatchSelector = G_SelectorEngine.matchesSelector || G_SelectorEngine.matches;
    var G_DOMGlobalProcessor = function (e, d) {
        d = e.data;
        e.eventTarget = d.e;
        G_ToTry(d.f, e, d.v);
    };
    var G_DOMEventLibBind = function (node, type, cb, remove, scope) {
        if (scope) {
            type += "." + scope.i;
        }
        if (remove) {
            $(node).off(type, cb);
        }
        else {
            $(node).on(type, scope, cb);
        }
    };
    var Safeguard = function (data) { return data; };
    if (DEBUG && window.Proxy) {
        var ProxiesPool_1 = new Map();
        Safeguard = function (data, getter, setter, root) {
            if (G_IsPrimitive(data)) {
                return data;
            }
            var build = function (prefix, o) {
                var key = getter + '\x01' + setter;
                var cached = ProxiesPool_1.get(o);
                if (cached && cached.key == key) {
                    return cached.entity;
                }
                if (o['\x1e_sf_\x1e']) {
                    return o;
                }
                var entity = new Proxy(o, {
                    set: function (target, property, value) {
                        if (!setter && !prefix) {
                            throw new Error('avoid writeback,key: ' + prefix + property + ' value:' + value + ' more info: https://github.com/thx/magix/issues/38');
                        }
                        target[property] = value;
                        if (setter) {
                            setter(prefix + property, value);
                        }
                        return true;
                    },
                    get: function (target, property) {
                        if (property == '\x1e_sf_\x1e') {
                            return true;
                        }
                        var out = target[property];
                        if (!prefix && getter) {
                            getter(property);
                        }
                        if (!root && G_Has(target, property) &&
                            (G_IsArray(out) || G_IsObject(out))) {
                            return build(prefix + property + '.', out);
                        }
                        return out;
                    }
                });
                ProxiesPool_1.set(o, {
                    key: key,
                    entity: entity
                });
                return entity;
            };
            return build('', data);
        };
    }
    var Magix_PathToObjCache = new G_Cache();
    var Magix_Booted = 0;
    //let Magix_PathCache = new G_Cache();
    var Magix_ParamsObjectTemp;
    var Magix_ParamsFn = function (match, name, value) {
        try {
            value = decodeURIComponent(value);
        }
        catch (_magix) {
        }
        Magix_ParamsObjectTemp[name] = value;
    };
    /**
     * 路径
     * @param  {String} url  参考地址
     * @param  {String} part 相对参考地址的片断
     * @return {String}
     * @example
     * http://www.a.com/a/b.html?a=b#!/home?e=f   /   => http://www.a.com/
     * http://www.a.com/a/b.html?a=b#!/home?e=f   ./     =>http://www.a.com/a/
     * http://www.a.com/a/b.html?a=b#!/home?e=f   ../../    => http://www.a.com/
     * http://www.a.com/a/b.html?a=b#!/home?e=f   ./../  => http://www.a.com/
     * //g.cn/a.html
     */
    /*let G_Path = function(url, part) {
        let key = url + G_SPLITER + part;
        let result = Magix_PathCache.get(key),
            domain = G_EMPTY,
            idx;
        if (!Magix_PathCache.has(key)) { //有可能结果为空，url='' path='';
            let m = url.match(Magix_ProtocalReg);
            if (m) {
                idx = url.indexOf(Magix_SLASH, m[0].length);
                if (idx < 0) idx = url.length;
                domain = url.slice(0, idx);
                url = url.slice(idx);
            }
            url = url.replace(Magix_PathTrimParamsReg, G_EMPTY).replace(Magix_PathTrimFileReg, Magix_SLASH);
            if (!part.indexOf(Magix_SLASH)) {
                url = G_EMPTY;
            }
            result = url + part;
            console.log('url', url, 'part', part, 'result', result);
            while (Magix_PathRelativeReg.test(result)) {
                result = result.replace(Magix_PathRelativeReg, Magix_SLASH);
            }
            Magix_PathCache.set(key, result = domain + result);
        }
        return result;
    };*/
    /**
     * 把路径字符串转换成对象
     * @param  {String} path 路径字符串
     * @return {Object} 解析后的对象
     * @example
     * let obj = Magix.parseUri('/xxx/?a=b&c=d');
     * // obj = {path:'/xxx/',params:{a:'b',c:'d'}}
     */
    var G_ParseUri = function (path) {
        //把形如 /xxx/?a=b&c=d 转换成对象 {path:'/xxx/',params:{a:'b',c:'d'}}
        //1. /xxx/a.b.c.html?a=b&c=d  path /xxx/a.b.c.html
        //2. /xxx/?a=b&c=d  path /xxx/
        //3. /xxx/#?a=b => path /xxx/
        //4. /xxx/index.html# => path /xxx/index.html
        //5. /xxx/index.html  => path /xxx/index.html
        //6. /xxx/#           => path /xxx/
        //7. a=b&c=d          => path ''
        //8. /s?src=b#        => path /s params:{src:'b'}
        //9. a=YT3O0sPH1No=   => path '' params:{a:'YT3O0sPH1No='}
        //10.a=YT3O0sPH1No===&b=c => path '' params:{a:'YT3O0sPH1No===',b:'c'}
        //11. ab?a&b          => path ab  params:{a:'',b:''}
        //12. a=b&c           => path '' params:{a:'b',c:''}
        //13. =abc            => path '=abc'
        //14. ab=             => path '' params:{ab:''}
        //15. a&b             => path '' params:{a:'',b:''}
        var r = Magix_PathToObjCache.get(path), pathname;
        if (!r) {
            Magix_ParamsObjectTemp = {};
            pathname = path.replace(Magix_PathTrimParamsReg, G_EMPTY);
            if (path == pathname && Magix_IsParam.test(pathname))
                pathname = G_EMPTY; //考虑 YT3O0sPH1No= base64后的pathname
            path.replace(pathname, G_EMPTY).replace(Magix_ParamsReg, Magix_ParamsFn);
            Magix_PathToObjCache.set(path, r = {
                a: pathname,
                b: Magix_ParamsObjectTemp
            });
        }
        return {
            path: r.a,
            params: G_Assign({}, r.b)
        };
    };
    /**
     * 转换成字符串路径
     * @param  {String} path 路径
     * @param {Object} params 参数对象
     * @param {Object} [keo] 保留空白值的对象
     * @return {String} 字符串路径
     * @example
     * let str = Magix.toUri('/xxx/',{a:'b',c:'d'});
     * // str == /xxx/?a=b&c=d
     *
     * let str = Magix.toUri('/xxx/',{a:'',c:2});
     *
     * // str == /xxx/?a=&c=2
     *
     * let str = Magix.toUri('/xxx/',{a:'',c:2},{c:1});
     *
     * // str == /xxx/?c=2
     * let str = Magix.toUri('/xxx/',{a:'',c:2},{a:1,c:1});
     *
     * // str == /xxx/?a=&c=2
     */
    var G_ToUri = function (path, params, keo) {
        var arr = [], v, p, f;
        for (p in params) {
            v = params[p] + G_EMPTY;
            if (!keo || v || G_Has(keo, p)) {
                v = encodeURIComponent(v);
                arr.push(f = p + '=' + v);
            }
        }
        if (f) {
            path += (path && (~path.indexOf('?') ? '&' : '?')) + arr.join('&');
        }
        return path;
    };
    var G_ToMap = function (list, key) {
        var e, map = {}, l;
        if (list) {
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                e = list_1[_i];
                map[(key && e) ? e[key] : e] = key ? e : (map[e] | 0) + 1; //对于简单数组，采用累加的方式，以方便知道有多少个相同的元素
            }
        }
        return map;
    };
    var G_ParseCache = new G_Cache();
    var G_ParseExpr = function (expr, data, result) {
        if (G_ParseCache.has(expr)) {
            result = G_ParseCache.get(expr);
        }
        else {
            //jshint evil:true
            result = G_ToTry(Function("return " + expr));
            if (expr.indexOf(G_SPLITER) > -1) {
                G_TranslateData(data, result);
            }
            else {
                G_ParseCache.set(expr, result);
            }
        }
        if (DEBUG) {
            result = Safeguard(result);
        }
        return result;
    };
    var CallIndex = 0;
    var CallList = [];
    var CallBreakTime = 48;
    var StartCall = function () {
        var last = G_Now(), next;
        while (1) {
            next = CallList[CallIndex - 1];
            if (next) {
                next.apply(CallList[CallIndex], CallList[CallIndex + 1]);
                CallIndex += 3;
                if (G_Now() - last > CallBreakTime &&
                    CallList.length > CallIndex) {
                    setTimeout(StartCall);
                    console.log("[CF] take a break of " + CallList.length + " at " + CallIndex);
                    break;
                }
            }
            else {
                CallList.length = CallIndex = 0;
                break;
            }
        }
    };
    var CallFunction = function (fn, args, context) {
        CallList.push(fn, context, args);
        if (!CallIndex) {
            CallIndex = 1;
            setTimeout(StartCall);
        }
    };
    var Mark = function (host, key) {
        var deletedKey = G_SPLITER + '$a';
        var markObjectKey = G_SPLITER + '$b';
        var sign;
        if (!host[deletedKey]) {
            var markHost = host[markObjectKey] || (host[markObjectKey] = {});
            if (!markHost.hasOwnProperty(key)) {
                markHost[key] = 0;
            }
            sign = ++markHost[key];
        }
        return function () {
            var temp = host[markObjectKey];
            return temp && sign === temp[key];
        };
    };
    var Unmark = function (host) {
        host[G_SPLITER + '$b'] = 0;
        host[G_SPLITER + '$a'] = 1;
    };
    var EventDefaultOptions = {
        bubbles: true,
        cancelable: true
    };
    var DispatchEvent = function (element, type, data) {
        var e = new Event(type, EventDefaultOptions);
        G_Assign(e, data);
        element.dispatchEvent(e);
    };
    /**
     * Magix对象，提供常用方法
     * @name Magix
     * @namespace
     */
    var Magix = {
        /**
         * @lends Magix
         */
        mark: Mark,
        unmark: Unmark,
        dispatch: DispatchEvent,
        task: CallFunction,
        /**
         * 设置或获取配置信息
         * @param  {Object} cfg 初始化配置参数对象
         * @param {String} cfg.defaultView 默认加载的view
         * @param {String} cfg.defaultPath 当无法从地址栏取到path时的默认值。比如使用hash保存路由信息，而初始进入时并没有hash,此时defaultPath会起作用
         * @param {Object} cfg.routes path与view映射关系表
         * @param {String} cfg.unmatchView 在routes里找不到匹配时使用的view，比如显示404
         * @param {String} cfg.rootId 根view的id
         * @param {Array} cfg.exts 需要加载的扩展
         * @param {Function} cfg.error 发布版以try catch执行一些用户重写的核心流程，当出错时，允许开发者通过该配置项进行捕获。注意：您不应该在该方法内再次抛出任何错误！
         * @example
         * Magix.config({
         *      rootId:'J_app_main',
         *      defaultView:'app/views/layouts/default',//默认加载的view
         *      defaultPath:'/home',
         *      routes:{
         *          "/home":"app/views/layouts/default"
         *      }
         * });
         *
         *
         * let config = Magix.config();
         *
         * console.log(config.rootId);
         *
         * // 可以多次调用该方法，除内置的配置项外，您也可以缓存一些数据，如
         * Magix.config({
         *     user:'彳刂'
         * });
         *
         * console.log(Magix.config('user'));
         */
        config: function (cfg, r) {
            r = Magix_Cfg;
            if (cfg) {
                if (G_IsObject(cfg)) {
                    r = G_Assign(r, cfg);
                }
                else {
                    r = r[cfg];
                }
            }
            return r;
        },
        /**
         * 应用初始化入口
         * @function
         * @param {Object} [cfg] 配置信息对象,更多信息请参考Magix.config方法
         * @return {Object} 配置信息对象
         * @example
         * Magix.boot({
         *      rootId:'J_app_main'
         * });
         *
         */
        boot: function (cfg) {
            G_Assign(Magix_Cfg, cfg); //先放到配置信息中，供ini文件中使用
            G_Require(Magix_Cfg.ini, function (I) {
                G_Assign(Magix_Cfg, I, cfg);
                G_Require(Magix_Cfg.exts, function () {
                    Router.on(G_CHANGED, Dispatcher_NotifyChange);
                    State.on(G_CHANGED, Dispatcher_NotifyChange);
                    Magix_Booted = 1;
                    Router_Bind();
                });
            });
        },
        /**
         * 把列表转化成hash对象
         * @param  {Array} list 源数组
         * @param  {String} [key]  以数组中对象的哪个key的value做为hash的key
         * @return {Object}
         * @example
         * let map = Magix.toMap([1,2,3,5,6]);
         * //=> {1:1,2:1,3:1,4:1,5:1,6:1}
         *
         * let map = Magix.toMap([{id:20},{id:30},{id:40}],'id');
         * //=>{20:{id:20},30:{id:30},40:{id:40}}
         *
         * console.log(map['30']);//=> {id:30}
         * //转成对象后不需要每次都遍历数组查询
         */
        toMap: G_ToMap,
        /**
         * 以try cache方式执行方法，忽略掉任何异常
         * @function
         * @param  {Array} fns     函数数组
         * @param  {Array} [args]    参数数组
         * @param  {Object} [context] 在待执行的方法内部，this的指向
         * @return {Object} 返回执行的最后一个方法的返回值
         * @example
         * let result = Magix.toTry(function(){
         *     return true
         * });
         *
         * // result == true
         *
         * let result = Magix.toTry(function(){
         *     throw new Error('test');
         * });
         *
         * // result == undefined
         *
         * let result = Magix.toTry([function(){
         *     throw new Error('test');
         * },function(){
         *     return true;
         * }]);
         *
         * // result == true
         *
         * //异常的方法执行时，可以通过Magix.config中的error来捕获，如
         *
         * Magix.config({
         *     error:function(e){
         *         console.log(e);//在这里可以进行错误上报
         *     }
         * });
         *
         * let result = Magix.toTry(function(a1,a2){
         *     return a1 + a2;
         * },[1,2]);
         *
         * // result == 3
         * let o={
         *     title:'test'
         * };
         * let result = Magix.toTry(function(){
         *     return this.title;
         * },null,o);
         *
         * // result == 'test'
         */
        toTry: G_ToTry,
        /**
         * 转换成字符串路径
         * @function
         * @param  {String} path 路径
         * @param {Object} params 参数对象
         * @param {Object} [keo] 保留空白值的对象
         * @return {String} 字符串路径
         * @example
         * let str = Magix.toUrl('/xxx/',{a:'b',c:'d'});
         * // str == /xxx/?a=b&c=d
         *
         * let str = Magix.toUrl('/xxx/',{a:'',c:2});
         *
         * // str==/xxx/?a=&c=2
         *
         * let str = Magix.toUrl('/xxx/',{a:'',c:2},{c:1});
         *
         * // str == /xxx/?c=2
         * let str = Magix.toUrl('/xxx/',{a:'',c:2},{a:1,c:1});
         *
         * // str == /xxx/?a=&c=2
         */
        toUrl: G_ToUri,
        /**
         * 把路径字符串转换成对象
         * @function
         * @param  {String} path 路径字符串
         * @return {Object} 解析后的对象
         * @example
         * let obj = Magix.parseUrl('/xxx/?a=b&c=d');
         * // obj = {path:'/xxx/',params:{a:'b',c:'d'}}
         */
        parseUrl: G_ParseUri,
        /*
         * 路径
         * @function
         * @param  {String} url  参考地址
         * @param  {String} part 相对参考地址的片断
         * @return {String}
         * @example
         * http://www.a.com/a/b.html?a=b#!/home?e=f   /   => http://www.a.com/
         * http://www.a.com/a/b.html?a=b#!/home?e=f   ./     =>http://www.a.com/a/
         * http://www.a.com/a/b.html?a=b#!/home?e=f   ../../    => http://www.a.com/
         * http://www.a.com/a/b.html?a=b#!/home?e=f   ./../  => http://www.a.com/
         */
        //path: G_Path,
        /**
         * 把src对象的值混入到aim对象上
         * @function
         * @param  {Object} aim    要mix的目标对象
         * @param  {Object} src    mix的来源对象
         * @example
         * let o1={
         *     a:10
         * };
         * let o2={
         *     b:20,
         *     c:30
         * };
         *
         * Magix.mix(o1,o2);//{a:10,b:20,c:30}
         *
         *
         * @return {Object}
         */
        mix: G_Assign,
        /**
         * 检测某个对象是否拥有某个属性
         * @function
         * @param  {Object}  owner 检测对象
         * @param  {String}  prop  属性
         * @example
         * let obj={
         *     key1:undefined,
         *     key2:0
         * }
         *
         * Magix.has(obj,'key1');//true
         * Magix.has(obj,'key2');//true
         * Magix.has(obj,'key3');//false
         *
         *
         * @return {Boolean} 是否拥有prop属性
         */
        has: G_Has,
        /**
         * 获取对象的keys
         * @param {Object} object 获取key的对象
         * @type {Array}
         * @beta
         * @module linkage|router
         * @example
         * let o = {
         *     a:1,
         *     b:2,
         *     test:3
         * };
         * let keys = Magix.keys(o);
         *
         * // keys == ['a','b','test']
         * @return {Array}
         */
        keys: G_Keys,
        /**
         * 判断一个节点是否在另外一个节点内，如果比较的2个节点是同一个节点，也返回true
         * @function
         * @param {String|HTMLElement} node节点或节点id
         * @param {String|HTMLElement} container 容器
         * @example
         * let root = $('html');
         * let body = $('body');
         *
         * let r = Magix.inside(body[0],root[0]);
         *
         * // r == true
         *
         * let r = Magix.inside(root[0],body[0]);
         *
         * // r == false
         *
         * let r = Magix.inside(root[0],root[0]);
         *
         * // r == true
         *
         * @return {Boolean}
         */
        inside: G_NodeIn,
        /**
         * document.getElementById的简写
         * @param {String} id
         * @return {HTMLElement|Null}
         * @example
         * // html
         * // <div id="root"></div>
         *
         * let node = Magix.node('root');
         *
         * // node => div[id='root']
         *
         * // node是document.getElementById的简写
         */
        node: G_GetById,
        /**
         * 应用样式
         * @beta
         * @module style
         * @param {String} prefix 样式的名称前缀
         * @param {String} css 样式字符串
         * @example
         * // 该方法配合magix-combine工具使用
         * // 更多信息可参考magix-combine工具：https://github.com/thx/magix-combine
         * // 样式问题可查阅这里：https://github.com/thx/magix-combine/issues/6
         *
         */
        applyStyle: View_ApplyStyle,
        /**
         * 返回全局唯一ID
         * @function
         * @param {String} [prefix] 前缀
         * @return {String}
         * @example
         *
         * let id = Magix.guid('mx-');
         * // id maybe mx-7
         */
        guid: G_Id,
        use: G_Require,
        Cache: G_Cache,
        nodeId: IdIt,
        guard: Safeguard
    };
    /**
     * 多播事件对象
     * @name Event
     * @namespace
     */
    var MEvent = {
        /**
         * @lends MEvent
         */
        /**
         * 触发事件
         * @param {String} name 事件名称
         * @param {Object} data 事件对象
         * @param {Boolean} [remove] 事件触发完成后是否移除这个事件的所有监听
         * @param {Boolean} [lastToFirst] 是否从后向前触发事件的监听列表
         */
        fire: function (name, data, remove, lastToFirst) {
            var key = G_SPLITER + name, me = this, list = me[key], end, len, idx, t;
            if (!data)
                data = {};
            data.type = name;
            if (list) {
                end = list.length;
                len = end - 1;
                while (end--) {
                    idx = lastToFirst ? end : len - end;
                    t = list[idx];
                    if (t.f) {
                        t.x = 1;
                        G_ToTry(t.f, data, me);
                        t.x = G_EMPTY;
                    }
                    else if (!t.x) {
                        list.splice(idx, 1);
                        len--;
                    }
                }
            }
            list = me["on" + name];
            if (list)
                G_ToTry(list, data, me);
            if (remove)
                me.off(name);
            return me;
        },
        /**
         * 绑定事件
         * @param {String} name 事件名称
         * @param {Function} fn 事件处理函数
         * @example
         * let T = Magix.mix({},Magix.Event);
         * T.on('done',function(e){
         *     alert(1);
         * });
         * T.on('done',function(e){
         *     alert(2);
         *     T.off('done',arguments.callee);
         * });
    
         * T.fire('done',{data:'test'});
         * T.fire('done',{data:'test2'});
         */
        on: function (name, f) {
            var me = this;
            var key = G_SPLITER + name;
            var list = me[key] || (me[key] = []);
            list.push({
                f: f
            });
            return me;
        },
        /**
         * 解除事件绑定
         * @param {String} name 事件名称
         * @param {Function} [fn] 事件处理函数
         */
        off: function (name, fn) {
            var key = G_SPLITER + name, me = this, list = me[key], t;
            if (fn) {
                if (list) {
                    for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                        t = list_2[_i];
                        if (t.f == fn) {
                            t.f = G_EMPTY;
                            break;
                        }
                    }
                }
            }
            else {
                delete me[key];
                delete me["on" + name];
            }
            return me;
        }
    };
    Magix.Event = MEvent;
    var State_AppData = {};
    var State_AppDataKeyRef = {};
    var State_ChangedKeys = {};
    var State_Stash_ChangedKeys = {};
    var State_DataIsChanged = 0;
    var State_DataWhereSet = {};
    var State_IsObserveChanged = function (view, keys, r) {
        var oKeys = view['$os'], ok;
        if (oKeys) {
            for (var _i = 0, oKeys_1 = oKeys; _i < oKeys_1.length; _i++) {
                ok = oKeys_1[_i];
                r = G_Has(keys, ok);
                if (r)
                    break;
            }
        }
        return r;
    };
    var SetupKeysRef = function (keys) {
        keys = (keys + G_EMPTY).split(',');
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (G_Has(State_AppDataKeyRef, key)) {
                State_AppDataKeyRef[key]++;
            }
            else {
                State_AppDataKeyRef[key] = 1;
            }
        }
        return keys;
    };
    var TeardownKeysRef = function (keys) {
        var key, v;
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            key = keys_2[_i];
            if (G_Has(State_AppDataKeyRef, key)) {
                v = --State_AppDataKeyRef[key];
                if (!v) {
                    delete State_AppDataKeyRef[key];
                    delete State_AppData[key];
                    if (DEBUG) {
                        delete State_DataWhereSet[key];
                    }
                }
            }
        }
    };
    if (DEBUG) {
        setTimeout(function () {
            Router.on('changed', function () {
                setTimeout(function () {
                    var keys = [];
                    var cls = [];
                    for (var p in State_DataWhereSet) {
                        if (!State_AppDataKeyRef[p]) {
                            cls.push(p);
                            keys.push('key:"' + p + '" set by page:"' + State_DataWhereSet[p] + '"');
                        }
                    }
                    if (keys.length) {
                        console.warn('beware! Remember to clean ' + keys + ' in {Magix.State}   Clean use view.mixins like mixins:[Magix.State.clean("' + cls + '")]');
                    }
                }, 200);
            });
        }, 0);
    }
    if (DEBUG) {
        var Started_1 = 0;
        var NotifyList_1 = [];
        var NotifyTimer_1 = 0;
        var Notify_1 = function () {
            var locker = {};
            for (var _i = 0, NotifyList_2 = NotifyList_1; _i < NotifyList_2.length; _i++) {
                var n = NotifyList_2[_i];
                if (!locker[n.msg]) {
                    console.warn(n.msg);
                    locker[n.msg] = 1;
                }
            }
            NotifyList_1.length = 0;
            Started_1 = 0;
        };
        var ClearNotify = function (key) {
            for (var i = NotifyList_1.length; i--;) {
                var n = NotifyList_1[i];
                if (n.key == key) {
                    NotifyList_1.splice(i, 1);
                }
            }
        };
        var DelayNotify = function (key, msg) {
            clearTimeout(NotifyTimer_1);
            Started_1 = 0;
            NotifyList_1.push({
                key: key,
                msg: msg
            });
            if (!Started_1) {
                Started_1 = 1;
                NotifyTimer_1 = setTimeout(Notify_1, 500);
            }
        };
    }
    /**
     * 可观察的内存数据对象
     * @name State
     * @namespace
     * @borrows Event.on as on
     * @borrows Event.fire as fire
     * @borrows Event.off as off
     * @beta
     * @module router
     */
    var State = G_Assign({
        /**
         * @lends State
         */
        /**
         * 从Magix.State中获取数据
         * @param {String} [key] 数据key
         * @return {Object}
         */
        get: function (key) {
            var r = key ? State_AppData[key] : State_AppData;
            if (DEBUG) {
                if (key && Magix_Booted) {
                    var loc = Router.parse();
                    if (G_Has(State_DataWhereSet, key) && State_DataWhereSet[key] != loc.path) {
                        console.warn('beware! You get state:"{Magix.State}.' + key + '" where it set by page:' + State_DataWhereSet[key]);
                    }
                }
                r = Safeguard(r, function (dataKey) {
                    if (Magix_Booted) {
                        var loc = Router.parse();
                        if (G_Has(State_DataWhereSet, dataKey) && State_DataWhereSet[dataKey] != loc.path) {
                            console.warn('beware! You get state:"{Magix.State}.' + dataKey + '" where it set by page:' + State_DataWhereSet[dataKey]);
                        }
                    }
                }, function (path, value) {
                    var sub = key ? key : path;
                    DelayNotify(sub, 'beware! You direct modify "{Magix.State}.' + sub + '"  You should call Magix.State.set() and Magix.State.digest() to notify other views {Magix.State} changed');
                });
            }
            return r;
        },
        /**
         * 设置数据
         * @param {Object} data 数据对象
         */
        set: function (data, unchanged) {
            State_DataIsChanged = G_Set(data, State_AppData, State_ChangedKeys, unchanged) || State_DataIsChanged;
            if (DEBUG && Magix_Booted) {
                var loc = Router.parse();
                for (var p in data) {
                    State_DataWhereSet[p] = loc.path;
                }
            }
            return this;
        },
        /**
         * 检测数据变化，如果有变化则派发changed事件
         * @param  {Object} data 数据对象
         */
        digest: function (data, unchanged) {
            if (data) {
                State.set(data, unchanged);
            }
            if (State_DataIsChanged) {
                if (DEBUG) {
                    for (var p in State_ChangedKeys) {
                        ClearNotify(p);
                    }
                }
                State_DataIsChanged = 0;
                //防止在change事件中再次digest造成的死循环
                let keys = G_Assign({}, State_ChangedKeys);
                G_Assign(State_Stash_ChangedKeys = {}, State_ChangedKeys);
                State_ChangedKeys = {};
                this.fire(G_CHANGED, {
                    keys
                });
                // this.fire(G_CHANGED, {
                //     keys: State_ChangedKeys
                // });
                //State_ChangedKeys = {};
            }
        },
        /**
         * 获取当前数据与上一次数据有哪些变化
         * @return {Object}
         */
        diff: function () {
            return State_Stash_ChangedKeys;
        },
        /**
         * 清除数据，该方法需要与view绑定，写在view的mixins中，如mixins:[Magix.Sate.clean('user,permission')]
         * @param  {String} keys 数据key
         */
        clean: function (keys) {
            if (DEBUG) {
                var called_1 = false;
                setTimeout(function () {
                    if (!called_1) {
                        // throw new Error('Magix.State.clean only used in View.mixins like mixins:[Magix.State.clean("p1,p2,p3")]');
                    }
                }, 1000);
                return {
                    '\x1e': keys,
                    ctor: function () {
                        var me = this;
                        called_1 = true;
                        keys = SetupKeysRef(keys);
                        me.on('destroy', function () {
                            TeardownKeysRef(keys);
                        });
                    }
                };
            }
            return {
                ctor: function () {
                    keys = SetupKeysRef(keys);
                    this.on('destroy', function () { return TeardownKeysRef(keys); });
                }
            };
        }
    }, MEvent
        /**
         * 当State中的数据有改变化后触发
         * @name State.changed
         * @event
         * @param {Object} e 事件对象
         * @param {Object} e.keys  包含哪些数据变化的key集合
         */
    );
    Magix.State = State;
    //let G_IsFunction = $.isFunction;
    var Router_VIEW = 'view';
    var Router_HrefCache = new G_Cache();
    var Router_ChgdCache = new G_Cache();
    var Router_WinLoc = G_WINDOW.location;
    var Router_LastChanged;
    var Router_Silent = 0;
    var Router_LLoc = {
        query: {},
        params: {},
        href: G_EMPTY
    };
    var Router_TrimHashReg = /(?:^.*\/\/[^\/]+|#.*$)/gi;
    var Router_TrimQueryReg = /^[^#]*#?!?/;
    function GetParam(key, defaultValue) {
        return this[G_PARAMS][key] || defaultValue !== G_Undefined && defaultValue || G_EMPTY;
    }
    var Router_Edge = 0;
    var Router_Hashbang = G_HashKey + '!';
    var Router_UpdateHash = function (path, replace) {
        path = Router_Hashbang + path;
        if (replace) {
            Router_WinLoc.replace(path);
        }
        else {
            Router_WinLoc.hash = path;
        }
    };
    var Router_Update = function (path, params, loc, replace, silent, lQuery) {
        path = G_ToUri(path, params, lQuery);
        if (path != loc.srcHash) {
            Router_Silent = silent;
            Router_UpdateHash(path, replace);
        }
    };
    var Router_Bind = function () {
        var lastHash = Router_Parse().srcHash;
        var newHash, suspend;
        var watchChange = function (e, loc, resolve) {
            if (suspend) {
                return;
            }
            loc = Router_Parse();
            newHash = loc.srcHash;
            if (newHash != lastHash) {
                resolve = function () {
                    e.p = 1;
                    lastHash = newHash;
                    suspend = G_EMPTY;
                    Router_UpdateHash(newHash);
                    Router_Diff();
                };
                e = {
                    reject: function () {
                        e.p = 1;
                        suspend = G_EMPTY;
                        Router_UpdateHash(lastHash);
                    },
                    resolve: resolve,
                    prevent: function () {
                        suspend = 1;
                    }
                };
                Router.fire(G_CHANGE, e);
                if (!suspend && !e.p) {
                    resolve();
                }
            }
        };
        G_DOMEventLibBind(G_WINDOW, 'hashchange', watchChange);
        G_DOMEventLibBind(G_WINDOW, 'popstate', watchChange);
        G_DOMEventLibBind(G_WINDOW, 'beforeunload', function (e, te, msg) {
            e = e || G_WINDOW.event;
            te = {};
            Router.fire(G_PAGE_UNLOAD, te);
            if ((msg = te.msg)) {
                //chrome use e.returnValue and ie use return value
                if (e)
                    e.returnValue = msg;
                return msg;
            }
        });
        Router_Diff();
    };
    var Router_PNR_Routers, Router_PNR_UnmatchView, /*Router_PNR_IsFun,*/ Router_PNR_DefaultView, Router_PNR_DefaultPath;
    var Router_PNR_Rewrite;
    var DefaultTitle = G_DOCUMENT.title;
    var Router_AttachViewAndPath = function (loc, view) {
        if (!Router_PNR_Routers) {
            Router_PNR_Routers = Magix_Cfg.routes || {};
            Router_PNR_UnmatchView = Magix_Cfg.unmatchView;
            Router_PNR_DefaultView = Magix_Cfg.defaultView;
            Router_PNR_DefaultPath = Magix_Cfg.defaultPath || '/';
            //Router_PNR_IsFun = G_IsFunction(Router_PNR_Routers);
            //if (!Router_PNR_IsFun && !Router_PNR_Routers[Router_PNR_DefaultPath]) {
            //    Router_PNR_Routers[Router_PNR_DefaultPath] = Router_PNR_DefaultView;
            //}
            Router_PNR_Rewrite = Magix_Cfg.rewrite;
            //if (!G_IsFunction(Router_PNR_Rewrite)) {
            //    Router_PNR_Rewrite = G_NULL;
            //}
        }
        if (!loc[Router_VIEW]) {
            var path = loc.hash[G_PATH] || (Router_Edge && loc.query[G_PATH]) || Router_PNR_DefaultPath;
            if (Router_PNR_Rewrite) {
                path = Router_PNR_Rewrite(path, loc[G_PARAMS], Router_PNR_Routers);
            }
            //if (Router_PNR_IsFun) {
            //    view = Router_PNR_Routers.call(Magix_Cfg, path, loc);
            //} else {
            view = Router_PNR_Routers[path] || Router_PNR_UnmatchView || Router_PNR_DefaultView;
            //}
            loc[G_PATH] = path;
            loc[Router_VIEW] = view;
            if (G_IsObject(view)) {
                if (DEBUG) {
                    if (!view.view) {
                        console.error(path, ' config missing view!', view);
                    }
                }
                G_Assign(loc, view);
            }
        }
    };
    var Router_GetChged = function (oldLocation, newLocation) {
        var oKey = oldLocation.href;
        var nKey = newLocation.href;
        var tKey = oKey + G_SPLITER + nKey;
        var result = Router_ChgdCache.get(tKey);
        if (!result) {
            var hasChanged_1, rps_1;
            result = {
                params: rps_1 = {},
                //isParam: Router_IsParam,
                //location: newLocation,
                force: !oKey //是否强制触发的changed，对于首次加载会强制触发一次
            };
            var oldParams_1 = oldLocation[G_PARAMS], newParams_1 = newLocation[G_PARAMS], tArr = G_Keys(oldParams_1).concat(G_Keys(newParams_1)), key = void 0;
            var setDiff = function (key) {
                var from = oldParams_1[key], to = newParams_1[key];
                if (from != to) {
                    rps_1[key] = {
                        from: from,
                        to: to
                    };
                    hasChanged_1 = 1;
                }
            };
            for (var _i = 0, tArr_1 = tArr; _i < tArr_1.length; _i++) {
                key = tArr_1[_i];
                setDiff(key);
            }
            oldParams_1 = oldLocation;
            newParams_1 = newLocation;
            rps_1 = result;
            setDiff(G_PATH);
            setDiff(Router_VIEW);
            Router_ChgdCache.set(tKey, result = {
                a: hasChanged_1,
                b: result
            });
        }
        return result;
    };
    var Router_Parse = function (href) {
        href = href || Router_WinLoc.href;
        var result = Router_HrefCache.get(href), srcQuery, srcHash, query, hash, params;
        if (!result) {
            srcQuery = href.replace(Router_TrimHashReg, G_EMPTY);
            srcHash = href.replace(Router_TrimQueryReg, G_EMPTY);
            query = G_ParseUri(srcQuery);
            hash = G_ParseUri(srcHash);
            params = G_Assign({}, query[G_PARAMS], hash[G_PARAMS]);
            result = {
                get: GetParam,
                href: href,
                srcQuery: srcQuery,
                srcHash: srcHash,
                query: query,
                hash: hash,
                params: params
            };
            if (Magix_Booted) {
                Router_AttachViewAndPath(result);
                Router_HrefCache.set(href, result);
            }
            if (DEBUG) {
                result.params = Safeguard(result.params);
                result = Safeguard(result);
            }
        }
        return result;
    };
    var Router_Diff = function () {
        var location = Router_Parse();
        var changed = Router_GetChged(Router_LLoc, Router_LLoc = location);
        if (!Router_Silent && changed.a) {
            Router_LastChanged = changed.b;
            if (Router_LastChanged[G_PATH]) {
                G_DOCUMENT.title = location.title || DefaultTitle;
            }
            Router.fire(G_CHANGED, Router_LastChanged);
        }
        Router_Silent = 0;
        if (DEBUG) {
            Router_LastChanged = Safeguard(Router_LastChanged);
        }
        return Router_LastChanged;
    };
    //let PathTrimFileParamsReg=/(\/)?[^\/]*[=#]$/;//).replace(,'$1').replace(,EMPTY);
    //let PathTrimSearch=/\?.*$/;
    /**
     * 路由对象，操作URL
     * @name Router
     * @namespace
     * @borrows Event.on as on
     * @borrows Event.fire as fire
     * @borrows Event.off as off
     * @beta
     * @module router
     */
    var Router = G_Assign({
        /**
         * @lends Router
         */
        /**
         * 解析href的query和hash，默认href为location.href
         * @param {String} [href] href
         * @return {Object} 解析的对象
         */
        parse: Router_Parse,
        /**
         * 根据location.href路由并派发相应的事件,同时返回当前href与上一个href差异对象
         * @example
         * let diff = Magix.Router.diff();
         * if(diff.params.page || diff.params.rows){
         *     console.log('page or rows changed');
         * }
         */
        diff: Router_Diff,
        /**
         * 导航到新的地址
         * @param  {Object|String} pn path或参数字符串或参数对象
         * @param {String|Object} [params] 参数对象
         * @param {Boolean} [replace] 是否替换当前历史记录
         * @example
         * let R = Magix.Router;
         * R.to('/list?page=2&rows=20');//改变path和相关的参数，地址栏上的其它参数会进行丢弃，不会保留
         * R.to('page=2&rows=20');//只修改参数，地址栏上的其它参数会保留
         * R.to({//通过对象修改参数，地址栏上的其它参数会保留
         *     page:2,
         *     rows:20
         * });
         * R.to('/list',{//改变path和相关参数，丢弃地址栏上原有的其它参数
         *     page:2,
         *     rows:20
         * });
         *
         * //凡是带path的修改地址栏，都会把原来地址栏中的参数丢弃
         * 传递对象，内部对value会进行encodeURIComponent操作，传递字符串需要开发者自己处理。
         * R.to({
         *  page:2,
         *  rows:20
         * },null,true);//使用location.replace操作hash
         * R.to({
         *  page:2,
         *  rows:20
         * },null,null,true);//静默更新url但不派发事件
         */
        to: function (pn, params, replace, silent) {
            if (!params && G_IsObject(pn)) {
                params = pn;
                pn = G_EMPTY;
            }
            var temp = G_ParseUri(pn);
            var tParams = temp[G_PARAMS];
            var tPath = temp[G_PATH];
            var lPath = Router_LLoc[G_PATH]; //历史路径
            var lParams = Router_LLoc[G_PARAMS];
            var lQuery = Router_LLoc.query[G_PARAMS];
            G_Assign(tParams, params); //把路径中解析出来的参数与用户传递的参数进行合并
            if (tPath) { //设置路径带参数的形式，如:/abc?q=b&c=e或不带参数 /abc
                //tPath = G_Path(lPath, tPath);
                if (!Router_Edge) { //pushState不用处理
                    for (lPath in lQuery) { //未出现在query中的参数设置为空
                        if (!G_Has(tParams, lPath))
                            tParams[lPath] = G_EMPTY;
                    }
                }
            }
            else if (lParams) { //只有参数，如:a=b&c=d
                tPath = lPath; //使用历史路径
                tParams = G_Assign({}, lParams, tParams); //复制原来的参数，合并新的参数
            }
            Router_Update(tPath, tParams, Router_LLoc, replace, silent, lQuery);
        }
    }, MEvent
        /**
         * 当location.href有改变化后触发
         * @name Router.changed
         * @event
         * @param {Object} e 事件对象
         * @param {Object} e.path  如果path发生改变时，记录从(from)什么值变成(to)什么值的对象
         * @param {Object} e.view 如果view发生改变时，记录从(from)什么值变成(to)什么值的对象
         * @param {Object} e.params 如果参数发生改变时，记录从(from)什么值变成(to)什么值的对象
         * @param {Boolean} e.force 标识是否是第一次强制触发的changed，对于首次加载完Magix，会强制触发一次changed
         */
    );
    Magix.Router = Router;
    var Dispatcher_UpdateTag = 0;
    /**
     * 通知当前vframe，地址栏发生变化
     * @param {Vframe} vframe vframe对象
     * @private
     */
    var Dispatcher_Update = function (vframe, stateKeys, view, isChanged, cs, c, promise) {
        if (vframe && vframe['$a'] != Dispatcher_UpdateTag &&
            (view = vframe['$v']) &&
            view['$a'] > 1) { //存在view时才进行广播，对于加载中的可在加载完成后通过调用view.location拿到对应的G_WINDOW.location.href对象，对于销毁的也不需要广播
            isChanged = stateKeys ? State_IsObserveChanged(view, stateKeys) : View_IsObserveChanged(view);
            /**
             * 事件对象
             * @type {Object}
             * @ignore
             */
            /*let args = {
                    location: RefLoc,
                    changed: RefG_LocationChanged,*/
            /**
             * 阻止向所有的子view传递
             * @ignore
             */
            /* prevent: function() {
                        args.cs = EmptyArr;
                    },*/
            /**
             * 向特定的子view传递
             * @param  {Array} c 子view数组
             * @ignore
             */
            /*to: function(c) {
                        c = (c + EMPTY).split(COMMA);
                        args.cs = c;
                    }
                };*/
            if (isChanged) { //检测view所关注的相应的参数是否发生了变化
                promise = view['$b']();
            }
            if (!promise || !promise.then) {
                promise = Vframe_Promise;
            }
            promise.then(function () {
                cs = vframe.children();
                for (var _i = 0, cs_1 = cs; _i < cs_1.length; _i++) {
                    c = cs_1[_i];
                    Dispatcher_Update(Vframe_Vframes[c], stateKeys);
                }
            });
        }
    };
    /**
     * 向vframe通知地址栏发生变化
     * @param {Object} e 事件对象
     * @param {Object} e.location G_WINDOW.location.href解析出来的对象
     * @private
     */
    var Dispatcher_NotifyChange = function (e, vf, view) {
        vf = Vframe_Root();
        if ((view = e[Router_VIEW])) {
            vf.mountView(view.to);
        }
        else {
            Dispatcher_UpdateTag = G_COUNTER++;
            Dispatcher_Update(vf, e.keys);
        }
    };
    var Vframe_RootVframe;
    var Vframe_GlobalAlter;
    var Vframe_Vframes = {};
    var Vframe_Promise = { then: function (f) { return f(); } };
    var Vframe_NotifyCreated = function (vframe) {
        if (!vframe['$b'] && !vframe['$d'] && vframe['$cc'] == vframe['$rc']) { //childrenCount === readyCount
            if (!vframe['$cr']) { //childrenCreated
                vframe['$cr'] = 1; //childrenCreated
                vframe['$ca'] = 0; //childrenAlter
                vframe.fire('created'); //不在view上派发事件，如果view需要绑定，则绑定到owner上，view一般不用该事件，如果需要这样处理：this.owner.oncreated=function(){};this.ondestroy=function(){this.owner.off('created')}
            }
            var id = vframe.id, pId = vframe.pId, p = Vframe_Vframes[pId];
            if (p && !G_Has(p['$e'], id)) { //readyChildren
                p['$e'][id] = 1; //readyChildren
                p['$rc']++; //readyCount
                Vframe_NotifyCreated(p);
            }
        }
    };
    var Vframe_NotifyAlter = function (vframe, e) {
        if (!vframe['$ca'] && vframe['$cr']) { //childrenAlter childrenCreated 当前vframe触发过created才可以触发alter事件
            vframe['$cr'] = 0; //childrenCreated
            vframe['$ca'] = 1; //childreAleter
            vframe.fire('alter', e);
            var id = vframe.id, pId = vframe.pId, p = Vframe_Vframes[pId];
            //let vom = vframe.owner;
            if (p && G_Has(p['$e'], id)) { //readyMap
                p['$rc']--; //readyCount
                delete p['$e'][id]; //readyMap
                Vframe_NotifyAlter(p, e);
            }
        }
    };
    var Vframe_TranslateQuery = function (pId, src, params, pVf) {
        pVf = Vframe_Vframes[pId];
        pVf = pVf && pVf['$v'];
        pVf = pVf ? pVf['$d']['$a'] : {};
        if (src.indexOf(G_SPLITER) > 0) {
            G_TranslateData(pVf, params);
            if (params[G_SPLITER]) {
                G_Assign(params, params[G_SPLITER]);
                delete params[G_SPLITER];
            }
        }
        return pVf;
    };
    /**
     * 获取根vframe;
     * @return {Vframe}
     * @private
     */
    var Vframe_Root = function (rootId, e) {
        if (!Vframe_RootVframe) {
            /*
                尽可能的延迟配置，防止被依赖时，配置信息不正确
            */
            G_DOCBODY = G_DOCUMENT.body;
            rootId = Magix_Cfg.rootId;
            e = G_GetById(rootId);
            if (!e) {
                G_DOCBODY.id = rootId;
            }
            Vframe_RootVframe = new Vframe(rootId);
        }
        return Vframe_RootVframe;
    };
    var Vframe_AddVframe = function (id, vframe) {
        if (!G_Has(Vframe_Vframes, id)) {
            Vframe_Vframes[id] = vframe;
            Vframe.fire('add', {
                vframe: vframe
            });
            id = G_GetById(id);
            if (id){
                id.vframe = vframe;
                id['$b'] = 1;
            }
        }
    };
    var Vframe_RunInvokes = function (vf, list, o) {
        list = vf['$f']; //invokeList
        while (list.length) {
            o = list.shift();
            if (!o.r) { //remove
                vf.invoke(o.n, o.a); //name,arguments
            }
            delete list[o.k]; //key
        }
    };
    var Vframe_Cache = [];
    var Vframe_RemoveVframe = function (id, fcc, vframe) {
        vframe = Vframe_Vframes[id];
        if (vframe) {
            delete Vframe_Vframes[id];
            Vframe.fire('remove', {
                vframe: vframe,
                fcc: fcc //fireChildrenCreated
            });
            if (DEBUG) {
                var nodes = G_DOCUMENT.querySelectorAll('#' + id);
                if (nodes.length > 1) {
                    Magix_Cfg.error(Error("remove vframe error. dom id:\"" + id + "\" duplicate"));
                }
            }
            id = G_GetById(id);
            if (id) {
                id['$b'] = 0;
                id.vframe = 0;
                id['$a'] = 0;
            }
        }
    };
    /**
     * Vframe类
     * @name Vframe
     * @class
     * @constructor
     * @borrows Event.on as on
     * @borrows Event.fire as fire
     * @borrows Event.off as off
     * @borrows Event.on as #on
     * @borrows Event.fire as #fire
     * @borrows Event.off as #off
     * @param {String} id vframe id
     * @property {String} id vframe id
     * @property {String} path 当前view的路径名，包括参数
     * @property {String} pId 父vframe的id，如果是根节点则为undefined
     */
    function Vframe(id, pId, me) {
        me = this;
        me.id = id;
        if (DEBUG) {
            var bad = 0;
            if (!pId && id != Magix_Cfg.rootId) {
                bad = 1;
            }
            if (!bad && id && pId) {
                var parent = Vframe_Vframes[pId];
                if (!parent || !parent['$c'][id]) {
                    bad = 1;
                }
            }
            if (bad) {
                console.error('beware! Avoid use new Magix.Vframe() outside');
            }
        }
        //me.vId=id+'_v';
        me['$c'] = {}; //childrenMap
        me['$cc'] = 0; //childrenCount
        me['$rc'] = 0; //readyCount
        me['$g'] = me['$g'] || 1; //signature
        me['$e'] = {}; //readyMap
        me['$f'] = []; //invokeList
        me.pId = pId;
        Vframe_AddVframe(id, me);
    }
    G_Assign(Vframe, {
        /**
         * @lends Vframe
         */
        /**
         * 获取所有的vframe对象
         * @return {Object}
         */
        all: function () {
            return Vframe_Vframes;
        },
        /**
         * 根据vframe的id获取vframe对象
         * @param {String} id vframe的id
         * @return {Vframe|undefined} vframe对象
         */
        get: function (id) {
            return Vframe_Vframes[id];
        }
        /**
         * 注册vframe对象时触发
         * @name Vframe.add
         * @event
         * @param {Object} e
         * @param {Vframe} e.vframe
         */
        /**
         * 删除vframe对象时触发
         * @name Vframe.remove
         * @event
         * @param {Object} e
         * @param {Vframe} e.vframe
         * @param {Boolean} e.fcc 是否派发过created事件
         */
    }, MEvent);
    G_Assign(Vframe[G_PROTOTYPE], MEvent, {
        /**
         * @lends Vframe#
         */
        /**
         * 加载对应的view
         * @param {String} viewPath 形如:app/views/home?type=1&page=2 这样的view路径
         * @param {Object|Null} [viewInitParams] 调用view的init方法时传递的参数
         */
        mountView: function (viewPath, viewInitParams /*,keepPreHTML*/) {
            var me = this;
            var id = me.id;
            var node = G_GetById(id), pId = me.pId, po, sign, view, params, ctors, parentVf;
            if (!me['$h'] && node) { //alter
                me['$h'] = 1;
                me['$i'] = node.innerHTML; //.replace(ScriptsReg, ''); template
            }
            me.unmountView( /*keepPreHTML*/);
            me['$b'] = 0; //destroyed 详见unmountView
            po = G_ParseUri(viewPath || G_EMPTY);
            view = po[G_PATH];
            if (node && view) {
                me[G_PATH] = viewPath;
                params = po[G_PARAMS];
                Vframe_TranslateQuery(pId, viewPath, params);
                me['$j'] = po[G_PATH];
                G_Assign(params, viewInitParams);
                sign = me['$g'];
                G_Require(view, function (TView) {
                    if (sign == me['$g']) { //有可能在view载入后，vframe已经卸载了
                        if (!TView) {
                            return Magix_Cfg.error(Error("id:" + id + " cannot load:" + view));
                        }
                        ctors = View_Prepare(TView);
                        view = new TView(id, me, params, node, ctors);
                        if (DEBUG) {
                            var viewProto_1 = TView.prototype;
                            var importantProps_1 = {
                                id: 1,
                                updater: 1,
                                owner: 1,
                                '$l': 1,
                                '$r': 1,
                                '$a': 1,
                                '$d': 1
                            };
                            for (var p in view) {
                                if (G_Has(view, p) && viewProto_1[p]) {
                                    throw new Error("avoid write " + p + " at file " + viewPath + "!");
                                }
                            }
                            view = Safeguard(view, null, function (key, value) {
                                if (G_Has(viewProto_1, key) ||
                                    (G_Has(importantProps_1, key) &&
                                        (key != '$a' || !isFinite(value)) &&
                                        (key != 'owner' || value !== 0))) {
                                    throw new Error("avoid write " + key + " at file " + viewPath + "!");
                                }
                            }, true);
                        }
                        me['$v'] = view;
                        me['$a'] = Dispatcher_UpdateTag;
                        View_DelegateEvents(view);
                        params = G_ToTry(view.init, [params, {
                            node: node,
                            deep: !view.tmpl
                        }], view);
                        if (!params)
                            params = Vframe_Promise;
                        sign = ++me['$g'];
                        params.then(function () {
                            if (sign == me['$g']) {
                                view['$b']();
                                if (!view.tmpl) { //无模板
                                    me['$h'] = 0; //不会修改节点，因此销毁时不还原
                                    if (!view['$e']) {
                                        view.endUpdate();
                                    }
                                }
                            }
                        });
                    }
                }, params);
            }
        },
        /**
         * 销毁对应的view
         */
        unmountView: function ( /*keepPreHTML*/) {
            var me = this;
            var v = me["$v"], id = me.id, node, reset;
            me['$f'] = []; //invokeList 销毁当前view时，连同调用列表一起销毁
            if (v) {
                if (!Vframe_GlobalAlter) {
                    reset = 1;
                    Vframe_GlobalAlter = {
                        id: id
                    };
                }
                me['$b'] = 1; //用于标记当前vframe处于$v销毁状态，在当前vframe上再调用unmountZone时不派发created事件
                me.unmountZone(0, 1);
                Vframe_NotifyAlter(me, Vframe_GlobalAlter);
                me['$v'] = 0; //unmountView时，尽可能早的删除vframe上的$v对象，防止$v销毁时，再调用该 vfrmae的类似unmountZone方法引起的多次created
                if (v['$a'] > 0) {
                    v['$a'] = 0;
                    delete Body_RangeEvents[id];
                    delete Body_RangeVframes[id];
                    v.fire('destroy', 0, 1, 1);
                    View_DestroyAllResources(v, 1);
                    View_DelegateEvents(v, 1);
                    v.owner = 0;
                }
                v['$a']--;
                node = G_GetById(id);
                if (node && me['$h'] /*&&!keepPreHTML*/) { //如果$v本身是没有模板的，也需要把节点恢复到之前的状态上：只有保留模板且$v有模板的情况下，这条if才不执行，否则均需要恢复节点的html，即$v安装前什么样，销毁后把节点恢复到安装前的情况
                    $(node).html(me['$i']);
                }
                if (reset)
                    Vframe_GlobalAlter = 0;
            }
            me['$g']++; //增加signature，阻止相应的回调，见mountView
        },
        /**
         * 加载vframe
         * @param  {String} id             节点id
         * @param  {String} viewPath       view路径
         * @param  {Object} [viewInitParams] 传递给view init方法的参数
         * @return {Vframe} vframe对象
         * @example
         * // html
         * // &lt;div id="magix_vf_defer"&gt;&lt;/div&gt;
         *
         *
         * //js
         * view.owner.mountVframe('magix_vf_defer','app/views/list',{page:2})
         * //注意：动态向某个节点渲染view时，该节点无须是vframe标签
         */
        mountVframe: function (vfId, viewPath, viewInitParams /*, keepPreHTML*/) {
            var me = this, vf, id = me.id, c = me['$c'];
            Vframe_NotifyAlter(me, {
                id: vfId
            }); //如果在就绪的vframe上渲染新的vframe，则通知有变化
            //let vom = me.owner;
            vf = Vframe_Vframes[vfId];
            if (!vf) {
                if (!G_Has(c, vfId)) { //childrenMap,当前子vframe不包含这个id
                    me['$n'] = 0; //childrenList 清空缓存的子列表
                    me['$cc']++; //childrenCount ，增加子节点
                }
                c[vfId] = vfId; //map
                //
                vf = Vframe_Cache.pop();
                if (vf) {
                    Vframe.call(vf, vfId, id);
                }
                else {
                    vf = new Vframe(vfId, id);
                }
                //vf = Vframe_GetVf(id, me.id);// new Vframe(id, me.id);
            }
            vf.mountView(viewPath, viewInitParams /*,keepPreHTML*/);
            return vf;
        },
        /**
         * 加载某个区域下的view
         * @param {HTMLElement|String} zoneId 节点对象或id
         * @example
         * // html
         * // &lt;div id="zone"&gt;
         * //   &lt;div mx-view="path/to/v1"&gt;&lt;/div&gt;
         * // &lt;/div&gt;
         *
         * view.onwer.mountZone('zone');//即可完成zone节点下的view渲染
         */
        mountZone: function (zoneId, inner /*,keepPreHTML*/) {
            var _a;
            var me = this;
            var vf, id, vfs = [];
            zoneId = zoneId || me.id;
            var vframes = $("" + G_HashKey + zoneId + " [" + G_MX_VIEW + "]");
            /*
                body(#mx-root)
                    div(mx-vframe=true,mx-view='xx')
                        div(mx-vframe=true,mx-view=yy)
                这种结构，自动构建父子关系，
                根结点渲染，获取到子列表[div(mx-view=xx)]
                    子列表渲染，获取子子列表的子列表
                        加入到忽略标识里
                会导致过多的dom查询
    
                现在使用的这种，无法处理这样的情况，考虑到项目中几乎没出现过这种情况，先采用高效的写法
                上述情况一般出现在展现型页面，dom结构已经存在，只是附加上js行为
                不过就展现来讲，一般是不会出现嵌套的情况，出现的话，把里面有层级的vframe都挂到body上也未尝不可，比如brix2.0
             */
            me['$d'] = 1; //hold fire creted
            //me.unmountZone(zoneId, 1); 不去清理，详情见：https://github.com/thx/magix/issues/27
            for (var _i = 0, vframes_1 = vframes; _i < vframes_1.length; _i++) {
                vf = vframes_1[_i];
                if (!vf['$b']) { //防止嵌套的情况下深层的view被反复实例化
                    id = IdIt(vf);
                    vf['$b'] = 1;
                    vfs.push([id, G_GetAttribute(vf, G_MX_VIEW)]);
                }
            }
            for (var _b = 0, vfs_1 = vfs; _b < vfs_1.length; _b++) {
                _a = vfs_1[_b], id = _a[0], vf = _a[1];
                if (DEBUG && document.querySelectorAll("#" + id).length > 1) {
                    Magix_Cfg.error(Error("mount vframe error. dom id:\"" + id + "\" duplicate"));
                }
                if (DEBUG) {
                    if (vfs[id]) {
                        Magix_Cfg.error(Error("vf.id duplicate:" + id + " at " + me[G_PATH]));
                    }
                    else {
                        me.mountVframe(vfs[id] = id, vf);
                    }
                }
                else {
                    me.mountVframe(id, vf);
                }
            }
            me['$d'] = 0;
            if (!inner) {
                Vframe_NotifyCreated(me);
            }
        },
        /**
         * 销毁vframe
         * @param  {String} [id]      节点id
         */
        unmountVframe: function (id /*,keepPreHTML*/, inner) {
            var me = this, vf;
            id = id ? me['$c'][id] : me.id;
            //let vom = me.owner;
            vf = Vframe_Vframes[id];
            if (vf) {
                var cr = vf["$cr"], pId = vf.pId;
                vf.unmountView( /*keepPreHTML*/);
                Vframe_RemoveVframe(id, cr);
                vf.id = vf.pId = vf['$c'] = vf['$e'] = 0; //清除引用,防止被移除的view内部通过setTimeout之类的异步操作有关的界面，影响真正渲染的view
                vf['$h'] = 0;
                vf.off('alter');
                vf.off('created');
                //if (Vframe_Cache.length < 10) {
                Vframe_Cache.push(vf);
                //}
                vf = Vframe_Vframes[pId];
                if (vf && G_Has(vf['$c'], id)) { //childrenMap
                    delete vf['$c'][id]; //childrenMap
                    vf['$n'] = 0;
                    vf['$cc']--; //cildrenCount
                    if (!inner)
                        Vframe_NotifyCreated(vf); //移除后通知完成事件
                }
            }
        },
        /**
         * 销毁某个区域下面的所有子vframes
         * @param {HTMLElement|String} [zoneId] 节点对象或id
         */
        unmountZone: function (zoneId, inner) {
            var me = this;
            var p;
            for (p in me['$c']) {
                if (!zoneId || (p != zoneId && G_NodeIn(p, zoneId))) {
                    me.unmountVframe(p /*,keepPreHTML,*/, 1);
                }
            }
            if (!inner)
                Vframe_NotifyCreated(me);
        },
        /**
         * 获取父vframe
         * @param  {Integer} [level] 向上查找层级，默认1,取当前vframe的父级
         * @return {Vframe|undefined}
         * @beta
         * @module linkage
         */
        parent: function (level, vf) {
            vf = this;
            level = (level >>> 0) || 1;
            while (vf && level--) {
                vf = Vframe_Vframes[vf.pId];
            }
            return vf;
        },
        /**
         * 获取当前vframe的所有子vframe的id。返回数组中，vframe在数组中的位置并不固定
         * @return {Array[String]}
         * @beta
         * @module linkage
         * @example
         * let children = view.owner.children();
         * console.log(children);
         */
        children: function (me) {
            me = this;
            return me['$n'] || (me['$n'] = G_Keys(me['$c']));
        },
        /**
         * 调用view的方法
         * @param  {String} name 方法名
         * @param  {Array} [args] 参数
         * @return {Object}
         * @beta
         * @module linkage
         * @example
         * // html
         * // &lt;div&gt; mx-view="path/to/v1" id="test"&gt;&lt;/div&gt;
         * let vf = Magix.Vframe.get('test');
         * vf.invoke('methodName',['args1','agrs2']);
         */
        invoke: function (name, args) {
            var result;
            var vf = this, view, fn, o, list = vf['$f'], key;
            if ((view = vf['$v']) && view['$e']) { //view rendered
                result = (fn = view[name]) && G_ToTry(fn, args, view);
            }
            else {
                o = list[key = G_SPLITER + name];
                if (o) {
                    o.r = args === o.a; //参数一样，则忽略上次的
                }
                o = {
                    n: name,
                    a: args,
                    k: key
                };
                list.push(o);
                list[key] = o;
            }
            return result;
        }
        /**
         * 子孙view修改时触发
         * @name Vframe#alter
         * @event
         * @param {Object} e
         */
        /**
         * 子孙view创建完成时触发
         * @name Vframe#created
         * @event
         * @param {Object} e
         */
    });
    Magix.Vframe = Vframe;
    /**
     * Vframe 中的2条线
     * 一：
     *     渲染
     *     每个Vframe有$cc(childrenCount)属性和$c(childrenItems)属性
     *
     * 二：
     *     修改与创建完成
     *     每个Vframe有rC(readyCount)属性和$r(readyMap)属性
     *
     *      fca firstChildrenAlter  fcc firstChildrenCreated
     */
    $.fn.invokeView = function (name, args) {
        var returned = [], e, vf;
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            e = _a[_i];
            vf = e.vframe;
            returned.push(vf && vf.invoke(name, args));
        }
        return returned;
    };
    /*
    dom event处理思路

    性能和低资源占用高于一切，在不特别影响编程体验的情况下，向性能和资源妥协

    1.所有事件代理到body上
    2.优先使用原生冒泡事件，使用mouseover+Magix.inside代替mouseenter
        'over<mouseover>':function(e){
            if(!Magix.inside(e.relatedTarget,e.eventTarget)){
                //enter
            }
        }
    3.事件支持嵌套，向上冒泡
    4.如果同一节点上同时绑定了mx-event和选择器事件，如
        <div data-menu="true" mx-click="clickMenu()"></div>

        'clickMenu<click>'(e){
            console.log('direct',e);
        },
        '$div[data-menu="true"]<click>'(e){
            console.log('selector',e);
        }

        那么先派发选择器绑定的事件再派发mx-event绑定的事件


    5.在当前view根节点上绑定事件，目前只能使用选择器绑定，如
        '$<click>'(e){
            console.log('view root click',e);
        }
    
    range:{
        app:{
            20:{
                mouseover:1,
                mousemove:1
            }
        }
    }
    view:{
        linkage:{
            40:1
        }
    }
 */
    var Body_EvtInfoCache = new G_Cache(30, 10);
    var Body_EvtInfoReg = /(?:([\w\-]+)\x1e)?([^(]+)\(([\s\S]*)?\)/;
    var Body_RootEvents = {};
    var Body_SearchSelectorEvents = {};
    var Body_RangeEvents = {};
    var Body_RangeVframes = {};
    var Body_Guid = 0;
    var Body_FindVframeInfo = function (current, eventType) {
        var vf, tempId, selectorObject, eventSelector, eventInfos = [], begin = current, info = G_GetAttribute(current, "mx-" + eventType), match, view, vfs = [], selectorVfId = G_HashKey, backtrace = 0;
        if (info) {
            match = Body_EvtInfoCache.get(info);
            if (!match) {
                match = info.match(Body_EvtInfoReg) || G_EMPTY_ARRAY;
                match = {
                    v: match[1],
                    n: match[2],
                    i: match[3]
                };
                Body_EvtInfoCache.set(info, match);
            }
            match = G_Assign({}, match, { r: info });
        }
        //如果有匹配但没有处理的vframe或者事件在要搜索的选择器事件里
        if ((match && !match.v) || Body_SearchSelectorEvents[eventType]) {
            if ((selectorObject = Body_RangeVframes[tempId = begin['$d']])
                && selectorObject[begin['$e']] == 1) {
                view = 1;
                selectorVfId = tempId; //如果节点有缓存，则使用缓存
            }
            if (!view) { //先找最近的vframe
                vfs.push(begin);
                while (begin != G_DOCBODY && (begin = begin.parentNode)) { //找最近的vframe,且节点上没有mx-autonomy属性
                    if (Vframe_Vframes[tempId = begin.id] ||
                        ((selectorObject = Body_RangeVframes[tempId = begin['$d']]) &&
                            selectorObject[begin['$e']] == 1)) {
                        selectorVfId = tempId;
                        break;
                    }
                    vfs.push(begin);
                }
                // for (var _i = 0, vfs_2 = vfs; _i < vfs_2.length; _i++) {
                //     info = vfs_2[_i];
                //     if (!(tempId = Body_RangeVframes[selectorVfId])) {
                //         tempId = Body_RangeVframes[selectorVfId] = {};
                //     }
                //     selectorObject = info['$e'] || (info['$e'] = ++Body_Guid);
                //     tempId[selectorObject] = 1;
                //     info['$d'] = selectorVfId;
                // }
            }
            //if (selectorVfId != G_HashKey) { //从最近的vframe向上查找带有选择器事件的view
            begin = current.id;
            if (Vframe_Vframes[begin]) {
                /*
                    如果当前节点是vframe的根节点，则把当前的vf置为该vframe
                    该处主要处理这样的边界情况
                    <mx-vrame src="./test" mx-click="parent()"/>
                    //.test.js
                    export default Magix.View.extend({
                        '$<click>'(){
                            console.log('test clicked');
                        }
                    });
    
                    当click事件发生在mx-vframe节点上时，要先派发内部通过选择器绑定在根节点上的事件，然后再派发外部的事件
                */
                backtrace = selectorVfId = begin;
            }
            do {
                vf = Vframe_Vframes[selectorVfId];
                if (vf && (view = vf['$v'])) {
                    selectorObject = view['$so'];
                    eventSelector = selectorObject[eventType];
                    if (eventSelector) {
                        for (begin = eventSelector.length; begin--;) {
                            tempId = eventSelector[begin];
                            selectorObject = {
                                r: tempId,
                                v: selectorVfId,
                                n: tempId
                            };
                            if (tempId) {
                                /*
                                    事件发生时，做为临界的根节点只能触发`$`绑定的事件，其它事件不能触发
                                */
                                if (!backtrace &&
                                    G_TargetMatchSelector(current, tempId)) {
                                    eventInfos.push(selectorObject);
                                }
                            }
                            else if (backtrace) {
                                eventInfos.unshift(selectorObject);
                            }
                        }
                    }
                    //防止跨view选中，到带模板的view时就中止或未指定
                    if (view.tmpl && !backtrace) {
                        if (match && !match.v)
                            match.v = selectorVfId;
                        break; //带界面的中止
                    }
                    backtrace = 0;
                }
            } while (vf && (selectorVfId = vf.pId));
            //}
        }
        if (match) {
            eventInfos.push(match);
        }
        return eventInfos;
    };
    var Body_DOMEventProcessor = function (domEvent) {
        var target = domEvent.target, type = domEvent.type;
        var eventInfos;
        var ignore;
        var vframe, view, eventName, fn;
        var lastVfId;
        var params, arr = [];
        var remold = Magix_Cfg.remold;
        while (target != G_DOCBODY &&
            (!remold || remold(target, type, domEvent))) {
            eventInfos = Body_FindVframeInfo(target, type);
            if (eventInfos.length) {
                arr = [];
                for (var _i = 0, eventInfos_1 = eventInfos; _i < eventInfos_1.length; _i++) {
                    var _a = eventInfos_1[_i], v = _a.v, r = _a.r, n = _a.n, i = _a.i;
                    if (!v && DEBUG) {
                        return Magix_Cfg.error(Error("bad " + type + ":" + r));
                    }
                    if (lastVfId != v) {
                        if (lastVfId && domEvent.isPropagationStopped()) {
                            break;
                        }
                        lastVfId = v;
                    }
                    vframe = Vframe_Vframes[v];
                    view = vframe && vframe['$v'];
                    if (view) {
                        eventName = n + G_SPLITER + type;
                        fn = view[eventName];
                        if (fn) {
                            domEvent.eventTarget = target;
                            params = i ? G_ParseExpr(i, view['$d']['$a']) : {};
                            domEvent[G_PARAMS] = params;
                            G_ToTry(fn, domEvent, view);
                            //没发现实际的用途
                            /*if (domEvent.isImmediatePropagationStopped()) {
                                break;
                            }*/
                        }
                        if (DEBUG) {
                            if (!fn) { //检测为什么找不到处理函数
                                if (eventName[0] == '\u001f') {
                                    console.error('use view.wrapEvent wrap your html');
                                }
                                else {
                                    console.error('can not find event processor:' + n + '<' + type + '> from view:' + vframe.path);
                                }
                            }
                        }
                    }
                    else { //如果处于删除中的事件触发，则停止事件的传播
                        domEvent.stopPropagation();
                    }
                    if (DEBUG) {
                        if (!view && view !== 0) { //销毁
                            console.error('can not find vframe:' + v);
                        }
                    }
                }
            }
            /*|| e.mxStop */
            if (((ignore = Body_RangeEvents[fn = target['$d']]) &&
                (ignore = ignore[target['$e']]) &&
                ignore[type]) ||
                domEvent.isPropagationStopped()) { //避免使用停止事件冒泡，比如别处有一个下拉框，弹开，点击到阻止冒泡的元素上，弹出框不隐藏
                //如果从某个节点开始忽略某个事件的处理，则如果缓存中有待处理的节点，把这些节点owner.vframe处理成当前节点的owner.vframe
                if (arr.length) {
                    arr.push(fn);
                }
                break;
            }
            else {
                //如果某个节点是view临界节点
                //先追加id，后续节点的owner.vframe则是该节点
                lastVfId = target.id;
                if (Vframe_Vframes[lastVfId]) {
                    arr.push(lastVfId);
                }
                //缓存
                arr.push(target);
            }
            target = target.parentNode || G_DOCBODY;
        }
        // if ((fn = arr.length)) {
        //     ignore = G_HashKey;
        //     for (; fn--;) {
        //         view = arr[fn];
        //         if (view.nodeType) {
        //             if (!(eventInfos = Body_RangeEvents[ignore])) {
        //                 eventInfos = Body_RangeEvents[ignore] = {};
        //             }
        //             lastVfId = view['$e'] || (view['$e'] = ++Body_Guid);
        //             if (!(params = eventInfos[lastVfId])) {
        //                 params = eventInfos[lastVfId] = {};
        //                 //view['$d'] = ignore;
        //             }
        //             params[type] = 1;
        //         }
        //         else {
        //             ignore = view;
        //         }
        //     }
        // }
    };
    var Body_DOMEventBind = function (type, searchSelector, remove) {
        var counter = Body_RootEvents[type] | 0;
        var offset = (remove ? -1 : 1);
        if (!counter || remove === counter) { // remove=1  counter=1
            G_DOMEventLibBind(G_DOCBODY, type, Body_DOMEventProcessor, remove);
        }
        Body_RootEvents[type] = counter + offset;
        if (searchSelector) { //记录需要搜索选择器的事件
            Body_SearchSelectorEvents[type] = (Body_SearchSelectorEvents[type] | 0) + offset;
        }
    };
    /*
2017.8.1
    直接应用节点对比方案，需要解决以下问题
    1.　view销毁问题，节点是边对比边销毁或新增，期望是view先统一销毁，然后再统一渲染
    2.　需要识别view内的节点变化，如
        <div mx-viwe="app/view">
            <%for(let i=0;i<count;i++){%>
                <span><%=i%></span>
            <%}%>
        </div>
        从外层的div看，并没有变化，但是内部的节点发生了变化，该view仍然需要销毁
2018.1.10
    组件情况：
    1. 组件带模板，最常见的情况
    2. 组件带模板，还有可能访问dom节点，如<mx-dropdown><i value="1">星期一</i></mx-dropdown>
    3. 组件没有模板
    

    组件前后数据是否一致，通过JSON.stringify序列化比较
    比较组件节点内的html片断是否变化

    渲染情况：
    1.　通过标签渲染
    2.　动态渲染
 */
    //https://github.com/DylanPiercey/set-dom/blob/master/src/index.js
    //https://github.com/patrick-steele-idem/morphdom
    var I_SVGNS = 'http://www.w3.org/2000/svg';
    var I_MATHNS = 'http://www.w3.org/1998/Math/MathML';
    var I_WrapMap = {
        // Support: IE <=9 only
        option: [1, '<select multiple>'],
        // XHTML parsers do not magically insert elements in the
        // same way that tag soup parsers do. So we cannot shorten
        // this by omitting <tbody> or other required elements.
        thead: [1, '<table>'],
        col: [2, '<table><colgroup>'],
        tr: [2, '<table><tbody>'],
        td: [3, '<table><tbody><tr>'],
        area: [1, '<map>'],
        param: [1, '<object>'],
        g: [1, "<svg xmlns=\"" + I_SVGNS + "\">"],
        m: [1, "<math xmlns=\"" + I_MATHNS + "\">"],
        _: [0, '']
    };
    var I_RTagName = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i;
    // Support: IE <=9 only
    I_WrapMap.optgroup = I_WrapMap.option;
    I_WrapMap.tbody = I_WrapMap.tfoot = I_WrapMap.colgroup = I_WrapMap.caption = I_WrapMap.thead;
    I_WrapMap.th = I_WrapMap.td;
    var I_Doc = G_DOCUMENT.implementation.createHTMLDocument(G_EMPTY);
    var I_Base = I_Doc.createElement('base');
    I_Base.href = G_DOCUMENT.location.href;
    I_Doc.head.appendChild(I_Base);
    var I_UnmountVframs = function (vf, n) {
        if (n.nodeType == 1) {
            var id = IdIt(n);
            vf.unmountZone(id, 1);
            if (vf['$c'][id]) {
                vf.unmountVframe(id, 1);
            }
        }
    };
    var I_GetNode = function (html, node) {
        var tmp = I_Doc.createElement('div');
        // Deserialize a standard representation
        var ns = node.namespaceURI, tag;
        if (ns == I_SVGNS) {
            tag = 'g';
        }
        else if (ns == I_MATHNS) {
            tag = 'm';
        }
        else {
            tag = (I_RTagName.exec(html) || [0, ''])[1];
        }
        var wrap = I_WrapMap[tag] || I_WrapMap._;
        tmp.innerHTML = wrap[1] + html;
        // Descend through wrappers to the right content
        var j = wrap[0];
        while (j--) {
            tmp = tmp.lastChild;
        }
        return tmp;
    };
    //https://github.com/patrick-steele-idem/morphdom/blob/master/src/specialElHandlers.js
    var I_Specials = {
        INPUT: [G_VALUE, 'checked'],
        TEXTAREA: [G_VALUE],
        OPTION: ['selected']
    };
    var I_SetAttributes = function (oldNode, newNode, ref, keepId) {
        delete oldNode['$f'];
        var a, i, key, value;
        var oldAttributes = oldNode.attributes, newAttributes = newNode.attributes;
        for (i = oldAttributes.length; i--;) {
            a = oldAttributes[i].name;
            if (!newNode.hasAttribute(a)) {
                if (a == 'id') {
                    if (!keepId) {
                        ref.d.push([oldNode, G_EMPTY]);
                    }
                }
                else {
                    ref.c = 1;
                    oldNode.removeAttribute(a);
                }
            }
        }
        // Set new attributes.
        for (i = newAttributes.length; i--;) {
            a = newAttributes[i];
            key = a.name;
            value = a[G_VALUE];
            if (G_GetAttribute(oldNode, key) != value) {
                if (key == 'id') {
                    ref.d.push([oldNode, value]);
                }
                else {
                    ref.c = 1;
                    oldNode.setAttribute(key, value);
                }
            }
        }
    };
    var I_SpecialDiff = function (oldNode, newNode) {
        var nodeName = oldNode.nodeName, i;
        var specials = I_Specials[nodeName];
        var result = 0;
        if (specials) {
            for (var _i = 0, specials_1 = specials; _i < specials_1.length; _i++) {
                i = specials_1[_i];
                if (oldNode[i] != newNode[i]) {
                    result = 1;
                    oldNode[i] = newNode[i];
                }
            }
        }
        return result;
    };
    var I_GetCompareKey = function (node, key) {
        if (node.nodeType == 1) {
            if (node['$f']) {
                key = node['$g'];
            }
            else {
                key = node['$a'] ? G_EMPTY : G_GetAttribute(node, 'id');
                if (!key) {
                    key = G_GetAttribute(node, G_Tag_Key);
                }
                if (!key) {
                    key = G_GetAttribute(node, G_MX_VIEW);
                    if (key) {
                        key = G_ParseUri(key)[G_PATH];
                    }
                }
                node['$f'] = 1;
                node['$g'] = key;
            }
        }
        return key;
    };
    var I_SetChildNodes = function (oldParent, newParent, ref, vframe, keys) {
        var oldNode = oldParent.lastChild;
        var newNode = newParent.firstChild;
        var tempNew, tempOld, extra = 0, nodeKey, foundNode, keyedNodes = {}, newKeyedNodes = {}, next;
        // Extract keyed nodes from previous children and keep track of total count.
        while (oldNode) {
            extra++;
            nodeKey = I_GetCompareKey(oldNode);
            if (nodeKey) {
                nodeKey = keyedNodes[nodeKey] || (keyedNodes[nodeKey] = []);
                nodeKey.push(oldNode);
            }
            oldNode = oldNode.previousSibling;
            // if (newNode) {
            //     nodeKey = I_GetCompareKey(newNode);
            //     if (nodeKey) {
            //         newKeyedNodes[nodeKey] = 1;
            //     }
            //     newNode = newNode.nextSibling;
            // }
        }
        while (newNode) {
            nodeKey = I_GetCompareKey(newNode);
            if (nodeKey) {
                newKeyedNodes[nodeKey] = (newKeyedNodes[nodeKey] || 0) + 1;
            }
            newNode = newNode.nextSibling;
        }
        newNode = newParent.firstChild;
        //removed = newParent.childNodes.length < extra;
        oldNode = oldParent.firstChild;
        while (newNode) {
            extra--;
            tempNew = newNode;
            newNode = newNode.nextSibling;
            nodeKey = I_GetCompareKey(tempNew);
            foundNode = keyedNodes[nodeKey];
            if (foundNode && (foundNode = foundNode.pop())) {
                while (foundNode != oldNode) {
                    next = oldNode.nextSibling;
                    oldParent.appendChild(oldNode);
                    oldNode = next;
                }
                oldNode = foundNode.nextSibling;
                if (newKeyedNodes[nodeKey]) {
                    newKeyedNodes[nodeKey]--;
                }
                // if (foundNode != oldNode) {//如果找到的节点和当前不同，则移动
                //     if (removed && oldNode.nextSibling == foundNode) {
                //         oldParent.appendChild(oldNode);
                //         oldNode = foundNode.nextSibling;
                //     } else {
                //         oldParent.insertBefore(foundNode, oldNode);
                //     }
                // } else {
                //     oldNode = oldNode.nextSibling;
                // }
                I_SetNode(foundNode, tempNew, oldParent, ref, vframe, keys);
            }
            else if (oldNode) {
                tempOld = oldNode;
                nodeKey = I_GetCompareKey(tempOld);
                if (nodeKey && keyedNodes[nodeKey] && newKeyedNodes[nodeKey]) {
                    extra++;
                    ref.c = 1;
                    ref.n.push([8, oldParent, tempNew, tempOld]);
                    //I_LazyId(ref, tempNew);
                    // If the old child had a key we skip over it until the end.
                    //oldParent.insertBefore(tempNew, tempOld);
                }
                else {
                    oldNode = oldNode.nextSibling;
                    // Otherwise we diff the two non-keyed nodes.
                    I_SetNode(tempOld, tempNew, oldParent, ref, vframe, keys);
                }
            }
            else {
                //I_LazyId(ref, tempNew);
                // Finally if there was no old node we add the new node.
                //oldParent.appendChild(tempNew);
                ref.c = 1;
                ref.n.push([1, oldParent, tempNew]);
            }
        }
        // If we have any remaining unkeyed nodes remove them from the end.
        tempOld = oldParent.lastChild;
        while (extra-- > 0) {
            I_UnmountVframs(vframe, tempOld);
            if (DEBUG) {
                if (!tempOld.parentNode) {
                    console.error('Avoid remove node on view.destroy in digesting');
                }
            }
            ref.n.push([2, oldParent, tempOld]);
            tempOld = tempOld.previousSibling;
            //oldParent.removeChild(tempOld);
            ref.c = 1;
        }
    };
    var I_SetNode = function (oldNode, newNode, oldParent, ref, vf, keys) {
        //优先使用浏览器内置的方法进行判断
        /*
            特殊属性优先判断，先识别特殊属性是否发生了改变
            如果特殊属性发生了变化，是否更新取决于该节点上是否渲染了view
            如果渲染了view则走相关的view流程
            否则才更新特殊属性
    
            场景：<input value="{{=abc}}"/>
            updater.digest({abc:'abc'});
            然后用户删除了input中的abc修改成了123
            此时依然updater.digest({abc:'abc'}),问input中的值该显示abc还是123?
            目前是显示abc
        */
        if (I_SpecialDiff(oldNode, newNode) ||
            (oldNode.nodeType == 1 && oldNode.hasAttribute(G_Tag_View_Key)) ||
            !(oldNode.isEqualNode && oldNode.isEqualNode(newNode))) {
            if (oldNode.nodeName === newNode.nodeName) {
                // Handle regular element node updates.
                if (oldNode.nodeType === 1) {
                    var staticKey = G_GetAttribute(newNode, G_Tag_Key);
                    if (staticKey &&
                        staticKey == G_GetAttribute(oldNode, G_Tag_Key)) {
                        return;
                    }
                    // If we have the same nodename then we can directly update the attributes.
                    var newMxView = G_GetAttribute(newNode, G_MX_VIEW), newHTML = newNode.innerHTML;
                    var newStaticAttrKey = G_GetAttribute(newNode, G_Tag_Attr_Key);
                    var updateAttribute = !newStaticAttrKey || newStaticAttrKey != G_GetAttribute(oldNode, G_Tag_Attr_Key), updateChildren = void 0, unmountOld = void 0, oldVf = Vframe_Vframes[G_GetAttribute(oldNode, 'id')], assign = void 0, view = void 0, uri = newMxView && G_ParseUri(newMxView), params = void 0, htmlChanged = void 0, paramsChanged = void 0;
                    if (newMxView && oldVf &&
                        (!G_GetAttribute(newNode, 'id') || G_GetAttribute(newNode, 'id') == G_GetAttribute(oldNode, 'id')) &&
                        oldVf['$j'] == uri[G_PATH] &&
                        (view = oldVf['$v'])) {
                        htmlChanged = newHTML != oldVf['$i'];
                        paramsChanged = newMxView != oldVf[G_PATH];
                        assign = G_GetAttribute(oldNode, G_Tag_View_Key);
                        //如果组件内html没改变，参数也没改变
                        //我们要检测引用参数是否发生了改变
                        if (!htmlChanged && !paramsChanged && assign) {
                            //对于mxv属性，带value的必定是组件
                            //所以对组件，我们只检测参数与html，所以组件的hasMXV=0
                            params = assign.split(G_COMMA);
                            for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
                                assign = params_1[_i];
                                //支持模板内使用this获取整个数据对象
                                //如果使用this来传递数据，我们把this的key处理成#号
                                //遇到#号则任意的数据改变都需要更新当前这个组件
                                if (assign == G_HashKey || G_Has(keys, assign)) {
                                    paramsChanged = 1;
                                    break;
                                }
                            }
                        }
                        //目前属性变化并不更新view,如果要更新，只需要再判断下updateAttribute即可
                        if (paramsChanged || htmlChanged) {
                            assign = view['$e'] && view['$f'];
                            if (assign) {
                                params = uri[G_PARAMS];
                                //处理引用赋值
                                Vframe_TranslateQuery(oldVf.pId, newMxView, params);
                                oldVf['$i'] = newHTML;
                                //oldVf['$o'] = newDataStringify;
                                oldVf[G_PATH] = newMxView; //update ref
                                uri = {
                                    node: newNode,
                                    //html: newHTML,
                                    deep: !view.tmpl,
                                    attr: updateAttribute,
                                    //mxv: hasMXV,
                                    inner: htmlChanged,
                                    query: paramsChanged,
                                    keys: keys
                                };
                                //updateAttribute = 1;
                                /*if (updateAttribute) {
                                    updateAttribute = G_EMPTY;
                                    I_SetAttributes(oldNode, newNode, ref, 1);
                                }*/
                                if (G_ToTry(assign, [params, uri], view)) {
                                    ref.v.push(view);
                                }
                                //默认当一个组件有assign方法时，由该方法及该view上的render方法完成当前区域内的节点更新
                                //而对于不渲染界面的控制类型的组件来讲，它本身更新后，有可能需要继续由magix更新内部的子节点，此时通过deep参数控制
                                updateChildren = uri.deep;
                            }
                            else {
                                unmountOld = 1;
                                updateChildren = 1;
                            }
                        } //else {//view没发生变化，则只更新特别的几个属性
                        //updateAttribute = 1;
                        //}
                    }
                    else {
                        updateChildren = 1;
                        unmountOld = oldVf;
                    }
                    if (unmountOld) {
                        ref.c = 1;
                        oldVf.unmountVframe(0, 1);
                    }
                    if (updateAttribute) {
                        //对于view，我们只更新特别的几个属性
                        I_SetAttributes(oldNode, newNode, ref, oldVf && newMxView);
                    }
                    // Update all children (and subchildren).
                    if (updateChildren) {
                        //ref.c = 1;
                        I_SetChildNodes(oldNode, newNode, ref, vf, keys);
                    }
                }
                else if (oldNode.nodeValue !== newNode.nodeValue) {
                    ref.c = 1;
                    oldNode.nodeValue = newNode.nodeValue;
                }
            }
            else {
                // we have to replace the node.
                I_UnmountVframs(vf, oldNode);
                //I_LazyId(ref, newNode);
                //oldParent.replaceChild(newNode, oldNode);
                ref.c = 1;
                ref.n.push([4, oldParent, newNode, oldNode]);
            }
        }
    };
    var Updater_EM = {
        '&': 'amp',
        '<': 'lt',
        '>': 'gt',
        '"': '#34',
        '\'': '#39',
        '\`': '#96'
    };
    var Updater_ER = /[&<>"'\`]/g;
    var Updater_Safeguard = function (v) { return '' + (v == null ? '' : v); };
    var Updater_EncodeReplacer = function (m) { return "&" + Updater_EM[m] + ";"; };
    var Updater_Encode = function (v) { return Updater_Safeguard(v).replace(Updater_ER, Updater_EncodeReplacer); };
    var Updater_Ref = function ($$, v, k, f) {
        for (f = $$[G_SPLITER]; --f;)
            if ($$[k = G_SPLITER + f] === v)
                return k;
        $$[k = G_SPLITER + $$[G_SPLITER]++] = v;
        return k;
    };
    var Updater_UM = {
        '!': '%21',
        '\'': '%27',
        '(': '%28',
        ')': '%29',
        '*': '%2A'
    };
    var Updater_URIReplacer = function (m) { return Updater_UM[m]; };
    var Updater_URIReg = /[!')(*]/g;
    var Updater_EncodeURI = function (v) { return encodeURIComponent(Updater_Safeguard(v)).replace(Updater_URIReg, Updater_URIReplacer); };
    var Updater_QR = /[\\'"]/g;
    var Updater_EncodeQ = function (v) { return Updater_Safeguard(v).replace(Updater_QR, '\\$&'); };
    var Updater_Digest = function (updater, digesting) {
        var keys = updater['$k'], changed = updater['$c'], selfId = updater['$b'], vf = Vframe_Vframes[selfId], view = vf && vf['$v'], ref = { d: [], v: [], n: [] }, node = G_GetById(selfId), tmpl, vdom, data = updater['$d'], refData = updater['$a'], redigest = function (trigger) {
            if (digesting.i < digesting.length) {
                Updater_Digest(updater, digesting);
            }
            else {
                ref = digesting.slice();
                digesting.i = digesting.length = 0;
                if (trigger) {
                    view.fire('domready');
                }
                G_ToTry(ref);
            }
        };
        digesting.i = digesting.length;
        updater['$c'] = 0;
        updater['$k'] = {};
        if (changed &&
            view &&
            node &&
            view['$a'] > 0 &&
            (tmpl = view.tmpl) && view['$d'] == updater) {
            //修正通过id访问到不同的对象
            view.fire('dompatch');
            delete Body_RangeEvents[selfId];
            delete Body_RangeVframes[selfId];
            vdom = I_GetNode(tmpl(data, selfId, refData, Updater_Encode, Updater_Safeguard, Updater_EncodeURI, Updater_Ref, Updater_EncodeQ), node);
            I_SetChildNodes(node, vdom, ref, vf, keys);
            for (var _i = 0, _a = ref.d; _i < _a.length; _i++) {
                vdom = _a[_i];
                vdom[0].id = vdom[1];
            }
            for (var _b = 0, _c = ref.n; _b < _c.length; _b++) {
                vdom = _c[_b];
                if (vdom[0] == 1) {
                    vdom[1].appendChild(vdom[2]);
                }
                else if (vdom[0] == 2) {
                    vdom[1].removeChild(vdom[2]);
                }
                else if (vdom[0] == 4) {
                    vdom[1].replaceChild(vdom[2], vdom[3]);
                }
                else {
                    vdom[1].insertBefore(vdom[2], vdom[3]);
                }
            }
            /*
                在dom diff patch时，如果已渲染的vframe有变化，则会在vom tree上先派发created事件，同时传递inner标志，vom tree处理alter事件派发状态，未进入created事件派发状态
    
                patch完成后，需要设置vframe hold fire created事件，因为带有assign方法的view在调用render后，vom tree处于就绪状态，此时会导致提前派发created事件，应该hold，统一在endUpdate中派发
    
                有可能不需要endUpdate，所以hold fire要视情况而定
            */
            vf['$d'] = tmpl = ref.c || !view['$e'];
            for (var _d = 0, _e = ref.v; _d < _e.length; _d++) {
                vdom = _e[_d];
                vdom['$b']();
            }
            if (tmpl) {
                view.endUpdate(selfId);
            }
            if (ref.c) {
                G_DOC.trigger({
                    type: 'htmlchanged',
                    vId: selfId
                });
            }
            redigest(1);
        }
        else {
            redigest();
        }
    };
    /**
     * 使用mx-keys进行局部刷新的类
     * @constructor
     * @name Updater
     * @class
     * @beta
     * @module updater
     * @param {String} viewId Magix.View对象Id
     */
    function Updater(viewId) {
        var _a;
        var me = this;
        me['$b'] = viewId;
        me['$c'] = 1;
        me['$d'] = {
            vId: viewId
        };
        me['$a'] = (_a = {},
            _a[G_SPLITER] = 1,
            _a);
        me['$e'] = [];
        me['$k'] = {};
    }
    G_Assign(Updater[G_PROTOTYPE], {
        /**
         * @lends Updater#
         */
        /**
         * 获取放入的数据
         * @param  {String} [key] key
         * @return {Object} 返回对应的数据，当key未传递时，返回整个数据对象
         * @example
         * render: function() {
         *     this.updater.set({
         *         a: 10,
         *         b: 20
         *     });
         * },
         * 'read&lt;click&gt;': function() {
         *     console.log(this.updater.get('a'));
         * }
         */
        get: function (key, result) {
            result = this['$d'];
            if (key) {
                result = result[key];
            }
            return result;
        },
        /**
         * 通过path获取值
         * @param  {String} path 点分割的路径
         * @return {Object}
         */
        /*gain: function (path) {
            let result = this.$d;
            let ps = path.split('.'),
                temp;
            while (result && ps.length) {
                temp = ps.shift();
                result = result[temp];
            }
            return result;
        },*/
        /**
         * 获取放入的数据
         * @param  {Object} obj 待放入的数据
         * @return {Updater} 返回updater
         * @example
         * render: function() {
         *     this.updater.set({
         *         a: 10,
         *         b: 20
         *     });
         * },
         * 'read&lt;click&gt;': function() {
         *     console.log(this.updater.get('a'));
         * }
         */
        set: function (obj, unchanged) {
            var me = this;
            me['$c'] = G_Set(obj, me['$d'], me['$k'], unchanged) || me['$c'];
            return me;
        },
        /**
         * 检测数据变化，更新界面，放入数据后需要显式调用该方法才可以把数据更新到界面
         * @example
         * render: function() {
         *     this.updater.set({
         *         a: 10,
         *         b: 20
         *     }).digest();
         * }
         */
        digest: function (data, unchanged, resolve) {
            var me = this.set(data, unchanged), digesting = me['$e'];
            /*
                view:
                <div>
                    <mx-dropdown mx-focusout="rerender()"/>
                <div>
    
                view.digest=>dropdown.focusout=>view.redigest=>view.redigest.end=>view.digest.end
    
                view.digest中嵌套了view.redigest，view.redigest可能操作了view.digest中引用的dom,这样会导致view.redigest.end后续的view.digest中出错
    
                expect
                view.digest=>dropdown.focusout=>view.digest.end=>view.redigest=>view.redigest.end
    
                如果在digest的过程中，多次调用自身的digest，则后续的进行排队。前面的执行完成后，排队中的一次执行完毕
            */
            if (resolve) {
                digesting.push(resolve);
            }
            if (!digesting.i) {
                Updater_Digest(me, digesting);
            }
            else if (DEBUG) {
                console.warn('Avoid redigest while updater is digesting');
            }
        },
        /**
         * 获取当前数据状态的快照，配合altered方法可获得数据是否有变化
         * @return {Updater} 返回updater
         * @example
         * render: function() {
         *     this.updater.set({
         *         a: 20,
         *         b: 30
         *     }).digest().snapshot(); //更新完界面后保存快照
         * },
         * 'save&lt;click&gt;': function() {
         *     //save to server
         *     console.log(this.updater.altered()); //false
         *     this.updater.set({
         *         a: 20,
         *         b: 40
         *     });
         *     console.log(this.updater.altered()); //true
         *     this.updater.snapshot(); //再保存一次快照
         *     console.log(this.updater.altered()); //false
         * }
         */
        snapshot: function () {
            var me = this;
            me['$f'] = JSONStringify(me['$d']);
            return me;
        },
        /**
         * 检测数据是否有变动
         * @return {Boolean} 是否变动
         * @example
         * render: function() {
         *     this.updater.set({
         *         a: 20,
         *         b: 30
         *     }).digest().snapshot(); //更新完界面后保存快照
         * },
         * 'save&lt;click&gt;': function() {
         *     //save to server
         *     console.log(this.updater.altered()); //false
         *     this.updater.set({
         *         a: 20,
         *         b: 40
         *     });
         *     console.log(this.updater.altered()); //true
         *     this.updater.snapshot(); //再保存一次快照
         *     console.log(this.updater.altered()); //false
         * }
         */
        altered: function () {
            var me = this;
            if (me['$f']) {
                return me['$f'] != JSONStringify(me['$d']);
            }
        },
        /**
         * 翻译带@占位符的数据
         * @param {string} origin 源字符串
         */
        translate: function (data) {
            return G_TranslateData(this['$d'], data);
        },
        /**
         * 翻译带@占位符的数据
         * @param {string} origin 源字符串
         */
        parse: function (origin) {
            return G_ParseExpr(origin, this['$a']);
        }
    });
    var View_EvtMethodReg = /^(\$?)([^<]*)<([^>]+)>(?:&(.+))?$/;
    var processMixinsSameEvent = function (exist, additional, temp) {
        if (exist['a']) {
            temp = exist;
        }
        else {
            temp = function (e) {
                G_ToTry(temp['a'], e, this);
            };
            temp['a'] = [exist];
            temp['b'] = 1;
        }
        temp['a'] = temp['a'].concat(additional['a'] || additional);
        return temp;
    };
    //let View_MxEvt = /\smx-(?!view|vframe)[a-z]+\s*=\s*"/g;
    var View_DestroyAllResources = function (me, lastly) {
        var cache = me['$r'], //reources
            p, c;
        for (p in cache) {
            c = cache[p];
            if (lastly || c.x) { //destroy
                View_DestroyResource(cache, p, 1);
            }
        }
    };
    var View_DestroyResource = function (cache, key, callDestroy, old) {
        var o = cache[key], fn, res;
        if (o && o != old) {
            //let processed=false;
            res = o.e; //entity
            fn = res.destroy;
            if (fn && callDestroy) {
                G_ToTry(fn, G_EMPTY_ARRAY, res);
            }
            delete cache[key];
        }
        return res;
    };
    var View_WrapMethod = function (prop, fName, short, fn, me) {
        fn = prop[fName];
        prop[fName] = prop[short] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            me = this;
            if (me['$a'] > 0) { //signature
                me['$a']++;
                me.fire('rendercall');
                View_DestroyAllResources(me);
                return G_ToTry(fn, args, me);
            }
        };
    };
    var View_DelegateEvents = function (me, destroy) {
        var e, eventsObject = me["$eo"], selectorObject = me["$so"], eventsList = me["$el"], id = me.id; //eventsObject
        for (e in eventsObject) {
            Body_DOMEventBind(e, selectorObject[e], destroy);
        }
        for (var _i = 0, eventsList_1 = eventsList; _i < eventsList_1.length; _i++) {
            e = eventsList_1[_i];
            G_DOMEventLibBind(e.e, e.n, G_DOMGlobalProcessor, destroy, {
                i: id,
                v: me,
                f: e.f,
                m: e.m,
                e: e.e
            });
        }
    };
    var View_Globals = {
        win: G_WINDOW,
        doc: G_DOCUMENT
    };
    var View_MergeMixins = function (mixins, proto, ctors) {
        var temp = {}, p, node, fn, exist;
        for (var _i = 0, mixins_1 = mixins; _i < mixins_1.length; _i++) {
            node = mixins_1[_i];
            for (p in node) {
                fn = node[p];
                exist = temp[p];
                if (p == 'ctor') {
                    ctors.push(fn);
                    continue;
                }
                else if (View_EvtMethodReg.test(p)) {
                    if (exist) {
                        fn = processMixinsSameEvent(exist, fn);
                    }
                    else {
                        fn['b'] = 1;
                    }
                }
                else if (DEBUG && exist &&
                    p != 'extend' &&
                    p != G_SPLITER &&
                    p != 'merge') { //只在开发中提示
                    Magix_Cfg.error(Error('merge duplicate:' + p));
                }
                temp[p] = fn;
            }
        }
        for (p in temp) {
            if (!G_Has(proto, p)) {
                proto[p] = temp[p];
            }
        }
    };
    function merge() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var me = this, _ = me._ || (me._ = []);
        View_MergeMixins(args, me[G_PROTOTYPE], _);
        return me;
    }
    function extend(props, statics) {
        var me = this;
        props = props || {};
        var ctor = props.ctor;
        var ctors = [];
        if (ctor)
            ctors.push(ctor);
        function NView(nodeId, ownerVf, initParams, node, mixinCtors, cs, z, params, concatCtors) {
            me.call(z = this, nodeId, ownerVf, initParams, node, mixinCtors);
            cs = NView._;
            params = [initParams, {
                node: node,
                deep: !z.tmpl
            }];
            if (cs)
                G_ToTry(cs, params, z);
            concatCtors = ctors.concat(mixinCtors);
            if (concatCtors.length) {
                G_ToTry(concatCtors, params, z);
            }
        }
        NView.merge = merge;
        NView.extend = extend;
        return G_Extend(NView, me, props, statics);
    }
    /**
     * 预处理view
     * @param  {View} oView view子类
     * @param  {Vom} vom vom
     */
    var View_Prepare = function (oView) {
        if (!oView[G_SPLITER]) { //只处理一次
            oView[G_SPLITER] = [];
            var prop = oView[G_PROTOTYPE], currentFn = void 0, matches = void 0, selectorOrCallback = void 0, events = void 0, eventsObject = {}, eventsList = [], selectorObject = {}, node = void 0, isSelector = void 0, p = void 0, item = void 0, mask = void 0, mod = void 0, modifiers = void 0;
            matches = prop.mixins;
            if (matches) {
                View_MergeMixins(matches, prop, oView[G_SPLITER]);
            }
            for (p in prop) {
                currentFn = prop[p];
                matches = p.match(View_EvtMethodReg);
                if (matches) {
                    isSelector = matches[1], selectorOrCallback = matches[2], events = matches[3], modifiers = matches[4];
                    mod = {};
                    if (modifiers) {
                        modifiers = modifiers.split(G_COMMA);
                        for (var _i = 0, modifiers_1 = modifiers; _i < modifiers_1.length; _i++) {
                            item = modifiers_1[_i];
                            mod[item] = true;
                        }
                    }
                    events = events.split(G_COMMA);
                    for (var _a = 0, events_1 = events; _a < events_1.length; _a++) {
                        item = events_1[_a];
                        node = View_Globals[selectorOrCallback];
                        mask = 1;
                        if (isSelector) {
                            if (node) {
                                eventsList.push({
                                    f: currentFn,
                                    e: node,
                                    n: item,
                                    m: mod
                                });
                                continue;
                            }
                            mask = 2;
                            node = selectorObject[item];
                            if (!node) {
                                node = selectorObject[item] = [];
                            }
                            if (!node[selectorOrCallback]) {
                                node[selectorOrCallback] = 1;
                                node.push(selectorOrCallback);
                            }
                        }
                        eventsObject[item] = eventsObject[item] | mask;
                        item = selectorOrCallback + G_SPLITER + item;
                        node = prop[item];
                        //for in 就近遍历，如果有则忽略
                        if (!node) { //未设置过
                            prop[item] = currentFn;
                        }
                        else if (node['b']) { //现有的方法是mixins上的
                            if (currentFn['b']) { //2者都是mixins上的事件，则合并
                                prop[item] = processMixinsSameEvent(currentFn, node);
                            }
                            else if (G_Has(prop, p)) { //currentFn方法不是mixin上的，也不是继承来的，在当前view上，优先级最高
                                prop[item] = currentFn;
                            }
                        }
                    }
                }
            }
            //console.log(prop);
            View_WrapMethod(prop, 'render', '$b');
            prop['$eo'] = eventsObject;
            prop['$el'] = eventsList;
            prop['$so'] = selectorObject;
            prop['$f'] = prop.assign;
        }
        return oView[G_SPLITER];
    };
    var View_IsObserveChanged = function (view) {
        var loc = view['$l'];
        var res, i, params;
        if (loc.f) {
            if (loc.p) {
                res = Router_LastChanged[G_PATH];
            }
            if (!res && loc.k) {
                params = Router_LastChanged[G_PARAMS];
                for (var _i = 0, _a = loc.k; _i < _a.length; _i++) {
                    i = _a[_i];
                    res = G_Has(params, i);
                    if (res)
                        break;
                }
            }
            // if (res && loc.c) {
            //     loc.c.call(view);
            // }
        }
        return res;
    };
    /**
     * View类
     * @name View
     * @class
     * @constructor
     * @borrows Event.on as #on
     * @borrows Event.fire as #fire
     * @borrows Event.off as #off
     * @param {Object} ops 创建view时，需要附加到view对象上的其它属性
     * @property {String} id 当前view与页面vframe节点对应的id
     * @property {Vframe} owner 拥有当前view的vframe对象
     * @example
     * // 关于事件:
     * // html写法：
     *
     * //  &lt;input type="button" mx-click="test({id:100,name:'xinglie'})" value="test" /&gt;
     * //  &lt;a href="http://etao.com" mx-click="test({com:'etao.com'})"&gt;http://etao.com&lt;/a&gt;
     *
     * // js写法：
     *
     *     'test&lt;click&gt;':function(e){
     *          e.preventDefault();
     *          //e.current 处理事件的dom节点(即带有mx-click属性的节点)
     *          //e.target 触发事件的dom节点(即鼠标点中的节点，在current里包含其它节点时，current与target有可能不一样)
     *          //e.params  传递的参数
     *          //e.params.com,e.params.id,e.params.name
     *      },
     *      'test&lt;mousedown&gt;':function(e){
     *
     *       }
     *
     *  //上述示例对test方法标注了click与mousedown事件，也可以合写成：
     *  'test&lt;click,mousedown&gt;':function(e){
     *      alert(e.type);//可通过type识别是哪种事件类型
     *  }
     */
    function View(id, owner, ops, node, me) {
        me = this;
        me.owner = owner;
        me.id = id;
        me['$l'] = {
            k: []
        };
        me['$r'] = {};
        me['$a'] = 1; //标识view是否刷新过，对于托管的函数资源，在回调这个函数时，不但要确保view没有销毁，而且要确保view没有刷新过，如果刷新过则不回调
        me.updater = me['$d'] = new Updater(me.id);
        id = View._;
        if (id)
            G_ToTry(id, [ops, {
                node: node,
                deep: !me.tmpl
            }], me);
    }
    G_Assign(View, {
        /**
         * @lends View
         */
        /**
         * 扩展View
         * @param  {Object} props 扩展到原型上的方法
         * @example
         * define('app/tview',function(require){
         *     let Magix = require('magix');
         *     Magix.View.merge({
         *         ctor:function(){
         *             this.$attr='test';
         *         },
         *         test:function(){
         *             alert(this.$attr);
         *         }
         *     });
         * });
         * //加入Magix.config的exts中
         *
         *  Magix.config({
         *      //...
         *      exts:['app/tview']
         *
         *  });
         *
         * //这样完成后，所有的view对象都会有一个$attr属性和test方法
         * //当然上述功能也可以用继承实现，但继承层次太多时，可以考虑使用扩展来消除多层次的继承
         * //同时当项目进行中发现所有view要实现某个功能时，该方式比继承更快捷有效
         *
         *
         */
        merge: merge,
        /**
         * 继承
         * @param  {Object} [props] 原型链上的方法或属性对象
         * @param {Function} [props.ctor] 类似constructor，但不是constructor，当我们继承时，你无需显示调用上一层级的ctor方法，magix会自动帮你调用
         * @param {Array} [props.mixins] mix到当前原型链上的方法对象，该对象可以有一个ctor方法用于初始化
         * @param  {Object} [statics] 静态对象或方法
         * @example
         * let Magix = require('magix');
         * let Sortable = {
         *     ctor: function() {
         *         console.log('sortable ctor');
         *         //this==当前mix Sortable的view对象
         *         this.on('destroy', function() {
         *             console.log('dispose')
         *         });
         *     },
         *     sort: function() {
         *         console.log('sort');
         *     }
         * };
         * module.exports = Magix.View.extend({
         *     mixins: [Sortable],
         *     ctor: function() {
         *         console.log('view ctor');
         *     },
         *     render: function() {
         *         this.sort();
         *     }
         * });
         */
        extend: extend
    });
    G_Assign(View[G_PROTOTYPE], MEvent, {
        /**
         * @lends View#
         */
        /**
         * 初始化调用的方法
         * @beta
         * @module viewInit
         * @param {Object} extra 外部传递的数据对象
         */
        init: G_NOOP,
        /*
         * 包装mx-event事件，比如把mx-click="test<prevent>({key:'field'})" 包装成 mx-click="magix_vf_root^test<prevent>({key:'field})"，以方便识别交由哪个view处理
         * @function
         * @param {String} html 处理的代码片断
         * @param {Boolean} [onlyAddPrefix] 是否只添加前缀
         * @return {String} 处理后的字符串
         * @example
         * View.extend({
         *     'del&lt;click&gt;':function(e){
         *         S.one(G_HashKey+e.currentId).remove();
         *     },
         *     'addNode&lt;click&gt;':function(e){
         *         let tmpl='&lt;div mx-click="del"&gt;delete&lt;/div&gt;';
         *         //因为tmpl中有mx-click，因此需要下面这行代码进行处理一次
         *         tmpl=this.wrapEvent(tmpl);
         *         S.one(G_HashKey+e.currentId).append(tmpl);
         *     }
         * });
         */
        /**
         * 通知当前view即将开始进行html的更新
         * @param {String} [id] 哪块区域需要更新，默认整个view
         */
        beginUpdate: function (id, me) {
            me = this;
            if (me['$a'] > 0 && me['$e']) {
                me.owner.unmountZone(id, 1);
                /*me.fire('prerender', {
                    id: id
                });*/
            }
        },
        /**
         * 通知当前view结束html的更新
         * @param {String} [id] 哪块区域结束更新，默认整个view
         */
        endUpdate: function (id, inner, me, o, f) {
            me = this;
            if (me['$a'] > 0) {
                id = id || me.id;
                /*me.fire('rendered', {
                    id
                });*/
                if (inner) {
                    f = inner;
                }
                else {
                    f = me['$e'];
                    me['$e'] = 1;
                }
                o = me.owner;
                o.mountZone(id, inner);
                if (!f) {
                    Timeout(me.wrapAsync(function () {
                        Vframe_RunInvokes(o);
                    }), 0);
                }
            }
        },
        /**
         * 包装异步回调
         * @param  {Function} fn 异步回调的function
         * @return {Function}
         * @example
         * render:function(){
         *     setTimeout(this.wrapAsync(function(){
         *         //codes
         *     }),50000);
         * }
         * // 为什么要包装一次？
         * // 在单页应用的情况下，可能异步回调执行时，当前view已经被销毁。
         * // 比如上例中的setTimeout，50s后执行回调，如果你的回调中去操作了DOM，
         * // 则会出错，为了避免这种情况的出现，可以调用view的wrapAsync包装一次。
         * // (该示例中最好的做法是在view销毁时清除setTimeout，
         * // 但有时候你很难控制回调的执行，比如JSONP，所以最好包装一次)
         */
        wrapAsync: function (fn, context) {
            var me = this;
            var sign = me['$a'];
            return function () {
                var a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    a[_i] = arguments[_i];
                }
                if (sign > 0 && sign == me['$a']) {
                    return fn.apply(context || me, a);
                }
            };
        },
        /**
         * 监视地址栏中的参数或path，有变动时，才调用当前view的render方法。通常情况下location有变化不会引起当前view的render被调用，所以你需要指定地址栏中哪些参数有变化时才引起render调用，使得view只关注与自已需要刷新有关的参数
         * @param {Array|String|Object} params  数组字符串
         * @param {Boolean} [isObservePath] 是否监视path
         * @beta
         * @module router
         * @example
         * return View.extend({
         *      init:function(){
         *          this.observeLocation('page,rows');//关注地址栏中的page rows2个参数的变化，当其中的任意一个改变时，才引起当前view的render被调用
         *          this.observeLocation(null,true);//关注path的变化
         *          //也可以写成下面的形式
         *          //this.observeLocation('page,rows',true);
         *          //也可以是对象的形式
         *          this.observeLocation({
         *              path: true,
         *              params:['page','rows']
         *          });
         *      },
         *      render:function(){
         *          let loc=Magix.Router.parse();
         *          console.log(loc);//获取地址解析出的对象
         *          let diff=Magix.Router.diff();
         *          console.log(diff);//获取当前地址与上一个地址差异对象
         *      }
         * });
         */
        observeLocation: function (params, isObservePath) {
            var me = this, loc;
            loc = me['$l'];
            loc.f = 1;
            if (G_IsObject(params)) {
                isObservePath = params[G_PATH];
                params = params[G_PARAMS];
            }
            //if (isObservePath) {
            loc.p = isObservePath;
            //}
            if (params) {
                loc.k = (params + G_EMPTY).split(G_COMMA);
            }
        },
        /**
         * 监视Magix.State中的数据变化
         * @param  {String|Array} keys 数据对象的key
         */
        observeState: function (keys) {
            this['$os'] = (keys + G_EMPTY).split(G_COMMA);
        },
        /**
         * 让view帮你管理资源，强烈建议对组件等进行托管
         * @param {String} key 资源标识key
         * @param {Object} res 要托管的资源
         * @param {Boolean} [destroyWhenCalleRender] 调用render方法时是否销毁托管的资源
         * @return {Object} 返回托管的资源
         * @beta
         * @module resource
         * @example
         * View.extend({
         *     render: function(){
         *         let me = this;
         *         let dropdown = new Dropdown();
         *
         *         me.capture('dropdown',dropdown,true);
         *     },
         *     getTest: function(){
         *         let dd = me.capture('dropdown');
         *         console.log(dd);
         *     }
         * });
         */
        capture: function (key, res, destroyWhenCallRender, cache) {
            cache = this['$r'];
            if (res) {
                View_DestroyResource(cache, key, 1, res);
                cache[key] = {
                    e: res,
                    x: destroyWhenCallRender
                };
                //service托管检查
                if (DEBUG && res && (res.id + G_EMPTY).indexOf('\x1es') === 0) {
                    res['$a'] = 1;
                    if (!destroyWhenCallRender) {
                        console.warn('beware! May be you should set destroyWhenCallRender = true');
                    }
                }
            }
            else {
                cache = cache[key];
                res = cache && cache.e;
            }
            return res;
        },
        /**
         * 释放管理的资源
         * @param  {String} key 托管时的key
         * @param  {Boolean} [destroy] 是否销毁资源
         * @return {Object} 返回托管的资源，无论是否销毁
         * @beta
         * @module resource
         */
        release: function (key, destroy) {
            return View_DestroyResource(this['$r'], key, destroy);
        },
        /**
         * 离开提示
         * @param  {String} msg 提示消息
         * @param  {Function} fn 是否提示的回调
         * @beta
         * @module tipRouter
         * @example
         * let Magix = require('magix');
         * module.exports = Magix.View.extend({
         *     init:function(){
         *         this.leaveTip('页面数据未保存，确认离开吗？',function(){
         *             return true;//true提示，false，不提示
         *         });
         *     }
         * });
         */
        leaveTip: function (msg, fn) {
            var me = this;
            var changeListener = function (e) {
                var a = 'a', // a for router change
                    b = 'b'; // b for viewunload change
                if (e.type != G_CHANGE) {
                    a = 'b';
                    b = 'a';
                }
                if (changeListener[a]) {
                    e.prevent();
                    e.reject();
                }
                else if (fn()) {
                    e.prevent();
                    changeListener[b] = 1;
                    me.leaveConfirm(function () {
                        changeListener[b] = 0;
                        e.resolve();
                    }, function () {
                        changeListener[b] = 0;
                        e.reject();
                    }, msg);
                }
            };
            var unloadListener = function (e) {
                if (fn()) {
                    e.msg = msg;
                }
            };
            Router.on(G_CHANGE, changeListener);
            Router.on(G_PAGE_UNLOAD, unloadListener);
            me.on('unload', changeListener);
            me.on('destroy', function () {
                Router.off(G_CHANGE, changeListener);
                Router.off(G_PAGE_UNLOAD, unloadListener);
            });
        },
        /**
         * 设置view的html内容
         * @param {String} id 更新节点的id
         * @param {Strig} html html字符串
         * @example
         * render:function(){
         *     this.setHTML(this.id,this.tmpl);//渲染界面，当界面复杂时，请考虑用其它方案进行更新
         * }
         */
        /*
            Q:为什么删除setHTML?
            A:统一使用updater更新界面。
            关于api的分级，高层api更内聚，一个api完成很多功能。方便开发者，但不灵活。
            底层api职责更单一，一个api只完成一个功能，灵活，但不方便开发者
            更新界面来讲，updater是一个高层api，但是有些功能却无法完成，如把view当成壳子或容器渲染第三方的组件，组件什么时间加载完成、渲染、更新了dom、如何通知magix等，这些问题在updater中是无解的，而setHTML这个api又不够底层，同样也无法完成一些功能，所以这个api食之无味，故删除
         */
        /*setHTML(id, html) {
            let me = this,
                n, i = me.id;
            me.beginUpdate(id);
            if (me['$a'] > 0) {
                n = G_GetById(id);
                if (n) G_HTML(n, View_SetEventOwner(html, i), i);
            }
            me.endUpdate(id);
            me.fire('domready');
        }*/
        /**
         * 渲染view，供最终view开发者覆盖
         * @function
         */
        render: G_NOOP
        /**
         * 当前view的dom就绪后触发
         * @name View#domready
         * @event
         * @param {Object} e view 完成渲染后触发
         */
        /**
         * view销毁时触发
         * @name View#destroy
         * @event
         * @param {Object} e
         */
        /**
         * 异步更新ui的方法(render)被调用前触发
         * @name View#rendercall
         * @event
         * @param {Object} e
         */
    });
    Magix.View = View;
    var G_Type = $.type;
    var G_Now = Date.now;
    /*
    一个请求send后，应该取消吗？
    参见xmlhttprequest的实现
        https://chromium.googlesource.com/chromium/blink/+/master/Source/core
        https://chromium.googlesource.com/chromium/blink/+/master/Source/core/xmlhttprequest/XMLHttpService.cpp
    当请求发出，服务器接受到之前取消才有用，否则连接已经建立，数据开始传递，中止只会浪费。
    但我们很难在合适的时间点abort，而且像jsonp的，我们根本无法abort掉，只能任数据返回

    然后我们在自已的代码中再去判断、决定回调是否调用

    那我们是否可以这样做：
        1. 不取消请求
        2. 请求返回后尽可能的处理保留数据，比如缓存。处理完成后才去决定是否调用回调（Service_Send中的Done实现）

    除此之外，我们还要考虑
        1. 跨请求对象对同一个缓存的接口进行请求，而某一个销毁了。
            Service.add([{
                name:'Test',
                url:'/test',
                cache:20000
            }]);

            let r1=new Service();
            r1.all('Test',function(e,m){

            });

            let r2=new Service();
            r2.all('Test',function(e,m){

            });

            r1.destroy();

            如上代码，我们在实现时：
            r2在请求Test时，此时Test是可缓存的，并且Test已经处于r1请求中了，我们不应该再次发起新的请求，只需要把回调排队到r1的Test请求中即可。参见代码：Service_Send中的for,Service.cached。

            当r1进行销毁时，并不能贸然销毁r1上的所有请求，如Test请求不能销毁，只能从回调中标识r1的回调不能再被调用。r1的Test还要继续，参考上面讨论的请求应该取消吗。就算能取消，也需要查看Test的请求中，除了r1外是否还有别的请求要用，我们示例中是r2，所以仍然继续请求。参考Service#.destroy


 */
    /**
     * Bag类
     * @name Bag
     * @beta
     * @module service
     * @constructor
     * @property {String} id bag唯一标识
     */
    function Bag() {
        this.id = G_Id('b');
        this.$ = {};
    }
    G_Assign(Bag[G_PROTOTYPE], {
        /**
         * @lends Bag#
         */
        /**
         * 获取属性
         * @param {String} [key] 要获取数据的key
         * @param {Object} [dValue] 当根据key取到的值为falsy时，使用默认值替代，防止代码出错
         * @return {Object}
         * @example
         * new Serice().one({
         *     name:'Test'
         * },function(error,bag){
         *     let obj=bag.get();//获取所有数据
         *
         *     let list=bag.get('list',[]);//获取list数据，如果不存在list则使用空数组
         *
         *     let count=bag.get('data.info.count',0);//获取data下面info下count的值，您无须关心data下是否有info属性
         *     console.log(list);
         * });
         */
        get: function (key, dValue) {
            var me = this;
            //let alen = arguments.length;
            /*
                目前只处理了key中不包含.的情况，如果key中包含.则下面的简单的通过split('.')的方案就不行了，需要改为：
    
                let reg=/[^\[\]]+(?=\])|[^.\[\]]+/g;
                let a=['a.b.c','a[b.c].d','a[0][2].e','a[b.c.d][eg].a.b.c','[e.g.d]','a.b[c.d.fff]'];
    
                for(let i=0,one;i<a.length;i++){
                  one=a[i];
                  console.log(one.match(reg))
                }
    
                但考虑到key中有.的情况非常少，则优先使用性能较高的方案
    
                或者key本身就是数组
             */
            var attrs = me.$;
            if (key) {
                var tks = G_IsArray(key) ? key.slice() : (key + G_EMPTY).split('.'), tk = void 0;
                while ((tk = tks.shift()) && attrs) {
                    attrs = attrs[tk];
                }
                if (tk) {
                    attrs = G_Undefined;
                }
            }
            var type;
            if (dValue !== G_Undefined && (type = G_Type(dValue)) != G_Type(attrs)) {
                if (DEBUG) {
                    console.warn('type neq:' + key + ' is not a(n) ' + type);
                }
                attrs = dValue;
            }
            if (DEBUG && me['$b'] && me['$b'].k) { //缓存中的接口不让修改数据
                attrs = Safeguard(attrs);
            }
            return attrs;
        },
        /**
         * 设置属性
         * @param {String|Object} key 属性对象或属性key
         * @param {Object} [val] 属性值
         */
        set: function (key, val) {
            var _a;
            if (!G_IsObject(key)) {
                key = (_a = {}, _a[key] = val, _a);
            }
            G_Assign(this.$, key);
        }
    });
    var Service_FetchFlags_ONE = 1;
    var Service_FetchFlags_ALL = 2;
    function Service_CacheDone(cacheKey, err, fns) {
        fns = this[cacheKey]; //取出当前的缓存信息
        if (fns) {
            delete this[cacheKey]; //先删除掉信息
            G_ToTry(fns, err, fns.e); //执行所有的回调
        }
    }
    var Service_Task = function (done, host, service, total, flag, bagCache) {
        var doneArr = [];
        var errorArgs = G_NULL;
        var currentDoneCount = 0;
        return function (idx, error) {
            currentDoneCount++; //当前完成加1.
            var bag = this;
            var newBag;
            var mm = bag['$b'];
            var cacheKey = mm.k, temp;
            doneArr[idx + 1] = bag; //完成的bag
            if (error) { //出错
                errorArgs = error;
                //errorArgs[idx] = err; //记录相应下标的错误信息
                //G_Assign(errorArgs, err);
                newBag = 1; //标记当前是一个新完成的bag,尽管出错了
            }
            else if (!bagCache.has(cacheKey)) { //如果缓存对象中不存在，则处理。注意在开始请求时，缓存与非缓存的都会调用当前函数，所以需要在该函数内部做判断处理
                if (cacheKey) { //需要缓存
                    bagCache.set(cacheKey, bag); //缓存
                }
                //bag.set(data);
                mm.t = G_Now(); //记录当前完成的时间
                temp = mm.a;
                if (temp) { //有after
                    G_ToTry(temp, bag, bag);
                }
                temp = mm.x;
                if (temp) { //需要清理
                    host.clear(temp);
                }
                newBag = 1;
            }
            if (!service['$d']) { //service['$d'] 当前请求被销毁
                var finish = currentDoneCount == total;
                if (finish) {
                    service['$e'] = 0;
                    if (flag == Service_FetchFlags_ALL) { //all
                        doneArr[0] = errorArgs;
                        G_ToTry(done, doneArr, service);
                    }
                }
                if (flag == Service_FetchFlags_ONE) { //如果是其中一个成功，则每次成功回调一次
                    G_ToTry(done, [error || G_NULL, bag, finish, idx], service);
                }
            }
            if (newBag) { //不管当前request或回调是否销毁，均派发end事件，就像前面缓存一样，尽量让请求处理完成，该缓存的缓存，该派发事件派发事件。
                host.fire('end', {
                    bag: bag,
                    error: error
                });
            }
        };
    };
    /**
     * 获取attrs，该用缓存的用缓存，该发起请求的请求
     * @private
     * @param {Object|Array} attrs 获取attrs时的描述信息，如:{name:'Home',urlParams:{a:'12'},formParams:{b:2}}
     * @param {Function} done   完成时的回调
     * @param {Integer} flag   获取哪种类型的attrs
     * @param {Boolean} save 是否是保存的动作
     * @return {Service}
     */
    var Service_Send = function (me, attrs, done, flag, save) {
        if (me['$d'])
            return me; //如果已销毁，返回
        if (me['$e']) { //繁忙，后续请求入队
            return me.enqueue(Service_Send.bind(me, me, attrs, done, flag, save));
        }
        me['$e'] = 1; //标志繁忙
        if (!G_IsArray(attrs)) {
            attrs = [attrs];
        }
        var host = me.constructor, requestCount = 0;
        //let bagCache = host['$c']; //存放bag的Cache对象
        var bagCacheKeys = host['$f']; //可缓存的bag key
        var remoteComplete = Service_Task(done, host, me, attrs.length, flag, host['$c']);
        for (var _i = 0, attrs_1 = attrs; _i < attrs_1.length; _i++) {
            var bag = attrs_1[_i];
            if (bag) {
                var bagInfo = host.get(bag, save); //获取bag信息
                var bagEntity = bagInfo.e;
                var cacheKey = bagEntity['$b'].k; //从实体上获取缓存key
                var complete = remoteComplete.bind(bagEntity, requestCount++); //包装当前的完成回调
                var cacheList = void 0;
                if (cacheKey && bagCacheKeys[cacheKey]) { //如果需要缓存，并且请求已发出
                    bagCacheKeys[cacheKey].push(complete); //放到队列中
                }
                else if (bagInfo.u) { //需要更新
                    if (cacheKey) { //需要缓存
                        cacheList = [complete];
                        cacheList.e = bagEntity;
                        bagCacheKeys[cacheKey] = cacheList;
                        complete = Service_CacheDone.bind(bagCacheKeys, cacheKey); //替换回调，详见Service_CacheDone
                    }
                    host['$s'](bagEntity, complete);
                }
                else { //不需要更新时，直接回调
                    complete();
                }
            }
        }
        return me;
    };
    /**
     * 接口请求服务类
     * @name Service
     * @constructor
     * @beta
     * @module service
     * @borrows Event.on as on
     * @borrows Event.fire as fire
     * @borrows Event.off as off
     * @example
     * let S = Magix.Service.extend(function(bag,callback){
     *     $.ajax({
     *         url:bag.get('url'),
     *         success:function(data){
     *             bag.set('data',data)//设置数据
     *             callback();//通知内部完成数据请求
     *         },
     *         error:function(msg){
     *             callback(msg);//出错
     *         }
     *     })
     * });
     * // 添加接口
     * S.add({
     *     name:'test',
     *     url:'/test',
     *     cache:1000*60 //缓存一分钟
     * });
     * // 使用接口
     * let s=new S();
     * s.all('test',function(err,bag){
     *     console.log(err,bag);
     * });
     */
    function Service() {
        var me = this;
        me.id = G_Id('s');
        if (DEBUG) {
            me.id = G_Id('\x1es');
            setTimeout(function () {
                if (!me['$a']) {
                    console.warn('beware! You should use view.capture to connect Service and View');
                }
            }, 1000);
        }
        me['$g'] = [];
    }
    G_Assign(Service[G_PROTOTYPE], {
        /**
         * @lends Service#
         */
        /**
         * 获取attrs，所有请求完成回调done
         * @function
         * @param {Object|Array} attrs 获取attrs时的描述信息，如:{name:'Home',cacheKey:'key',urlParams:{a:'12'},formParams:{b:2}}
         * @param {Function} done   完成时的回调
         * @return {Service}
         * @example
         * new Service().all([{
         *     name:'Test1'
         * },{
         *     name:'Test2'
         * }],function(err,bag1,bag2){
         *     console.log(arguments);
         * });
         */
        all: function (attrs, done) {
            return Service_Send(this, attrs, done, Service_FetchFlags_ALL);
        },
        /**
         * 保存attrs，所有请求完成回调done
         * @function
         * @param {Object|Array} attrs 保存attrs时的描述信息，如:{name:'Home',urlParams:{a:'12'},formParams:{b:2}}
         * @param {Function} done   完成时的回调
         * @return {Service}
         * @example
         * // 同all,但与all不同的是，当指定接口缓存时，all方法会优先使用缓存，而save方法则每次都会发送请求到服务器，忽略掉缓存。同时save更语义化
         */
        save: function (attrs, done) {
            return Service_Send(this, attrs, done, Service_FetchFlags_ALL, 1);
        },
        /**
         * 获取attrs，其中任意一个成功均立即回调，回调会被调用多次。注：当使用promise时，不存在该方法。
         * @function
         * @param {Object|Array} attrs 获取attrs时的描述信息，如:{name:'Home',cacheKey:'key',urlParams:{a:'12'},formParams:{b:2}}
         * @param {Function} callback   完成时的回调
         * @beta
         * @return {Service}
         * @example
         *  //代码片断：
         * let s = new Service().one([
         *     {name:'M1'},
         *     {name:'M2'},
         *     {name:'M3'}
         * ],function(err,bag){//m1,m2,m3，谁快先调用谁，且被调用三次
         *     if(err){
         *         alert(err.msg);
         *     }else{
         *         alert(bag.get('name'));
         *     }
         * });
         */
        one: function (attrs, done) {
            return Service_Send(this, attrs, done, Service_FetchFlags_ONE);
        },
        /**
         * 前一个all,one或save任务做完后的下一个任务
         * @param  {Function} callback 当前面的任务完成后调用该回调
         * @return {Service}
         * @beta
         * @example
         * let r = new Service().all([
         *     {name:'M1'},
         *     {name:'M2'}
         * ],function(err,bag1,bag2){
         *     r.dequeue(['args1','args2']);
         * });
         * r.enqueue(function(args1,args2){
         *     alert([args1,args2]);
         * });
         */
        enqueue: function (callback) {
            var me = this;
            if (!me['$d']) {
                me['$g'].push(callback);
                me.dequeue(me['$h']);
            }
            return me;
        },
        /**
         * 做下一个任务
         * @param {Array} preArgs 传递的参数
         * @beta
         * @example
         * let r = new Service();
         * r.all('Name',function(e,bag){
         *     r.dequeue([e,bag]);
         * });
         * r.enqueue(function(e,result){//result为m
         *     r.all('NextName',function(e,bag){
         *         r.dequeue([e,bag]);
         *     });
         * });
         *
         * r.enqueue(function(e,bag){//m===queue m;
         *     console.log(e,bag);
         *     r.dequeue([e,bag]);
         * });
         *
         * r.enqueue(function(e,bag){
         *     console.log(e,bag);
         * });
         *
         * //当出错时，e为出错的信息
         */
        dequeue: function () {
            var a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                a[_i] = arguments[_i];
            }
            var me = this, one;
            if (!me['$e'] && !me['$d']) {
                me['$e'] = 1;
                Timeout(function () {
                    me['$e'] = 0;
                    if (!me['$d']) { //不清除setTimeout,但在回调中识别是否调用了destroy方法
                        one = me['$g'].shift();
                        if (one) {
                            G_ToTry(one, me['$h'] = a);
                        }
                    }
                }, 0);
            }
        },
        /**
         * 销毁当前请求，不可以继续发起新请求，而且不再调用相应的回调
         */
        destroy: function (me) {
            me = this;
            me['$d'] = 1; //只需要标记及清理即可，其它的不需要
            me['$g'] = 0;
        }
        /**
         * 当Service发送请求前触发
         * @name Service.begin
         * @event
         * @param {Object} e 事件对象
         * @param {Bag} e.bag bag对象
         * @example
         * let S = Magix.Service.extend({
         *     //codes
         * });
         *
         * S.on('begin',function(e){//监听所有的开始请求事件
         *     console.log(e);
         * });
         */
        /**
         * 当Service结束请求时触发(成功或失败均触发)
         * @name Service.end
         * @event
         * @param {Object} e 事件对象
         * @param {Bag} e.bag bag对象
         * @param {String} e.error 当请求出错时，error是出错的消息
         */
        /**
         * 当Service发送请求失败时触发
         * @name Service.fail
         * @event
         * @param {Object} e 事件对象
         * @param {Bag} e.bag bag对象
         * @param {String} e.error 当请求出错时，error是出错的消息
         */
        /**
         * 当Service发送请求成功时触发
         * @name Service.done
         * @event
         * @param {Object} e 事件对象
         * @param {Bag} e.bag bag对象
         */
    });
    var Manager_DefaultCacheKey = function (meta, attrs, arr) {
        arr = [JSONStringify(attrs), JSONStringify(meta)];
        return arr.join(G_SPLITER);
    };
    var Manager_ClearCache = function (v, ns, cache, mm) {
        mm = v && v['$b'];
        if (mm && ns[mm.n]) {
            cache.del(mm.k);
        }
    };
    var Service_Manager = G_Assign({
        /**
         * @lends Service
         */
        /**
         * 添加元信息
         * @param {Object} attrs 信息属性
         */
        add: function (attrs) {
            var me = this;
            var metas = me['$b'], bag;
            if (!G_IsArray(attrs)) {
                attrs = [attrs];
            }
            for (var _i = 0, attrs_2 = attrs; _i < attrs_2.length; _i++) {
                bag = attrs_2[_i];
                if (bag) {
                    var name = bag.name, cache = bag.cache;
                    bag.cache = cache | 0;
                    metas[name] = bag;
                }
            }
        },
        /**
         * 创建bag对象
         * @param {Object} attrs           bag描述信息对象
         * @return {Bag}
         */
        create: function (attrs) {
            var me = this;
            var meta = me.meta(attrs);
            var cache = (attrs.cache | 0) || meta.cache;
            var entity = new Bag();
            entity.set(meta);
            entity['$b'] = {
                n: meta.name,
                a: meta.after,
                x: meta.cleans,
                k: cache && Manager_DefaultCacheKey(meta, attrs)
            };
            if (G_IsObject(attrs)) {
                entity.set(attrs);
            }
            var before = meta.before;
            if (before) {
                G_ToTry(before, entity, entity);
            }
            me.fire('begin', {
                bag: entity
            });
            return entity;
        },
        /**
         * 获取bag注册时的元信息
         * @param  {String|Object} attrs 名称
         * @return {Object}
         * @example
         * let S = Magix.Service.extend({
         *     //extend code
         * });
         *
         * S.add({
         *     name:'test',
         *     url:'/test'
         * });
         *
         * console.log(S.meta('test'),S.meta({name:'test'}));//这2种方式都可以拿到add时的对象信息
         */
        meta: function (attrs) {
            var me = this;
            var metas = me['$b'];
            var name = attrs.name || attrs;
            var ma = metas[name];
            return ma || attrs;
        },
        /**
         * 获取bag对象，优先从缓存中获取
         * @param {Object} attrs           bag描述信息对象
         * @param {Boolean} createNew 是否是创建新的Bag对象，如果否，则尝试从缓存中获取
         * @return {Object}
         */
        get: function (attrs, createNew) {
            var me = this;
            var e, u;
            if (!createNew) {
                e = me.cached(attrs);
            }
            if (!e) {
                e = me.create(attrs);
                u = 1;
            }
            return {
                e: e,
                u: u
            };
        },
        /**
         * 根据name清除缓存的attrs
         * @param  {String|Array} names 字符串或数组
         * @example
         * let S = Magix.Service.extend({
         *     //extend code
         * });
         *
         * S.add({
         *     name:'test',
         *     url:'/test',
         *     cache:1000*60
         * });
         *
         * let s = new Service();
         * s.all('test');
         * s.all('test');//from cache
         * S.clear('test');
         * s.all('test');//fetch from server
         */
        clear: function (names) {
            this['$c'].each(Manager_ClearCache, G_ToMap((names + G_EMPTY).split(G_COMMA)));
        },
        /**
         * 从缓存中获取bag对象
         * @param  {Object} attrs
         * @return {Bag}
         * @example
         * let S = Magix.Service.extend({
         *     //extend code
         * });
         *
         * S.add({
         *     name:'test',
         *     url:'/test',
         *     cache:1000*60
         * });
         *
         * S.cached('test');//尝试从缓存中获取bag对象
         */
        cached: function (attrs) {
            var me = this;
            var bagCache = me['$c'];
            var entity;
            var cacheKey;
            var meta = me.meta(attrs);
            var cache = (attrs.cache | 0) || meta.cache;
            if (cache) {
                cacheKey = Manager_DefaultCacheKey(meta, attrs);
            }
            if (cacheKey) {
                var requestCacheKeys = me['$f'];
                var info = requestCacheKeys[cacheKey];
                if (info) { //处于请求队列中的
                    entity = info.e;
                }
                else { //缓存
                    entity = bagCache.get(cacheKey);
                    if (entity && G_Now() - entity['$b'].t > cache) {
                        bagCache.del(cacheKey);
                        entity = 0;
                    }
                }
            }
            return entity;
        }
    }, MEvent);
    /**
     * 继承
     * @lends Service
     * @param  {Function} sync 接口服务同步数据方法
     * @param  {Integer} [cacheMax] 最大缓存数，默认20
     * @param  {Integer} [cacheBuffer] 缓存缓冲区大小，默认5
     * @return {Function} 返回新的接口类
     * @example
     * let S = Magix.Service.extend(function(bag,callback){
     *     $.ajax({
     *         url:bag.get('url'),
     *         success:function(data){
     *             bag.set('data',data);
     *             callback();
     *         },
     *         error:function(msg){
     *             callback({message:msg});
     *         }
     *     })
     * },10,2);//最大缓存10个接口数据，缓冲区2个
     */
    Service.extend = function (sync, cacheMax, cacheBuffer) {
        function NService() {
            Service.call(this);
        }
        NService['$s'] = sync;
        NService['$c'] = new G_Cache(cacheMax, cacheBuffer);
        NService['$f'] = {};
        NService['$b'] = {};
        return G_Extend(NService, Service, G_NULL, Service_Manager);
    };
    Magix.Service = Service;
    G_Assign(G_NOOP[G_PROTOTYPE], MEvent);
    G_NOOP.extend = function extend(props, statics) {
        var me = this;
        var ctor = props && props.ctor;
        function X() {
            var a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                a[_i] = arguments[_i];
            }
            var t = this;
            me.apply(t, a);
            if (ctor)
                ctor.apply(t, a);
        }
        X.extend = extend;
        return G_Extend(X, me, props, statics);
    };
    /**
     * 组件基类
     * @name Base
     * @constructor
     * @borrows Event.fire as #fire
     * @borrows Event.on as #on
     * @borrows Event.off as #off
     * @beta
     * @module base
     * @example
     * let T = Magix.Base.extend({
     *     hi:function(){
     *         this.fire('hi');
     *     }
     * });
     * let t = new T();
     * t.onhi=function(e){
     *     console.log(e);
     * };
     * t.hi();
     */
    Magix.Base = G_NOOP;
    Magix["default"] = Magix;
    return Magix;
});