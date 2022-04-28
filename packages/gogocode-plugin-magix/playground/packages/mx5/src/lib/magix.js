/*
version:5.1.0 Licensed MIT
author:kooboy_li@163.com
loader:umd
enables:mxevent,richVframe,xml,async,service,wait,lang,router,routerHash,routerTip,richView,recast,require,xview,taskComplete,taskIdle,spreadMxViewParams,removeStyle,taskCancel,eventVframe,richVframeInvokeCancel,waitSelector,remold,rewrite,rebuild,load,state,batchDOMEvent,richVframeDescendants,preloadViews,esmoduleCheck,checkReset,innerView,base
optionals:catchHTMLError,routerState,routerTipLockUrl,routerForceState,customTags,checkAttr,webc,lockSubWhenBusy
*/
//magix-composer#snippet;
//magix-composer#exclude = loader;
if (typeof DEBUG == 'undefined')
    window.DEBUG = true;
define('magix5', () => {
    //VARS
    let Counter = 0;
    let Empty = '';
    let Empty_Array = [];
    let Comma = ',';
    let Null = null;
    let Doc_Window = window;
    let Thousand = 1000;
    let GPromise = Promise;
    let Doc_Document = document;
    let Timeout = Doc_Window.setTimeout; //setTimeout;
    let ClearTimeout = Doc_Window.clearTimeout;
    let Encode = encodeURIComponent;
    let Value = 'value';
    let Tag_Static_Key = '_';
    let Tag_View_Params_Key = '$';
    let Tag_Prop_Id = 'id';
    let Hash_Key = '#';
    function Noop(...args) { }
    ;
    let JSON_Stringify = JSON.stringify;
    let Header = Doc_Document.head;
    let Doc_Body;
    let Pfm = Doc_Window.performance;
    let Date_Now = Pfm.now.bind(Pfm);
    /*
        关于spliter
        出于安全考虑，使用不可见字符\u0000，然而，window手机上ie11有这样的一个问题：'\u0000'+"abc",结果却是一个空字符串，好奇特。
     */
    let Spliter = '\x1e';
    let Prototype = 'prototype';
    let Params = 'params';
    let Path = 'path';
    let MX_PREFIX = 'mx5-';
    //let Tag_Porp_MX_Key = MX_PREFIX + 'key';
    let MX_View = MX_PREFIX + 'view';
    let MX_OWNER = MX_PREFIX + 'owner';
    // let MX_FROM = MX_PREFIX + 'from';
    // let MX_TO = MX_PREFIX + 'to';
    let MX_MAIN = MX_PREFIX + 'main';
    let MX_RESET = MX_PREFIX + 'reset';
    let MX_SUB = MX_PREFIX + 'nest';
    let GUID = (prefix) => (prefix || Tag_Static_Key) + Counter++;
    let GetById = id => Doc_Document.getElementById(id);
    let SetInnerHTML = (n, html) => n.innerHTML = html;
    let isRString = s => s[0] == Spliter;
    let Empty_Object = {};
    /**
     * require//加载模块前调用，可预加载其它模块
     * rewrite//重写路由，比如从/xinglie/blog 变为 /blog?user=xinglie
     * rebuild//重建路由，比如从/blog?user=xinglie变为/xinglie/blog
     * recast //渲染根view时拦截，比如强制锁定显示某个view
     * remold//事件拦截
     * retard //magix是否繁忙
     * request //magix是否请求模块资源
     */
    let Mx_Cfg = {
        rootId: GUID(),
        require: Noop,
        retard: Noop,
        request: Noop,
        error(e) {
            throw e;
        }
    };
    let IsPrimitive = args => !args || typeof args != 'object';
    let NodeIn = (a, b, ignoreSelf, r) => {
        if (a && b) {
            r = !ignoreSelf && a == b;
            if (!r) {
                try {
                    r = (b.compareDocumentPosition(a) & 16) == 16;
                }
                catch { }
            }
        }
        return r;
    };
    let Mark = (me, key, host, m, k) => {
        k = Spliter + '@:{mark#object}';
        if (me[k] != 0) {
            host = me[k] || (me[k] = {});
            if (!Has(host, key)) {
                host[key] = Date_Now();
            }
            m = ++host[key];
        }
        return t => (t = me[k], t && m === t[key]);
    };
    let Unmark = (me, key, k, host) => {
        k = Spliter + '@:{mark#object}';
        if (key) {
            host = me[k];
            if (host) {
                host[key] = 0;
            }
        }
        else {
            me[k] = 0;
        }
    };
    let { assign: Assign, keys: Keys, hasOwnProperty: HasProp, prototype: ObjectProto } = Object;
    let ToString = ObjectProto.toString;
    let Type = o => ToString.call(o).slice(8, -1);
    let strObject = 'Object';
    let IsObject = o => Type(o) == strObject;
    let IsArray = Array.isArray;
    let strFunction = 'Function';
    let IsFunction = o => Type(o) == strFunction;
    let strString = 'String';
    let IsString = o => Type(o) == strString;
    let strNumber = 'Number';
    let IsNumber = o => Type(o) == strNumber;
    let GA = Header.getAttribute;
    let GetAttribute = (node, attr) => GA.call(node, attr);
    let ApplyStyle = (key, css, node) => {
        if (DEBUG && IsArray(key)) {
            let result = [];
            for (let i = 0; i < key.length; i += 2) {
                result.push(ApplyStyle(key[i], key[i + 1]));
            }
            return () => {
                for (let r of result) {
                    r();
                }
            };
        }
        if (css && !ApplyStyle[key]) {
            ApplyStyle[key] = 1;
            if (DEBUG) {
                if (key.startsWith('$throw_')) {
                    throw new Error(css);
                }
                node = Doc_Document.createElement('style');
                node.id = key;
                SetInnerHTML(node, css);
                Header.appendChild(node);
                return () => {
                    ApplyStyle[key] = Null;
                    Header.removeChild(node);
                };
            }
            else {
                node = Doc_Document.createElement('style');
                SetInnerHTML(node, css);
                Header.appendChild(node);
                return () => {
                    ApplyStyle[key] = Null;
                    Header.removeChild(node);
                };
            }
        }
    };
    let ToTry = (fn, args, context, r) => {
        try {
            if (IsArray(args)) {
                r = fn.apply(context, args);
            }
            else {
                r = fn.call(context, args);
            }
        }
        catch (x) {
            Mx_Cfg.error(x);
        }
        return r;
    };
    let Has = (owner, prop) => owner && HasProp.call(owner, prop);
    let TranslateData = (data, params) => {
        let p, val;
        if (IsPrimitive(params)) {
            p = params + Empty;
            if (isRString(p)) {
                params = data.get(p);
            }
        }
        else {
            for (p in params) {
                val = params[p];
                val = TranslateData(data, val);
                params[p] = val;
            }
        }
        return params;
    };
    let CacheSort = (a, b) => b['@:{cache-item#fre}'] - a['@:{cache-item#fre}'];
    //let CacheCounter = 0;
    function MxCache(max, buffer /*, remove?: (item: any) => void*/, me) {
        me = this;
        me['@:{cache#list}'] = [];
        me['@:{cache#buffer.count}'] = buffer || 20; //buffer先取整，如果为0则再默认5
        me['@:{cache#max.count}'] = me['@:{cache#buffer.count}'] + (max || 50);
        //me['@:{cache#remove.callback}'] = remove;
    }
    Assign(MxCache[Prototype], {
        get(key) {
            let me = this;
            let c = me['@:{cache#list}'];
            let r = c[Spliter + key];
            if (r) {
                r['@:{cache-item#fre}']++;
                //r['@:{cache-item#add.time}'] = CacheCounter++;
                r = r['@:{cache-item#entity}'];
            }
            return r;
        },
        set(okey, value) {
            let me = this;
            let c = me['@:{cache#list}'];
            let key = Spliter + okey;
            let r = c[key];
            let t = me['@:{cache#buffer.count}'];
            if (!r) {
                if (c.length > me['@:{cache#max.count}']) {
                    c.sort(CacheSort);
                    while (t--) {
                        r = c.pop();
                        if (r['@:{cache-item#fre}']) { //important
                            me.del(r['@:{cache-item#origin.key}']); //如果没有引用，则删除
                        }
                    }
                }
                r = {
                    '@:{cache-item#origin.key}': okey
                };
                c.push(r);
                c[key] = r;
            }
            r['@:{cache-item#entity}'] = value;
            r['@:{cache-item#fre}'] = 1;
            //r['@:{cache-item#add.time}'] = CacheCounter++;
        },
        del(k) {
            k = Spliter + k;
            let c = this['@:{cache#list}'];
            let r = c[k] /*,
                m = this['@:{cache#remove.callback}']*/;
            if (r) {
                r['@:{cache-item#fre}'] = 0;
                r['@:{cache-item#entity}'] = Empty;
                delete c[k]; // = Null;
                //if (m) {
                //ToTry(m, r['@:{cache-item#origin.key}']);
                //}
            }
        },
        has(k) {
            return Has(this['@:{cache#list}'], Spliter + k);
        }
    });
    let EventDefaultOptions = {
        bubbles: true,
        cancelable: true
    };
    //https://www.w3.org/TR/dom/#interface-event
    let DispatchEvent = (element, type, data) => {
        let e = new Event(type, EventDefaultOptions);
        Assign(e, data);
        element.dispatchEvent(e);
    };
    let AttachEventHandlers = [];
    let EventListen = (element, ...args) => element.addEventListener(...args);
    let EventUnlisten = (element, ...args) => element.removeEventListener(...args);
    let AddEventListener = (element, type, fn, eventOptions, viewId, view) => {
        let h = {
            '@:{dom#view.id}': viewId,
            '@:{dom#real.fn}': fn,
            '@:{dom#type}': type,
            '@:{dom#element}': element,
            '@:{dom#event.proxy}'(e) {
                if (viewId) {
                    ToTry(fn, e, view);
                }
                else {
                    fn(e);
                }
            }
        };
        AttachEventHandlers.push(h);
        EventListen(element, type, h['@:{dom#event.proxy}'], eventOptions);
    };
    let RemoveEventListener = (element, type, cb, eventOptions, viewId) => {
        for (let c, i = AttachEventHandlers.length; i--;) {
            c = AttachEventHandlers[i];
            if (c['@:{dom#type}'] == type &&
                c['@:{dom#view.id}'] == viewId &&
                c['@:{dom#element}'] == element &&
                c['@:{dom#real.fn}'] == cb) {
                AttachEventHandlers.splice(i, 1);
                EventUnlisten(element, type, c['@:{dom#event.proxy}'], eventOptions);
                break;
            }
        }
    };
    let ToObjectCache = new MxCache();
    let ToObject = (expr, cache = 1, result) => {
        if (cache &&
            ToObjectCache.has(expr)) {
            result = ToObjectCache.get(expr);
        }
        else {
            result = ToTry(Function(`return ${expr}`));
            if (cache) {
                if (DEBUG) {
                    result = Safeguard(result);
                }
                ToObjectCache.set(expr, result);
            }
        }
        return result;
    };
    let Decode = decodeURIComponent;
    let PathToObject = new MxCache();
    let ParseUri = path => {
        //把形如 /xxx/?a=b&c=d 转换成对象 {path:'/xxx/',params:{a:'b',c:'d'}}
        //1. /xxx/a.b.c.html?a=b&c=d  path /xxx/a.b.c.html
        //2. /xxx/?a=b&c=d  path /xxx/
        //5. /xxx/index.html  => path /xxx/index.html
        //11. ab?a&b          => path ab  params:{a:'',b:''}
        let r = PathToObject.get(path), pathname, key, value, po, q, rest;
        if (!r) {
            po = {};
            q = path.indexOf('?');
            if (q == -1) {
                pathname = path;
                rest = Empty;
            }
            else {
                pathname = path.substring(0, q);
                rest = path.substring(q + 1);
            }
            if (rest) {
                for (q of rest.split('&')) {
                    if (q) {
                        [key, value = Empty] = q.split('=');
                        po[Decode(key)] = isRString(value) ? value : Decode(value);
                    }
                }
            }
            PathToObject.set(path, r = {
                a: pathname,
                b: po
            });
        }
        return {
            path: r.a,
            params: Assign({}, r.b)
        };
    };
    let ToUri = (path, params, keo) => {
        let arr = [], v, p, f;
        for (p in params) {
            v = params[p] + Empty;
            if (v || Has(keo, p)) {
                v = Encode(v);
                arr.push(f = p + '=' + v);
            }
        }
        if (f) {
            path += (path && (path.includes('?') ? '&' : '?')) + arr.join('&');
        }
        return path;
    };
    let ToMap = (list, key) => {
        let e, map = {};
        if (list) {
            for (e of list) {
                map[(key && e) ? e[key] : e] = key ? e : (map[e] | 0) + 1; //对于简单数组，采用累加的方式，以方便知道有多少个相同的元素
            }
        }
        return map;
    };
    let ParseExprCache = new MxCache();
    let ParseExpr = (expr, data, result) => {
        if (ParseExprCache.has(expr)) {
            result = ParseExprCache.get(expr);
        }
        else {
            result = ToObject(expr, 0);
            if (expr.includes(Spliter)) {
                TranslateData(data, result);
                if (DEBUG) {
                    result = Safeguard(result, true);
                }
            }
            else {
                if (DEBUG) {
                    result = Safeguard(result, true);
                }
                ParseExprCache.set(expr, result);
            }
        }
        return result;
    };
    let CallBreakTime = 9, CallWorked, CallCurrent, CallCurrentExec, CallLogicTail, CallRealTail;
    let lastWaitState;
    let ns = navigator.scheduling;
    let StartCall = () => {
        let last = Date_Now(), out = last + CallBreakTime, args, fn, context, wait = Mx_Cfg.retard;
        for (; ;) {
            if (CallCurrent) { //有待执行的任务
                if (DEBUG) {
                    CallFunction['@:{call.fn#current}']++;
                }
                if (CallLogicTail == CallCurrent) { //如果当前节点是逻辑末尾，则删除逻辑末尾
                    CallLogicTail = Null;
                }
                CallCurrentExec = CallCurrent; //当前正在执行的任务，先保存一下，有可能在fn中再追加新的任务，需要使用该节点进行调整关系
                context = CallCurrent['@:{call#context}'];
                args = CallCurrent['@:{call#args}'];
                fn = CallCurrent['@:{call#function}'];
                if (fn) {
                    ToTry(fn, args, context);
                }
                CallCurrent = CallCurrent['@:{call#next}'];
                CallCurrentExec = Null; //clear current;
                if (CallCurrent && ((Date_Now() > out) ||
                    (ns && ns.isInputPending()))) {
                    if (lastWaitState != 1) {
                        wait(lastWaitState = 1);
                    }
                    console.log(`CF take a break at ${CallFunction['@:{call.fn#current}']} of ${CallFunction['@:{call.fn#total}']}`);
                    Timeout(StartCall);
                    break;
                }
            }
            else {
                CallRealTail = CallWorked = Null;
                if (DEBUG) {
                    delete CallFunction['@:{call.fn#total}'];
                    delete CallFunction['@:{call.fn#current}'];
                }
                if (lastWaitState != 0) {
                    wait(lastWaitState = 0);
                }
                Call_Until_Start();
                break;
            }
        }
    };
    let CallFunction = (fn, args, context, id, last, current) => {
        Call_Until_Stop();
        if (DEBUG) {
            if (!CallFunction['@:{call.fn#total}']) {
                CallFunction['@:{call.fn#total}'] = 0;
                CallFunction['@:{call.fn#current}'] = 0;
            }
            CallFunction['@:{call.fn#total}']++;
        }
        current = {
            '@:{call#id}': id,
            '@:{call#function}': fn,
            '@:{call#context}': context,
            '@:{call#args}': args
        };
        if (last) { //指明放在真正的末尾
            if (CallRealTail) { //如果有，则直接追加
                CallRealTail['@:{call#next}'] = current;
            }
            else { //没有，则把当前待执行的头指定当前元素
                CallCurrent = current;
            }
            CallRealTail = current; //更新末尾
        }
        else { //需要放逻辑末尾
            last = CallLogicTail || CallCurrentExec; //合并统一判断
            //不存在逻辑末尾，但当前正在执行中，1种情况：执行已过逻辑末尾，此时需要把执行节点的下一个指向当前节点，以提高优先级
            if (last) { //有节点则更新
                //prev = last['@:{call#next}'];
                current['@:{call#next}'] = last['@:{call#next}'];
                last['@:{call#next}'] = current;
                if (CallRealTail == last) { //如果逻辑末尾或当前执行的与真实是同一个节点，则真实末尾节点需要移动
                    CallRealTail = current;
                }
            }
            else if (CallCurrent) { //即不存在逻辑末尾，也不在执行中，比如先调用lastTask，再调用普通的task，则需要把普通的任务放在最前面
                current['@:{call#next}'] = CallCurrent;
                CallCurrent = current;
            }
            else { //初始化的情况
                CallCurrent = CallRealTail = current;
            }
            CallLogicTail = current; //更新逻辑末尾为当前节点
        }
        if (!CallWorked) {
            CallWorked = 1;
            Timeout(StartCall);
        }
    };
    let LastCallFunction = (fn, args, context, id) => {
        CallFunction(fn, args, context, id, 1);
    };
    let CallCancel = id => {
        if (id &&
            CallCurrent) {
            let current = CallCurrent['@:{call#next}'];
            while (current) {
                if (current['@:{call#id}'] == id) {
                    current['@:{call#function}'] =
                        current['@:{call#context}'] =
                        current['@:{call#args}'] =
                        current['@:{call#id}'] = Null;
                }
                current = current['@:{call#next}'];
            }
        }
    };
    let Call_Until_Timer, Call_Until_Last_Time;
    let Call_Until_Head, Call_Until_Tail, Call_Until_Delay = 32;
    let Call_Until_Work = () => {
        let current = Call_Until_Head, prev;
        let diff = Date_Now() - Call_Until_Last_Time;
        while (current) {
            if (diff >= current['@:{cu#wait.time}']) {
                Timeout(current['@:{cu#resolve}']);
                if (prev) {
                    prev['@:{cu#next}'] = current['@:{cu#next}'];
                }
                else {
                    Call_Until_Head = current['@:{cu#next}'];
                }
            }
            prev = current;
            current = current['@:{cu#next}'];
        }
        if (Call_Until_Head) {
            Call_Until_Timer = Timeout(Call_Until_Work, Call_Until_Delay);
        }
        else {
            Call_Until_Tail = 0;
            Call_Until_Timer = 0;
        }
    };
    let Call_Until_Start = () => {
        if (!Call_Until_Timer) {
            Call_Until_Last_Time = Date_Now();
            Call_Until_Timer = Timeout(Call_Until_Work, Call_Until_Delay);
        }
    };
    let Call_Until_Stop = () => {
        if (Call_Until_Timer) {
            ClearTimeout(Call_Until_Timer);
            Call_Until_Timer = 0;
        }
    };
    let Call_Idle_Until = time => {
        return new GPromise(r => {
            let node = {
                '@:{cu#wait.time}': time,
                '@:{cu#resolve}': r
            };
            if (!Call_Until_Tail) {
                Call_Until_Head = node;
            }
            else {
                Call_Until_Tail['@:{cu#next}'] = node;
            }
            Call_Until_Tail = node;
            if (!CallRealTail) {
                Call_Until_Start();
            }
        });
    };
    let resourcesLoadCount = 0;
    let isEsModule = o => o && (o.__esModule || (window.Symbol && o[Symbol.toStringTag] === 'Module'));
    let Async_Require = (names, params) => {
        return new GPromise(async (r) => {
            let a = [];
            try {
                if (!IsArray(names)) {
                    names = [names];
                }
                await Mx_Cfg.require(names, params);
                let load = Mx_Cfg.request;
                if (!resourcesLoadCount) {
                    load(1);
                }
                resourcesLoadCount++;
                //if (window.seajs) {
                seajs.use(names, (...g) => {
                    for (let m of g) {
                        if (!m && DEBUG) {
                            console.error('can not load', names);
                        }
                        a.push(isEsModule(m) ? m.default : m);
                    }
                    resourcesLoadCount--;
                    if (!resourcesLoadCount) {
                        load(0);
                    }
                    r(a);
                });
                /*} else {
                    if (!Array.isArray(name)) {
                        name = [name];
                    }
                    for (let n of name) {
                        let m = require(n);
                        a.push(isEsModule(m) ? m.default : m);
                    }
                    CallFunction(fn, a);
                }*/
            }
            catch (ex) {
                Mx_Cfg.error(ex);
            }
        });
    };
    let Extend = (ctor, base, props, cProto) => {
        //bProto.constructor = base;
        Noop[Prototype] = base[Prototype];
        cProto = new Noop();
        Assign(cProto, props);
        //Assign(ctor, statics);
        cProto.constructor = ctor;
        ctor[Prototype] = cProto;
        return ctor;
    };
    let Safeguard = (data, allowDeep, setter, prefix) => data;
    if (DEBUG && window.Proxy) {
        let ProxiesPool = new Map();
        Safeguard = (data, allowDeep, setter, prefix = '') => {
            if (IsPrimitive(data)) {
                return data;
            }
            let key = prefix + '\x01' + setter;
            let p = data['\x01_sf_\x01'];
            if (p && p.proxy) {
                data = p.entity;
            }
            let list = ProxiesPool.get(data);
            if (list) {
                for (let e of list) {
                    if (e.key == key) {
                        return e.entity;
                    }
                }
            }
            let entity = new Proxy(data, {
                set(target, property, value) {
                    if (!setter && (!prefix || !allowDeep)) {
                        throw new Error('avoid writeback, key: "' + prefix + property + '" value: ' + value + ' more info: https://github.com/thx/magix/issues/38');
                    }
                    if (setter) {
                        setter(prefix + property, value);
                    }
                    target[property] = value;
                    return true;
                },
                get(target, property) {
                    if (property == '\x01_sf_\x01') {
                        return {
                            entity: data,
                            proxy: true
                        };
                    }
                    let out = target[property];
                    if (!allowDeep &&
                        Has(target, property) &&
                        (IsArray(out) || IsObject(out))) {
                        return Safeguard(out, allowDeep, setter, prefix + property + '.');
                    }
                    return out;
                }
            });
            if (!prefix) {
                if (!list) {
                    list = [];
                }
                list.push({
                    key,
                    entity
                });
                ProxiesPool.set(data, list);
            }
            return entity;
        };
    }
    if (DEBUG) {
        Empty_Object = Safeguard(Empty_Object);
    }
    let MxEvent = {
        fire(name, data) {
            let key = Spliter + name, me = this, list = me[key], idx = 0, len, t;
            if (!data)
                data = {};
            data.type = name;
            if (list) {
                for (len = list.length; idx < len; idx++) {
                    t = list[idx];
                    if (t['@:{mx-event#fn}']) {
                        t['@:{mx-event#processing}'] = 1;
                        ToTry(t['@:{mx-event#fn}'], data, me);
                        if (!t['@:{mx-event#fn}']) {
                            list.splice(idx--, 1);
                            len--;
                        }
                        t['@:{mx-event#processing}'] = Null;
                    }
                }
            }
            return data;
            // if (!cancel) {
            //     list = me[`on${name}`];
            //     if (list) ToTry(list, data, me);
            // }
            // return me;
        },
        on(name, fn, priority = 0) {
            let me = this;
            let key = Spliter + name;
            let list = me[key] || (me[key] = []), added, len, i, definition = {
                '@:{mx-event#fn}': fn,
                '@:{mx-event#priority}': priority
            };
            for (i = 0, len = list.length; i < len; i++) {
                if (list[i]['@:{mx-event#priority}'] < priority) {
                    list.splice(i, 0, definition);
                    added = 1;
                    break;
                }
            }
            if (!added) {
                list.push(definition);
            }
            // return me;
        },
        off(name, fn) {
            let key = Spliter + name, me = this, list = me[key], t;
            if (fn) {
                if (list &&
                    (t = list.length)) {
                    for (; t--;) {
                        key = list[t];
                        if (key['@:{mx-event#fn}'] == fn) {
                            if (key['@:{mx-event#processing}']) {
                                key['@:{mx-event#fn}'] = Null;
                            }
                            else {
                                list.splice(t, 1);
                            }
                            break;
                        }
                    }
                }
            }
            else {
                me[key] = Null;
                //me[`on${name}`] = Null;
            }
            // return me;
        }
    };
    let Router_UpdateHash = (path, replace) => {
        Router_WinLoc[replace ? 'replace' : 'assign'](Hash_Key + path);
    };
    let Router_Update = (path, params, loc, replace, silent, lQuery) => {
        path = Router_PNR_Rebuild(path, params, lQuery, loc);
        if (path != loc.srcHash) {
            Router_Silent = silent;
            Router_UpdateHash(path, replace);
        }
    };
    let Router_Tip_Hashchange, Router_Tip_Beforeunload;
    let Router_Bind = () => {
        let lastHash = Router_Parse().srcHash;
        let newHash, suspend;
        AddEventListener(Doc_Window, 'hashchange', Router_Tip_Hashchange = (e, loc) => {
            if (suspend) {
                return;
            }
            loc = Router_Parse();
            newHash = loc.srcHash;
            if (newHash != lastHash) {
                e = {
                    '@:{exit-tip#from}': View_Exit_From_Router,
                    '@:{exit-tip#mutual}': View_Exit_From_Vframe,
                    reject() {
                        suspend = Empty;
                        Router_UpdateHash(lastHash);
                    },
                    resolve() {
                        lastHash = newHash;
                        suspend = Empty;
                        Router_UpdateHash(newHash);
                        Router_Diff();
                    },
                    stop() {
                        suspend = 1;
                    }
                };
                Router.fire(Change, e);
                View_RunExitList(e);
            }
        });
        AddEventListener(Doc_Window, 'beforeunload', Router_Tip_Beforeunload = (e, te, msg) => {
            e = e || Doc_Window.event;
            te = {};
            Router.fire(Page_Unload, te);
            if ((msg = te['@:{page-tip#msg}'])) {
                if (e)
                    e.returnValue = msg;
                return msg;
            }
        });
        AddEventListener(Doc_Window, 'popstate', Router_Tip_Hashchange);
        Router_Diff();
    };
    let Router_Unbind = () => {
        RemoveEventListener(Doc_Window, 'hashchange', Router_Tip_Hashchange);
        RemoveEventListener(Doc_Window, 'beforeunload', Router_Tip_Beforeunload);
        RemoveEventListener(Doc_Window, 'popstate', Router_Tip_Hashchange);
        Router_LLoc = Router_Init_Loc;
    };
    let Changed = 'changed';
    let Change = 'change';
    let Page_Unload = 'pageunload';
    let Router_VIEW = 'view';
    let Router_HrefCache = new MxCache();
    let Router_ChgdCache = new MxCache();
    let Router_WinLoc = location;
    let Router_LastChanged;
    let Router_Silent = 0;
    let Router_Init_Loc = {
        query: {},
        [Params]: {},
        href: Empty
    };
    let Router_LLoc = Router_Init_Loc;
    let Router_TrimHashReg = /(?:^.*?\/\/[^/]+|#.*$)/g;
    let Router_TrimQueryReg = /^[^#]*#?/;
    let Router_PNR_Routers, Router_PNR_UnmatchView, Router_PNR_DefaultView, Router_PNR_DefaultPath;
    let Router_PNR_Rewrite;
    let Router_PNR_Rebuild;
    let Router_PNR_Recast;
    let Router_Init_PNR = () => {
        if (!Router_PNR_Routers) {
            Router_PNR_Routers = Mx_Cfg.routes || {};
            Router_PNR_UnmatchView = Mx_Cfg.unmatchView;
            Router_PNR_DefaultView = Mx_Cfg.defaultView;
            //支持默认配置带参数的情况
            Router_PNR_DefaultPath = ParseUri(Mx_Cfg.defaultPath || '/');
            Router_PNR_Rewrite = Mx_Cfg.rewrite;
            Router_PNR_Rebuild = Mx_Cfg.rebuild || ToUri;
            Router_PNR_Recast = Mx_Cfg.recast;
        }
    };
    let Router_AttachViewAndPath = (loc, view) => {
        if (!loc[Router_VIEW]) {
            let path;
            path = loc.hash[Path];
            if (!path) {
                path = Router_PNR_DefaultPath[Path];
                Assign(loc[Params], Router_PNR_DefaultPath[Params]);
            }
            loc.srcPath = path;
            if (Router_PNR_Rewrite) {
                path = Router_PNR_Rewrite(path, loc[Params], Router_PNR_Routers, loc);
            }
            view = Router_PNR_Routers[path] || Router_PNR_UnmatchView || Router_PNR_DefaultView;
            loc[Path] = path;
            loc[Router_VIEW] = view;
            if (IsObject(view)) {
                if (DEBUG) {
                    if (!view[Router_VIEW]) {
                        console.error(path, ' config missing view!', view);
                    }
                    let guardProps = ['get', 'hash', 'href', 'params', 'path', 'query', 'srcHash', 'srcQuery'];
                    for (let p of guardProps) {
                        if (Has(view, p)) {
                            throw new Error(`can not overwrite "${p}" from object ${JSON.stringify(view)}`);
                        }
                    }
                }
                Assign(loc, view);
            }
        }
    };
    let Router_SetDiffInfo = (key, result, oldParams, newParams, setObject) => {
        let from = oldParams[key], to = newParams[key];
        if (from != to) {
            setObject[key] = {
                from,
                to
            };
            result.a = 1;
        }
    };
    let Router_GetChged = (oldLocation, newLocation) => {
        let oKey = oldLocation.href;
        let nKey = newLocation.href;
        let tKey = oKey + Spliter + nKey;
        let cached = Router_ChgdCache.get(tKey);
        if (!cached) {
            let rps, result = {
                [Params]: rps = {},
                force: !oKey //是否强制触发的changed，对于首次加载会强制触发一次
            }, oldParams = oldLocation[Params], newParams = newLocation[Params], tArr = Keys(oldParams).concat(Keys(newParams)), key;
            cached = {
                b: result
            };
            for (key of tArr) {
                Router_SetDiffInfo(key, cached, oldParams, newParams, rps);
            }
            Router_SetDiffInfo(Path, cached, oldLocation, newLocation, result);
            Router_SetDiffInfo(Router_VIEW, cached, oldLocation, newLocation, result);
            Router_ChgdCache.set(tKey, cached);
            if (DEBUG) {
                let whiteList = {
                    params: 1,
                    force: 1,
                    path: 1,
                    view: 1
                };
                result = Safeguard(result, false, key => {
                    if (Has(whiteList, key)) {
                        throw new Error(`avoid write ${key} to router changed object!`);
                    }
                });
            }
        }
        return cached;
    };
    let Router_Parse = (href) => {
        href = href || Router_WinLoc.href;
        let result = Router_HrefCache.get(href), srcQuery, srcHash, query, hash, params;
        if (!result) {
            srcQuery = href.replace(Router_TrimHashReg, Empty);
            srcHash = href.replace(Router_TrimQueryReg, Empty);
            query = ParseUri(srcQuery);
            hash = ParseUri(srcHash);
            params = Assign({}, query[Params], hash[Params]);
            result = {
                href,
                srcQuery,
                srcHash,
                query,
                hash,
                params
            };
            if (Magix_Booted) {
                Router_AttachViewAndPath(result);
                Router_HrefCache.set(href, result);
            }
            if (DEBUG) {
                result = Safeguard(result);
            }
        }
        return result;
    };
    let Router_Diff = () => {
        let location = Router_Parse();
        let changed = Router_GetChged(Router_LLoc, Router_LLoc = location);
        if (!Router_Silent && changed.a) {
            Router_LastChanged = changed.b;
            if (Router_LastChanged[Path]) {
                location = location.title || Mx_Cfg.title;
                if (location) {
                    Doc_Document.title = location;
                }
            }
            Router.fire(Changed, Router_LastChanged);
        }
        Router_Silent = 0;
        if (DEBUG) {
            Router_LastChanged = Safeguard(Router_LastChanged);
        }
        return Router_LastChanged;
    };
    let Router = Assign({
        parse: Router_Parse,
        diff: Router_Diff,
        to(pn, params, replace, silent) {
            if (!params &&
                IsObject(pn)) {
                params = pn;
                pn = Empty;
            }
            let temp = ParseUri(pn);
            let tParams = temp[Params];
            let tPath = temp[Path];
            let lPath = Router_LLoc[Path]; //历史路径
            let lParams = Router_LLoc[Params];
            let lQuery = Router_LLoc.query[Params];
            Assign(tParams, params); //把路径中解析出来的参数与用户传递的参数进行合并
            if (tPath) { //设置路径带参数的形式，如:/abc?q=b&c=e或不带参数 /abc
                for (lPath in lQuery) { //未出现在query中的参数设置为空
                    if (!Has(tParams, lPath))
                        tParams[lPath] = Empty;
                }
            }
            else if (lParams) { //只有参数，如:a=b&c=d
                tPath = lPath; //使用历史路径
                tParams = Assign({}, lParams, tParams);
            }
            Router_Update(tPath, tParams, Router_LLoc, replace, silent, lQuery);
        }
    }, MxEvent);
    let Dispatcher_UpdateTag = 0;
    let View_IsObserveChanged = view => {
        let loc = view['@:{view.observe.router}'];
        let res, i, params;
        if (loc['@:{view-router#observed}']) {
            if (loc['@:{view-router#observe.path}']) {
                res = Router_LastChanged[Path];
            }
            if (!res && loc['@:{view-router#observe.params}']) {
                params = Router_LastChanged[Params];
                for (i of loc['@:{view-router#observe.params}']) {
                    res = Has(params, i);
                    if (res)
                        break;
                }
            }
        }
        return res;
    };
    /**
     * 通知当前vframe，地址栏发生变化
     * @param {Vframe} vframe vframe对象
     * @private
     */
    let Dispatcher_Update = async (vframe, tag, view, cs, c, resolved) => {
        if (tag == Dispatcher_UpdateTag &&
            vframe &&
            (view = vframe['@:{vframe.view.entity}']) &&
            view['@:{view.rendered}']) {
            cs = vframe.children();
            if (View_IsObserveChanged(view)) { //检测view所关注的相应的参数是否发生了变化
                //CallFunction(view['@:{view.render.short}'], Empty_Array, view);
                /**
                 * render返回promise与其它值
                 * 如果render未返回promise，且render中有异步渲染界面
                 * 　　比如a 渲染　b,b监听路由参数,a在render中异步返回后更新界面且销毁b。
                 * 　　路由消息，通知完a后，再通知a的子节点b，理论上这就不对了。
                 * 如果render返回promise，且render中有异步渲染界面
                 * 　　比如a 渲染　b,b监听路由参数,a在render中异步返回后更新界面且创建b。
                 * 　　路由消息，通知完a后，等待a渲染完成，再通知a的子节点b，理论上这也不对。
                 *
                 * 综上，渲染前保存a的子节点，渲染后只通知a上面还存在的子节点，删除及新增加的子节点不通知
                 */
                if (DEBUG) {
                    resolved = view['@:{view.render.short}']();
                    if (!resolved ||
                        !resolved.then) {
                        console.info(vframe.path + ' `render` method recommand return promise value');
                    }
                    else {
                        await resolved;
                    }
                }
                else {
                    await view['@:{view.render.short}']();
                }
            }
            for (c of cs) {
                CallFunction(Dispatcher_Update, [Vframe_Vframes[c], tag]);
            }
        }
    };
    let Dispatcher_NotifyChange = (e, vf, view) => {
        if (Router_PNR_Recast) {
            Router_PNR_Recast(e);
        }
        vf = Vframe_Root();
        if ((view = e[Router_VIEW])) {
            Vframe_mountView(vf, view.to);
        }
        else {
            Dispatcher_Update(vf, ++Dispatcher_UpdateTag);
        }
    };
    let Vframe_RootVframe;
    let Vframe_Vframes = {};
    let Vframe_RootId;
    let Vframe_TranslateQuery = (pId, src, params, pVf) => {
        if (src.includes(Spliter) &&
            (pVf = Vframe_Vframes[pId])) {
            TranslateData(pVf['@:{vframe.ref.data}'], params);
            if (params[Spliter]) {
                Assign(params, params[Spliter]);
                delete params[Spliter];
            }
        }
    };
    let Vframe_Root = (rootId, e) => {
        if (!Vframe_RootVframe) {
            Doc_Body = Doc_Document.body;
            rootId = Vframe_RootId = Mx_Cfg.rootId;
            e = GetById(rootId);
            if (!e) {
                if (DEBUG) {
                    console.warn('can not find element:"' + rootId + '",use document.body as default');
                }
                e = Doc_Body;
            }
            Vframe_RootVframe = new Vframe(e);
        }
        return Vframe_RootVframe;
    };
    let Vframe_Unroot = () => {
        if (Vframe_RootVframe) {
            Vframe_Unmount(Vframe_RootVframe);
            Vframe_RootVframe = Null;
        }
    };
    let Vframe_AddVframe = (id, vframe, root) => {
        if (!Has(Vframe_Vframes, id)) {
            Vframe_Vframes[id] = vframe;
            root = vframe.root;
            root['@:{node#mounted.vframe}'] = 1;
            Vframe.fire('add', {
                vframe
            });
        }
    };
    let Vframe_RemoveVframe = (id, vframe, root) => {
        vframe = Vframe_Vframes[id];
        if (vframe) {
            delete Vframe_Vframes[id];
            root = vframe.root;
            root['@:{node#mounted.vframe}'] = 0;
            root['@:{node#vframe.id}'] = 0;
            Vframe.fire('remove', {
                vframe
            });
            vframe.id = vframe.root = vframe.pId = vframe['@:{vframe.children}'] = Null; //清除引用,防止被移除的view内部通过setTimeout之类的异步操作有关的界面，影响真正渲染的view
            if (DEBUG) {
                let nodes = Doc_Document.querySelectorAll('#' + id);
                if (nodes.length > 1) {
                    Mx_Cfg.error(Error(`remove vframe error. dom id:"${id}" duplicate`));
                }
            }
        }
    };
    let Vframe_Unmount = (me, node, isVframeId, deep) => {
        let vf, pId;
        node = node ? me['@:{vframe.children}'][isVframeId ? node : node['@:{node#vframe.id}']] : me.id;
        vf = Vframe_Vframes[node];
        if (vf) {
            pId = vf.pId;
            Vframe_unmountView(vf, deep);
            Vframe_RemoveVframe(node);
            vf = Vframe_Vframes[pId];
            if (vf && Has(vf['@:{vframe.children}'], node)) { //childrenMap
                delete vf['@:{vframe.children}'][node]; //childrenMap
                vf['@:{vframe.children.list}'] = 0;
            }
        }
    };
    let Vframe_RunInvokes = (vf, list, name, resolve, view, fn, args) => {
        list = vf['@:{vframe.invoke.list}']; //invokeList
        view = vf['@:{vframe.view.entity}'];
        while (list.length) {
            [name, args, resolve] = list.shift();
            if (name) {
                CallFunction(resolve, (fn = view[name]) && ToTry(fn, args, view));
            }
        }
    };
    let Vframe_CollectVframes = (start, vfs, onlyChild) => {
        let children = start.children(), child, vf;
        for (child of children) {
            vf = Vframe_Vframes[child];
            vfs.push(vf);
            if (!onlyChild) {
                Vframe_CollectVframes(vf, vfs);
            }
        }
    };
    let Vframe_UnmountZone = (owner, root, onlyInnerView, deep) => {
        let p, vf, unmount;
        for (p in owner['@:{vframe.children}']) {
            if (root) {
                vf = Vframe_Vframes[p];
                unmount = vf && NodeIn(vf.root, root, onlyInnerView);
            }
            else {
                unmount = 1;
            }
            if (unmount) {
                Vframe_Unmount(owner, p, unmount, deep);
                //owner.unmount(p, unmount, deep);
            }
        }
    };
    let Vframe_MountZone = (owner, zone, it, vframes) => {
        zone = zone || owner.root;
        vframes = zone.querySelectorAll(`[${MX_View}][${MX_MAIN}="${owner.id}"]`);
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
        //me['@:{vframe.hold.fire}'] = 1; //hold fire creted
        //me.unmountZone(zoneId, 1); 不去清理，详情见：https://github.com/thx/magix/issues/27
        for (it of vframes) {
            if (!it['@:{node#mounted.vframe}']) { //防止嵌套的情况下深层的view被反复实例化
                owner.mount(it, GetAttribute(it, MX_View));
            }
        }
        //me['@:{vframe.hold.fire}'] = 0;
    };
    /**
      * 销毁对应的view
      */
    let Vframe_unmountView = (owner, deep) => {
        let { '@:{vframe.view.entity}': v, root, pId } = owner;
        if (v) {
            owner['@:{vframe.view.entity}'] = 0; //unmountView时，尽可能早的删除vframe上的$v对象，防止$v销毁时，再调用该 vfrmae的类似unmountZone方法引起的多次created
            if (v['@:{view.sign}']) {
                v['@:{view.sign}'] = 0;
                Unmark(v);
                if (v['@:{view.template}']) {
                    Vframe_UnmountZone(owner, 0, 0, 1);
                }
                v.fire('destroy');
                View_DelegateEvents(v, 1);
                //v.owner = v.root = Null;
                if (root &&
                    owner['@:{vframe.alter.node}'] &&
                    v['@:{view.template}'] &&
                    GetAttribute(root, MX_RESET) != Null) {
                    SetInnerHTML(root, owner['@:{vframe.template}']);
                    if (pId &&
                        owner['@:{vframe.template}'] &&
                        !deep) {
                        Vframe_MountZone(Vframe_Vframes[pId], root);
                    }
                }
            }
        }
        owner['@:{vframe.sign}']++; //增加signature，阻止相应的回调，见mountView
    };
    let Vframe_mountView = async (owner, viewPath, viewInitParams, deep) => {
        let { id, root, pId } = owner;
        let po, sign, view, params, TView;
        if (!owner['@:{vframe.alter.node}'] &&
            root) { //alter
            owner['@:{vframe.alter.node}'] = 1;
            owner['@:{vframe.template}'] = root.innerHTML;
        }
        Vframe_unmountView(owner, deep);
        if (root && viewPath) {
            po = ParseUri(viewPath);
            view = po[Path];
            owner[Path] = viewPath;
            params = po[Params];
            pId = GetAttribute(root, MX_OWNER);
            Vframe_TranslateQuery(pId, viewPath, params);
            owner['@:{vframe.view.path}'] = view;
            Assign(params, viewInitParams);
            sign = owner['@:{vframe.sign}'];
            [TView] = await Async_Require(view, params);
            if (sign == owner['@:{vframe.sign}'] &&
                TView) { //有可能在view载入后，vframe已经卸载了
                //if (TView) {
                View_Prepare(TView);
                view = new TView(id, root, owner, params);
                if (DEBUG) {
                    let viewProto = TView.prototype;
                    let importantProps = {
                        id: 1,
                        owner: 1,
                        root: 1,
                        '@:{view.observe.router}': 1,
                        '@:{view.resource}': 1,
                        '@:{view.sign}': 1,
                        '@:{view.updater.data}': 1,
                        '@:{view.updater.digesting.list}': 1
                    };
                    for (let p in view) {
                        if (Has(view, p) && viewProto[p]) {
                            throw new Error(`avoid write ${p} at file ${viewPath}!`);
                        }
                    }
                    view = Safeguard(view, true, (key, value) => {
                        if (Has(viewProto, key) ||
                            (Has(importantProps, key) &&
                                (key != '@:{view.sign}' || !isFinite(value)) &&
                                ((key != 'owner' && key != 'root') || value !== Null))) {
                            throw new Error(`avoid write ${key} at file ${viewPath}!`);
                        }
                    });
                }
                owner['@:{vframe.view.entity}'] = view;
                //me['@:{vframe.update.tag}'] = Dispatcher_UpdateTag;
                View_DelegateEvents(view);
                ToTry(view.init, params, view);
                ToTry(view['@:{view.assign.fn}'], [params, owner['@:{vframe.template}']], view);
                //CallFunction(view['@:{view.render.short}'], Empty_Array, view);
                view['@:{view.render.short}']();
                if (!view['@:{view.template}'] &&
                    !view['@:{view.rendered}']) { //无模板且未触发渲染
                    //CallFunction(View_EndUpdate, view);
                    View_EndUpdate(view);
                }
                // } else {
                //     //if (DEBUG) {
                //     //Mx_Cfg.error(Error(`${id} cannot load:${view}`));
                //     //}
                // }
            }
        }
    };
    let Vframe_GetVfId = node => node['@:{node#vframe.id}'] || (node['@:{node#vframe.id}'] = GUID(Vframe_RootId));
    function Vframe(root, pId) {
        let me = this;
        let vfId = Vframe_GetVfId(root);
        me.id = vfId;
        me.root = root;
        me['@:{vframe.sign}'] = 1; //signature
        me['@:{vframe.children}'] = {}; //childrenMap
        me.pId = pId;
        me['@:{vframe.invoke.list}'] = []; //invokeList
        me['@:{vframe.ref.data}'] = new Map();
        Vframe_AddVframe(vfId, me);
    }
    Assign(Vframe, {
        root() {
            return Vframe_RootVframe;
        },
        all() {
            return Vframe_Vframes;
        },
        byId(id) {
            return Vframe_Vframes[id];
        },
        byNode(node) {
            return Vframe_Vframes[node['@:{node#vframe.id}']];
        }
    }, MxEvent);
    Assign(Vframe[Prototype], {
        mount(node, viewPath, viewInitParams, deep) {
            let me = this, vf, id = me.id, c = me['@:{vframe.children}'];
            let vfId = Vframe_GetVfId(node);
            vf = Vframe_Vframes[vfId];
            if (!vf) {
                if (!Has(c, vfId)) { //childrenMap,当前子vframe不包含这个id
                    me['@:{vframe.children.list}'] = 0; //childrenList 清空缓存的子列表
                }
                c[vfId] = vfId; //map
                vf = new Vframe(node, id);
            }
            //CallFunction(Vframe_mountView,[vf,viewPath,viewInitParams,, deep]);
            Vframe_mountView(vf, viewPath, viewInitParams, deep);
            return vf;
        },
        unmount(...args) {
            Vframe_Unmount(this, ...args);
        },
        children() {
            return this['@:{vframe.children.list}'] || (this['@:{vframe.children.list}'] = Keys(this['@:{vframe.children}']));
        },
        descendants(onlyChild) {
            let vfs = [];
            Vframe_CollectVframes(this, vfs, onlyChild);
            return vfs;
        },
        parent(level, vf) {
            vf = this;
            level = (level >>> 0) || 1;
            while (vf && level--) {
                vf = Vframe_Vframes[vf.pId];
            }
            return vf;
        },
        invoke(name, ...args) {
            let vf = this, view, fn, list = vf['@:{vframe.invoke.list}'];
            return new GPromise(resolve => {
                if ((view = vf['@:{vframe.view.entity}']) &&
                    view['@:{view.rendered}']) { //view rendered
                    resolve((fn = view[name]) && ToTry(fn, args, view));
                }
                else {
                    list.push([name, args, resolve]);
                }
            });
        },
        invokeCancel(name) {
            let list = this['@:{vframe.invoke.list}'];
            if (name) {
                for (let e of list) {
                    if (e[0] == name) {
                        e[0] = '';
                    }
                }
            }
            else {
                list.length = 0;
            }
        },
        async exit(resolve, reject, stop = Noop) {
            let e = {
                '@:{exit-tip#from}': View_Exit_From_Vframe,
                '@:{exit-tip#mutual}': View_Exit_From_Router,
                resolve,
                reject,
                stop,
            }, vfs = [], vf;
            Vframe_CollectVframes(this, vfs);
            for (vf of vfs) {
                await vf.invoke('@:{~view#exit.listener}', e);
            }
            View_RunExitList(e);
        }
    });
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
    let Body_EvtInfoCache = new MxCache();
    let Body_EvtInfoReg = /^([\w\-]+)\x1e(\d+)?(\x1e)?([^(]+)\(([\s\S]*?)\)$/;
    let Body_RootEvents = {};
    let Body_SearchSelectorEvents = {};
    let Body_RootEvents_Modifier = {};
    let Body_RootEvents_Flags = {};
    let Body_Passive_True_Flag = 1;
    let Body_Passive_False_Flag = 2;
    let Body_Capture_True_Flag = 4;
    let Body_Capture_False_Flag = 8;
    let Body_Capture_True_Passive_False_Modifier = { capture: true, passive: false };
    let Body_Capture_True_Passive_True_Modifier = { capture: true, passive: true };
    let Body_Capture_False_Passive_False_Modifier = { capture: false, passive: false };
    let Body_Capture_False_Passive_True_Modifier = { capture: false, passive: true };
    /*
        passive:false, capture:true
        passive:true capture:true
    
        passive:false, capture:false,
        passive:false capture:false
    */
    let Body_FindVframeInfo = (current, eventType) => {
        let vf, tempId, selectorObject, eventSelector, eventInfos = [], begin = current, info = GetAttribute(current, MX_PREFIX + eventType), match, view, vfs, selectorVfId, backtrace;
        if (info) {
            match = Body_EvtInfoCache.get(info);
            if (!match) {
                match = info.match(Body_EvtInfoReg) || Empty_Array;
                match = {
                    v: match[1],
                    b: match[2] | 0,
                    t: match[3],
                    n: match[4],
                    i: match[5]
                };
                if (DEBUG) {
                    match = Safeguard(match);
                }
                Body_EvtInfoCache.set(info, match);
            }
            match = Assign({}, match);
            if (DEBUG) {
                match = Assign(match, { r: info });
            }
        }
        //如果有匹配但没有处理的vframe或者事件在要搜索的选择器事件里
        if ((match && !match.v) || Body_SearchSelectorEvents[eventType]) {
            selectorVfId = begin['@:{node#owner.vframe}'];
            if (selectorVfId == Null) { //先找最近的vframe
                vfs = [begin];
                while (begin != Doc_Body && (begin = begin.parentNode)) {
                    if (Vframe_Vframes[tempId = begin['@:{node#vframe.id}']] ||
                        (tempId = begin['@:{node#owner.vframe}'])) {
                        selectorVfId = tempId;
                        break;
                    }
                    vfs.push(begin);
                }
                for (info of vfs) {
                    info['@:{node#owner.vframe}'] = selectorVfId || Empty;
                }
            }
            begin = current['@:{node#vframe.id}'];
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
            // if (!selectorVfId) {
            //     selectorVfId = Mx_Cfg.rootId;
            // }
            if (selectorVfId) { //从最近的vframe向上查找带有选择器事件的view
                do {
                    vf = Vframe_Vframes[selectorVfId];
                    if (vf && (view = vf['@:{vframe.view.entity}'])) {
                        selectorObject = view['@:{view.selector.events.object}'];
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
                                        current.matches(tempId)) {
                                        eventInfos.push(selectorObject);
                                    }
                                }
                                else if (backtrace) {
                                    eventInfos.push(selectorObject);
                                }
                            }
                        }
                        //防止跨view选中，到带模板的view时就中止或未指定
                        if (view['@:{view.template}'] && !backtrace) {
                            break; //带界面的中止
                        }
                    }
                    backtrace = 0;
                } while (vf && (selectorVfId = vf.pId));
            }
        }
        if (match) {
            eventInfos.push(match);
        }
        return eventInfos;
    };
    let Body_DOMEventProcessor = domEvent => {
        let { target, type } = domEvent;
        let eventInfos;
        let ignore;
        let vframe, view, eventName, fn;
        //let lastVfId;
        let params, arr = [], offset;
        let remold = Mx_Cfg.remold;
        while (target &&
            target != Doc_Body &&
            (!remold || remold(target, type, domEvent)) &&
            !domEvent.cancelBubble &&
            (!(ignore = target['@:{node#ignore.events}']) || !ignore[type])) {
            offset = 1;
            if (target.nodeType == offset) {
                eventInfos = Body_FindVframeInfo(target, type);
                if (eventInfos.length) {
                    arr.length = 0;
                    for (fn of eventInfos) {
                        let { v, n, i, t, b } = fn;
                        if (!v && DEBUG) {
                            return Mx_Cfg.error(Error(`bad ${type}:${fn.r}`));
                        }
                        // if (lastVfId != v) {
                        //     if (lastVfId && domEvent.cancelBubble) {
                        //         break;
                        //     }
                        //     lastVfId = v;
                        // }
                        vframe = Vframe_Vframes[v];
                        view = vframe && vframe['@:{vframe.view.entity}'];
                        if (view) {
                            if (view['@:{view.rendered}'] &&
                                view['@:{view.sign}']) {
                                eventName = n + Spliter + type;
                                fn = view[eventName];
                                if (fn) {
                                    domEvent.eventTarget = target;
                                    params = i ? ParseExpr(i, vframe['@:{vframe.ref.data}']) : Empty_Object;
                                    domEvent[Params] = params;
                                    ToTry(fn, domEvent, view);
                                }
                                if (DEBUG) {
                                    if (!fn) { //检测为什么找不到处理函数
                                        console.error('can not find event processor:' + n + '<' + type + '> from view:' + vframe.path);
                                    }
                                }
                                if (target != view.root &&
                                    !view['@:{view.selector.events.object}'][type]) {
                                    if (t) {
                                        offset = b || offset;
                                    }
                                    else {
                                        target = view.root;
                                        offset = 0;
                                    }
                                }
                            }
                        }
                        else { //如果处于删除中的事件触发，则停止事件的传播
                            if (DEBUG) {
                                if (view == null) {
                                    console.warn(`vframe:${v} destroyed`);
                                }
                                else if (view !== 0) { //销毁
                                    console.error('can not find vframe:' + v);
                                }
                            }
                        }
                    }
                }
                else {
                    arr.push(target);
                }
                if (offset) {
                    vframe = target['@:{node#vframe.id}'];
                    if (vframe) {
                        vframe = Vframe_Vframes[vframe];
                        view = vframe && vframe['@:{vframe.view.entity}'];
                        if (view &&
                            view['@:{view.events.object}'][type]) {
                            arr.length = 0;
                        }
                    }
                }
            }
            while (offset--)
                target = target.parentNode;
        }
        for (target of arr) {
            ignore = target['@:{node#ignore.events}'] || (target['@:{node#ignore.events}'] = {});
            ignore[type] = 1;
        }
    };
    let Body_DOMEventBind = (type, searchSelector, remove, flags) => {
        let counter = Body_RootEvents[type] | 0;
        let flag = Body_RootEvents_Flags[type] || (Body_RootEvents_Flags[type] = {});
        let offset = (remove ? -1 : 1), fn = remove ? RemoveEventListener : AddEventListener;
        if (flags & Body_Capture_True_Flag) {
            flag[Body_Capture_True_Flag] = (flag[Body_Capture_True_Flag] | 0) + offset;
        }
        if (flags & Body_Capture_False_Flag) {
            flag[Body_Capture_False_Flag] = (flag[Body_Capture_False_Flag] | 0) + offset;
        }
        if (flags & Body_Passive_True_Flag) {
            flag[Body_Passive_True_Flag] = (flag[Body_Passive_True_Flag] | 0) + offset;
        }
        if (flags & Body_Passive_False_Flag) {
            flag[Body_Passive_False_Flag] = (flag[Body_Passive_False_Flag] | 0) + offset;
        }
        let mod, lastMod = Body_RootEvents_Modifier[type];
        if (flag[Body_Passive_False_Flag]) {
            if (flag[Body_Capture_True_Flag]) {
                mod = Body_Capture_True_Passive_False_Modifier;
            }
            else {
                mod = Body_Capture_False_Passive_False_Modifier;
            }
        }
        else if (flag[Body_Capture_True_Flag]) {
            mod = Body_Capture_True_Passive_True_Modifier;
        }
        else {
            mod = Body_Capture_False_Passive_True_Modifier;
        }
        if (!counter || remove === counter) { // remove=1  counter=1
            fn(Doc_Body, type, Body_DOMEventProcessor, remove ? lastMod : mod);
        }
        else if (mod != lastMod) {
            RemoveEventListener(Doc_Body, type, Body_DOMEventProcessor, lastMod);
            AddEventListener(Doc_Body, type, Body_DOMEventProcessor, mod);
        }
        Body_RootEvents_Modifier[type] = mod;
        Body_RootEvents[type] = counter + offset;
        if (searchSelector) { //记录需要搜索选择器的事件
            Body_SearchSelectorEvents[type] = (Body_SearchSelectorEvents[type] | 0) + offset;
        }
    };
    if (DEBUG) {
        var Updater_CheckInput = (view, html) => {
            if (/<(?:input|textarea|select)/i.test(html)) {
                let url = ParseUri(view.owner.path);
                let found = false, hasParams = false;
                for (let p in url.params) {
                    hasParams = true;
                    if (url.params[p][0] == Spliter) {
                        found = true;
                    }
                }
                if (hasParams && !found) {
                    console.warn('[!use # to pass parameter] path:' + view.owner.path + ' at ' + (view.owner.parent().path));
                }
            }
        };
    }
    let Updater_EM = {
        '&': 38,
        '<': 60,
        '>': 62,
        '"': 34,
        '\'': 39,
        '\`': 96
    };
    let Updater_ER = /[&<>"'\`]/g;
    //let Updater_Safeguard = v => v == Null ? Empty : Empty + v;
    let Updater_EncodeReplacer = m => `&#${Updater_EM[m]};`;
    let Updater_Encode = v => (v + Empty).replace(Updater_ER, Updater_EncodeReplacer);
    let Updater_UM = {
        '!': 1,
        '\'': 7,
        '(': 8,
        ')': 9,
        '*': 'A'
    };
    let Updater_URIReplacer = m => '%2' + Updater_UM[m];
    let Updater_URIReg = /[!')(*]/g;
    let Updater_EncodeURI = v => Encode(v).replace(Updater_URIReg, Updater_URIReplacer);
    let Updater_QR = /[\\'"]/g;
    let Updater_EncodeQ = v => (v + Empty).replace(Updater_QR, '\\$&');
    let Updater_Ref = ($$, v, k) => {
        if ($$.has(v)) {
            k = $$.get(v);
        }
        else {
            k = Spliter + (k || $$['@:{vframe-data-map#index}']++);
            if (!$$.has(k)) {
                $$.set(v, k);
                $$.set(k, v);
            }
        }
        return k;
        // if (DEBUG && k === undefined) {
        //     console.error('check ref data!');
        // }
        // $$[k] = v;
        // return k;
    };
    // let Updater_Ready_List = [];
    // let Updater_Ready_Checker = ready => {
    //     let findUnready = 0,
    //         findCurrent = 0;
    //     for (let r of Updater_Ready_List) {
    //         if (r['@:{ready#callback}'] == ready) {
    //             r['@:{ready#ok}'] = 1;
    //             findCurrent = 1;
    //         }
    //         if (r['@:{ready#ok}']) {
    //             if (!findUnready &&
    //                 !r['@:{ready#invoke}']) {
    //                 r['@:{ready#invoke}'] = 1;
    //                 r['@:{ready#callback}']();
    //                 r['@:{ready#callback}'] = Empty;
    //             }
    //         } else {
    //             findUnready = 1;
    //         }
    //         if (findUnready &&
    //             findCurrent) {
    //             break;
    //         }
    //     }
    //     findCurrent = Updater_Ready_List[Updater_Ready_List.length - 1];
    //     if (findCurrent['@:{ready#callback}'] === Empty) {
    //         Updater_Ready_List.length = 0;
    //     }
    // };
    let Updater_Digest = async (view, holdFire, tmpl) => {
        if (view['@:{view.sign}'] &&
            (tmpl = view['@:{view.template}'])) {
            let { '@:{view.updater.keys}': keys, id: viewId, '@:{view.updater.data}': data, root } = view, vf = Vframe_Vframes[viewId], ready, preRequires, ref = {
                '@:{updater-ref#view.renders}': [],
                '@:{updater-ref#node.props}': [],
                '@:{updater-ref#view.id}': viewId,
                '@:{updater-ref#async.count}': 0
            }, vdom, refData = vf['@:{vframe.ref.data}'];
            view['@:{view.updater.data.changed}'] = 0;
            view['@:{view.updater.keys}'] = {};
            if (!holdFire) {
                view.fire('dompatch');
            }
            refData['@:{vframe-data-map#index}'] = 0;
            refData.clear();
            vdom = tmpl(data, Q_Create, viewId, Updater_EncodeURI, refData, Updater_Ref, Updater_EncodeQ, IsArray);
            tmpl = vdom['@:{v#node.views}'];
            if (tmpl) {
                preRequires = [];
                for (ready of tmpl) {
                    Vframe_TranslateQuery(ready[1], ready[2], ready[3]);
                    preRequires.push(Async_Require(ready[0], ready[3]));
                }
                await GPromise.all(preRequires);
            }
            if (DEBUG) {
                Updater_CheckInput(view, vdom['@:{v#node.outer.html}']);
            }
            //该功能有性能问题，考虑下线
            if (vf.pId &&
                !view['@:{view.rendered}'] &&
                GetAttribute(root, MX_SUB) != Null) {
                Vframe_UnmountZone(Vframe_Vframes[vf.pId], root, 1);
            }
            ready = () => {
                view['@:{view.updater.vdom}'] = vdom;
                if (view['@:{view.sign}']) {
                    tmpl = ref['@:{updater-ref#changed}'] || !view['@:{view.rendered}'];
                    if (tmpl) {
                        CallFunction(View_EndUpdate, view);
                    }
                    for (vdom of ref['@:{updater-ref#view.renders}']) {
                        CallFunction(vdom['@:{view.render.short}'], Empty_Array, vdom);
                        //CallFunction(View_CheckAssign, [vdom]);
                    }
                }
                if (view['@:{view.async.count}'] > 1) {
                    view['@:{view.async.count}'] = 1;
                    ref['@:{updater-ref#node.props}'].length = 0;
                    CallFunction(Updater_Digest, [view, 1]);
                    //Updater_Digest(view, 1);
                }
                else {
                    view['@:{view.async.count}'] = 0;
                    /*
                        在dom diff patch时，如果已渲染的vframe有变化，则会在vom tree上先派发created事件，同时传递inner标志，vom tree处理alter事件派发状态，未进入created事件派发状态
            
                        patch完成后，需要设置vframe hold fire created事件，因为带有assign方法的view在调用render后，vom tree处于就绪状态，此时会导致提前派发created事件，应该hold，统一在endUpdate中派发
            
                        有可能不需要endUpdate，所以hold fire要视情况而定
                    */
                    for ([vdom, viewId, refData] of ref["@:{updater-ref#node.props}"]) {
                        if (vdom[viewId] != refData) {
                            vdom[viewId] = refData;
                        }
                    }
                    view.fire('domready');
                    keys = view['@:{view.async.resolves}'];
                    for (vdom of keys) {
                        vdom();
                    }
                    keys.length = 0;
                }
            };
            // Updater_Ready_List.push({
            //     '@:{ready#callback}': ready
            // });
            CallFunction(V_SetChildNodes, [root, view['@:{view.updater.vdom}'], vdom, ref, vf, keys, view, ready]);
            //V_SetChildNodes(view.root, view['@:{view.updater.vdom}'], vdom, ref, vf, keys, view, ready);
        }
    };
    let Q_TEXTAREA = 'textarea';
    let Q_Create = (tag, props, children, specials) => {
        //html=tag+to_array(attrs)+children.html
        let token;
        if (tag) {
            props = props || Empty_Object;
            let compareKey = Empty, unary = children == 1, mxvKeys = specials, hasSpecials = specials, prop, value, c, reused, reusedTotal = 0,
                //outerHTML = '<' + tag,
                attrs = `<${tag}`, innerHTML = Empty, newChildren, prevNode, viewList, mxView = 0;
            if (children &&
                children != 1) {
                for (c of children) {
                    if (c['@:{v#node.attrs}']) {
                        value = c['@:{v#node.attrs}'] + (c['@:{v#node.self.close}'] ? '/>' : `>${c['@:{v#node.html}']}</${c['@:{v#node.tag}']}>`);
                    }
                    else {
                        value = c['@:{v#node.html}'];
                        if (c['@:{v#node.tag}'] == V_TEXT_NODE) {
                            if (value) {
                                value = Updater_Encode(value);
                            }
                            else {
                                continue;
                            }
                        }
                    }
                    innerHTML += value;
                    //merge text node
                    if (prevNode &&
                        c['@:{v#node.tag}'] == V_TEXT_NODE &&
                        prevNode['@:{v#node.tag}'] == V_TEXT_NODE) {
                        //prevNode['@:{v#node.html}'] += c['@:{v#node.html}'];
                        prevNode['@:{v#node.html}'] += c['@:{v#node.html}'];
                    }
                    else {
                        if (c['@:{v#node.views}']) {
                            if (!viewList)
                                viewList = [];
                            viewList.push(...c['@:{v#node.views}']);
                        }
                        //reused node if new node key equal old node key
                        if (c['@:{v#node.compare.key}']) {
                            if (!reused)
                                reused = {};
                            reused[c['@:{v#node.compare.key}']] = (reused[c['@:{v#node.compare.key}']] || 0) + 1;
                            reusedTotal++;
                        }
                        //force diff children
                        mxvKeys = mxvKeys || c['@:{v#node.mxv.keys}'];
                        prevNode = c;
                        if (!newChildren)
                            newChildren = [];
                        newChildren.push(c);
                    }
                }
            }
            specials = specials || Empty_Object;
            for (prop in props) {
                value = props[prop];
                //布尔值
                if (value === false ||
                    value == Null) {
                    if (!specials[prop]) {
                        delete props[prop];
                    }
                    continue;
                }
                else if (value === true) {
                    props[prop] = value = specials[prop] ? value : Empty;
                }
                if ((prop == Hash_Key ||
                    prop == Tag_Prop_Id ||
                    prop == Tag_Static_Key) &&
                    !compareKey) {
                    compareKey = value;
                    if (prop != Tag_Prop_Id) {
                        delete props[prop];
                        continue;
                    }
                }
                if (prop == MX_View &&
                    value) {
                    prevNode = ParseUri(value);
                    mxView = prevNode[Path];
                    if (!viewList) {
                        viewList = [];
                    }
                    viewList.push([mxView, props[MX_OWNER], value, prevNode[Params]]);
                    if (!compareKey) {
                        //否则如果是组件,则使用组件的路径做为key
                        compareKey = tag + Spliter + mxView;
                    }
                }
                if (prop == Value &&
                    tag == Q_TEXTAREA) {
                    innerHTML = value;
                    //attrs += value;
                }
                else if (prop == Tag_View_Params_Key) {
                    mxvKeys = value;
                    delete props[prop];
                }
                else {
                    attrs += ` ${prop}="${value && Updater_Encode(value)}"`;
                }
            }
            //attrs += outerHTML;
            //outerHTML += unary ? '/>' : `>${innerHTML}</${tag}>`;
            token = {
                '@:{v#node.html}': innerHTML,
                '@:{v#node.compare.key}': compareKey,
                '@:{v#node.tag}': tag,
                '@:{v#node.is.mx.view}': mxView,
                '@:{v#node.mxv.keys}': mxvKeys,
                '@:{v#node.attrs.specials}': specials,
                '@:{v#node.attrs.has.specials}': hasSpecials,
                '@:{v#node.attrs}': attrs,
                '@:{v#node.attrs.map}': props,
                '@:{v#node.children}': newChildren,
                '@:{v#node.reused}': reused,
                '@:{v#node.reused.total}': reusedTotal,
                '@:{v#node.views}': viewList,
                '@:{v#node.self.close}': unary
            };
        }
        else {
            token = {
                '@:{v#node.tag}': children ? Spliter : V_TEXT_NODE,
                '@:{v#node.html}': props + Empty
            };
        }
        return token;
    };
    if (DEBUG) {
        var CheckNodes = (realNodes, vNodes) => {
            let index = 0;
            if (vNodes.length &&
                vNodes[0]['@:{v#node.tag}'] != Spliter) {
                for (let e of vNodes) {
                    if (!realNodes[index]) {
                        console.error('real not match virtual nodes!');
                        break;
                    }
                    if (realNodes[index].nodeName.toLowerCase() != e['@:{v#node.tag}'].toLowerCase()) {
                        console.warn('virtual not match real nodes!');
                    }
                    index++;
                }
            }
        };
    }
    //let V_Active_Is_Diff = currentNode => Doc_Document.activeElement != currentNode;
    let V_TEXT_NODE = Counter;
    if (DEBUG) {
        V_TEXT_NODE = '#text';
    }
    let V_W3C = 'http://www.w3.org/';
    let V_NSMap = {
        svg: `${V_W3C}2000/svg`,
        math: `${V_W3C}1998/Math/MathML`
    };
    let V_To_Reg = new RegExp(`${MX_MAIN}="\x05"`, 'g');
    let V_TO_Update = (s, ref) => s.replace(V_To_Reg, `${MX_MAIN}="${ref['@:{updater-ref#view.id}']}"`);
    let V_SetAttributes = (oldNode, newVDOM, ref, lastVDOM) => {
        let key, value, changed = 0, nsMap = newVDOM['@:{v#node.attrs.specials}'], nMap = newVDOM['@:{v#node.attrs.map}'], osMap, oMap, sValue;
        if (lastVDOM) {
            osMap = lastVDOM['@:{v#node.attrs.specials}'];
            oMap = lastVDOM['@:{v#node.attrs.map}'];
            for (key in oMap) {
                if (!Has(nMap, key)) { //如果旧有新木有
                    changed = 1;
                    if ((sValue = osMap[key])) {
                        if (ref) {
                            ref['@:{updater-ref#node.props}'].push([oldNode, sValue, Empty]);
                        }
                        else {
                            oldNode[sValue] = Empty;
                        }
                    }
                    else {
                        oldNode.removeAttribute(key);
                    }
                }
            }
        }
        for (key in nMap) {
            value = nMap[key] ?? Empty;
            if ((sValue = nsMap[key])) {
                if (!lastVDOM ||
                    oldNode[sValue] != value) {
                    changed = 1;
                    if (ref) {
                        ref['@:{updater-ref#node.props}'].push([oldNode, sValue, value]);
                    }
                    else {
                        oldNode[sValue] = value;
                    }
                }
            }
            else if (!lastVDOM || oMap[key] != value) {
                changed = 1;
                if (key == MX_MAIN) {
                    value = ref['@:{updater-ref#view.id}'];
                }
                oldNode.setAttribute(key, value);
            }
        }
        return changed;
    };
    let V_CreateNode = (vnode, owner, ref) => {
        let tag = vnode['@:{v#node.tag}'], c;
        if (tag == V_TEXT_NODE) {
            c = Doc_Document.createTextNode(vnode['@:{v#node.html}']);
        }
        else {
            c = Doc_Document.createElementNS(V_NSMap[tag] || owner.namespaceURI, tag);
            V_SetAttributes(c, vnode, ref);
            SetInnerHTML(c, V_TO_Update(vnode['@:{v#node.html}'], ref));
        }
        return c;
    };
    let V_GetKeyNodes = (list, nodes, start, end, realEnd) => {
        let keyedNodes = {}, i, oc, cKey; //, iKey;
        for (i = end; i >= start; i--, realEnd--) {
            oc = list[i];
            cKey = oc['@:{v#node.compare.key}'];
            if (cKey) {
                //iKey = Spliter + cKey;
                //keyedNodes[iKey] = (keyedNodes[iKey] || 0) + 1;
                oc = keyedNodes[cKey] || (keyedNodes[cKey] = []);
                oc.push(nodes[realEnd]);
            }
        }
        return keyedNodes;
    };
    let V_IsSameVNode = (aVNode, bVNode) => {
        return (aVNode['@:{v#node.compare.key}'] &&
            bVNode['@:{v#node.compare.key}'] == aVNode['@:{v#node.compare.key}']) ||
            (!aVNode['@:{v#node.compare.key}'] &&
                !bVNode['@:{v#node.compare.key}'] &&
                aVNode['@:{v#node.tag}'] == bVNode['@:{v#node.tag}']) ||
            aVNode['@:{v#node.tag}'] == Spliter ||
            bVNode['@:{v#node.tag}'] == Spliter;
    };
    let V_Remove_Vframe_By_Node = (node, parentVf, elementNode, vf) => {
        if (elementNode) {
            vf = Vframe_Vframes[node['@:{node#vframe.id}']];
            if (vf) {
                Vframe_Unmount(vf);
                //vf.unmount();
            }
            else {
                Vframe_UnmountZone(parentVf, node);
            }
        }
    };
    let V_Remove_Node_Task = (node, parent, parentVf, ref, view, ready) => {
        if (view['@:{view.sign}']) {
            V_Remove_Vframe_By_Node(node, parentVf, node.nodeType == 1);
            if (DEBUG) {
                if (!node.parentNode) {
                    console.error('Avoid remove node on view.destroy in digesting');
                }
            }
            parent.removeChild(node);
            if (!(--ref['@:{updater-ref#async.count}'])) {
                CallFunction(ready);
            }
        }
    };
    let V_Insert_Node_Task = (realNode, oc, nodes, offset, view, ref, vframe, ready) => {
        if (view['@:{view.sign}']) {
            if (oc['@:{v#node.tag}'] == Spliter) {
                Vframe_UnmountZone(vframe, realNode);
                SetInnerHTML(realNode, oc['@:{v#node.html}']);
            }
            else {
                realNode.insertBefore(V_CreateNode(oc, realNode, ref), nodes[offset]);
            }
            if (!(--ref['@:{updater-ref#async.count}'])) {
                CallFunction(ready);
            }
        }
    };
    // let V_DecreaseUsed = (reused, resuedTotal, vnode, keyedNodes, list?) => {
    //     if (reused[vnode['@:{v#node.compare.key}']]) {
    //         reused[vnode['@:{v#node.compare.key}']]--;
    //         resuedTotal--;
    //         if (keyedNodes &&
    //             (list = keyedNodes[vnode['@:{v#node.compare.key}']]) &&
    //             list.length > 1) {
    //             keyedNodes = Null;
    //         }
    //     }
    //     return [resuedTotal, keyedNodes];
    // };
    let V_SetChildNodes = (realNode, lastVDOM, newVDOM, ref, vframe, keys, view, ready) => {
        if (view['@:{view.sign}']) {
            if (lastVDOM) { //view首次初始化，通过innerHTML快速更新
                if (lastVDOM['@:{v#node.mxv.keys}'] ||
                    lastVDOM['@:{v#node.html}'] != newVDOM['@:{v#node.html}']) {
                    let i, oi, oc, oldChildren = lastVDOM['@:{v#node.children}'] || Empty_Array, newChildren = newVDOM['@:{v#node.children}'] || Empty_Array, reused = newVDOM['@:{v#node.reused}'] || Empty_Object, resuedTotal = newVDOM['@:{v#node.reused.total}'], oldReusedTotal = lastVDOM['@:{v#node.reused.total}'], nodes = realNode.childNodes, compareKey, keyedNodes, oldRangeStart = 0, newCount = newChildren.length, oldRangeEnd = oldChildren.length - 1, newRangeStart = 0, newRangeEnd = newCount - 1, reduceCached = (vnode, compared) => {
                        if (reused[vnode['@:{v#node.compare.key}']]) {
                            reused[vnode['@:{v#node.compare.key}']]--;
                            resuedTotal--;
                        }
                        oi = keyedNodes &&
                            keyedNodes[vnode['@:{v#node.compare.key}']];
                        if (oi) {
                            for (i = oi.length; i--;) {
                                if (oi[i] == compared) {
                                    oi[i] = Null;
                                    break;
                                }
                            }
                        }
                    };
                    if (DEBUG &&
                        lastVDOM['@:{v#node.tag}'] != Q_TEXTAREA) {
                        CheckNodes(nodes, oldChildren);
                    }
                    // let newCount = newChildren.length - 1;
                    // let oldCount = oldChildren.length - 1,
                    //     nc,
                    //     realNodeStep;
                    // keyedNodes = {};
                    // while (oldCount &&
                    //     newCount) {
                    //     oc = oldChildren[oldRangeStart];
                    //     nc = newChildren[newRangeStart];
                    //     if (oc['@:{v#node.outer.html}'] ==
                    //         nc['@:{v#node.outer.html}']) {
                    //         if (oc['@:{v#node.has.mxv}']) {
                    //             V_SetNode(nodes[oldRangeStart], realNode, oc, nc, ref, vframe, keys);
                    //         }
                    //         if (reused[oc['@:{v#node.compare.key}']]) {
                    //             reused[oc['@:{v#node.compare.key}']]--;
                    //             resuedTotal--;
                    //         }
                    //         ++oldRangeStart;
                    //         ++newRangeStart;
                    //         --oldCount;
                    //         --newCount;
                    //     } else {
                    //         break;
                    //     }
                    // }
                    // while (oldCount > 1 &&
                    //     newCount > 1) {
                    //     oc = oldChildren[oldRangeEnd];
                    //     nc = newChildren[newRangeEnd];
                    //     if (oc && nc &&
                    //         oc['@:{v#node.outer.html}'] ==
                    //         nc['@:{v#node.outer.html}']) {
                    //         if (oc['@:{v#node.has.mxv}']) {
                    //             V_SetNode(nodes[oldRangeEnd], realNode, oc, nc, ref, vframe, keys);
                    //         }
                    //         if (reused[oc['@:{v#node.compare.key}']]) {
                    //             reused[oc['@:{v#node.compare.key}']]--;
                    //             resuedTotal--;
                    //         }
                    //         --oldRangeEnd;
                    //         --newRangeEnd;
                    //         --oldCount;
                    //         --newCount;
                    //     } else {
                    //         break;
                    //     }
                    // }
                    // if (resuedTotal > 0 &&
                    //     oldReusedTotal > 0) {
                    //     for (i = oldRangeEnd; i >= oldRangeStart; i--) {
                    //         oc = oldChildren[i];
                    //         compareKey = oc['@:{v#node.compare.key}'];
                    //         if (compareKey) {
                    //             compareKey = keyedNodes[compareKey] || (keyedNodes[compareKey] = []);
                    //             compareKey.push(nodes[i]);
                    //         }
                    //     }
                    // }
                    // for (i = newRangeStart; i <= newRangeEnd; i++) {
                    //     nc = newChildren[i];
                    //     oc = oldRangeStart <= oldRangeEnd && oldChildren[oldRangeStart++];
                    //     compareKey = keyedNodes[nc['@:{v#node.compare.key}']];
                    //     if (compareKey && (compareKey = compareKey.pop())) {
                    //         if (compareKey != nodes[i]) {
                    //             for (oi = oldRangeStart, realNodeStep = 1;
                    //                 oi <= oldRangeEnd;
                    //                 oi++, realNodeStep++) {
                    //                 oc = oldChildren[oi];
                    //                 if (oc && nodes[i + realNodeStep] == compareKey) {
                    //                     oldChildren.splice(oi, 1);
                    //                     oldRangeStart--;
                    //                     break;
                    //                 }
                    //             }
                    //             realNode.insertBefore(compareKey, nodes[i]);
                    //         }
                    //         if (reused[oc['@:{v#node.compare.key}']]) {
                    //             reused[oc['@:{v#node.compare.key}']]--;
                    //         }
                    //         
                    //         ref['@:{updater-ref#async.count}']++;
                    //         CallFunction(V_SetNode, [compareKey, realNode, oc, nc, ref, vframe, keys, view, ready]);
                    //         
                    //     } else if (oc) {//有旧节点，则更新
                    //         if (keyedNodes[oc['@:{v#node.compare.key}']] &&
                    //             reused[oc['@:{v#node.compare.key}']]) {
                    //             oldCount++;
                    //             ref['@:{updater-ref#changed}'] = 1;
                    //             realNode.insertBefore(V_CreateNode(nc, realNode), nodes[i]);
                    //             oldRangeStart--;
                    //         } else {
                    //             ref['@:{updater-ref#async.count}']++;
                    //             CallFunction(V_SetNode, [nodes[i], realNode, oc, nc, ref, vframe, keys, view, ready]);
                    //             
                    //         }
                    //     } else {//添加新的节点
                    //         if (nc['@:{v#node.tag}'] == Spliter) {
                    //             SetInnerHTML(realNode, nc['@:{v#node.outer.html}']);
                    //         } else {
                    //             realNode.insertBefore(V_CreateNode(nc, realNode), nodes[i]);
                    //         }
                    //         ref['@:{updater-ref#changed}'] = 1;
                    //     }
                    // }
                    // for (i = newCount; i < oldCount; i++) {
                    //     oi = nodes[newRangeEnd + 1];//删除多余的旧节点
                    //     if (oi.nodeType == 1) {
                    //         vframe.unmountZone(oi);
                    //     }
                    //     if (DEBUG) {
                    //         if (!oi.parentNode) {
                    //             console.error('Avoid remove node on view.destroy in digesting');
                    //         }
                    //     }
                    //     realNode.removeChild(oi);
                    // }
                    //-------new alg-------
                    let oldStartNode = oldChildren[oldRangeStart], oldEndNode = oldChildren[oldRangeEnd], newStartNode = newChildren[newRangeStart], newEndNode = newChildren[newRangeEnd], realNodeRangeStart = oldRangeStart, realNodeRangeEnd = oldRangeEnd, currentNode;
                    while (oldRangeStart <= oldRangeEnd &&
                        newRangeStart <= newRangeEnd) {
                        if (!oldStartNode) {
                            oldStartNode = oldChildren[++oldRangeStart];
                        }
                        else if (!oldEndNode) {
                            oldEndNode = oldChildren[--oldRangeEnd];
                        }
                        else if (V_IsSameVNode(newStartNode, oldStartNode)) {
                            oi = nodes[realNodeRangeStart];
                            if (newStartNode['@:{v#node.tag}'] == Spliter ||
                                oldStartNode['@:{v#node.tag}'] == Spliter) {
                                ref['@:{updater-ref#changed}'] = 1;
                                Vframe_UnmountZone(vframe, realNode);
                                if (newStartNode['@:{v#node.tag}'] == Spliter) {
                                    realNodeRangeEnd = 0;
                                    SetInnerHTML(realNode, newStartNode['@:{v#node.html}']);
                                }
                                else {
                                    SetInnerHTML(realNode, Empty);
                                    realNode.appendChild(V_CreateNode(newStartNode, realNode, ref));
                                }
                            }
                            else {
                                ref['@:{updater-ref#async.count}']++;
                                CallFunction(V_SetNode, [oi, realNode, oldStartNode, newStartNode, ref, vframe, keys, view, ready]);
                            }
                            //更新需要保留的节点，加速对节点索引
                            //如果当前节点已经在索引中，则要按顺序移除
                            //[resuedTotal, keyedNodes] = V_DecreaseUsed(reused, resuedTotal, oldStartNode, keyedNodes);
                            reduceCached(oldStartNode, oi);
                            realNodeRangeStart++;
                            oldStartNode = oldChildren[++oldRangeStart];
                            newStartNode = newChildren[++newRangeStart];
                        }
                        else if (V_IsSameVNode(newEndNode, oldEndNode)) {
                            oi = nodes[realNodeRangeEnd];
                            ref['@:{updater-ref#async.count}']++;
                            CallFunction(V_SetNode, [oi, realNode, oldEndNode, newEndNode, ref, vframe, keys, view, ready]);
                            //[resuedTotal, keyedNodes] = V_DecreaseUsed(reused, resuedTotal, oldEndNode, keyedNodes);
                            reduceCached(oldEndNode, oi);
                            realNodeRangeEnd--;
                            oldEndNode = oldChildren[--oldRangeEnd];
                            newEndNode = newChildren[--newRangeEnd];
                        }
                        else if (V_IsSameVNode(newEndNode, oldStartNode)) {
                            oi = nodes[realNodeRangeStart];
                            realNode.insertBefore(oi, nodes[realNodeRangeEnd + 1]);
                            ref['@:{updater-ref#async.count}']++;
                            CallFunction(V_SetNode, [oi, realNode, oldStartNode, newEndNode, ref, vframe, keys, view, ready]);
                            //[resuedTotal, keyedNodes] = V_DecreaseUsed(reused, resuedTotal, oldStartNode, keyedNodes);
                            reduceCached(oldStartNode, oi);
                            realNodeRangeEnd--;
                            oldStartNode = oldChildren[++oldRangeStart];
                            newEndNode = newChildren[--newRangeEnd];
                        }
                        else if (V_IsSameVNode(newStartNode, oldEndNode)) {
                            oi = nodes[realNodeRangeEnd];
                            realNode.insertBefore(oi, nodes[realNodeRangeStart++]);
                            ref['@:{updater-ref#async.count}']++;
                            CallFunction(V_SetNode, [oi, realNode, oldEndNode, newStartNode, ref, vframe, keys, view, ready]);
                            reduceCached(oldEndNode, oi);
                            //[resuedTotal, keyedNodes] = V_DecreaseUsed(reused, resuedTotal, oldEndNode, keyedNodes);
                            oldEndNode = oldChildren[--oldRangeEnd];
                            newStartNode = newChildren[++newRangeStart];
                        }
                        else {
                            if (!keyedNodes &&
                                resuedTotal > 0 &&
                                oldReusedTotal > 0) {
                                keyedNodes = V_GetKeyNodes(oldChildren, nodes, oldRangeStart, oldRangeEnd, realNodeRangeEnd);
                            }
                            currentNode = nodes[realNodeRangeStart];
                            oi = keyedNodes &&
                                keyedNodes[newStartNode['@:{v#node.compare.key}']];
                            compareKey = Null;
                            while (oi &&
                                oi.length &&
                                !(compareKey = oi.pop()))
                                ;
                            /**
                             * <div>{{=f}}</div>   =>  <div>aa</div>
                             * <div>aa</div>
                             * <div>bb</div>
                             */
                            if (compareKey) {
                                oc = oldStartNode;
                                if (compareKey != currentNode) {
                                    /**
                                     * <div>{{=x}}</div>    =>    <div>aa</div>
                                     * <div>aa</div>              <div>bb</div>
                                     * <div>bb</div>
                                     * <div>{{=y}}</div>
                                     */
                                    for (oi = oldRangeStart + 1,
                                        i = realNodeRangeStart + 1; oi <= oldRangeEnd; oi++) {
                                        oc = oldChildren[oi];
                                        if (oc &&
                                            nodes[i++] == compareKey) {
                                            oldChildren[oi] = Null;
                                            break;
                                        }
                                        if (DEBUG &&
                                            i > realNodeRangeEnd) {
                                            console.error('real not match virtual nodes!');
                                        }
                                    }
                                    oldRangeStart--;
                                    realNode.insertBefore(compareKey, currentNode);
                                }
                                if (reused[oc['@:{v#node.compare.key}']]) {
                                    reused[oc['@:{v#node.compare.key}']]--;
                                }
                                ref['@:{updater-ref#async.count}']++;
                                CallFunction(V_SetNode, [compareKey, realNode, oc, newStartNode, ref, vframe, keys, view, ready]);
                            }
                            else {
                                /**
                                 * <div>aa</div>    =>    <div>{{=f}}</div>
                                 *                        <div>aa</div>
                                 *                        <div>bb</div>
                                 */
                                if ((keyedNodes &&
                                    keyedNodes[oldStartNode['@:{v#node.compare.key}']] &&
                                    reused[oldStartNode['@:{v#node.compare.key}']]) ||
                                    (Vframe_Vframes[currentNode['@:{node#vframe.id}']] &&
                                        !newStartNode['@:{v#node.is.mx.view}'])) {
                                    ref['@:{updater-ref#changed}'] = 1;
                                    realNode.insertBefore(V_CreateNode(newStartNode, realNode, ref), currentNode);
                                    oldRangeStart--;
                                    realNodeRangeEnd++;
                                }
                                else {
                                    ref['@:{updater-ref#async.count}']++;
                                    CallFunction(V_SetNode, [currentNode, realNode, oldStartNode, newStartNode, ref, vframe, keys, view, ready]);
                                }
                            }
                            ++realNodeRangeStart;
                            oldStartNode = oldChildren[++oldRangeStart];
                            newStartNode = newChildren[++newRangeStart];
                        }
                    }
                    for (i = newRangeStart, oi = 1; i <= newRangeEnd; i++, oi++) {
                        oc = newChildren[i];
                        ref['@:{updater-ref#changed}'] = 1;
                        ref['@:{updater-ref#async.count}']++;
                        CallFunction(V_Insert_Node_Task, [realNode, oc, nodes, realNodeRangeEnd + oi, view, ref, vframe, ready]);
                        // if (oc['@:{v#node.tag}'] == Spliter) {
                        //     Vframe_UnmountZone(realNode);
                        //     SetInnerHTML(realNode, oc['@:{v#node.html}']);
                        // } else {
                        //     realNode.insertBefore(V_CreateNode(oc, realNode), nodes[realNodeRangeEnd + oi]);
                        // }
                    }
                    if (!newCount &&
                        oldStartNode &&
                        oldStartNode['@:{v#node.tag}'] == Spliter) {
                        realNodeRangeEnd = nodes.length - 1;
                    }
                    for (i = realNodeRangeEnd; i >= realNodeRangeStart; i--) { //删除多余的旧节点
                        ref['@:{updater-ref#changed}'] = 1;
                        ref['@:{updater-ref#async.count}']++;
                        CallFunction(V_Remove_Node_Task, [nodes[i], realNode, vframe, ref, view, ready]);
                    }
                }
            }
            else {
                ref['@:{updater-ref#changed}'] = 1;
                SetInnerHTML(realNode, V_TO_Update(newVDOM['@:{v#node.html}'], ref));
                if (DEBUG) {
                    if (vframe.root.nodeType == 1 && !vframe.root.parentNode) {
                        throw new Error(`unsupport mount "${vframe.path}". the root element is removed by other views`);
                    }
                }
            }
        }
        if (!ref['@:{updater-ref#async.count}']) {
            CallFunction(ready);
        }
    };
    let V_SetNode = (realNode, oldParent, lastVDOM, newVDOM, ref, vframe, keys, rootView, ready) => {
        if (rootView['@:{view.sign}']) {
            if (DEBUG) {
                if (lastVDOM['@:{v#node.tag}'] != Spliter &&
                    newVDOM['@:{v#node.tag}'] != Spliter) {
                    if (oldParent.nodeName == 'TEMPLATE') {
                        console.error('unsupport template tag');
                    }
                    if ((realNode.nodeName == '#text' &&
                        lastVDOM['@:{v#node.tag}'] != '#text') ||
                        (realNode.nodeName != '#text' &&
                            realNode.nodeName.toLowerCase() != lastVDOM['@:{v#node.tag}'].toLowerCase())) {
                        console.error('Your code is not match the DOM tree generated by the browser. near:' + lastVDOM['@:{v#node.html}'] + '. Is that you lost some tags or modified the DOM tree?');
                    }
                }
            }
            let lastAMap = lastVDOM['@:{v#node.attrs.map}'], newAMap = newVDOM['@:{v#node.attrs.map}'];
            if (lastVDOM['@:{v#node.mxv.keys}'] ||
                lastVDOM['@:{v#node.attrs}'] != newVDOM['@:{v#node.attrs}'] ||
                lastVDOM['@:{v#node.html}'] != newVDOM['@:{v#node.html}']) {
                if (lastVDOM['@:{v#node.tag}'] == newVDOM['@:{v#node.tag}']) {
                    if (lastVDOM['@:{v#node.tag}'] == V_TEXT_NODE) {
                        ref['@:{updater-ref#changed}'] = 1;
                        realNode.nodeValue = newVDOM['@:{v#node.html}'];
                    }
                    else if (!lastAMap[Tag_Static_Key] ||
                        lastAMap[Tag_Static_Key] != newAMap[Tag_Static_Key]) {
                        let newMxView = newAMap[MX_View], newHTML = newVDOM['@:{v#node.html}'], updateAttribute = lastVDOM['@:{v#node.attrs}'] != newVDOM['@:{v#node.attrs}'] || newVDOM['@:{v#node.attrs.has.specials}'], updateChildren, unmountOld, oldVf = Vframe_Vframes[realNode['@:{node#vframe.id}']], assign, view, uri = newMxView && ParseUri(newMxView), params, htmlChanged, paramsChanged;
                        /*
                            如果存在新旧view，则考虑路径一致，避免渲染的问题
                         */
                        /*
                            只检测是否有参数控制view而不检测数据是否变化的原因：
                            例：view内有一input接收传递的参数，且该input也能被用户输入
                            var d1='xl';
                            var d2='xl';
                            当传递第一份数据时，input显示值xl，这时候用户修改了input的值且使用第二份数据重新渲染这个view，问input该如何显示？
                        */
                        if (updateAttribute) {
                            updateAttribute = V_SetAttributes(realNode, newVDOM, ref, lastVDOM);
                            if (updateAttribute) {
                                ref['@:{updater-ref#changed}'] = 1;
                            }
                        }
                        //旧节点有view,新节点有view,且是同类型的view
                        if (newMxView && oldVf &&
                            oldVf['@:{vframe.view.path}'] == uri[Path] &&
                            (view = oldVf['@:{vframe.view.entity}'])) {
                            htmlChanged = newHTML != lastVDOM['@:{v#node.html}'];
                            paramsChanged = newMxView != oldVf[Path];
                            assign = newVDOM['@:{v#node.mxv.keys}'];
                            if (!htmlChanged && !paramsChanged && assign) {
                                params = assign.split(Comma);
                                for (assign of params) {
                                    if (assign == Hash_Key || Has(keys, assign)) {
                                        paramsChanged = 1;
                                        break;
                                    }
                                }
                            }
                            if (paramsChanged ||
                                htmlChanged) {
                                assign = view['@:{view.assign.fn}'];
                                //如果有assign方法,且有参数或html变化
                                //if (assign) {
                                params = uri[Params];
                                //处理引用赋值
                                Vframe_TranslateQuery(newAMap[MX_OWNER], newMxView, params);
                                oldVf[Path] = newMxView; //update ref
                                oldVf['@:{vframe.template}'] = newHTML;
                                //如果需要更新，则进行更新的操作
                                // uri = {
                                //     //node: newVDOM,//['@:{v#node.children}'],
                                //     //html: newHTML,
                                //     //mxv: hasMXV,
                                //     node: realNode,
                                //     attr: updateAttribute,
                                //     deep: !view.tmpl,
                                //     inner: htmlChanged,
                                //     query: paramsChanged
                                // };
                                //updateAttribute = 1;
                                if (DEBUG) {
                                    let result = ToTry(assign, [params, newHTML], /*[params, uri],*/ view);
                                    if (result !== false) {
                                        if (assign == View.prototype.assign) {
                                            console.warn(`${uri[Path]} need "assign" method for receive parameters changed`, params, newHTML);
                                        }
                                        ref['@:{updater-ref#view.renders}'].push(view);
                                    }
                                }
                                else if (ToTry(assign, [params, newHTML], /*[params, uri],*/ view) !== false) {
                                    ref['@:{updater-ref#view.renders}'].push(view);
                                }
                                //默认当一个组件有assign方法时，由该方法及该view上的render方法完成当前区域内的节点更新
                                //而对于不渲染界面的控制类型的组件来讲，它本身更新后，有可能需要继续由magix更新内部的子节点，此时通过deep参数控制
                                updateChildren = !view['@:{view.template}']; //uri.deep;
                                // } else {
                                //     unmountOld = 1;
                                //     updateChildren = 1;
                                //     if (DEBUG) {
                                //         if (updateAttribute) {
                                //             console.warn(`There is no "assign" method in ${uri[Path]},so magix remount it when attrs changed`);
                                //         }
                                //     }
                                // }
                            } // else {
                            // updateAttribute = 1;
                            //}
                        }
                        else {
                            updateChildren = 1;
                            unmountOld = oldVf;
                        }
                        if (unmountOld) {
                            ref['@:{updater-ref#changed}'] = 1;
                            Vframe_Unmount(oldVf);
                            //oldVf.unmount();
                        }
                        // Update all children (and subchildren).
                        //自闭合标签不再检测子节点
                        if (updateChildren &&
                            !newVDOM['@:{v#node.self.close}']) {
                            V_SetChildNodes(realNode, lastVDOM, newVDOM, ref, vframe, keys, rootView, ready);
                        }
                    }
                }
                else {
                    ref['@:{updater-ref#changed}'] = 1;
                    V_Remove_Vframe_By_Node(realNode, vframe, 1);
                    oldParent.replaceChild(V_CreateNode(newVDOM, oldParent, ref), realNode);
                }
            }
        }
        if (!(--ref['@:{updater-ref#async.count}'])) {
            CallFunction(ready);
        }
    };
    let State_Data = {};
    let State = Assign({
        get(key) {
            return key ? State_Data[key] : State_Data;
        },
        /**
         * 设置数据
         * @param {Object} data 数据对象
         */
        set(data) {
            Assign(State_Data, data);
        }
    }, MxEvent);
    //like 'login<click>' or '$<click>' or '$win<scroll>' or '$win<scroll>&{capture:true}'
    let View_EvtMethodReg = /^(\$?)([^<]*)<([^>]+)>(?:\s*&(.+))?$/;
    let processMixinsSameEvent = (exist, additional, temp) => {
        if (exist['@:{viewmixin#list}']) {
            temp = exist;
        }
        else {
            temp = function (e, f) {
                for (f of temp['@:{viewmixin#list}']) {
                    ToTry(f, e, this);
                }
            };
            temp['@:{viewmixin#list}'] = [exist];
            temp['@:{viewmixin#is.mixin}'] = 1;
        }
        temp['@:{viewmixin#list}'] = temp['@:{viewmixin#list}'].concat(additional['@:{viewmixin#list}'] || additional);
        return temp;
    };
    let View_EndUpdate = view => {
        let o, f;
        if (view['@:{view.sign}']) {
            f = view['@:{view.rendered}'];
            view['@:{view.rendered}'] = 1;
            o = view.owner;
            Vframe_MountZone(o);
            if (!f) {
                CallFunction(Vframe_RunInvokes, o);
            }
        }
    };
    let View_DelegateEvents = (me, destroy) => {
        let e, { '@:{view.events.object}': eventsObject, '@:{view.selector.events.object}': selectorObject, '@:{view.events.list}': eventsList, id } = me; //eventsObject
        for (e in eventsObject) {
            Body_DOMEventBind(e, selectorObject[e], destroy, eventsObject[e]);
        }
        eventsObject = destroy ? RemoveEventListener : AddEventListener;
        for (e of eventsList) {
            eventsObject(e['@:{xevent#element}'], e['@:{xevent#name}'], e['@:{xevent#callback}'], e['@:{xevent#modifier}'], id, me);
        }
    };
    let View_Globals = {
        win: Doc_Window,
        doc: Doc_Document,
        root: Empty
    };
    function staticExtend(...args) {
        return Assign(this, ...args), this;
    }
    let View_MergeMixins = (mixins, proto, ctors) => {
        let temp = {}, p, node, fn, exist;
        for (node of mixins) {
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
                        fn['@:{viewmixin#is.mixin}'] = 1;
                    }
                }
                else if (DEBUG &&
                    exist &&
                    fn != exist) { //只在开发中提示
                    console.warn('plugins duplicate property:' + p);
                }
                temp[p] = fn;
            }
        }
        for (p in temp) {
            if (!Has(proto, p)) {
                proto[p] = temp[p];
            }
            else if (DEBUG) {
                console.warn('already exist ' + p + ',avoid override it!');
            }
        }
    };
    function merge(...args) {
        let me = this, _ = me['@:{view-factory#ctors}'] || (me['@:{view-factory#ctors}'] = []);
        View_MergeMixins(args, me[Prototype], _);
        return me;
    }
    let safeRender = render => function (...args) { return this['@:{view.sign}'] && ToTry(render, args, this); };
    let execCtors = (list, params, me, cx) => {
        if (list) {
            for (cx of list) {
                ToTry(cx, params, me);
            }
        }
    };
    function extend(props) {
        let me = this;
        props = props || {};
        let ctor = props.ctor;
        function NView(viewId, rootNode, ownerVf, initParams, z) {
            me.call(z = this, viewId, rootNode, ownerVf, initParams);
            if (ctor)
                ToTry(ctor, initParams, z);
            execCtors(NView['@:{view-factory#ctors}'], initParams, z);
        }
        NView.merge = merge;
        NView.extend = extend;
        NView.static = staticExtend;
        return Extend(NView, me, props);
    }
    let View_Prepare = oView => {
        if (!oView[Spliter]) { //只处理一次
            oView[Spliter] = 1;
            let prop = oView[Prototype], currentFn, matches, selectorOrCallback, events, eventsObject = {}, eventsList = [], selectorObject = {}, node, isSelector, p, item, mask, mod, modifiers;
            for (p in prop) {
                currentFn = prop[p];
                matches = p.match(View_EvtMethodReg);
                if (matches) {
                    [, isSelector, selectorOrCallback, events, modifiers] = matches;
                    mod = modifiers ? ToObject(modifiers) : Body_Capture_False_Passive_True_Modifier;
                    events = events.split(Comma);
                    for (item of events) {
                        node = View_Globals[selectorOrCallback];
                        mask = 0;
                        if (mod.passive ||
                            mod.passive == Null) {
                            mask |= Body_Passive_True_Flag;
                        }
                        else {
                            mask |= Body_Passive_False_Flag;
                        }
                        if (mod.capture) {
                            mask |= Body_Capture_True_Flag;
                        }
                        else {
                            mask |= Body_Capture_False_Flag;
                        }
                        if (isSelector) {
                            if (node) {
                                eventsList.push({
                                    '@:{xevent#callback}': currentFn,
                                    '@:{xevent#element}': node,
                                    '@:{xevent#name}': item,
                                    '@:{xevent#modifier}': mod
                                });
                                continue;
                            }
                            if (node === Empty) {
                                selectorOrCallback = Empty;
                            }
                            node = selectorObject[item];
                            if (!node) {
                                node = selectorObject[item] = [];
                            }
                            if (!node[selectorOrCallback]) {
                                node[selectorOrCallback] = 1;
                                node.push(selectorOrCallback);
                            }
                        }
                        eventsObject[item] |= mask;
                        item = selectorOrCallback + Spliter + item;
                        node = prop[item];
                        //for in 就近遍历，如果有则忽略
                        if (!node) { //未设置过
                            prop[item] = currentFn;
                        }
                        else if (node['@:{viewmixin#is.mixin}']) { //现有的方法是mixins上的
                            if (currentFn['@:{viewmixin#is.mixin}']) { //2者都是mixins上的事件，则合并
                                prop[item] = processMixinsSameEvent(currentFn, node);
                            }
                            else if (Has(prop, p)) { //currentFn方法不是mixin上的，也不是继承来的，在当前view上，优先级最高
                                prop[item] = currentFn;
                            }
                        }
                    }
                }
            }
            if (prop['@:{view.render.short}'] != prop.render) {
                prop['@:{view.render.short}'] = prop.render = safeRender(prop.render);
            }
            prop['@:{view.events.object}'] = eventsObject;
            prop['@:{view.events.list}'] = eventsList;
            prop['@:{view.selector.events.object}'] = selectorObject;
            prop['@:{view.assign.fn}'] = prop.assign;
            prop['@:{view.template}'] = prop.tmpl;
        }
    };
    let View_Exit_From_Router = '@:{tip-mutual#from.router}';
    let View_Exit_From_Vframe = '@:{tip-mutual#from.vframe}';
    let View_ExitList = [];
    let View_RunExitList = (e, idx = 0) => {
        let head = View_ExitList[idx];
        if (head) {
            let [view, msg] = head;
            view.exitConfirm(msg, () => {
                View_RunExitList(e, idx + 1);
            }, () => {
                View_ExitList.length = 0;
                View_ExitList[e['@:{exit-tip#from}']] = 0;
                e.reject();
            });
        }
        else {
            View_ExitList.length = 0;
            View_ExitList[e['@:{exit-tip#from}']] = 0;
            e.resolve();
        }
    };
    function View(id, root, owner, params, me) {
        me = this;
        me.root = root;
        me.owner = owner;
        me.id = id;
        //me[Spliter] = id;
        me['@:{view.observe.router}'] = {
            '@:{view-router#observe.params}': []
        };
        me['@:{view.sign}'] = 1; //标识view是否刷新过，对于托管的函数资源，在回调这个函数时，不但要确保view没有销毁，而且要确保view没有刷新过，如果刷新过则不回调
        me['@:{view.updater.data.changed}'] = 1;
        me['@:{view.updater.data}'] = {};
        me['@:{view.updater.keys}'] = {};
        //me['@:{view.assign.sign}'] = 0;
        me['@:{view.async.count}'] = 0;
        me['@:{view.async.resolves}'] = [];
        execCtors(View['@:{view-factory#ctors}'], params, me);
    }
    Assign(View, {
        merge,
        extend
    });
    Assign(View[Prototype], MxEvent, {
        init: Noop,
        render: Noop,
        assign: Noop,
        observeExit(msg, fn) {
            let me = this;
            if (!me['@:{~view#exit.listener}']) {
                let changeListener = e => {
                    if (View_ExitList[e['@:{exit-tip#mutual}']]) {
                        e.stop();
                        e.reject();
                    }
                    else if (fn()) {
                        e.stop();
                        View_ExitList[e['@:{exit-tip#from}']] = 1;
                        View_ExitList.push([me, msg]);
                    }
                }, unloadListener = e => {
                    if (!e['@:{page-tip#msg}'] &&
                        fn()) {
                        e['@:{page-tip#msg}'] = msg;
                    }
                };
                Router.on(Change, changeListener);
                Router.on(Page_Unload, unloadListener);
                me['@:{~view#exit.listener}'] = changeListener;
                me.on('destroy', () => {
                    Router.off(Change, changeListener);
                    Router.off(Page_Unload, unloadListener);
                });
            }
        },
        observeLocation(params, isObservePath) {
            let me = this, loc;
            loc = me['@:{view.observe.router}'];
            loc['@:{view-router#observed}'] = 1;
            if (IsObject(params)) {
                isObservePath = params[Path];
                params = params[Params];
            }
            loc['@:{view-router#observe.path}'] = isObservePath;
            if (params) {
                loc['@:{view-router#observe.params}'] = (params + Empty).split(Comma);
            }
        },
        get(key, result) {
            result = this['@:{view.updater.data}'];
            if (key) {
                result = result[key];
            }
            return result;
        },
        set(newData) {
            let me = this, oldData = me['@:{view.updater.data}'], keys = me['@:{view.updater.keys}'];
            let changed = me['@:{view.updater.data.changed}'], now, old, p, c;
            for (p in newData) {
                now = newData[p];
                old = oldData[p];
                c = !IsPrimitive(now) || old != now;
                if (c) {
                    keys[p] = 1;
                    changed = 1;
                }
                oldData[p] = now;
            }
            me['@:{view.updater.data.changed}'] = changed;
            return me;
        },
        digest(data) {
            data = this.set(data);
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
            return new GPromise(resolve => {
                if (data['@:{view.updater.data.changed}']) {
                    data['@:{view.async.count}']++;
                    data['@:{view.async.resolves}'].push(resolve);
                    if (data['@:{view.async.count}'] == 1) {
                        CallFunction(Updater_Digest, data);
                    }
                }
                else if (data['@:{view.async.count}']) {
                    data['@:{view.async.resolves}'].push(resolve);
                }
                else {
                    resolve();
                }
            });
        },
        finale() {
            let me = this;
            return new GPromise(resolve => {
                if (me['@:{view.async.count}']) {
                    me['@:{view.async.resolves}'].push(resolve);
                }
                else {
                    resolve();
                }
            });
        },
        changed() {
            return this['@:{view.updater.data.changed}'];
        },
        // snapshot() {
        //     let me = this;
        //     me['@:{view.updater.data.string}'] = JSON_Stringify(me['@:{view.updater.data}']);
        //     return me;
        // },
        // altered() {
        //     let me = this;
        //     if (me['@:{view.updater.data.string}']) {
        //         return me['@:{view.updater.data.string}'] != JSON_Stringify(me['@:{view.updater.data}']);
        //     }
        // },
        translate(data) {
            return TranslateData(this.owner['@:{vframe.ref.data}'], data);
        },
        parse(origin) {
            return ParseExpr(origin, this.owner['@:{vframe.ref.data}']);
        }
    });
    let Undefined = void Counter;
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
    function Bag() {
        this.id = GUID('b');
        this['@:{bag#attrs}'] = {};
    }
    Assign(Bag[Prototype], {
        get(key, dValue) {
            let me = this;
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
            let attrs = me['@:{bag#attrs}'];
            if (key) {
                let tks = IsArray(key) ? key.slice() : (key + Empty).split('.'), tk;
                while ((tk = tks.shift()) &&
                    attrs) {
                    attrs = attrs[tk];
                }
                if (tk) {
                    attrs = Undefined;
                }
            }
            let type;
            if (dValue !== Undefined &&
                (type = Type(dValue)) != Type(attrs)) {
                if (DEBUG) {
                    console.warn('type neq:' + key + ' is not a(n) ' + type);
                }
                attrs = dValue;
            }
            if (DEBUG && me['@:{bag#meta.info}'] && me['@:{bag#meta.info}']['@:{meta#cache.key}']) { //缓存中的接口不让修改数据
                attrs = Safeguard(attrs);
            }
            return attrs;
        },
        set(data) {
            Assign(this['@:{bag#attrs}'], data);
        }
    });
    let Service_FetchFlags_ONE = 1;
    let Service_FetchFlags_ALL = 2;
    let Service_Cache_Done = (bagCacheKeys, cacheKey, fns) => error => {
        fns = bagCacheKeys[cacheKey];
        if (fns) {
            delete bagCacheKeys[cacheKey]; //先删除掉信息
            for (let fn of fns) {
                ToTry(fn, error, fns['@:{service-cache-list#entity}']); //执行所有的回调
            }
        }
    };
    // function Service_CacheDone(cacheKey, err, fns) {
    //     fns = this[cacheKey]; //取出当前的缓存信息
    //     if (fns) {
    //         delete this[cacheKey]; //先删除掉信息
    //         ToTry(fns, err, fns['@:{service-cache-list#entity}']); //执行所有的回调
    //     }
    // }
    let Service_Task = (done, host, service, total, flag, bagCache) => {
        let doneArr = [];
        let errorArgs = Null;
        let currentDoneCount = 0;
        return (bag, idx, error) => {
            currentDoneCount++; //当前完成加1.
            let newBag;
            let mm = bag['@:{bag#meta.info}'];
            let cacheKey = mm['@:{meta#cache.key}'], temp;
            doneArr[idx + 1] = bag; //完成的bag
            if (error) { //出错
                errorArgs = error;
                //errorArgs[idx] = err; //记录相应下标的错误信息
                //Assign(errorArgs, err);
                newBag = 1; //标记当前是一个新完成的bag,尽管出错了
            }
            else if (!bagCache.has(cacheKey)) { //如果缓存对象中不存在，则处理。注意在开始请求时，缓存与非缓存的都会调用当前函数，所以需要在该函数内部做判断处理
                if (cacheKey) { //需要缓存
                    bagCache.set(cacheKey, bag); //缓存
                }
                //bag.set(data);
                mm['@:{meta#cache.time}'] = Date_Now(); //记录当前完成的时间
                temp = mm['@:{meta#after}'];
                if (temp) { //有after
                    ToTry(temp, bag, bag);
                }
                newBag = 1;
            }
            if (!service['@:{service#destroyed}']) { //service['@:{service#destroyed}'] 当前请求被销毁
                let finish = currentDoneCount == total;
                if (finish) {
                    service['@:{service#busy}'] = 0;
                    if (flag == Service_FetchFlags_ALL) { //all
                        doneArr[0] = errorArgs;
                        ToTry(done, doneArr, service);
                    }
                }
                if (flag == Service_FetchFlags_ONE) { //如果是其中一个成功，则每次成功回调一次
                    ToTry(done, [error || Null, bag, finish, idx], service);
                }
            }
            if (newBag) { //不管当前request或回调是否销毁，均派发end事件，就像前面缓存一样，尽量让请求处理完成，该缓存的缓存，该派发事件派发事件。
                host.fire('end', {
                    bag,
                    error
                });
            }
        };
    };
    let Service_Send = (me, attrs, done, flag, save) => {
        if (me['@:{service#destroyed}'])
            return me; //如果已销毁，返回
        if (me['@:{service#busy}']) { //繁忙，后续请求入队
            return me.enqueue(Service_Send.bind(me, me, attrs, done, flag, save));
        }
        me['@:{service#busy}'] = 1; //标志繁忙
        if (!IsArray(attrs)) {
            attrs = [attrs];
        }
        let host = me.constructor, requestCount = 0;
        //let bagCache = host['@:{service#cache}']; //存放bag的Cache对象
        let bagCacheKeys = host['@:{service#request.keys}']; //可缓存的bag key
        let removeComplete = Service_Task(done, host, me, attrs.length, flag, host['@:{service#cache}']);
        for (let bag of attrs) {
            if (bag) {
                let [bagEntity, update] = host.get(bag, save); //获取bag信息
                let cacheKey = bagEntity['@:{bag#meta.info}']['@:{meta#cache.key}']; //从实体上获取缓存key
                let complete = removeComplete.bind(bagEntity, bagEntity, requestCount++);
                let cacheList;
                if (cacheKey && bagCacheKeys[cacheKey]) { //如果需要缓存，并且请求已发出
                    bagCacheKeys[cacheKey].push(complete); //放到队列中
                }
                else if (update) { //需要更新
                    if (cacheKey) { //需要缓存
                        cacheList = [complete];
                        cacheList['@:{service-cache-list#entity}'] = bagEntity;
                        bagCacheKeys[cacheKey] = cacheList;
                        complete = Service_Cache_Done(bagCacheKeys, cacheKey); //替换回调，详见Service_CacheDone
                    }
                    host['@:{service#send}'](bagEntity, complete);
                }
                else { //不需要更新时，直接回调
                    complete();
                }
            }
        }
        return me;
    };
    function Service() {
        let me = this;
        me.id = GUID('s');
        me['@:{service#list}'] = [];
    }
    Assign(Service[Prototype], {
        all(attrs, done) {
            return Service_Send(this, attrs, done, Service_FetchFlags_ALL);
        },
        save(attrs, done) {
            return Service_Send(this, attrs, done, Service_FetchFlags_ALL, 1);
        },
        one(attrs, done) {
            return Service_Send(this, attrs, done, Service_FetchFlags_ONE);
        },
        enqueue(callback) {
            let me = this;
            if (!me['@:{service#destroyed}']) {
                me['@:{service#list}'].push(callback);
                me.dequeue(me['@:{service#last.arguments}']);
            }
            return me;
        },
        dequeue(...a) {
            let me = this, one;
            if (!me['@:{service#busy}'] && !me['@:{service#destroyed}']) {
                me['@:{service#busy}'] = 1;
                Timeout(() => {
                    me['@:{service#busy}'] = 0;
                    if (!me['@:{service#destroyed}']) { //不清除setTimeout,但在回调中识别是否调用了destroy方法
                        one = me['@:{service#list}'].shift();
                        if (one) {
                            ToTry(one, me['@:{service#last.arguments}'] = a);
                        }
                    }
                });
            }
        },
        destroy(me) {
            me = this;
            me['@:{service#destroyed}'] = 1; //只需要标记及清理即可，其它的不需要
            me['@:{service#list}'] = 0;
        }
    });
    let Manager_DefaultCacheKey = (meta, attrs, arr) => {
        arr = [JSON_Stringify(attrs), JSON_Stringify(meta)];
        return arr.join(Spliter);
    };
    let Service_Manager = Assign({
        add(attrs) {
            let me = this;
            let metas = me['@:{service#metas}'], bag;
            if (!IsArray(attrs)) {
                attrs = [attrs];
            }
            for (bag of attrs) {
                if (bag) {
                    let { name, cache } = bag;
                    bag.cache = cache | 0;
                    if (DEBUG && Has(metas, name)) {
                        throw new Error('service already exists:' + name);
                    }
                    metas[name] = bag;
                }
            }
        },
        create(attrs) {
            let me = this;
            let meta = me.meta(attrs);
            let cache = (attrs.cache | 0) || meta.cache;
            let entity = new Bag();
            entity.set(meta);
            entity['@:{bag#meta.info}'] = {
                '@:{meta#after}': meta.after,
                '@:{meta#cache.key}': cache && Manager_DefaultCacheKey(meta, attrs)
            };
            if (IsObject(attrs)) {
                entity.set(attrs);
            }
            let before = meta.before;
            if (before) {
                ToTry(before, entity, entity);
            }
            me.fire('begin', {
                bag: entity
            });
            return entity;
        },
        meta(attrs) {
            let me = this;
            let metas = me['@:{service#metas}'];
            let name = attrs.name || attrs;
            let ma = metas[name];
            return ma || attrs;
        },
        get(attrs, createNew) {
            let me = this;
            let e, u;
            if (!createNew) {
                e = me.cached(attrs);
            }
            if (!e) {
                e = me.create(attrs);
                u = 1;
            }
            return [e, u];
        },
        cached(attrs) {
            let me = this;
            let bagCache = me['@:{service#cache}'];
            let entity;
            let cacheKey;
            let meta = me.meta(attrs);
            let cache = (attrs.cache | 0) || meta.cache;
            if (cache) {
                cacheKey = Manager_DefaultCacheKey(meta, attrs);
            }
            if (cacheKey) {
                let requestCacheKeys = me['@:{service#request.keys}'];
                let info = requestCacheKeys[cacheKey];
                if (info) { //处于请求队列中的
                    entity = info['@:{service-cache-list#entity}'];
                }
                else { //缓存
                    entity = bagCache.get(cacheKey);
                    if (entity && Date_Now() - entity['@:{bag#meta.info}']['@:{meta#cache.time}'] > cache) {
                        bagCache.del(cacheKey);
                        entity = 0;
                    }
                }
            }
            return entity;
        }
    }, MxEvent);
    Service.extend = (sync, cacheMax, cacheBuffer) => {
        function NService() {
            Service.call(this);
        }
        NService['@:{service#send}'] = sync;
        NService['@:{service#cache}'] = new MxCache(cacheMax, cacheBuffer);
        NService['@:{service#request.keys}'] = {};
        NService['@:{service#metas}'] = {};
        Assign(NService, Service_Manager);
        return Extend(NService, Service);
    };
    function Base() { }
    Assign(Base[Prototype], MxEvent);
    Base.extend = function extend(props, statics) {
        let me = this;
        let ctor = props && props.ctor;
        function X(...a) {
            let t = this;
            me.apply(t, a);
            if (ctor)
                ctor.apply(t, a);
        }
        X.extend = extend;
        Assign(X, statics);
        return Extend(X, me, props);
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
    let Magix_Booted = 0;
    let TaskCompleteCheck = (schedule, callback) => {
        let taskCount = 0, taskCheck = (...args) => {
            if (!(--taskCount)) {
                callback(...args);
            }
        };
        return (...args) => {
            taskCount++;
            schedule(taskCheck, [...args]);
        };
    };
    let Magix = {
        version: '5.1.0',
        config(cfg, ...args) {
            let r = Mx_Cfg;
            if (cfg) {
                if (IsObject(cfg)) {
                    r = Assign(r, cfg, ...args);
                }
                else {
                    r = r[cfg];
                }
            }
            return r;
        },
        boot(cfg) {
            if (!Magix_Booted) {
                Magix_Booted = 1;
                Assign(Mx_Cfg, cfg); //先放到配置信息中，供ini文件中使用
                Router_Init_PNR();
                Router.on(Changed, Dispatcher_NotifyChange);
                Router_Bind();
            }
        },
        unboot() {
            if (Magix_Booted) {
                Magix_Booted = 0;
                Router.off(Changed, Dispatcher_NotifyChange);
                Router_Unbind();
                Vframe_Unroot();
            }
        },
        HIGH: Thousand,
        LOW: -Thousand,
        isObject: IsObject,
        isArray: IsArray,
        isFunction: IsFunction,
        isString: IsString,
        isNumber: IsNumber,
        isPrimitive: IsPrimitive,
        isNumeric: o => !isNaN(parseFloat(o)) && isFinite(o),
        waitSelector(selector, timeout, context) {
            context = context || document;
            timeout = timeout || 30 * Thousand;
            let target, check, failed, timer = Timeout(() => failed = 1, timeout);
            return new GPromise((resolve, reject) => {
                check = () => {
                    target = context.querySelector(selector);
                    if (target) {
                        ClearTimeout(timer);
                        resolve(target);
                    }
                    else if (failed) {
                        reject();
                    }
                    else {
                        Timeout(check, CallBreakTime);
                    }
                };
                Timeout(check, CallBreakTime);
            });
        },
        attach: EventListen,
        detach: EventUnlisten,
        attachAll(targets, ...args) {
            for (let t of targets) {
                EventListen(t, ...args);
            }
        },
        detachAll(targets, ...args) {
            for (let t of targets) {
                EventUnlisten(t, ...args);
            }
        },
        now: Date_Now,
        mix: Assign,
        toMap: ToMap,
        toTry: ToTry,
        toUrl: ToUri,
        parseUrl: ParseUri,
        guid: GUID,
        use: Async_Require,
        dispatch: DispatchEvent,
        guard: Safeguard,
        type: Type,
        has: Has,
        inside: NodeIn,
        applyStyle: ApplyStyle,
        Cache: MxCache,
        View,
        Vframe,
        State,
        Service,
        Event: MxEvent,
        Router,
        Base,
        mark: Mark,
        unmark: Unmark,
        node: GetById,
        task: CallFunction,
        lowTask: LastCallFunction,
        taskIdle: Call_Idle_Until,
        taskFinale() {
            return new GPromise(CallFunction);
        },
        lowTaskFinale() {
            return new GPromise(LastCallFunction);
        },
        delay(time) {
            return new GPromise(r => Timeout(r, time));
        },
        taskCancel: CallCancel,
        /**
         * let checkIfReady=Matix.taskComplete((a,b,c)=>{
         *  console.log(a,b,c);
         * });
         * let process=index=>console.log(index);
         * for(let i=0;i<10;i++){
         *  Magix.task(process,[index]);
         *  checkIfReady(a,b,c);
         * }
         */
        taskComplete(callback) {
            return TaskCompleteCheck(CallFunction, callback);
        },
        lowTaskComplete(callback) {
            return TaskCompleteCheck(LastCallFunction, callback);
        }
    };
    Magix.default = Magix;
    return Magix;
});
