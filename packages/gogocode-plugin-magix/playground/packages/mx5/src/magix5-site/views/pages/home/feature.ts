import Magix5 from 'magix5';

Magix5.applyStyle('@:./feature.less');

import View from '../../../view';

interface IData {
    title: string;
    introduction: string;
}

const dataList: IData[] = [
    {
        title: '易用',
        introduction:
            '采用最原汁原味的语法，掌握HTML、CSS、JavaScript后即可开箱即用',
    },
    {
        title: '高效',
        introduction: '区块的高灵活性和高复用性，让工作事半功倍',
    },
    {
        title: '面向未来',
        introduction:
            '针对复杂庞大的项目时，Magix天然的微前端架构，经过简单配置，让独立的项目也如区块一般顺滑接入',
    },
];

export default View.extend({
    tmpl: '@:./feature.html',
    assign(extra) {
        this.set({ ...extra, dataList });
    },
    async render() {
        await this.digest();
    },
});
