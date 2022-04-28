import { isPrimitive } from './utils';
import Event from './event';

const globalStores = Object.create(null);

interface IDataOpts {
  getData: (key: string) => any;
  setData: (key: string, newVal: any, lazy?: boolean) => void;
  delData: (key: string) => void;
}

export enum storeEvent {
  DATA_UPDATED = 'data_updated',
  DATA_DELETED = 'data_deleted',
}

export interface IDataUpdatetParams {
  changed: object;
}

export class Store extends Event implements IDataOpts {
  data: any;
  asyncCount = 0;
  suspend = false;
  changed = {};
  lastChanged = {};

  constructor(data) {
    super();
    this.data = data;
  }

  getData(key?: string) {
    const data = this.data;
    if (key) {
      return data[key];
    } else {
      return data;
    }
  }

  setData(key: string, newVal: any, lazy = false) {
    const data = this.data;
    const oldVal = data[key];

    if (!isPrimitive(newVal) || newVal !== oldVal) {
      data[key] = newVal;
      const changed = {
        newVal,
        oldVal,
      };
      this.changed[key] = changed;
      if (!this.suspend) {
        [this.lastChanged, this.changed] = [this.changed, {}];
        // event dispatch
        if (!lazy) {
          const params: IDataUpdatetParams = {
            changed: this.lastChanged,
          };
          this.fire(storeEvent.DATA_UPDATED, params);
        }
      }
    }
  }

  delData(key: string) {
    const data = this.data;
    if (data[key]) {
      delete this.data[key];
      this.fire(storeEvent.DATA_DELETED);
    }
  }
}

interface IOptions {
  createStore: (key: string, data: any) => Store;
  getStore: (key: string) => Store;
  updateStore: (key: string, data: any) => Store;
  delStore: (key: string) => void;
  hasStore: (key: string) => boolean;
}

const options: IOptions = {
  createStore(key: string, data: any) {
    const store = new Store(data);
    globalStores[key] = store;
    return store;
  },
  getStore(key: string) {
    const store = globalStores[key] || options.createStore(key, {});
    return store;
  },
  updateStore(key: string, data: any) {
    const store: Store = globalStores[key];
    if (store) {
      Object.keys(data).forEach(k => {
        store.setData(k, data[k]);
      });
    } else {
      return options.createStore(key, data);
    }
  },
  delStore(key: string) {
    globalStores[key] = null;
  },
  hasStore(key: string) {
    return Boolean(globalStores[key]);
  },
};

export default options;
