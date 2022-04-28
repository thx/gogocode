/**
 * 本文件由 Rapper 从 Rap 中自动生成，请勿修改
 * Rap 地址: https://rap2.alibaba-inc.com/repository/editor?id=1453
 */

import fetch from './base-fetch';
import {ModelItf} from './model-itf';

type Extra = Parameters<typeof fetch>['3'];
class Helper<Req> {
  Return = fetch<Req>('', '', {}, {} as Extra);
}
type FuncReturnType<T> = Helper<T>['Return'];
const request = {
  /**
   * 接口名：测试列表请求ccccc副本
   * Rap 地址: https://rap2.alibaba-inc.com/repository/editor?id=7056&mod=39195&itf=304746
   * @param req 请求参数
   * @param extra 请求配置项
   */
  api_list_$id_get: (req: ModelItf['api_list_$id_get']['Req'], extra?: Extra) => {
    return fetch.call(this, '/api/list/:id', 'GET', req, extra) as FuncReturnType<ModelItf['api_list_$id_get']['Res']>;
  },

  /**
   * 接口名：测试请求2
   * Rap 地址: https://rap2.alibaba-inc.com/repository/editor?id=1453&mod=2639&itf=23216
   * @param req 请求参数
   * @param extra 请求配置项
   */
  api_test_get: (req: ModelItf['api_test_get']['Req'], extra?: Extra) => {
    return fetch.call(this, '/api/test.json', 'GET', req, extra) as FuncReturnType<ModelItf['api_test_get']['Res']>;
  },

  /**
   * 接口名：test2
   * Rap 地址: https://rap2.alibaba-inc.com/repository/editor?id=1453&mod=2639&itf=32345
   * @param req 请求参数
   * @param extra 请求配置项
   */
  'api_list_$id_query_:groupid_get_get': (
    req: ModelItf['api_list_$id_query_:groupid_get_get']['Req'],
    extra?: Extra
  ) => {
    return fetch.call(this, '/api/list/:id/query/:groupid/get', 'GET', req, extra) as FuncReturnType<
      ModelItf['api_list_$id_query_:groupid_get_get']['Res']
    >;
  },

  /**
   * 接口名：hehe
   * Rap 地址: https://rap2.alibaba-inc.com/repository/editor?id=1453&mod=2639&itf=32349
   * @param req 请求参数
   * @param extra 请求配置项
   */
  api_list_$regx_query_get: (req: ModelItf['api_list_$regx_query_get']['Req'], extra?: Extra) => {
    return fetch.call(this, '/api/list/[0-9]{4}/query', 'GET', req, extra) as FuncReturnType<
      ModelItf['api_list_$regx_query_get']['Res']
    >;
  },

  /**
   * 接口名：获取用户信息
   * Rap 地址: https://rap2.alibaba-inc.com/repository/editor?id=1453&mod=3444&itf=32712
   * @param req 请求参数
   * @param extra 请求配置项
   */
  api_member_getInfo_get: (req: ModelItf['api_member_getInfo_get']['Req'], extra?: Extra) => {
    return fetch.call(this, '/api/member/getInfo.json', 'GET', req, extra) as FuncReturnType<
      ModelItf['api_member_getInfo_get']['Res']
    >;
  },

  /**
   * 接口名：获取常量码表
   * Rap 地址: https://rap2.alibaba-inc.com/repository/editor?id=1453&mod=3444&itf=32713
   * @param req 请求参数
   * @param extra 请求配置项
   */
  api_common_findCodeList_get: (req: ModelItf['api_common_findCodeList_get']['Req'], extra?: Extra) => {
    return fetch.call(this, '/api/common/findCodeList.json', 'GET', req, extra) as FuncReturnType<
      ModelItf['api_common_findCodeList_get']['Res']
    >;
  },

  /**
   * 接口名：获取菜单adc组件
   * Rap 地址: https://rap2.alibaba-inc.com/repository/editor?id=1453&mod=3444&itf=299537
   * @param req 请求参数
   * @param extra 请求配置项
   */
  api_component_findMenuList_get: (req: ModelItf['api_component_findMenuList_get']['Req'], extra?: Extra) => {
    return fetch.call(this, '/api/component/findMenuList.json', 'GET', req, extra) as FuncReturnType<
      ModelItf['api_component_findMenuList_get']['Res']
    >;
  },

  /**
   * 接口名：日志列表
   * Rap 地址: https://rap2.alibaba-inc.com/repository/editor?id=1453&mod=3716&itf=37870
   * @param req 请求参数
   * @param extra 请求配置项
   */
  api_logList_get: (req: ModelItf['api_logList_get']['Req'], extra?: Extra) => {
    return fetch.call(this, '/api/logList.json', 'GET', req, extra) as FuncReturnType<
      ModelItf['api_logList_get']['Res']
    >;
  },

  /**
   * 接口名：获取adc组件树的例子
   * Rap 地址: https://rap2.alibaba-inc.com/repository/editor?id=1453&mod=36239&itf=279792
   * @param req 请求参数
   * @param extra 请求配置项
   */
  api_component_findComponentList_code_get: (
    req: ModelItf['api_component_findComponentList_code_get']['Req'],
    extra?: Extra
  ) => {
    return fetch.call(this, '/api/component/findComponentList/code.json', 'GET', req, extra) as FuncReturnType<
      ModelItf['api_component_findComponentList_code_get']['Res']
    >;
  },

  /**
   * 接口名：列表的例子
   * Rap 地址: https://rap2.alibaba-inc.com/repository/editor?id=1453&mod=36239&itf=279793
   * @param req 请求参数
   * @param extra 请求配置项
   */
  api_example_list_get: (req: ModelItf['api_example_list_get']['Req'], extra?: Extra) => {
    return fetch.call(this, '/api/example/list.json', 'GET', req, extra) as FuncReturnType<
      ModelItf['api_example_list_get']['Res']
    >;
  }
};

export default request;
