import Magix from 'magix5';
Magix.applyStyle('@:./index.less');
import View from '../../../../../view';

import dataManager from '../data-manager/index';
import { IUserState } from '../data-manager/type';
import { flowTypes } from '../Const';

export default View.extend({
    tmpl: '@:./index.html',
    init() {
        dataManager.observeKeys(this, ['profession']);
        this.set({
            flowTypes,
        });
    },
    assign(extra) {
        this.set({ ...extra });
    },
    async render() {
        const { username, profession, skill, flowType } =
            dataManager.getState<IUserState>();

        const dataSource = await this.fetchDataSource();

        await this.digest({
            username,
            profession,
            skill,
            flowType,
            ...dataSource,
        });
    },
    async fetchDataSource() {
        let { professions } = this.get();
        !professions &&
            (professions = await dataManager.handles.getProfessions());

        const skills = await dataManager.handles.getSkills();
        return {
            professions,
            skills,
        };
    },
    /* event handle */
    'changeName<keydown>'(e: Magix5.MagixKeyboardEvent) {
        const { code } = e;
        if (code == 'Enter') {
            const username = this.get('username');
            dataManager.handles.changeUsername(username);
        }
    },
    'changeProfession<change>'(e) {
        const {
            params: { profession },
        } = e;
        dataManager.handles.changeProfession(profession);
    },
    'changeSkill<change,click>'(e) {
        console.log('object');
    },
    'changeFlowType<change>'(e) {
        const {
            params: { flowType },
        } = e;

        dataManager.handles.changeFlowType(flowType);
        this.digest({
            flowType,
        });
    },
});
