/*
    author:xinglie.lkf@taobao.com
 */
import Magix from 'magix5';
import * as Jsvm from './jsvm';
import * as Models from './models';
let { guid, toUrl } = Magix;
let CurrentHost = location.protocol + '//' + location.host;
let xCfgsMap;
let projectNamePlaceholderReg = /^\$\{([^}]+)\}/;
let httpReg = /^(https?:)?\/\//;
interface UserInfo {
    seedToken: string;
    pin: string;
    csrfID: string;
}

let jsonp = (sendUrl, options, callbackKey = 'callback') => {
    let doc = document;
    let head = doc.head;
    return new Promise<any>((resolve, reject) => {
        let script = doc.createElement('script');
        let key = guid('script_');
        window[key] = (r) => {
            clean();
            resolve(r);
        };
        let clean = () => {
            delete window[key];
            head.removeChild(script);
        };
        script.onerror = (e) => {
            clean();
            reject(Error(sendUrl + '[script error]'));
        };
        let body = (options && options.body) || {};
        body[callbackKey] = key;
        sendUrl = toUrl(sendUrl, body);
        script.src = sendUrl;
        head.appendChild(script);
    });
};
/**
 * 使用fetch进行请求
 * @param sendUrl 请求地址
 * @param options 请求参数
 */
let send = (sendUrl, options) => {
    return fetch(sendUrl, options).then((res) => {
        if (res.status == 403) {
            Magix.dispatch(window, 'loginout');
            return;
        }
        if (res.ok) {
            return res.json();
        }
        throw Error('Network response error');
    });
};
let sync = (bag, callback) => {
    let UserInfo = Magix.config<UserInfo>('magix5-site.user') || <UserInfo>{};
    let ApiHost = Magix.config<string>('magix5-site.api.host') || '';
    let dataType = bag.get('dataType') || 'json';
    let data = bag.get('params') || {};
    let urlParams = bag.get('urlParams');
    let type = bag.get('method') || 'GET';

    // 加密处理 https://yuque.antfin-inc.com/yujia.yjq/fdgvhc/un3p77
    let now = new Date().getTime();
    data.timeStr = now;
    data.dynamicToken = Jsvm(UserInfo.seedToken, UserInfo.pin, now);
    data.csrfID = UserInfo.csrfID;

    let url = bag.get('url');

    if (!url) {
        return console.error(`${bag.get('name')}: 接口不存在`);
    }

    url = url.replace(projectNamePlaceholderReg, (_, pname) => {
        if (!xCfgsMap) {
            if (window.crossConfigs) {
                xCfgsMap = Magix.toMap(window.crossConfigs, 'projectName');
            } else {
                xCfgsMap = {};
            }
        }
        let i = xCfgsMap[pname];
        if (i && i.params) {
            Object.assign(data, i.params);
        }
        return (i && i.apiHost) || _;
    });

    let async = bag.get('async');
    if (async === undefined) {
        async = true;
    }

    //接口路径里的:id等变量参数，替换成真实的值
    let pathMap = bag.get('pathMap');
    if (pathMap) {
        for (const key in pathMap) {
            url = url.replace(new RegExp(key, 'g'), pathMap[key]);
        }
    }

    var paths = bag.get('pathParams');
    if (paths) {
        url = url + paths.join('/');
    }
    let isCross = httpReg.test(url);

    if (!isCross && ApiHost) {
        //子项目获取主项目配置好的host
        url = ApiHost + url;
    }

    url += '?r=' + Magix.guid();

    //url里的参数
    if (urlParams) {
        for (const key in urlParams) {
            url += `&${key}=${urlParams[key]}`;
        }
    }

    let options = {
        method: type,
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
    } as RequestInit;
    let sendRequest;
    if (dataType == 'jsonp') {
        sendRequest = jsonp(url, options);
    } else {
        sendRequest = send(url, options);
    }

    sendRequest
        .then((resp) => {
            if (!resp.info || !resp.info.ok) {
                console.error(url, resp.info && resp.info.message);
                callback({
                    msg: resp.info && resp.info.message,
                });
                return;
            }
            bag.set({ data: resp.data });
            callback();
        })
        .catch((ex) => {
            callback({ msg: ex.message || ex });
        });
};
let Service = Magix.Service.extend(sync);
Service.add(Models);

let exportObj = {
    getService() {
        return Service;
    },
    /**
     * 从服务器获取数据
     * @param  {Array} models meta信息数组
     * @param  {Function} callback 回调
     */
    fetch(models, callback) {
        return new Promise((resolve, reject) => {
            let r = new Service();
            r.all(models, (err, ...bags) => {
                if (callback) {
                    callback(err, ...bags);
                }
                if (err) {
                    reject(err);
                } else {
                    resolve(bags);
                }
            });
        });
    },
    /**
     * 保存数据到服务器
     * 默认保存时同样的数据不能多次提交
     * @param  {Array} models meta信息数组
     * @param  {Function} callback
     */
    save(models, callback) {
        return new Promise((resolve, reject) => {
            let r = new Service();
            r.save(models, (err, ...bags) => {
                if (callback) {
                    callback(err, ...bags);
                }
                if (err) {
                    reject(err);
                } else {
                    resolve(bags);
                }
            });
        });
    },
};

export default exportObj;
