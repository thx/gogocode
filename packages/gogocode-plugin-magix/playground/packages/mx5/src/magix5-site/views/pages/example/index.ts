import Magix5 from 'magix5';
Magix5.applyStyle('@:./index.less');
import View from '../../../view';

import dataManager from './data-manager/index';
import { key, path } from './menu-config';

export default View.extend({
    tmpl: '@:./index.html',
    init() {
        dataManager.setup(this);
        dataManager.observeKeys(this, ['link']);
    },
    assign(extra) {
        const menu = dataManager.handles.getMenu();
        this.set({ key, path, menu, filePath: '', ...extra });
    },
    async render() {
        const filePath = dataManager.handles.getFilePath();
        const renderMark = Magix5.mark(this, 'render');

        await this.digest({
            filePath,
        });

        if (renderMark) {
            this.scroll('example-content-header');
        }
    },
    'navigate<navigate>'(e) {
        const { link } = e;
        dataManager.handles.navigate(link);
    },
});
