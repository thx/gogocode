import { IState, IHandles, IMainState, IMainHandles } from './type';
import { createManager } from '../../../../../data-manager/index';
const dataManager = createManager<IHandles>('form-data', true);
const { getState, setState, setStates } = dataManager;

import user from './user';
import selfFlow from './self-flow';
import mediaFlow from './media-flow';

const mainState: IMainState = {
    id: null,
};
const mainHandles: IMainHandles = {
    setId(id: number) {
        setState('id', id);
    },
    getModel() {
        const id = getState('id');
        return new Promise((resolve) => {});
    },
    submit() {
        return new Promise((resolve) => {});
    },
};

dataManager.use({
    state: mainState,
    handles: mainHandles,
});

export default dataManager.use(user).use(selfFlow).use(mediaFlow);
