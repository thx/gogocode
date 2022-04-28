import myService = require('./service');
import models = require('./models');
import requester from './requester'

const url2name = {};
models.forEach(m => {
  //url有可能是重复的，加上method识别
  url2name[`${m.url}_${m.method}`] = m.name;
});

function isObjectBased(obj) {
  return obj !== null && (typeof obj === 'object' || typeof obj === 'function');
}

export default function <Res extends { [x: string]: any }>(
  url: string,
  method: string,
  params: object,
  extra: {
    /* 自定义参数 interface */
    /**
     * 用于透传 view，不要自行传入
     */
    $view?: any
    /**
     * 可传入路径型参数，格式为数组
     */
    pathParams?: any[];
    /**
     * 设置接口是否为application/json，默认为false
     */
    isJson?: boolean;
    /**
     * 请求类型，默认为get
     */
    method?: string;

    /**
     * 是否异步，默认为true
     */
    async?: boolean;

    /**
     * 接口类型，可设置为jsonp等，默认为json
     */
    dataType?: string;

  }
): Promise<Res> {
  const name = url2name[`${url}_${method}`];
  if (!name) {
    throw `未找到 ${url} 对应的 name，请确认是否正确执行 mx models`;
  }

  if (!extra || !isObjectBased(extra.$view)) {
    throw `view 参数传递错误`;
  }
  const view = extra.$view;
  delete extra.$view;

  return new Promise((resolve, reject) => {

    const fetchParams = {
      name,
      params
    }

    Object.assign(fetchParams, extra)

    view.fetch(
      fetchParams,
      (err: object | null | undefined, m) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(m.get());
      },
      `${url}_${method}`
    );
  });
}
