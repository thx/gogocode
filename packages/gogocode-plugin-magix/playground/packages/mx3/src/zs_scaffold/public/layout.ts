/*md5:b90d45d0212e071e0e95e85192890a65*/
/**
 * 通用layout，defalut+菜单处理逻辑
 */
import Magix from 'magix';
let originTitle = document.title
let ResolvePath = (path) => {
    path = path || '';

    // Magix.parseUrl(path)
    let pathnameMatch;
    if (path.indexOf('#!') > -1) {
        // #!/xxxx/yyyy 返回 /xxxx/yyyy
        pathnameMatch = /^.*(#!\/[^\?]+)\??[^\/]*$/.exec(path);
    } else {
        // /xxxx/yyyy?id=1 直接返回/xxxx/yyyy
        pathnameMatch = /^(\/[^\?]+)\??[^\/]*$/.exec(path);
    }

    let newPath = pathnameMatch && pathnameMatch[1] || '';
    newPath = newPath.replace('#!', '');

    return newPath;
};

export default {
    menuConfig({ customs, menus, defaultView }) {
        let routes = {};
        for (let i = 0, menu, seconds; i < menus.length; i++) {
            // 一级菜单
            menu = menus[i];

            // 唯一的value标识符
            menu.value = menu.value || Magix.guid('menu_');

            seconds = menu.seconds || [];
            if (seconds.length > 0) {
                // 包含二三级菜单
                for (let j = 0, thirds; j < seconds.length; j++) {
                    thirds = seconds[j].thirds;

                    for (let x = 0, third; x < thirds.length; x++) {
                        // 三级菜单
                        third = thirds[x];

                        // 唯一的value标识符
                        third.value = third.value || Magix.guid('menu_third_');

                        // route仅支持纯路径，不支持参数区分
                        third.originPath = ResolvePath(third.path);

                        if (third.originPath) {
                            // 非外链
                            routes[third.originPath] = {
                                value: third.value,
                                text: [menu.text, third.text].join('-'),
                                title: [menu.text, third.text].join('-') + '_' + originTitle,
                                view: defaultView,
                                originPath: third.originPath,
                                viewPath: third.viewPath + third.path,
                                viewData: third.viewData || {},
                                leftPath: 'common-site/views/pages/layout/nav', //通用的二三级菜单模板
                                leftData: third.leftData || menu,
                                bottomPath: (third.bottomViewPath && third.bottomPath) ? (third.bottomViewPath + third.bottomPath) : '',
                                bottomData: third.bottomData || menu,
                                padding: third.padding + '' !== 'false', // 默认true
                            }
                        }
                    }
                }
            } else {
                // 唯一的value标识符
                menu.value = menu.value || Magix.guid('menu_');

                // 只配置一级菜单，对应的侧边可能为自定义菜单，可能无菜单
                menu.originPath = ResolvePath(menu.path);

                if (menu.originPath) {
                    // 非外链
                    routes[menu.originPath] = {
                        value: menu.value,
                        text: menu.text,
                        title: menu.text + '_' + originTitle,
                        view: defaultView,
                        originPath: menu.originPath,
                        viewPath: menu.viewPath + menu.path,
                        viewData: menu.viewData || {},
                        leftPath: (menu.leftViewPath && menu.leftPath) ? (menu.leftViewPath + menu.leftPath) : '',
                        leftData: menu.leftData || menu,
                        bottomPath: (menu.bottomViewPath && menu.bottomPath) ? (menu.bottomViewPath + menu.bottomPath) : '',
                        bottomData: menu.bottomData || menu,
                        padding: menu.padding + '' !== 'false', // 默认true
                    }
                }
            }
        }

        customs.forEach(p => {
            // 唯一的value标识符
            p.value = p.value || Magix.guid('menu_custom_');

            p.originPath = ResolvePath(p.path);

            // 映射到某个菜单上
            // 1. 映射到一级菜单
            // 2. 映射到三级菜单
            let mapPath = p.mapPath;
            p.mapOriginPath = ResolvePath(p.mapPath);

            if (p.originPath) {
                // 非外链
                routes[p.originPath] = {
                    value: p.value,
                    text: p.text,
                    title: p.text + '_' + originTitle,
                    view: defaultView,
                    originPath: p.originPath,
                    viewPath: p.viewPath + p.path,
                    viewData: p.viewData || {},
                    leftPath: (p.leftViewPath && p.leftPath) ? (p.leftViewPath + p.leftPath) : '',
                    leftData: p.leftData || p,
                    bottomPath: (p.bottomViewPath && p.bottomPath) ? (p.bottomViewPath + p.bottomPath) : '',
                    bottomData: p.bottomData || p,
                    mapOriginPath: p.mapOriginPath,
                    padding: p.padding,
                    header: p.header,
                    footer: p.footer,
                }

                if (p.mapOriginPath && !p.leftPath) {
                    // 当映射的是三级菜单时且无自定义左侧菜单时
                    for (let i = 0; i < menus.length; i++) {
                        let seconds = menus[i].seconds || [];
                        for (let j = 0; j < seconds.length; j++) {
                            let thirds = seconds[j].thirds || [];
                            for (let k = 0; k < thirds.length; k++) {
                                if (thirds[k].originPath == p.mapOriginPath) {
                                    let third = thirds[k];
                                    // 未自定义的时候，展示映射三级导航的导航结构
                                    Magix.mix(routes[p.originPath], {
                                        leftPath: 'common-site/views/pages/layout/nav',
                                        leftData: routes[third.originPath].leftData || {},
                                    })
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        });

        // 默认路径
        let defaultPath;
        for (let i = 0; i < menus.length; i++) {
            if (defaultPath) { break; };

            if (menus[i].originPath) {
                defaultPath = menus[i].originPath;
            } else {
                let seconds = menus[i].seconds || [];
                for (let j = 0; j < seconds.length; j++) {
                    if (defaultPath) { break; };
                    let thirds = seconds[j].thirds || [];
                    for (let k = 0; k < thirds.length; k++) {
                        if (thirds[k].originPath) {
                            defaultPath = thirds[k].originPath;
                            break;
                        }
                    }
                }
            }
        }

        return {
            defaultView: defaultView,
            defaultPath,
            routes, //所有可访问路径（路径: 路径菜单详情）
            menus, //所有菜单
        };
    }
}