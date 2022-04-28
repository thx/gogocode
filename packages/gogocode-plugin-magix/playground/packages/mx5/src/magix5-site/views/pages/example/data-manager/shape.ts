export interface IState {
    menu: any[];
    link: string;
}

export interface IHandles {
    getMenu: () => any[];
    navigate: (name: string) => void;
    getFilePath: () => string;
}
