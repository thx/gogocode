export interface IMenuItem {
    text: string;
    link: string;
    path: string;
}

export const path = 'example';

export const key = 'case';

const menuConfig: IMenuItem[] = [
    {
        text: '父子组件通信',
        link: 'components-comunicate',
        path: 'components-comunicate',
    },
    { text: '动态挂载view', link: 'dynamic-view', path: 'dynamic-view' },
    // { text: '表单', link: 'form', path: 'form' },
];

export default menuConfig;
