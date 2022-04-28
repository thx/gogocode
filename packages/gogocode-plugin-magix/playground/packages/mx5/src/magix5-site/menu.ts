enum Types {
    NAV = 'nav',
    ROUTE = 'route',
    BOTH = 'both',
}

interface IMeta {
    outside: boolean;
}

interface INavItem {
    type: Types;
    title?: string;
    path?: string;
    children?: INavItem[];
    meta?: IMeta;
    link?: string;
}

interface IRouteItem {
    type: Types;
    path: string;
    view?: string;
}

type MenuItem = INavItem | IRouteItem;

const menu: MenuItem[] = [
    { type: Types.ROUTE, path: '/home', view: '/views/default' },
    { type: Types.BOTH, path: '/guide', title: '指南', view: '/views/default' },
    {
        type: Types.BOTH,
        path: '/compiler',
        title: '编译器',
        view: '/views/default',
    },
    { type: Types.BOTH, path: '/apis', title: 'API', view: '/views/default' },
    {
        type: Types.BOTH,
        path: '/example',
        title: '示例',
        view: '/views/default',
    },
    {
        type: Types.BOTH,
        path: '/demo',
        title: 'DEMO',
        view: '/views/empty',
    },
    {
        type: Types.NAV,
        title: '周边生态',
        children: [
            {
                type: Types.NAV,
                title: 'magix-gallery',
                path: 'https://mo.m.taobao.com/one-stop/page_20211213_030636_950',
                meta: {
                    outside: true,
                },
            },
            {
                type: Types.NAV,
                title: 'thx-cli',
                path: 'https://thx.github.io/magix-cli-book/#/',
                meta: {
                    outside: true,
                },
            },
            {
                type: Types.NAV,
                title: 'vscode开发插件',
                path: 'https://github.com/thx/vscode-magix',
                meta: {
                    outside: true,
                },
            },
        ],
    },
    {
        type: Types.NAV,
        title: 'V3',
        path: 'https://thx.github.io/magix/v3',
        meta: {
            outside: true,
        },
    },
    {
        type: Types.NAV,
        title: 'Github',
        path: 'https://github.com/thx/magix',
        meta: {
            outside: true,
        },
    },
];

function _getList(type, list): MenuItem[] {
    const res = [];
    list.forEach((item: MenuItem) => {
        if (item.type === type || item.type === Types.BOTH) {
            res.push(item);
        }
    });

    return res;
}

export function getRoutes(projectName) {
    const routes = _getList(Types.ROUTE, menu);
    let routeConfig = {};
    routes.forEach((route: IRouteItem) => {
        routeConfig[route.path] = projectName + route.view;
    });

    return routeConfig;
}

export function getNavList(list = menu) {
    const navlist = _getList(Types.NAV, list);
    return navlist.map((navItem: INavItem) => {
        const item = {
            title: navItem.title,
        } as INavItem;

        if (navItem.children) {
            item.children = getNavList(navItem.children);
        }

        if (navItem.path && !navItem?.meta?.outside) {
            item.link = '#' + navItem.path;
        } else if (navItem.path) {
            item.link = navItem.path;
        }

        return item;
    });
}

export default {
    menu,
    getRoutes,
    getNavList,
};
