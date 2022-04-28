/*md5:a420245305fd19292f7fd6460e37d51d*/
//#snippet;
//#exclude(define,before)
this.Tracker = function (e) {
    function t(n) {
        if (r[n]) return r[n].exports;
        var i = r[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(i.exports, i, i.exports, t), i.l = !0, i.exports
    }
    var r = {};
    return t.m = e, t.c = r, t.d = function (e, t, r) {}, t.n = function (e) {
        var r = e && e.__esModule ? function () {
                return e["default"]
            } : function () {
                return e
            };
        return t.d(r, "a", r), r
    }, t.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 1)
}([function (e, t) {
        function r(e) {
            return "object" == typeof e && null !== e
        }
        var n = function (e) {
            return "[object Number]" === Object.prototype.toString.call(e)
        };
        t.isNumber = n, t.isNaN = function (e) {
            return n(e) && e !== +e
        }, t.isArray = function (e) {
            return Array.isArray ? Array.isArray(e) : -1 !== Object.prototype.toString.call(e).toUpperCase().indexOf(
                "ARRAY")
        }, t.noop = function (e) {
            return e || ""
        }, t.extend = function (e, t) {
            for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
            return e
        }, t.shallowMerge = function (e, t, r) {
            for (var n in t) t.hasOwnProperty(n) && (r || e[n] === undefined) && (e[n] = t[n])
        }, t.getSpm = function () {
            var e = "",
                r = "",
                n = window.goldlog || {}, i = n.spmAb || n.spm_ab;
            return i && t.isArray(i) && (e = i[0], i[1] && (r = i[1])), {
                a: e,
                b: r
            }
        }, t.unifyErrorMsg = function (e) {
            return /^script error\.?$/i.test(e) ? "Script error" : e
        }, t.getScreenSize = function () {
            return window.screen.width + "x" + window.screen.height
        }, t.generateIdentifier = function (e) {
            return [e.type, e.uid, e.page, e.msg || "", e.ajaxurl || ""].join("_")
        };
        var i = {};
        t.addEvent = function (e, t, r, n) {
            e.addEventListener ? e.addEventListener(t, r, n || !1) : (i["on" + t] = function () {
                return r.call(e, window.event)
            }, e.attachEvent("on" + t, i["on" + t]))
        }, t.removeEvent = function (e, t, r, n) {
            e.removeEventListener ? e.removeEventListener(t, r, n || !1) : e.detachEvent("on" + t, i["on" + t] || noop)
        }, t.isError = function (e) {
            var t = {}.toString.call(e);
            return r(e) && "[object Error]" === t || "[object Exception]" === t || e instanceof Error
        }, t.getXPath = function o(e, t) {
            var r = e.id ? "#" + e.id : "",
                n = e.className ? "." + e.className.split(" ").join(".") : "",
                i = e.tagName.toLowerCase();
            return e.parentNode && e.parentNode.tagName && t - 1 != 0 ? o(e.parentNode, t - 1) + " > " + i.toLowerCase() +
                r + n : i + r + n
        }
    }, function (e, t, r) {
        function n(e) {
            if (!(this instanceof n)) return new n(e);
            e = e || {}, !0 === e.hotPatch && this._hotPatch(), !1 !== e.global && "object" == typeof v.__trackerOptions &&
                o(e, v.__trackerOptions), this.global = null == e.global || !! e.global, this.debug = e.debug || b && b
                .search.indexOf("clueTrackerDebug=true") > -1, this.debug && this._warn("已开启 debug 模式，请勿在生产环境使用"), this
                .pid = e.pid, this.sampleRate = e.sampleRate || 1, this.uidResolver = e.uidResolver || s, this.userOptions =
                e, this.requiredFields = e.requiredFields || [], this.releaseResolver = e.releaseResolver || s, this.uaParser =
                e.uaParser || s, this.beforeLog = e.beforeLog || null, this.msgWhitelist = e.msgWhitelist || e.msgWhiteList ||
                S, this.urlWhitelist = e.urlWhitelist || e.urlWhiteList || k, this.oncePerSession = e.oncePerSession ===
                undefined || e.oncePerSession, this.consoleDisplay = e.consoleDisplay || !1, this.ignoreScriptError = e
                .ignoreScriptError || !1, this.resourceError = e.resourceError === undefined || e.resourceError, this.resourceErrorSampleRate =
                e.resourceErrorSampleRate || 1, this.ignoredQueries = e.ignoredQueries || [], this.global && (v.__trackerOptions =
                e), this._inited = !1, this._tracked = [], this._logWaitingQueue = [], this._plugins = e.plugins || [],
                this._pos = "0,0", this._trackMousePos(), this.isWeex = e.isWeex || !1, this.weexFetch = e.weexFetch,
                this.noDOM = this.isWeex, this.fetchProtocol = e.protocol
        }
        var i = r(0),
            o = i.shallowMerge,
            s = i.noop,
            a = i.generateIdentifier,
            c = i.getScreenSize,
            l = i.addEvent,
            h = i.removeEvent,
            u = i.getSpm,
            p = i.isError,
            f = i.getXPath,
            g = r(2),
            d = r(3),
            _ = i.unifyErrorMsg,
            m = !1;
        try {
            m = "[object process]" === global.process.toString()
        } catch (j) {}
        var v = {};
        m || (v = "undefined" != typeof window ? window : "undefined" != typeof self ? self : {});
        var w = v.document,
            y = v.navigator,
            b = v.location,
            E = !1,
            R = v.Tracker,
            O = {
                JS_ERROR: 1
            }, S = null,
            k = null,
            P = +new Date,
            x = v.onerror;
        n.noConflict = function () {
            return v.Tracker === n && (v.Tracker = R), n
        }, n.prototype = {
            VERSION: "4.0.3",
            log: function (e, t) {
                "object" == typeof e ? t = e : "string" == typeof e && (t = t || {}, o(t, {
                    code: 1,
                    msg: e
                })), this._log(t)
            },
            captureMessage: function (e, t) {
                return this.log(e, t)
            },
            logError: function (e, t) {
                if (!p(e)) return this.log(e, t);
                if (t = t || {}, t.c1 || t.c2 || t.c3) return void this._warn(
                        "使用 tracker.logError() 时不可再传入 c1,c2,c3 字段，请求未发送");
                var r = {}, n = d(e);
                r.msg = e.toString(), r.c1 = n[0], r.c2 = n[1], r.c3 = n[2], o(r, t), this._log(r)
            },
            captureException: function (e, t) {
                return this.logError(e, t)
            },
            logReq: function () {
                this._warn("logReq() 方法已经废弃，若有需要，请使用自定义打点方式( `tracker.log()` )监控接口错误。")
            },
            logPerf: function () {
                this._warn("logPerf() 方法已经废弃，若有需要，请使用自定义打点方式( `tracker.log()` )监控接口错误。")
            },
            config: function (e, t) {
                return "string" == typeof e ? (t = t || {}, t.pid = e) : t = e, o(this, t, !0), o(this.userOptions, t, !
                    0), "object" == typeof v.__trackerOptions && o(v.__trackerOptions, t, !0), this._checkRequiredFields() &&
                    this._popWaitingQueue(), this
            },
            onGlobalError: function () {
                if (!w) return this._warn("当前为非 web 环境，不支持报错监听与插件使用"), this;
                var e = this;
                if (this.pid && !this._inited) {
                    if (v.onerror = function (t, r, n, i, o) {
                        e._handleError(t, r, n, i, o)
                    }, this.unhandledrejectionHandler = function (t) {
                        t.reason && t.reason.message && e._handleError(t.reason.message, null, null, null, t.reason)
                    }, l(v, "unhandledrejection", this.unhandledrejectionHandler), this.resourceError && (this.resourceErrorHandler = function (
                        t) {
                        if (!(!t.target.tagName || t.message || t.filename || t.lineno || t.colno)) {
                            var r = t.target.src,
                                n = t.target.tagName.toLowerCase();
                            e._log({
                                code: 4,
                                sampleRate: e.resourceErrorSampleRate,
                                msg: r + " 获取失败",
                                c1: n,
                                c2: f(t.target, 5)
                            })
                        }
                    }, l(v, "error", this.resourceErrorHandler, !0)), this._plugins.length) for (; this._plugins.length >
                            0;) {
                            var t = this._plugins.pop(),
                                r = t[0],
                                n = t[1];
                            r.apply(this, [this].concat(n))
                    }
                    this._inited = !0, this._warn("onGlobalError 已开启，plugin 已加载")
                }
                return this
            },
            install: function () {
                return this.onGlobalError()
            },
            offGlobalError: function () {
                return w ? (v.onerror = x, h(v, "unhandledrejection", this.unhandledrejectionHandler), this.resourceError &&
                    h(v, "error", this.resourceErrorHandler, !0), this._inited = !1, this._plugins = [], this._tracked = [],
                    this._warn("onGlobalError 已关闭"), this) : (this._warn("当前为非 web 环境，不支持监听事件移除与状态重置"), this)
            },
            uninstall: function () {
                return this.offGlobalError()
            },
            addPlugin: function (e) {
                if (!w) return this._warn("当前为非 web 环境，不支持插件使用"), this;
                var t = [].slice.call(arguments, 1);
                return "function" == typeof e && this._inited ? e.apply(this, [this].concat(t)) : this._plugins.push([e,
                        t]), this
            },
            _handleError: function (e, t, r, n, i) {
                if (x) try {
                        x.call(this, e, t, r, n, i)
                } catch (a) {}
                t = t || "-", r = r || "-", n = n || "-", e = _(e);
                var o = {
                    msg: e,
                    code: O.JS_ERROR
                };
                if (!this.ignoreScriptError || "Script error" !== e) {
                    if (null != i && (1 === this.sampleRate || Math.random() < .1)) {
                        var s = d(i);
                        o.c1 = s[0], o.c2 = s[1], o.c3 = s[2]
                    }
                    this._log(o)
                }
            },
            _handleMouseDown: function (e) {
                var t = w && w.documentElement,
                    r = Math.round(e.pageY || e.clientY + w.body.scrollTop + t.scrollTop),
                    n = Math.round(e.pageX || e.clientX + w.body.scrollLeft + t.scrollLeft);
                n -= Math.max(t.clientWidth, t.offsetWidth, t.scrollWidth) / 2, this._pos = String(n) + "," + String(r)
            },
            _trackMousePos: function () {
                var e = this;
                w && w.documentElement && l(w, "mousedown", function (t) {
                    e._handleMouseDown(t)
                })
            },
            getFetchProtocol: function () {
                return "http" === this.fetchProtocol ? "http://gm.mmstat.com/" : "https" === this.fetchProtocol ?
                    "https://gm.mmstat.com/" : v && w && !this.noDOM && "file:" === v.location.protocol ?
                    "http://gm.mmstat.com/" : "//gm.mmstat.com/"
            },
            _postData: function (e) {
                var t = !! (v.navigator && v.navigator.sendBeacon && v.Blob),
                    r = this.getFetchProtocol() + (e.base || "fsp.1.1");
                this._warn("当前打点参数", e);
                var n = g.stringify(e, ["code", "base", "sampleRate", "oncePerSession"], t);
                if (this.isWeex && this.weexFetch && this.weexFetch.fetch) try {
                        this.weexFetch.fetch({
                            method: "GET",
                            type: "json",
                            url: r + "?" + n
                        }), this._warn("weex 打点请求已发出", r + "?" + n)
                } catch (j) {
                    this._warn("weex fetch 发送打点请求失败")
                } else if (t) try {
                        v.navigator.sendBeacon(r, JSON.stringify({
                            gmkey: "OTHER",
                            gokey: n,
                            logtype: "2"
                        })), this._warn("sendBeacon 打点请求已发出", {
                            gmkey: "OTHER",
                            gokey: n,
                            logtype: "2"
                        })
                } catch (j) {
                    if (n = g.stringify(e, ["code", "base", "sampleRate", "oncePerSession"], !1), v && w && !this.noDOM) {
                        var i = new Image;
                        i.src = r + "?" + n, this._warn("打点请求已发出", i.src)
                    } else this._warn("当前非 web 环境，发送异常信息失败")
                } else if (v && w && !this.noDOM) {
                    var i = new Image;
                    i.src = r + "?" + n, this._warn("打点请求已发出", i.src)
                } else this._warn("当前非 web 环境，发送异常信息失败")
            },
            _log: function (e) {
                if (e = e || {}, e.type || e.code || (e.type = 1), !e.type && e.code && (e.type = e.code), e.type === O
                    .JS_ERROR && Math.random() > (e.sampleRate || this.sampleRate)) return void this._warn("当前已设置采样率" +
                        (e.sampleRate || this.sampleRate) + "，未被采集");
                if (null != e.sampleRate && Math.random() > e.sampleRate) return void this._warn("当前已设置采样率" + (e.sampleRate ||
                        this.sampleRate) + "，未被采集");
                if (e = this._enhanceOpitons(e), !e.pid) return void this._warn("未配置 pid，请求未发送");
                for (var t = a(e), r = !1, n = 0; n < this._tracked.length; n++) if (this._tracked[n] === t) {
                        r = !0;
                        break
                    }
                if ((null == e.oncePerSession ? this.oncePerSession : e.oncePerSession) && r) return void this._warn(
                        "当前由于 OncePerSession 策略，未被采集");
                if (this.msgWhitelist && null !== this.msgWhitelist.exec(e.msg)) return void this._warn(
                        "当前由于 msgWhitelist 过滤，未被采集");
                if (this.urlWhitelist && null !== this.urlWhitelist.exec(e.page)) return void this._warn(
                        "当前由于 urlWhitelist 过滤，未被采集");
                if ("function" == typeof this.beforeLog) {
                    var i;
                    try {
                        i = this.beforeLog(e)
                    } catch (j) {}
                    if (!1 === i) return void this._warn("当前由于 beforeLog 返回 false，未被采集");
                    "object" == typeof i && (e = i)
                }
                if (this._tracked.push(t), this.consoleDisplay && this._warn(e.msg), !this._checkRequiredFields())
                    return this._pushWaitingQueue(e), void this._warn("当前由于 requiredFields 未设置完成，打点请求被暂时缓存");
                this._postData(e)
            },
            _checkRequiredFields: function () {
                for (var e = 0; e < this.requiredFields.length; e++) {
                    var t = this.requiredFields[e];
                    if (this.userOptions[t] === undefined) return !1
                }
                return !0
            },
            _popWaitingQueue: function () {
                var e = this;
                if (this._logWaitingQueue && this._logWaitingQueue.length) for (var t = 0; t < this._logWaitingQueue.length; t++) {
                        var r = this._logWaitingQueue[t];
                        o(r, e._enhanceOpitonsByUser(e.userOptions), !0), e._postData(r)
                }
                this._logWaitingQueue = []
            },
            _pushWaitingQueue: function (e) {
                this._logWaitingQueue.push(e)
            },
            _enhanceOpitonsByUser: function (e) {
                return e.uid || (e.uid = this.uidResolver()), e.pid || (e.pid = this.pid), e.rel || (e.rel = this.releaseResolver()),
                    e.ua || (e.ua = this.uaParser(y ? y.userAgent : "")), e
            },
            _enhanceOpitonsCommon: function (e) {
                return e = this._enhanceOpitonsByUser(e), e.delay = parseFloat(((+new Date - P) / 1e3).toFixed(2)), e.tracker_ver =
                    this.VERSION, e.patch_ver = this.PATCH_VERSION || "-", e
            },
            _enhanceOpitonsDOM: function (e) {
                if (!w) return e;
                e.page || (e.page = v.location.href.split("?")[0]), e.query || (e.query = g.stringify(g.parse(window.location
                    .search), e.ignoredQueries)), e.hash || (e.hash = window.location.hash), e.title || (e.title = w.title),
                    e.spm_a || (e.spm_a = u().a), e.spm_b || (e.spm_b = u().b), e.scr || (e.scr = c()), e.raw_ua = y ?
                    y.userAgent : "";
                var t = (w.referrer || "").split("?"),
                    r = t[0],
                    n = 2 === t.length ? g.stringify(g.parse(t[1]), e.ignoredQueries) : "";
                return 2 === t.length && n.length > 0 ? e.referrer = r + "?" + n : e.referrer = r, e.last_pos = this._pos,
                    e
            },
            _enhanceOpitons: function (e) {
                return e = this._enhanceOpitonsCommon(e), e = this._enhanceOpitonsDOM(e)
            },
            _warn: function () {
                if ("object" == typeof v && v.console && "function" == typeof v.console.warn && this.debug) {
                    var e = Array.prototype.slice.call(arguments);
                    v.console.warn.apply(null, ["[Tracker Debug] " + e[0]].concat(e.slice(1)))
                }
            },
            _hotPatch: function () {
                if (v && w && !this.noDOM) {
                    if (E && v.__trackerPatch) return;
                    E = !0;
                    var e = Math.random();
                    if (v.localStorage && v.localStorage.getItem) {
                        var t = v.localStorage.getItem("__tracker_patch__"),
                            r = +new Date;
                        if (t && r - parseInt(t, 10) < 432e5) e = t;
                        else {
                            e = r;
                            try {
                                v.localStorage.setItem("__tracker_patch__", r)
                            } catch (j) {}
                        }
                    }
                    var n = w.createElement("script");
                    n.src = "//g.alicdn.com/fsp/tracker-patch/index.js?" + e, n.async = !0, n.crossOrigin = !0, n.id =
                        "tracker-patch", (w.head || w.body).appendChild(n);
                    var i = this;
                    v.__trackerPatch = function () {
                        return i
                    }
                }
            }
        }, e.exports = n
    }, function (e, t) {
        function r(e) {
            return "[object Array]" === {}.toString.call(e)
        }
        t.parse = function (e) {
            var t = {};
            if ("string" != typeof e) return t;
            if (e = (e || "").split("?")[1] || "", !(e = e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "").replace(
                /^(\?|#|&)/, ""))) return t;
            for (var n = e.split("&"), i = 0; i < n.length; ++i) {
                var o = n[i],
                    s = o.replace(/\+/g, " ").split("="),
                    a = s.shift(),
                    c = s.length > 0 ? s.join("=") : undefined;
                a = decodeURIComponent(a), c = c === undefined ? null : decodeURIComponent(c), t[a] === undefined ? t[a] =
                    c : r(t[a]) ? t[a].push(c) : t[a] = [t[a], c]
            }
            return t
        };
        t.stringify = function (e, t, r) {
            if (!e) return "";
            t = t || [];
            var n = [];
            for (var i in e) e.hasOwnProperty(i) && n.push(i);
            var o = [];
            n = n.sort();
            for (var s = 0; s < n.length; ++s) {
                i = n[s];
                var a = e[i];
                if (null != a) {
                    for (var c = !1, l = 0; l < t.length; ++l) if (t[l] === i) {
                            c = !0;
                            break
                        }
                    c || o.push(encodeURIComponent(i) + "=" + encodeURIComponent(r ? encodeURIComponent(a) : String(a).slice(
                        0, 512)))
                }
            }
            return o.join("&")
        }
    }, function (e, t) {
        function r(e) {
            for (var t = ((e || {}).stack || "").split("\n"), r = ["", "", ""], a = {}, c = 0; c < t.length; c++) {
                var l = i,
                    h = (t[c] || "").match(l);
                if (null === h && (l = o, h = (t[c] || "").match(l)), null === h && (l = s, h = (t[c] || "").match(l)),
                    null !== h) {
                    var u = h[1],
                        p = a[u];
                    p === undefined && (a[u] = "#" + c + "#", p = a[u]), t[c] = t[c].replace(u, p)
                }
            }
            if (t.length > 0) {
                t.shift();
                var f = "";
                for (c = 0; f.length + (t[c] || "").length < n && c < t.length;) f += t[c] + "\n", c++;
                r[1] = f;
                for (var g = ""; g.length + (t[c] || "").length < n && c < t.length;) g += t[c] + "\n", c++;
                r[2] = g
            }
            var d = "";
            for (u in a) a.hasOwnProperty(u) && (d += u + "@" + a[u] + ";");
            return d = d.replace(/;$/, ""), r[0] = d, r
        }
        var n = 4096,
            i =
                /^\s*at .*? ?\(((?:file|https?|blob|chrome-extension|native|eval|<anonymous>).*?)(?::\d+)?(?::\d+)?\)?\s*$/i,
            o = /^\s*.*?(?:\(.*?\))?(?:^|@)((?:file|https?|blob|chrome|resource|\[native).*?)(?::\d+)?(?::\d+)?\s*$/i,
            s = /^\s*at (?:(?:\[object object\])?.+ )?\(?((?:file|ms-appx|https?|blob):.*?):\d+(?::\d+)?\)?\s*$/i;
        "object" == typeof process && "test" === process.env.NODE_ENV && (i = /([^\()]+\.spec\.js)/i), e.exports = r
    }]);
