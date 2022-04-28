import storeOptions, { Store, storeEvent, IDataUpdatetParams } from './store';
import Event from './event';
import { throwErr } from './utils';

const globalManagers = new Map<string, Manager<any>>();

enum managerEvent {
  START = 'start',
  DESTROY = 'destroy',
}

interface IModule {
  state?: any;
  handles?: any;
}

interface IStateOptions {
  getState: <S>(keys?: string | string[]) => S;
  setState: (key: string, value: any) => any;
  setStateLazy: (key: string, value: any) => any;
  setStates: (data: any, keys?: string[]) => void;
  delState: (key: string, onDel) => void;
  clearModuleCache: () => void;
}
interface IManagerOptions {
  start: (ondestory) => void;
  addModule: (modules: IModule | IModule[]) => Manager<any>;
  observe: (options: {
    keys?: string[];
    onupdate: (e?: any) => any;
    ondestory?: (e?: any) => any;
    all?: boolean;
  }) => void;
}

const _add_module = Symbol('_add_module');
const _observe_state = Symbol('_observe_state');

class Manager<H> extends Event implements IStateOptions, IManagerOptions {
  key: string;
  isStarted = false;
  private state: Store = null;
  handles: H = null;
  private moduleCache: IModule = {
    state: {},
    handles: {},
  };

  constructor(key) {
    super();
    this.key = key;
  }

  /* state-options */
  getState<S = any>(keys?: string | string[]): S {
    const state = this.state;
    if (!state) return;

    if (typeof keys === 'string') {
      return state.getData(keys);
    } else if (keys instanceof Array) {
      const models = {} as S;
      keys.forEach(k => {
        models[k] = state.getData(k);
      });
      return models;
    }

    return state.getData();
  }

  setState(key: string, value: any) {
    return this.state && this.state.setData(key, value);
  }

  setStates(data: any, keys?: string[]) {
    if (keys) {
      keys.forEach(k => {
        this.setState(k, data[k]);
      });
    } else {
      Object.keys(data).forEach(k => {
        this.setStates(k, data[k] || null);
      });
    }
  }

  setStateLazy(key: string, value: any) {
    return this.state.setData(key, value, true);
  }

  delState(key: string, onDel) {
    const onDeletedFn = e => onDel && onDel(e);
    if (typeof key === 'string') {
      this.state.delData(key),
        this.state.on(storeEvent.DATA_DELETED, onDeletedFn);
    }
  }

  clearModuleCache() {
    this.moduleCache = {};
  }

  /* manager-options */
  private [_add_module](module: IModule) {
    const { state = {}, handles = {} } = module;
    if (this.isStarted && this.state && this.handles) {
      this.state = storeOptions.updateStore(this.key, state);
      Object.assign(this.handles, handles);
    } else {
      // cache
      const cache = this.moduleCache;
      Object.assign(cache.state, state);
      Object.assign(cache.handles, handles);
    }
  }

  addModule(modules: IModule | IModule[]) {
    if (modules instanceof Array) {
      modules.forEach(m => {
        this[_add_module](m);
      });
    } else {
      this[_add_module](modules);
    }
    return this;
  }

  start(ondestory?: (Manager) => any) {
    if (!this.isStarted) {
      this.state = storeOptions.createStore(this.key, this.moduleCache.state);
      this.handles = this.moduleCache.handles;
      this.isStarted = true;
    }
    this.fire(managerEvent.START);
    if (ondestory) {
      this.on(managerEvent.DESTROY, ondestory);
    }
  }

  private [_observe_state](options: {
    keys?: string[];
    onupdate: (e?: any) => any;
    ondestory?: (e?: any) => any;
    all?: boolean;
  }) {
    const state = this.state;
    const {
      keys = Object.keys(state),
      onupdate,
      ondestory,
      all = false,
    } = options;

    const onStoreUpdate = (e: IDataUpdatetParams) => {
      let find = 1;
      for (const k of keys) {
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
        onupdate && onupdate();
      }
    };

    state.on(storeEvent.DATA_UPDATED, onStoreUpdate);

    if (ondestory) {
      state.on(storeEvent.DATA_DELETED, ondestory);
    }
  }

  observe(options: {
    keys?: string[];
    onupdate: (e?: any) => any;
    ondestory?: (e?: any) => any;
    all?: boolean;
  }) {
    this[_observe_state](options);
  }
}

export function createManager<H = any>(key: string): Manager<H> {
  if (!globalManagers.has(key)) {
    const manager = new Manager<H>(key);
    globalManagers.set(key, manager);
    return manager;
  } else {
    return getManager<H>(key);
  }
}

export function getManager<H = any>(key: string): Manager<H> {
  if (globalManagers.has(key)) {
    const manager: Manager<H> = globalManagers.get(key);
    return manager;
  } else {
    return createManager<H>(key);
  }
}

export function delManager(key: string, data) {
  if (globalManagers.has(key)) {
    const manager = globalManagers.get(key);
    manager.fire(managerEvent.DESTROY, data);
    Object.keys(manager).forEach(k => {
      delete manager[k];
    });
    globalManagers.delete(key);
  } else {
    throwErr(`don't exist this manager`);
  }
}

export function createModule<H>(add: (manager: Manager<H>) => IModule) {
  const addModule = (manager: Manager<H>) => {
    const module: IModule = add(manager);
    manager.addModule(module);
    return manager;
  };

  return addModule;
}
