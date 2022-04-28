import Magix from 'magix5';
Magix.applyStyle('@:./index.less');
import View from '../../../../view';

import dataManager from './data-manager/index';
import { flowTypes } from './Const';

interface IProps {
    id?: number;
}

export default View.extend({
    tmpl: '@:./index.html',
    init() {
        dataManager.setup(this);
        dataManager.observeKeys(this, ['flowType']);

        this.set({
            flowTypes,
            getPath(val, flowTypes) {
                if (val === flowTypes[0].value) {
                    return 'self-flow';
                } else if (val === flowTypes[1].value) {
                    return 'media-flow';
                }
            },
        });
    },
    assign(extra: IProps) {
        const id = extra.id || null;
        this.set({ id });
    },
    async render() {
        const id = this.get('id');
        if (id) {
            await this.check(parseInt(id));
        }

        const flowType = dataManager.getState('flowType');
        await this.digest({
            flowType,
        });
    },
    async check(id: number) {
        if (!dataManager.getState('id')) {
            dataManager.handles.setId(id);
            await dataManager.handles.getModel();
        }
    },
});
