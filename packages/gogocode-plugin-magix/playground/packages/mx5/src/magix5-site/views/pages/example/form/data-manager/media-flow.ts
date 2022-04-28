import { IMediaFlowState, IMediaFlowHandles } from './type';
import { getManager } from '../../../../../data-manager/index';
const dataManager = getManager('form-data');
const { setState, getState } = dataManager;

const state: IMediaFlowState = {};
const handles: IMediaFlowHandles = {};

export default {
    state,
    handles,
};
