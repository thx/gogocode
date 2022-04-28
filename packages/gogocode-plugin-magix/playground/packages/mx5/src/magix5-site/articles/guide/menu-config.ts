interface IMenuItem {
    text: string;
    link?: string;
    children?: IMenuItem[];
}

const menu: IMenuItem[] = [
    {
        text: '基础',
        children: [
            {
                text: '介绍',
                link: 'introduction',
            },
            {
                text: '安装',
                link: 'install',
            },
            {
                text: 'view基础',
                link: 'view-base',
            },
            {
                text: '模版语法',
                link: 'teamplate-syntax',
            },
            {
                text: '样式方案',
                link: 'style-solve',
            },
            {
                text: '事件处理',
                link: 'event-handle',
            },
            {
                text: '路由',
                link: 'router',
            },
        ],
    },
    {
        text: '深入View',
        children: [
            {
                text: '生命周期',
                link: 'lifecycle',
            },
            {
                text: '数据驱动',
                link: 'view-data',
            },
            {
                text: 'view间关系',
                link: 'view-relation',
            },
            {
                text: 'view间通信',
                link: 'view-communication',
            },
        ],
    },
    {
        text: '进阶',
        children: [
            {
                text: 'Vframe',
                link: 'vframe',
            },
            {
                text: '插件与拓展',
                link: 'extend',
            },
            {
                text: '插槽',
                link: 'slot',
            },
            {
                text: '异步操作',
                link: 'async',
            },
            {
                text: '接口管理',
                link: 'service',
            },
            {
                text: '错误监控',
                link: 'err-handle',
            },
        ],
    },
    {
        text: '微前端方案',
        children: [
            {
                text: '共享View',
                link: 'public-view',
            },
        ],
    },
];

export default menu;
