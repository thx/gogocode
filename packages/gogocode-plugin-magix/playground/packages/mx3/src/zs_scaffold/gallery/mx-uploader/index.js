/*md5:e8007a554f2d848d7e5cef0a26ba9206*/
let Magix = require('magix');
let $ = require('$');
let Runner = require('../mx-util/runner');
const Oss = require('./oss');
Magix.applyStyle('@index.less');
let html = '@index.html';
let Uploader = Magix.Base.extend({
    destroy() {
        this['@{destroyed}'] = 1;
    }
});
let Iframe = Uploader.extend({
    '@{send.request}'(input, data, callback, progress) {
        let form = input.form;
        let me = this;
        let id = Magix.guid('up');
        if (!form) {
            $('body').append('<div id="' + id + '_temp" class="@index.less:cnt"><form target="' + id + '"></form></div>');
            let cnt = $('#' + id + '_temp');
            form = cnt.find('form');
            form.append(input);
            form = form[0];
        }
        let p = 0;
        let total = 2000;
        if (input.files) {
            total = 0;
            for (let i = 0; i < input.files.length; i++) {
                total += input.files[i].size;
            }
            total /= 1000;
            if (total < 2000) {
                total = 2000;
            }
        }
        let base = 1000 / total;
        let prgs = () => {
            if (me['@{destroyed}']) {
                Runner['@{task.remove}'](prgs);
                return;
            }
            if (p < 1) {
                progress(p);
                p += base + Math.random() * 20 * base;
            }
        };
        Runner['@{task.add}'](100, prgs);
        $('<iframe name="' + id + '" id="' + id + '" style="display:none;"></iframe>').insertAfter(form).on('load', e => {
            Runner['@{task.remove}'](prgs);
            if (!me['@{destroyed}']) {
                progress(1);
                let iframe = e.target;
                let $body = $(iframe.contentWindow.document.body);
                $body.find('script').remove();
                let response = $.trim($body.text());
                $(iframe).remove();
                $('#' + id + '_temp').remove();
                try {
                    /*jshint evil:true*/
                    callback(null, new Function('return ' + response)());
                } catch (ex) {
                    callback(ex);
                }
            }
        }).on('error', e => {
            Runner['@{task.remove}'](prgs);
            if (!me['@{destroyed}']) {
                $('#' + id + '_temp').remove();
                callback(e);
            }
        });
        form.target = id;
        form.action = data.get('action');
        form.method = 'POST';
        form.enctype = 'multipart/form-data';

        form.submit();
    }
});
let XHR = Uploader.extend({
    '@{send.request}'(input, data, callback, progress) {
        let fd = new FormData();
        let me = this;
        let files = input.files;
        for (let i = 0; i < files.length; i++) {
            fd.append(data.get('name'), files[i]);
        }
        let xhr = new XMLHttpRequest();
        // 允许跨域 http://www.ruanyifeng.com/blog/2016/04/cors.html
        xhr.withCredentials = true;
        xhr.open('post', data.get('action'), true);
        xhr.onload = () => {
            if (!me['@{destroyed}']) {
                try {
                    /*jshint evil:true*/
                    callback(null, new Function('return ' + xhr.responseText.trim())());
                } catch (ex) {
                    callback(ex);
                }
            }
        };
        xhr.onerror = e => {
            if (!me['@{destroyed}']) {
                e.message = 'network error';
                callback(e);
            }
        };
        xhr.upload.onprogress = e => {
            if (e.lengthComputable) {
                progress(e.loaded / e.total);
            } else {
                progress(0);
            }
        };
        xhr.send(fd);
    }
});

let OSSTRANS = Uploader.extend({
    '@{send.request}'(input, data, callback, progress) {
        let me = this;
        let ossAction = data.get('ossAction')

        let xhr = new XMLHttpRequest();
        // 允许跨域 http://www.ruanyifeng.com/blog/2016/04/cors.html
        xhr.withCredentials = true;
        xhr.open('post', ossAction, true);
        xhr.onload = () => {
            if (!me['@{destroyed}']) {
                try {
                    /*jshint evil:true*/
                    let result = new Function('return ' + xhr.responseText.trim())()
                    let ossConfig = result.data
                    let client = new Oss(ossConfig);
                    let files = input.files;
                    // let CHUNK_SIZE = data.get('chunkSize') || 2 * 1024 * 1024
                    try {
                        // object-key可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
                        client.multipartUpload(ossConfig.key, files[0], {
                            // partSize: CHUNK_SIZE,
                            progress: function (p, checkpoint) {
                                // 断点记录点。浏览器重启后无法直接继续上传，您需要手动触发上传操作。
                                // tempCheckpoint = checkpoint;
                                progress(p);
                            }
                        }).then(result => {
                            if (!me['@{destroyed}']) {
                                // callback(null, result)
                                let action = data.get('action')
                                let name = data.get('name')
                                let nameObj = {
                                    ...ossConfig
                                }
                                nameObj[name] = files[0].name
                                let newAction = Magix.toUrl(action, nameObj)
                                let xhr = new XMLHttpRequest();
                                // 允许跨域 http://www.ruanyifeng.com/blog/2016/04/cors.html
                                xhr.withCredentials = true;
                                xhr.open('post', newAction, true);
                                xhr.onload = () => {
                                    if (!me['@{destroyed}']) {
                                        try {
                                            /*jshint evil:true*/
                                            callback(null, new Function('return ' + xhr.responseText.trim())());
                                        } catch (ex) {
                                            callback(ex);
                                        }
                                    }
                                };
                                xhr.onerror = e => {
                                    if (!me['@{destroyed}']) {
                                        e.message = 'network error';
                                        callback(e);
                                    }
                                };
                                xhr.send();
                            }
                        })
                    } catch (e) {
                        if (!me['@{destroyed}']) {
                            e.message = 'network error';
                            callback(e);
                        }
                    }

                } catch (ex) {
                    callback(ex);
                }
            }
        };
        xhr.onerror = e => {
            if (!me['@{destroyed}']) {
                e.message = 'network error';
                callback(e);
            }
        };

        xhr.send();
    }
});
module.exports = Magix.View.extend({
    init(extra) {
        this.updater.snapshot();
        this.assign(extra);
        this.on('destroy', () => {
            let node = $('#file_' + this.id);
            if (node.length) {
                node.remove();
            }
        });

        this['@{owner.node}'] = $('#' + this.id);
    },
    assign(extra) {
        let me = this;

        // mx-disabled作为属性，动态更新不会触发view改变，兼容历史配置，建议使用disabled
        let disabled = (extra.disabled + '' === 'true') || $('#' + me.id)[0].hasAttribute('mx-disabled');
        let type = extra.type;
        me.updater.set({
            name: extra.name || 'file',
            action: extra.action || '',
            multiple: ((extra.multiple + '') === 'true'),
            accept: extra.accept,
            disabled,
            type,
            ossAction: extra.ossAction || ''
        });

        // 默认iframe
        let Transport;
        if ((type == 'xhr') && window.FormData) {
            Transport = XHR;
        } else if (type == 'oss') {
            Transport = OSSTRANS;
        } else {
            Transport = Iframe;
        }
        me.capture('@{transport}', new Transport());

        // 操作dom追加节点，每次都刷新
        return true;
    },
    render() {
        let me = this;
        let nodeId = 'file_' + me.id;
        let node = $('#' + nodeId);
        if (node.length) {
            node.remove();
        }
        let data = me.updater.get();
        let tmpl = $.isFunction(html) ? html({
            disabled: data.disabled,
            name: data.name,
            nodeId: nodeId
        }, me.id) : html;
        if (me.wrapEvent) {
            tmpl = me.wrapEvent(tmpl);
        }
        $('#' + me.id).append(tmpl);
        node = $('#' + nodeId);
        if (data.multiple) {
            node.attr('multiple', 'multiple');
        }
        if (data.accept) {
            node.prop('accept', data.accept);
        }
    },
    '@{upload}<change>'(e) {
        // e.stopPropagation();
        let me = this;
        let node = $('#' + me.id);
        let files = e.eventTarget.files;
        let event = $.Event('start', {
            files
        });
        node.trigger(event);
        if (event.isDefaultPrevented()) {
            me.render();
            return;
        }

        let resolveFn = () => {
            let transport = me.capture('@{transport}');
            transport['@{send.request}'](e.target, me.updater, (err, response) => {
                if (err) {
                    node.trigger({
                        type: 'error',
                        error: err
                    });
                } else {
                    node.trigger({
                        type: 'success',
                        files,
                        response
                    });
                }
            }, percent => {
                node.trigger({
                    type: 'progress',
                    percent
                });
            });
            me.render();
        }

        try {
            event.result.then(() => {
                // 成功继续提交
                resolveFn();
            }, () => {
                // 失败不提交
                me.render();
            })
        } catch (error) {
            resolveFn();
        }
    }
});