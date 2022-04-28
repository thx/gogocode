export interface IMenuItem {
    text: string;
    link: string;
}

const menu: IMenuItem[] = [
    {
        text: '介绍',
        link: 'introduction',
    },
    { text: '模版语法', link: 'teamplate-syntax' },
    { text: '@占位符的使用', link: 'using-sym' },
    { text: '#开头的文件处理命令', link: 'processing-command' },
    { text: '编译能力实例场景', link: 'scene' },
    { text: '整体编译全分析', link: 'compile-analysis' },
    { text: '模版编译全分析', link: 'teamplate-compile-analysis' },
];

export default menu;
