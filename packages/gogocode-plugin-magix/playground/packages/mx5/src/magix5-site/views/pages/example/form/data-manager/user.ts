import { IHandles, IUserState, IUserHandles } from './type';
import { getManager } from '../../../../../data-manager/index';
const dataManager = getManager<IHandles>('form-data');
const { setState, getState } = dataManager;
import { flowTypes } from '../Const';

const state: IUserState = {
    username: '',
    profession: '',
    skill: '',
    flowType: flowTypes[0].value || '',
};

const handles: IUserHandles = {
    changeUsername(username) {
        setState('username', username);
    },
    getProfessions() {
        return new Promise((resolve) => {
            let professions = [];
            setTimeout(() => {
                professions = [
                    {
                        text: '前端',
                        value: 'frontend',
                    },
                    {
                        text: '后端',
                        value: 'backend',
                    },
                ];
                resolve(professions);
            }, 500);
        });
    },
    changeProfession(profession) {
        setState('profession', profession);
    },
    getSkills() {
        const profession = getState('profession');
        return new Promise((resolve) => {
            let skill = [];
            setTimeout(() => {
                if (profession == 'frontend') {
                    skill = [
                        {
                            text: 'html',
                            value: 'html',
                        },
                        {
                            text: 'css',
                            value: 'css',
                        },
                        {
                            text: 'js',
                            value: 'js',
                        },
                    ];
                } else if (profession == 'backend') {
                    skill = [
                        {
                            text: 'golang',
                            value: 'golang',
                        },
                        {
                            text: 'java',
                            value: 'java',
                        },
                        {
                            text: 'c++',
                            value: 'c++',
                        },
                    ];
                }
                resolve(skill);
            }, 500);
        });
    },
    changeSkill(skill) {
        setState('skill', skill);
        // 与selfFow有联动关系
    },
    changeFlowType(flowType) {
        setState('flowType', flowType);
    },
};

export default {
    state,
    handles,
};
