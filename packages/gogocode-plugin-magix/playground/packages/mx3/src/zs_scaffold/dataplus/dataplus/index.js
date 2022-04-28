/*md5:60fda407c35d514cfdb0fa93dd1a626b*/
/**
 * 妈妈bp自动埋点插件
 */
 import Magix from 'magix';
 import * as SETTINGS from "../config";
 import * as $ from '$';
 let Router = Magix.Router
 const projectName = Magix.config('projectName')
 let Vframe = Magix.Vframe;
 let Dialogs = {}, hoverSpmd = {}, hoverSpmc = {}, expMap = {}, domMap = {}, spmbMap = {};
 const CONFIG = SETTINGS || {}
 const DialogKey = '/alimama.88.dialog' //弹窗埋点令箭
 const HoverKey = '/alimama_bp.4.3' //hover埋点令箭
 const ExpKey = '/alimama_bp.4.2' //曝光埋点令箭
 let random = ((len, radix) => {
     let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
     let uuid = [], i;
     radix = radix || chars.length;
 
     if (len) {
         // Compact form
         for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
     } else {
         // rfc4122, version 4 form
         let r;
 
         // rfc4122 requires these characters
         uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
         uuid[14] = '4';
 
         // Fill in random data.  At i==19 set the high bits of clock sequence as
         // per rfc4122, sec. 4.1.5
         for (let i = 0; i < 36; i++) {
             if (!uuid[i]) {
                 r = 0 | Math.random() * 16;
                 uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
             }
         }
     }
 
     return uuid.join('');
 })
 //登录后，生成登录sessionid
 const sid = random(8, 16);
 localStorage.setItem('sid', sid);
 
 let func = {
     init: function () {
         let that = this;
         //页面埋点
         Router.on('changed', function (e) {
             let uuid = random(8, 16)
             localStorage.setItem('uuid', uuid);
             let loc = Router.parse();
             let pathname = loc.path;
             let params = loc.params;
             let configs = CONFIG.pages
 
             if (!configs || !configs[pathname]) {
                 if (spmbMap.spmb != CONFIG.bottom_spmb) {
                     that.updateB(CONFIG.bottom_spmb, loc, uuid);
                     spmbMap.spmb = CONFIG.bottom_spmb
                 }
                 return;
             }
 
             configs[pathname].forEach(function (item) {
                 let spmb = '';
                 if (Object.keys(item.params).length === 0) {
                     spmb = item.spmb;
                 } else {
                     let flag = true;
 
                     for (let key in item.params) {
                         let value = item.params[key]
                         //false 和true表示不关心具体的值，但是需要区分有无这个参数
                         if (typeof value === 'boolean') {
                             if (!value && params[key]) {
                                 flag = false;
                                 return false;
                             } else if (value && !params[key]) {
                                 flag = false;
                                 return false;
                             }
                         } else if (params[key] != value) {
                             flag = false;
                             return false;
                         }
                     }
 
                     if (flag) {
                         spmb = item.spmb;
                     }
                 }
                 if (spmbMap.spmb != spmb) {
                     that.updateB(spmb, loc, uuid);
                     spmbMap.spmb = spmb
                 }
             })
         })
 
         //弹窗埋点
         Vframe.on('add', e => {
             let vf = e.vframe;
             let reg = /^dlg_\d*$/
             if (reg.test(vf.id)) {
                 Dialogs[vf.id] = 1;
             }
             if (Dialogs[vf.pId]) {
                 //log dialog inner view
                 Dialogs[vf.pId] = {
                     time: performance.now()
                 };
             }
         });
 
         //弹窗埋点
         Vframe.on('remove', e => {
             let vf = e.vframe;
             if (Dialogs[vf.pId]) {
                 let endTime = performance.now()
                 let startTime = Dialogs[vf.pId].time
                 let duration = endTime - startTime
                 let path = vf.path
                 let viewpath = CONFIG.dialogs && CONFIG.dialogs[path]
                 if (window.goldlog && goldlog.record && viewpath) {
                     that.sendData({
                         viewpath,
                         duration,
                         path,
                         gmkey: 'OTHER',
                         logkey: DialogKey
                     })
                 }
                 delete Dialogs[vf.pId]
             }
         })
 
         //全局mousedown事件, 事件捕获阶段加上userID
         document.addEventListener('mousedown', function (e) {
             try {
                 let el = $(e.target)
                 let pEl = el.parents('[data-spm-click]')
                 let attr = el.attr('data-spm-click')
                 let spmcEl = el.closest('[data-spm]')
                 let spmc = '0'
                 if (spmcEl && spmcEl.length) {
                     spmc = $(spmcEl[0]).attr('data-spm')
                 }
                 let spmab = window.goldlog.spm_ab ? window.goldlog.spm_ab.join('.') : '0.0'
                 let user = Magix.config(projectName + '.user') || {}
                 let userId = user.meta && user.meta.memberId || user.loginUser && user.loginUser.userId || user.custId || user.userId || user.empId
                 let memberId = user.meta && user.meta.memberId || user.loginUser && user.loginUser.memberId || user.memberId
                 let bpUrl = encodeURIComponent(window.location.href)
                 let uuid = localStorage.getItem('uuid');
                 let time = Date.now()
                 let pTime = performance.now()
                 let selfArgs = ';userId=' + userId + '&memberId=' + memberId + '&bpUrl=' + bpUrl + '&uuid=' + uuid + '&sid=' + sid + '&time=' + time + '&sessionId=' + sid
                 if (typeof attr !== typeof undefined && attr !== false) {
                     if (attr.indexOf('userId') == -1) {
                         if (spmc && expMap[spmc]) {
                             let dectime = pTime - expMap[spmc].time
                             if (dectime) {
                                 selfArgs = selfArgs + '&dectime=' + dectime
                             }
                         }
                         el.attr('data-spm-click', attr + selfArgs)
                     }
                 } else if (pEl && pEl.length > 0) {
                     for (let i = 0; i < pEl.length; i++) {
                         let pAttr = $(pEl[i]).attr('data-spm-click')
                         if (pAttr.indexOf('userId') == -1) {
                             if (spmc && expMap[spmc]) {
                                 let dectime = pTime - expMap[spmc].time
                                 if (dectime) {
                                     selfArgs = selfArgs + '&dectime=' + dectime
                                 }
                             }
                             $(pEl[i]).attr('data-spm-click', pAttr + selfArgs)
                         }
                     }
                 }
             }
             catch (error) {
                 console.log(error)
             }
         }, true);
 
         //全局spmd mouseenter事件埋点
         $(document).on('mouseenter', '[data-spm-click]', function (e) {
             try {
                 let spmb = $('body[data-spm]').attr('data-spm')
                 if (!spmb) {
                     return
                 }
                 let spmdAttr = $(e.currentTarget).attr('data-spm-click')
                 let spmd = spmdAttr.split('locaid=')[1]
                 if (spmd) {
                     hoverSpmd[spmd] = {
                         time: performance.now()
                     }
                 }
             } catch (e) {
                 console.log(e)
             }
         });
 
         //全局spmd mouseenter事件埋点
         $(document).on('mouseleave', '[data-spm-click]', function (e) {
             try {
                 let spmb = $('body[data-spm]').attr('data-spm')
                 if (!spmb) {
                     return
                 }
                 let spmdAttr = $(e.currentTarget).attr('data-spm-click')
                 let spmd = spmdAttr.split('locaid=')[1]
                 if (hoverSpmd[spmd]) {
                     let endTime = performance.now()
                     let startTime = hoverSpmd[spmd].time
                     let duration = endTime - startTime
                     let time = Date.now()
                     if (window.goldlog && goldlog.record && duration > 500) {
                         that.sendData({
                             logkey: HoverKey,
                             duration: Math.round(duration),
                             hoverkey: spmd,
                             hovertype: 'spmd',
                             gmkey: 'CLK',
                             time
                         })
                     }
                     delete hoverSpmd[spmd]
                 }
             } catch (e) {
                 console.log(e)
             }
         });
 
         //全局spmc mouseenter事件埋点
         $(document).on('mouseenter', '[data-spm]', function (e) {
             try {
                 let spmb = $('body[data-spm]').attr('data-spm')
                 if (!spmb) {
                     return
                 }
                 let spmcAttr = $(e.currentTarget).attr('data-spm')
                 if (spmcAttr) {
                     hoverSpmc[spmcAttr] = {
                         time: performance.now()
                     }
                     if (expMap[spmcAttr] && !expMap[spmcAttr].isHover) {
                         let timeNow = performance.now()
                         let duration = timeNow - expMap[spmcAttr].time
                         hoverSpmc[spmcAttr].dectime = duration
                         expMap[spmcAttr].isHover = true
                     }
                 }
             } catch (e) {
                 console.log(e)
             }
         });
 
         //全局spmc mouseenter事件埋点
         $(document).on('mouseleave', '[data-spm]', function (e) {
             try {
                 let spmb = $('body[data-spm]').attr('data-spm')
                 if (!spmb) {
                     return
                 }
                 let spmcAttr = $(e.currentTarget).attr('data-spm')
                 if (hoverSpmc[spmcAttr]) {
                     let endTime = performance.now()
                     let startTime = hoverSpmc[spmcAttr].time
                     let duration = endTime - startTime
                     let time = Date.now()
                     if (window.goldlog && goldlog.record && duration > 1000) {
                         that.sendData({
                             logkey: HoverKey,
                             duration: Math.round(duration),
                             hoverkey: spmcAttr,
                             hovertype: 'spmc',
                             gmkey: 'CLK',
                             time,
                             dectime: hoverSpmc[spmcAttr].dectime ? hoverSpmc[spmcAttr].dectime : ''
                         })
                     }
                     delete hoverSpmc[spmcAttr]
                 }
             } catch (e) {
                 console.log(e)
             }
         });
 
         //曝光埋点添加uuid，userid, sid
         window.spmExpFn = (element, selector) => {
             let uuid = localStorage.getItem('uuid');
             let user = Magix.config(projectName + '.user') || {}
             let userId = user.meta && user.meta.memberId || user.loginUser && user.loginUser.userId || user.custId || user.userId || user.empId
             let time = Date.now()
             return `uuid=${uuid}&sid=${sid}&userid=${userId}&time=${time}`
         }
 
         //曝光埋点自定义统计时间
         that.initExp()
     },
     initExp: function () {
         try {
             let that = this
             let uuid = localStorage.getItem('uuid');
             let options = {
                 root: null,
                 rootMargin: '0px',
                 threshold: 0.3
             }
             let sendList = []
             let srcWidth = $(window).width()
             let srcHeight = $(window).height()
             let inObserver = new IntersectionObserver((entries, observer) => {
                 entries.forEach(entry => {
                     let spmc = $(entry.target).attr('data-spm')
                     let spm_exp = $(entry.target).attr('data-spm-exp-on')
                     let time = Date.now()
                     let spmab = window.goldlog && window.goldlog.spm_ab && window.goldlog.spm_ab.join('.') || '0.0'
                     if (entry.isIntersecting) {
                         if (!expMap[spmc]) {
                             entry.spmab = spmab
                             expMap[spmc] = entry
                         }
                         if (!spm_exp) {
                             let user = Magix.config(projectName + '.user') || {}
                             let userId = user.meta && user.meta.memberId || user.loginUser && user.loginUser.userId || user.custId || user.userId || user.empId
                             let memberId = user.meta && user.meta.memberId || user.loginUser && user.loginUser.memberId || user.memberId
                             sendList.push({
                                 exargs: {
                                     "data-spm": spmc,
                                     "_w": entry.boundingClientRect.width,
                                     "_h": entry.boundingClientRect.height,
                                     "_x": entry.boundingClientRect.x,
                                     "_y": entry.boundingClientRect.y,
                                     "_s_w": srcWidth,
                                     "_s_h": srcHeight,
                                     "_rate": entry.intersectionRatio,
                                     uuid,
                                     sid,
                                     sessionId: sid,
                                     userId,
                                     memberId,
                                     time,
                                     extType: 'exp-type-in'
                                 },
                                 spm: spmab + '.' + spmc
                             })
                             $(entry.target).attr('data-spm-exp-on', 1)
                         }
 
                     } else {
                         if (expMap[spmc]) {
                             let endTime = entry.time
                             let startTime = expMap[spmc].time
                             let duration = endTime - startTime
                             let time = Date.now()
                             if (window.goldlog && goldlog.record && duration > 1000) {
                                 let user = Magix.config(projectName + '.user') || {}
                                 let userId = user.meta && user.meta.memberId || user.loginUser && user.loginUser.userId || user.custId || user.userId || user.empId
                                 let memberId = user.meta && user.meta.memberId || user.loginUser && user.loginUser.memberId || user.memberId
                                 sendList.push({
                                     exargs: {
                                         duration: Math.round(duration),
                                         "data-spm": spmc,
                                         "_w": entry.boundingClientRect.width,
                                         "_h": entry.boundingClientRect.height,
                                         "_x": entry.boundingClientRect.x,
                                         "_y": entry.boundingClientRect.y,
                                         "_s_w": srcWidth,
                                         "_s_h": srcHeight,
                                         "_rate": entry.intersectionRatio,
                                         uuid,
                                         sid,
                                         sessionId: sid,
                                         userId,
                                         memberId,
                                         time,
                                         extType: 'exp-type-out'
                                     },
                                     spm: expMap[spmc].spmab + '.' + spmc
                                 })
                             }
                             delete expMap[spmc]
                         }
                     }
                 });
 
                 if (sendList && sendList.length) {
                     that.sendData({
                         expdata: JSON.stringify(sendList),
                         _is_auto_exp: 1,
                         _eventType: 'IObserver',
                         _pkgSize: 10,
                         logkey: ExpKey,
                         gmkey: 'EXP'
                     }, () => {
                         sendList = []
                     })
                 }
             }, options);
 
             // Firefox和Chrome早期版本中带有前缀
             let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
 
             let removeDomMap = {}
 
             // 创建观察者对象
             let muObserver = new MutationObserver((mutations) => {
                 let addTargets = [], removeTargets = [];
                 mutations.forEach((mutation) => {
                     if (mutation.type == 'attributes') {
                         if (mutation.attributeName != 'data-spm') {
                             return
                         } else {
                             let newTarget = mutation.target
                             removeDomMap[mutation.oldValue] = newTarget
                             inObserver.unobserve(newTarget)
                             inObserver.observe(newTarget)
                         }
                     } else {
                         mutation.addedNodes.forEach(node => {
                             if ($(node).attr('data-spm')) {
                                 addTargets.push(node)
                             }
                             if (node.querySelectorAll && node.querySelectorAll('[data-spm]') && node.querySelectorAll('[data-spm]').length) {
                                 let newTarget = node.querySelectorAll('[data-spm]')
                                 newTarget.forEach(target => {
                                     addTargets.push(target)
                                 })
                             }
                         })
 
                         mutation.removedNodes.forEach(node => {
                             if ($(node).attr('data-spm')) {
                                 removeTargets.push(node)
                             }
                             if (node.querySelectorAll && node.querySelectorAll('[data-spm]') && node.querySelectorAll('[data-spm]').length) {
                                 let newTarget = node.querySelectorAll('[data-spm]')
                                 newTarget.forEach(target => {
                                     removeTargets.push(target)
                                 })
                             }
                         })
                     }
 
                     addTargets.forEach(target => {
                         inObserver.observe(target)
                     })
                     removeTargets.forEach(target => {
                         //记录当前页面所有dom节点，用于处理切换页面，tab等导致模块丢失的时间统计
                         let spmc = $(target).attr('data-spm')
                         removeDomMap[spmc] = target
                     })
                 });
 
 
 
                 //记录当前页面删除的dom节点，记录时间
                 for (let spmkey in expMap) {
                     if (removeDomMap[spmkey] && expMap[spmkey].isIntersecting) {
                         let endTime = performance.now()
                         let startTime = expMap[spmkey].time
                         let duration = endTime - startTime
                         let time = Date.now()
                         if (window.goldlog && goldlog.record && duration > 1000) {
                             let user = Magix.config(projectName + '.user') || {}
                             let userId = user.meta && user.meta.memberId || user.loginUser && user.loginUser.userId || user.custId || user.userId || user.empId
                             let memberId = user.meta && user.meta.memberId || user.loginUser && user.loginUser.memberId || user.memberId
                             sendList.push({
                                 exargs: {
                                     duration: Math.round(duration),
                                     "data-spm": spmkey,
                                     "_w": expMap[spmkey].boundingClientRect.width,
                                     "_h": expMap[spmkey].boundingClientRect.height,
                                     "_x": expMap[spmkey].boundingClientRect.x,
                                     "_y": expMap[spmkey].boundingClientRect.y,
                                     "_s_w": srcWidth,
                                     "_s_h": srcHeight,
                                     "_rate": 1,
                                     uuid,
                                     sid,
                                     sessionId: sid,
                                     userId,
                                     memberId,
                                     time,
                                     extType: 'exp-type-out'
                                 },
                                 spm: expMap[spmkey].spmab + '.' + spmkey
                             })
                         }
                         delete expMap[spmkey]
                         delete removeDomMap[spmkey]
                     }
                 }
                 if (sendList && sendList.length) {
                     that.sendData({
                         expdata: JSON.stringify(sendList),
                         _is_auto_exp: 1,
                         _eventType: 'IObserver',
                         _pkgSize: 10,
                         logkey: ExpKey,
                         gmkey: 'EXP'
                     }, () => {
                         sendList = []
                     })
                 }
 
             });
             // 配置观察选项:
             let config = { childList: true, subtree: true, attributes: true, attributeOldValue: true }
             // 传入目标节点和观察选项
             muObserver.observe(document.body, config);
         } catch (error) {
             console.log(error)
         }
 
     },
     //老版本checksum计算
     makeChkSum: function (s) {
         s = (s || '').split('#')[0].split('?')[0];
 
         let len = s.length;
         let hash = function (s) {
             let i;
             let l = s.length;
             let key = 0;
             for (i = 0; i < l; i++) {
                 key = key * 31 + s.charCodeAt(i);
             }
             return key;
         };
         return len ? hash(len + '#' + s.charCodeAt(len - 1)) : -1;
     },
     getMeta: metaName => {
         const metas = document.getElementsByTagName('meta');
         for (let i = 0; i < metas.length; i++) {
             if (metas[i].getAttribute('name') === metaName) {
                let content = metas[i].getAttribute('content')
                if(content.indexOf('.') > -1) {
                    content = content.split('.')[0]
                }
                 return content;
             }
         }
         return '';
     },
     // 更新页面的spmb
     updateB: function (spmb, loc, uuid) {
         if (!spmb) {
             return;
         }
 
         let that = this;
         let spm_a = Magix.config('custom.spma') ? this.getMeta('spm-id') : CONFIG.spma;
         let checksum = that.makeChkSum(spm_a + '.' + spmb);
         let user = Magix.config(projectName + '.user') || {}
         let userId = user.meta && user.meta.memberId || user.loginUser && user.loginUser.userId || user.custId || user.userId || user.empId
         let memberId = user.meta && user.meta.memberId || user.loginUser && user.loginUser.memberId || user.memberId
         let bpUrl = encodeURIComponent(window.location.href)
         let path = loc.path || ''
         let name = loc.name || loc.text || ''
         let time = Date.now()
         //更换spm B段 记录停留时间
         if (spmb && checksum && window.goldlog && window.goldlog.setPageSPM) {
             // spm_a, spmb是字符串
             goldlog.setPageSPM(spm_a + '', spmb + '');
             goldlog.sendPV({
                 pageid: "",
                 checksum: checksum,
                 spa: true
             }, {
                 userId,
                 memberId,
                 from: 'alimama_bp',
                 bpUrl,
                 path,
                 name,
                 uuid,
                 sid,
                 sessionId: sid,
                 time
             })
         }
     },
     sendData: (e, callback) => {
         try {
             let uuid = localStorage.getItem('uuid');
             let user = Magix.config(projectName + '.user') || {}
             let userId = user.meta && user.meta.memberId || user.loginUser && user.loginUser.userId || user.custId || user.userId || user.empId
             let memberId = user.meta && user.meta.memberId || user.loginUser && user.loginUser.memberId || user.memberId
             let logkey = e.logkey
             let gmkey = e.gmkey
             let str = ''
             e.site = projectName
             e.uuid = uuid
             e.userId = userId
             e.memberId = memberId
             e.sid = sid
             e.sessionId = sid
             for (let o in e) {
                 str = str + o + '=' + e[o] + '&'
             }
             // 千牛浏览器特殊处理，有些情况下 window.goldlog.record不发埋点, 根本原因是navigator.sendBeacon 不发送埋点
             if (navigator.userAgent.indexOf('Qianniu') > -1) {
                 let sendObj = {
                     gmkey,
                     gokey: encodeURIComponent(str),
                     logType: 2,
                     "spm-cnt": window.goldlog && window.goldlog.spm_ab ? (window.goldlog.spm_ab.join('.') + '.0.0') : '0.0.0.0',
                     "_gr_uid_": userId,
                     _p_url: encodeURIComponent(window.location.href)
                 }
                 let result = navigator.sendBeacon(`//gm.mmstat.com${logkey}`, JSON.stringify(sendObj))
                 if (!result) {
                     let sendStr = '';
                     let date = new Date()
                     let cache = date.getTime()
                     sendObj.cache = cache
                     for (let o in sendObj) {
                         sendStr = sendStr + o + '=' + sendObj[o] + '&'
                     }
                     let img = new Image();
                     img.src = '//gm.mmstat.com' + logkey + '?logtype=2&' + sendStr;
                 }
             } else {
                 if (window.goldlog && window.goldlog.spm_ab && window.goldlog.record) {
                     window.goldlog.record(logkey, gmkey, str, 'POST')
                 }
             }
 
 
             if (callback) {
                 callback()
             }
         } catch (error) {
             console.log(error)
         }
 
     }
 }
 
 module.exports = func.init()