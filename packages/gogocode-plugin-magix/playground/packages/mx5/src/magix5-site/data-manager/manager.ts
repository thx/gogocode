import Mediator from './mediator';

const managers = new Map();

interface IPart {
    state?: any;
    handles?: any;
}

interface IStateHandles {
    setState: (key: string, value: any) => any;
    setStateLazy: (key: string, value: any) => any;
    setStates: (data: any, keys?: string[]) => void;
    getState: <T>(keys?: string | string[]) => T;
    getStateAsyn: (keys?: string | string[]) => Promise<any>;
}

interface IUseMethods {
    use: (parts: IPart | IPart[]) => Manager<any>;
    setup: (view: Magix5.View, callback?: () => any) => void;
    observeState: (view: Magix5.View) => void;
    observeKeys: (view: Magix5.View, keys: string[], all?: boolean) => void;
    effect: (
        view: Magix5.View,
        keys: string[],
        callback,
        all?: boolean
    ) => void;
}

const _set = Symbol('_set');

class Manager<H> implements IStateHandles, IUseMethods {
    private key: string;
    private state: any = null;
    private stateCache: any = {};
    handles: H = {} as H;

    constructor(key: string) {
        this.key = key;
    }

    private [_set]: (part: IPart) => void = (part: IPart) => {
        const { state, handles } = part;
        handles && Object.assign(this.handles, handles);

        if (state && this.state) {
            this.state = Mediator.set(this.key, state);
        } else {
            Object.assign(this.stateCache, state); // 缓存
        }
    };

    /* state handles */
    setState = (key: string, value: any) => {
        return this.state.set(key, value);
    };

    setStateLazy = (key: string, value: any) => {
        return this.state.set(key, value, true);
    };

    setStates = (data: any, keys?: string[]) => {
        if (keys) {
            keys.forEach((k) => {
                this.setState(k, data[k] || null);
            });
        } else {
            for (const k of Object.keys(data)) {
                this.setState(k, data[k] || null);
            }
        }
    };

    getState = <T = any>(keys?: string | string[]): T => {
        const state = this.state;

        if (typeof keys === 'string') {
            return state.get(keys);
        } else if (typeof keys === 'object' && keys.length > 0) {
            const model = {} as T;
            keys.forEach((k) => {
                model[k] = state.get(k);
            });
            return model;
        }

        return state.get();
    };

    getStateAsyn = async (keys?: string | string[]) => {
        const state = this.state;

        if (typeof keys === 'string') {
            const res = state.get(keys);
            return res;
        } else if (typeof keys === 'object' && keys.length > 0) {
            const model = {};
            keys.forEach((k) => {
                model[k] = state.get(k);
            });
            return model;
        }

        return state.get();
    };

    /* use methods */
    use = (parts: IPart | IPart[]): Manager<H> => {
        if (!(parts as IPart[]).length) {
            this[_set](parts as IPart);
        } else {
            (parts as IPart[]).forEach((part) => this[_set](part));
        }
        return this;
    };

    setup = (view: Magix5.View, callback?: any) => {
        if (!this.state) {
            this.state = Mediator.set(this.key, this.stateCache);
        }
        view.on('destroy', () => {
            Mediator.remove(this.key);
            this.state = null;
            callback && callback();
        });
    };

    observeState = (view: Magix5.View) => {
        let state = this.state;
        let update = view.render.bind(view);
        state.on('state', update);
        view.on('destroy', () => {
            state.off('state', update);
        });
    };

    observeKeys = (view: Magix5.View, keys: string[], all?: boolean) => {
        this.effect(view, keys, '', (all = false));
    };

    effect = (view: Magix5.View, keys: string[], callback, all?: boolean) => {
        let state = this.state;
        let update = (e) => {
            let find = 1;
            for (let k of keys) {
                if (all && !e.changed[k]) {
                    find = 0;
                    break;
                } else if (e.changed[k]) {
                    find = 1;
                    break;
                } else {
                    find = 0;
                }
            }
            if (find) {
                callback ? callback() : view.render();
            }
        };
        state.on('update', update);
        view.on('destroy', () => {
            state.off('update', update);
        });
    };
}

export function createManager<H>(key: string, cache?: boolean): Manager<H> {
    const manager = new Manager<H>(key);
    // 在单文件过于庞大想要拆分到单独文件维护时可以开启缓存
    if (cache) {
        if (!managers.has(key)) {
            managers.set(key, manager);
        }
    }
    return manager;
}

export function getManager<H = any>(key: string) {
    if (managers.has(key)) {
        const manager: Manager<H> = managers.get(key);
        return manager;
    } else {
        return createManager<H>(key, true);
    }
}
