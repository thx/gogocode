/*
    author:xinglie.lkf@taobao.com
 */
import Magix from 'magix'
import * as $ from '$'
import * as Jsvm from './jsvm'
import * as Models from './models'

let CurrentHost = location.protocol + '//' + location.host
let httpReg = /^(https?:)?\/\//
let sync = (bag, callback) => {
  let UserInfo = Magix.config('zs_scaffold.user') || {}
  let ApiHost = Magix.config('zs_scaffold.api.host') || ''
  let dataType = bag.get('dataType') || 'json'
  let data = bag.get('params') || {}
  let urlParams = bag.get('urlParams')
  let type = bag.get('method') || 'GET'
  const crossProjectName = bag.get('projectName') // 跨域接口带有 projectName
  const crossRapProjectId = bag.get('rapProjectId') // 跨域接口带有 rapProjectId

  // 加密处理 https://yuque.antfin-inc.com/yujia.yjq/fdgvhc/un3p77
  let now = new Date().getTime()
  data.timeStr = now
  data.dynamicToken = Jsvm(UserInfo.seedToken, UserInfo.pin, now)
  data.csrfID = UserInfo.csrfID

  let url = bag.get('url')

  if (!url) {
    return console.error(`${bag.get('name')}: 接口不存在`)
  }

  const isCross = httpReg.test(url)
  // 线上环境：如果models.js里接口有projectName表示是跨域接口，要从CrossConfigs配置里获取相应的apiHost,拼在url里
  if (crossProjectName && window.crossConfigs && !window.__isRap__) {
    const xCfgsMap = Magix.toMap(window.crossConfigs, 'projectName')
    const crossProject = xCfgsMap[crossProjectName]

    if (crossProject) {
      if (crossProject.params) {
        Object.assign(data, crossProject.params)
      }

      url = crossProject.apiHost + url
    }
  } else if (!isCross && ApiHost) {
    //子项目获取主项目配置好的host
    url = ApiHost + url
  }

  let async = bag.get('async')
  if (async === undefined) {
    async = true
  }

  //接口路径里的:id等变量参数，替换成真实的值
  let pathMap = bag.get('pathMap')
  if (pathMap) {
    for (const key in pathMap) {
      url = url.replace(new RegExp(key, 'g'), pathMap[key])
    }
  }

  var paths = bag.get('pathParams')
  if (paths) {
    url = url + paths.join('/')
  }

  url += '?r=' + Magix.guid()

  //url里的参数
  if (urlParams) {
    for (const key in urlParams) {
      url += `&${key}=${urlParams[key]}`
    }
  }
  const ajaxParams = {
    url,
    type,
    data,
    async,
    dataType,
    success: function (resp, text) {
      if (!resp.info || !resp.info.ok) {
        callback({
          msg: resp.info && resp.info.message
        })
        return
      }

      bag.set('data', resp.data)
      callback()
    },
    error: function (xhr) {
      //没权限跳回登录页
      if (xhr && xhr.status === 403) {
        Magix.dispatch(window, 'mxserviceerror', {
          errorCode: 'LOGINOUT'
        })
        // $(window).trigger('mxserviceError', { errorCode: 'LOGINOUT' })
        return
      }

      console.error(url, 'callback error，status=' + xhr.status)
      callback({
        msg: '系统异常，请稍后重试。status=' + xhr.status
      })
    }
  }

  //支持json格式的请求头
  if (bag.get('isJson')) {
    ajaxParams.data = JSON.stringify(ajaxParams.data)
    ajaxParams.contentType = 'application/json'
  }

  // 允许跨域
  // crossProjectName: 表示当前接口是跨域接口
  if (
    crossProjectName ||
    isCross ||
    (ApiHost && !CurrentHost.includes(ApiHost))
  ) {
    ajaxParams.xhrFields = {
      withCredentials: true
    }
  }

  // mm dev 接口对接 rap 时，如果是跨域的接口需要将跨域的 rapProjectId 以 headers 参数的形式传给 CLI 服务器
  if (window.__isRap__ && crossRapProjectId) {
    ajaxParams.headers = {
      'rap-project-id': crossRapProjectId
    }
  }

  $.ajax(ajaxParams)
}
let Service = Magix.Service.extend(sync)
Service.add(Models)

let exportObj = {
  ctor() {
    let me = this
    me.on('rendercall', () => {
      //render方法被调用时，清除locker信息
      delete me.$locker
    })
  },
  getService() {
    return Service
  },
  /**
   * 发送请求
   * @param  {String} key 请求的key，相同key值的会自动取消上一次的请求
   * @return {Request}
   */
  request(key) {
    key = key || Magix.guid('r')
    let r = new Service()
    // if (this.capture) {
    //     this.capture(key, r, true);
    // }
    return r
  },
  /**
   * 从服务器获取数据
   * @param  {Array} models meta信息数组
   * @param  {Function} callback 回调
   */
  fetch(models, callback) {
    return new Promise((resolve, reject) => {
      let key = JSON.stringify(models),
        r = this.request(key)
      r.all(models, (err, ...bags) => {
        if (callback) {
          callback(err, ...bags)
        }
        if (err) {
          reject(err)
        } else {
          resolve(bags)
        }
      })
    })
  },
  /**
   * 保存数据到服务器
   * 默认保存时同样的数据不能多次提交
   * @param  {Array} models meta信息数组
   * @param  {Function} callback
   */
  save(models, callback) {
    let me = this
    let key = JSON.stringify(models)
    return new Promise((resolve, reject) => {
      me.lock(key, () => {
        me.request(key + '_request').save(models, (err, ...bags) => {
          me.unlock(key)
          if (callback) {
            callback(err, ...bags)
          }
          if (err) {
            reject(err)
          } else {
            resolve(bags)
          }
        })
      })
    })
  },
  /**
   * 锁定方法调用，在解锁前不能调用第二次，常用于反复提交
   * @param  {String} key 锁定的key
   * @param  {Function} fn 回调方法
   */
  lock(key, fn) {
    let me = this
    if (!me.$locker) me.$locker = {}
    let locker = me.$locker
    if (!locker[key]) {
      locker[key] = fn
      fn()
    }
  },
  /**
   * 解锁
   * @param  {String} key 锁定的key
   */
  unlock(key) {
    let locker = this.$locker
    if (locker) {
      delete locker[key]
    }
  }
}

exportObj.default = exportObj
export = exportObj
