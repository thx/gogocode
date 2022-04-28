import { ISelfFlowState, ISelfFlowHandles } from './type';
import { getManager } from '../../../../../data-manager/index';
const dataManager = getManager('form-data');
const { setState, getState } = dataManager;

const state: ISelfFlowState = {};
const handles: ISelfFlowHandles = {};

export default {
    state,
    handles,
};
