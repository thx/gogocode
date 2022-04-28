import Magix from 'magix5';
const Router = Magix.Router;
import MENU_CONFIG, { IMenuItem, key } from '../menu-config';

import { IState, IHandles } from './shape';
import { createManager } from '../../../../data-manager/index';
const dataManager = createManager<IHandles>('example-manager');
const { setState, getState, setStateLazy } = dataManager;

const state: IState = {
    menu: MENU_CONFIG || [],
    link: MENU_CONFIG[0].link || '',
};

const handles: IHandles = {
    getMenu() {
        const menu: IMenuItem[] = getState('menu');
        return menu;
    },
    navigate(link) {
        setState('link', link);
    },
    getFilePath() {
        const { params } = Router.parse();
        let link = params[key];
        if (!link) {
            link = getState('link');
        } else {
            setStateLazy('link', link);
        }
        const menu = getState('menu');
        for (const item of menu as IMenuItem[]) {
            if (item.link === link) {
                return item.path;
            }
        }
    },
};

dataManager.use({
    state,
    handles,
});

export default dataManager;
