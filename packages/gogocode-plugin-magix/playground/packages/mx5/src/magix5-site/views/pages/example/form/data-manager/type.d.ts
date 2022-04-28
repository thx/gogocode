/* main */
export interface IMainState {
    id: number;
}
export interface IMainHandles {
    setId: (id: number) => void;
    getModel: () => Promise<any>;
    submit: () => Promise<any>;
}

/* user */
export interface IUserState {
    username: string;
    profession: string;
    skill: string;
    flowType: string;
}
export interface IUserHandles {
    changeUsername: (username: string) => void;
    getProfessions: () => Promise<any>;
    changeProfession: (profession: string) => void;
    getSkills: () => Promise<any>;
    changeSkill: (skills: string | string[]) => void;
    changeFlowType: (flowType: string) => void;
}

/* self-flow */
export interface ISelfFlowState {}
export interface ISelfFlowHandles {}

/* media-flow */
export interface IMediaFlowState {}
export interface IMediaFlowHandles {}

export interface IState
    extends IMainState,
        IUserState,
        ISelfFlowState,
        IMediaFlowState {}

export interface IHandles
    extends IMainHandles,
        IUserHandles,
        ISelfFlowHandles,
        IMediaFlowHandles {}
