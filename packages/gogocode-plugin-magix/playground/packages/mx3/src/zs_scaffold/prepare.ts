import Magix from 'magix';
import Constant from './constant';
import PublicConstant from './public/constant';
import Service from './services/service';
import Menu from './public/layout';

// 项目样式，配置在package.json的scopedCss，可以通过@scoped:name获取
Magix.applyStyle('@scoped.style');

let getUserInfo = () => {
    return new Promise((resolve) => {
        // 此处login和boot调用的是同一个处理文件
        // 只获取数据，不做回跳到index，boot里面自行跳转
        Service.fetch({
            name: 'api_member_getInfo_get',
            params: {
                bizCode: Constant.bizCode,
            },
            dataType: 'jsonp'
        }, (err, bag) => {
            if (err) {
                Magix.dispatch(window, 'mxserviceerror', {
                    errorCode: 'LOGINOUT'
                })
                resolve({ meta: {} });
            }
            else {
                let user = bag.get('data', {});
                // 未登录 / 登陆了不满足准入条件
                // https://aone.alibaba-inc.com/req/19931572
                // 补充错误信息在登录页提示
                user.apiInfo = err || {};
                resolve(user);
            }

        });
    })
}

let getConstant = (user) => {
    return new Promise((resolve) => {
        if (!$.isEmptyObject(user.meta) && user.csrfID) {
            // 登陆成功了再请求码表
            Service.fetch([{
                name: 'api_common_findCodeList_get'
            }], (err, bag) => {
                let data = bag.get('data', {});
                resolve(data);
            });
        } else {
            resolve({});
        }
    })
}

let getMenu = (user) => {
    let customs = [{
        text: '映射到当前菜单，一级菜单和左侧菜单显示与当前菜单完全一致',
        viewPath: 'zs_scaffold/views/pages',
        path: '/example/outside1',
        mapPath: '/example/maps'
    }, {
        text: '映射到当前菜单，一级菜单与当前菜单完全一致，左侧菜单自定义',
        viewPath: 'zs_scaffold/views/pages',
        path: '/example/outside2',
        mapPath: '/example/maps',
        leftViewPath: 'zs_scaffold/views/pages',
        leftPath: '/example/side',
    }, {
        text: '映射到当前菜单，一级菜单与当前菜单完全一致，无左侧菜单',
        viewPath: 'zs_scaffold/views/pages',
        path: '/example/outside3',
        mapPath: '/example/maps',
        ignoreLeft: true,
    }, {
        text: '包含吊头吊尾的单独页面，不映射到导航上',
        viewPath: 'zs_scaffold/views/pages',
        path: '/example/outside4',
    }, {
        text: '不包含吊头吊尾的单独页面',
        viewPath: 'zs_scaffold/views/pages',
        path: '/example/outside5',
        header: false,
        footer: false,
    }, {
        text: '登录页',
        viewPath: 'zs_scaffold/views/pages',
        path: '/login/index',
        padding: false,
        header: false,
        footer: false,
    }, {
        text: '通用错误提示页面',
        viewPath: 'zs_scaffold/views/pages',
        path: '/common/error'
    }, {
        text: '消息中心',
        viewPath: 'common-site/views/pages',
        viewData: {
            bizCode: Constant.bizCode
        },
        path: '/message/index',
    },{
        text: 'demo',
        viewPath: 'zs_scaffold/views/pages',
        path: '/demo/index',
        padding: false,
        header: false,
        footer: false,
    }];

    let menusMap = {
        group1: {
            viewPath: 'zs_scaffold/views/pages',
            path: '/home/index',
        },
        group21: { // 常用列表示例
            viewPath: 'zs_scaffold/views/pages',
            path: '/example/list',
            icon: '<i class="@scoped.style:iconfont">&#xe803;</i>',
        },
        group23: { // 映射到菜单
            viewPath: 'zs_scaffold/views/pages',
            path: '/example/maps',
            icon: '<i class="@scoped.style:iconfont">&#xe7fa;</i>',
        },
        group3: { // 自定义菜单
            viewPath: 'zs_scaffold/views/pages',
            path: '/example/custom-side',
            leftViewPath: 'zs_scaffold/views/pages',
            leftPath: '/example/side',
        },
        group41: { // common-site功能列举
            viewPath: 'zs_scaffold/views/pages',
            path: '/example/common-site',
            icon: '<i class="@scoped.style:iconfont">&#xe7fa;</i>',
        },
        account_detail: { // 账户-详情
            viewPath: 'common-site/views/pages',
            viewData: {
                bizCode: Constant.bizCode
            },
            path: '/account/index',
            icon: '<i class="@scoped.style:iconfont">&#xe60a;</i>',
        },
        account_recharge: { // 账户-充值
            viewPath: 'common-site/views/pages',
            viewData: {
                bizCode: Constant.bizCode
            },
            path: '/account/recharge',
            icon: '<i class="@scoped.style:iconfont">&#xe60a;</i>',
        },
        qualification: { // 账户-资质管理
            viewPath: 'common-site/views/pages',
            viewData: {
                bizCode: Constant.bizCode
            },
            path: '/account/qualification',
            icon: '<i class="@scoped.style:iconfont">&#xe75f;</i>',
        },
        invoice_apply: { // 账户-发票-申请发票
            viewPath: 'common-site/views/pages',
            viewData: {
                bizCode: Constant.bizCode
            },
            path: '/account/invoice-apply',
            icon: '<i class="@scoped.style:iconfont">&#xe762;</i>',
        },
        invoice_receipt: { // 账户-发票-付款单回票
            viewPath: 'common-site/views/pages',
            viewData: {
                bizCode: Constant.bizCode
            },
            path: '/account/invoice-receipt',
            icon: '<i class="@scoped.style:iconfont">&#xe762;</i>',
        },
        invoice_address: { // 账户-发票-地址管理
            viewPath: 'common-site/views/pages',
            viewData: {
                bizCode: Constant.bizCode
            },
            path: '/account/invoice-address',
            icon: '<i class="@scoped.style:iconfont">&#xe762;</i>',
        },
        invoice_title: { // 账户-发票-抬头管理
            viewPath: 'common-site/views/pages',
            viewData: {
                bizCode: Constant.bizCode
            },
            path: '/account/invoice-title',
            icon: '<i class="@scoped.style:iconfont">&#xe762;</i>',
        },
        // mamaclub: { // 跨站内容-妈妈CLUB 待account和moment改造完引入
        //     viewPath: 'appone/views/pages',
        //     path: '/club/index',
        // },
        group5: { // 外链
            link: 'https://www.taobao.com/',
        },
    }

    return new Promise((resolve) => {
        Service.fetch([{
            name: 'api_component_findMenuList_get'
        }], (err, bag) => {
            // data.list = [{
            //     name: '站点根节点',
            //     code: '',
            //     subComponentList: [] 菜单信息
            // }]
            let rootItem = bag.get('data.list.0', {});
            let list = rootItem.subComponentList || [];

            let menus = [];
            for (let i = 0, menu; i < list.length; i++) {
                menu = list[i];
                let seconds = menu.subComponentList || [];
                if (seconds.length > 0) {
                    // 有子菜单
                    let remainMenu = {
                        text: menu.name,
                        seconds: []
                    };
                    for (let j = 0, second; j < seconds.length; j++) {
                        second = seconds[j];

                        // 只有二级，包装成三级结构，方便统一处理（简单深拷贝）
                        let thirds = second.subComponentList || [];
                        if (thirds.length == 0) {
                            thirds = [JSON.parse(JSON.stringify(second))];
                        }

                        for (let x = 0; x < thirds.length; x++) {
                            // 过滤掉未配置的菜单
                            if (!menusMap[thirds[x].code]) {
                                thirds.splice(x--, 1);
                            }
                        }

                        if (thirds.length > 0) {
                            remainMenu.seconds.push({
                                text: (thirds.length > 1) ? second.name : '',
                                thirds: thirds.map(third => {
                                    let prop = third.properties || {};
                                    return {
                                        ...menusMap[third.code],
                                        text: third.name,
                                        tag: prop.tag,
                                        tagColor: prop.tagColor,
                                    }
                                })
                            })
                        }
                    }
                    if (remainMenu.seconds.length > 0) {
                        menus.push(remainMenu);
                    }
                } else {
                    // 一级菜单
                    if (menusMap[list[i].code]) {
                        let prop = list[i].properties || {};
                        menus.push({
                            ...menusMap[list[i].code],
                            text: list[i].name,
                            tag: prop.tag,
                            tagColor: prop.tagColor,
                        })
                    }
                }
            }

            let configs = Menu.menuConfig({
                customs,
                menus,
                defaultView: '@./views/default'
            });
            if (!configs.defaultPath) {
                // 无menu兼容
                configs.defaultPath = '/common/error';
            }
            resolve(configs);
        });
    })
}

export default () => {
    return new Promise((resolve, reject) => {
        getUserInfo().then(user => {
            // service的请求依赖user信息的补充
            Magix.config({
                'zs_scaffold.user': user,
            });

            Promise.all([
                getConstant(user), // 常量码表
                getMenu(user), // 菜单
            ]).then(([all, menuInfo]) => {
                // 和本地常量码表merge
                Magix.mix(all, PublicConstant, Constant);
                // 用户信息和全量码表请通过Magix.config(projectName + '.user')这种形式获取
                // 比如脚手架中就是Magix.config('zs_scaffold.user')
                // 避免跨项目mount的时候冲突
                Magix.config({
                    'zs_scaffold.all': all,
                    'zs_scaffold.menu': menuInfo,
                });
                resolve(true);
            });
        });
    });
};

