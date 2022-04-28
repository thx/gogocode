/**
 * 本文件由 Rapper 从 Rap 中自动生成，请勿修改
 * Rap 地址: https://rap2.alibaba-inc.com/repository/editor?id=1453
 */
export interface ModelItf {
  /**
   * 接口名：测试列表请求ccccc副本
   * Rap 地址: https://rap2.alibaba-inc.com/repository/editor?id=7056&mod=39195&itf=304746
   */
  api_list_$id_get: {
    Req: {
      /**
       * 某请求参数
       */
      reqParam?: number;
    };
    Res: {
      data?: {
        list?: {
          name?: string;
          id?: number;
        }[];
      };
      info?: {
        ok?: boolean;
      };
      /**
       * 某响应参数
       */
      resParam?: number;
    };
  };

  /**
   * 接口名：测试请求2
   * Rap 地址: https://rap2.alibaba-inc.com/repository/editor?id=1453&mod=2639&itf=23216
   */
  api_test_get: {
    Req: {};
    Res: {
      data?: {
        list?: {
          field1?: number;
          field2?: number;
          field3?: number;
        }[];
        count?: number;
      };
      info?: {
        ok?: boolean;
      };
    };
  };

  /**
   * 接口名：test2
   * Rap 地址: https://rap2.alibaba-inc.com/repository/editor?id=1453&mod=2639&itf=32345
   */
  'api_list_$id_query_:groupid_get_get': {
    Req: {};
    Res: {
      data?: {
        list?: {
          id?: number;
          name?: string;
        }[];
      };
      info?: {
        ok?: boolean;
      };
      resParam?: number;
    };
  };

  /**
   * 接口名：hehe
   * Rap 地址: https://rap2.alibaba-inc.com/repository/editor?id=1453&mod=2639&itf=32349
   */
  api_list_$regx_query_get: {
    Req: {};
    Res: {
      data?: {
        list?: {
          id?: number;
          name?: string;
        }[];
      };
      info?: {
        ok?: boolean;
      };
      resParam?: number;
    };
  };

  /**
   * 接口名：获取用户信息
   * Rap 地址: https://rap2.alibaba-inc.com/repository/editor?id=1453&mod=3444&itf=32712
   */
  api_member_getInfo_get: {
    Req: {};
    Res: {
      data?: {
        csrfID?: string;
        meta?: {
          createTime?: string;
          isOverseas?: boolean;
          isSubUser?: boolean;
          mainCatName?: string;
          memberId?: number;
          nickName?: string;
          operType?: number;
          shopId?: number;
          shopName?: string;
        };
        permission?: {
          displayDefault?: boolean;
        };
        pin?: number;
        seedToken?: string;
      };
      info?: {
        ok?: boolean;
      };
    };
  };

  /**
   * 接口名：获取常量码表
   * Rap 地址: https://rap2.alibaba-inc.com/repository/editor?id=1453&mod=3444&itf=32713
   */
  api_common_findCodeList_get: {
    Req: {};
    Res: {
      data?: {
        validCampaignCount?: number;
        warnPrice?: string;
      };
      info?: {
        errorCode?: null;
        errorEntityIdList?: null;
        message?: null;
        ok?: boolean;
        redirectUrl?: null;
      };
    };
  };

  /**
   * 接口名：获取菜单adc组件
   * Rap 地址: https://rap2.alibaba-inc.com/repository/editor?id=1453&mod=3444&itf=299537
   */
  api_component_findMenuList_get: {
    Req: {
      /**
       * 业务编码（该请求为站点级别）
       */
      bizCode?: string;
    };
    Res: {
      data?: {
        list?: {
          [k: string]: any;
        }[];
      };
      info?: {
        errorCode?: null;
        errorEntityIdList?: null;
        message?: null;
        ok?: boolean;
        redirectUrl?: null;
      };
    };
  };

  /**
   * 接口名：日志列表
   * Rap 地址: https://rap2.alibaba-inc.com/repository/editor?id=1453&mod=3716&itf=37870
   */
  api_logList_get: {
    Req: {
      page?: number;
      pageSize?: number;
      /**
       * 1-创意，2-计划，3-投放
       */
      entityType?: number;
      entityName?: string;
    };
    Res: {
      data?: {
        count?: number;
        'list|10'?: {
          deleted?: boolean;
          entityId?: number;
          /**
           * 实体名称
           */
          entityName?: string;
          /**
           * 描述
           */
          opDesc?: string;
          /**
           * 操作名
           */
          opName?: string;
          /**
           * 操作时间
           */
          opTime?: string;
          /**
           * 操作人
           */
          operName?: string;
        }[];
      };
      info?: {
        message?: number;
        ok?: boolean;
      };
    };
  };

  /**
   * 接口名：获取adc组件树的例子
   * Rap 地址: https://rap2.alibaba-inc.com/repository/editor?id=1453&mod=36239&itf=279792
   */
  api_component_findComponentList_code_get: {
    Req: {
      /**
       * 业务编码
       */
      bizCode?: string;
      /**
       * 节点编码
       */
      componentCode?: string;
      /**
       * 查询深度，纯页面逻辑（即：当前页面需要渲染几层子结构）
       */
      componentDeep?: number;
    };
    Res: {
      data?: {
        list?: {
          [k: string]: any;
        }[];
      };
      info?: {
        ok?: boolean;
      };
    };
  };

  /**
   * 接口名：列表的例子
   * Rap 地址: https://rap2.alibaba-inc.com/repository/editor?id=1453&mod=36239&itf=279793
   */
  api_example_list_get: {
    Req: {};
    Res: {
      data?: {
        list?: {
          field1?: number;
          field2?: number;
          field3?: number;
        }[];
        count?: number;
      };
      info?: {
        ok?: boolean;
        msg?: string;
      };
    };
  };
}
