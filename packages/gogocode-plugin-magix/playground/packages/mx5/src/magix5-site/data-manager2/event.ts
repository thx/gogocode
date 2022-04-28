interface IEvent {
  on: (name: string, fn: (args?: any) => void, priority: number) => void;
  fire: (name: string, data?: any) => void;
  off: (name: string, fn: (args: any) => void) => void;
}

interface IFnObj {
  fn: (args?: any) => void;
  priority: number;
  executing?: boolean;
}

export default class implements IEvent {
  eventKey = 'datager_event';
  fnCaches = {};

  on(name: string, fn: (args?: any) => void, priority = 0, added = false) {
    const key = this.eventKey + name;
    const fns: IFnObj[] = this.fnCaches[key] || (this.fnCaches[key] = []);
    const len = fns.length;
    const fnObj = {
      priority,
      fn,
    };

    // 优先级
    for (let i = 0; i < len; i++) {
      if (fns[i].priority < priority) {
        fns.splice(0, 1, fnObj);
        added = true;
        break;
      }
    }

    !added && fns.push(fnObj);
  }

  fire(name, data = {}) {
    const key = this.eventKey + name;
    const fns: IFnObj[] = this.fnCaches[key] || [];
    for (const fnObj of fns) {
      fnObj.executing = true;
      fnObj.fn(data);
      fnObj.executing = false;
    }
  }

  off(name, fn) {
    const key = this.eventKey + name;
    const fns: IFnObj[] = this.fnCaches[key];
    if (fn) {
      if (fns) {
        for (let i = 0; i < fns.length; i++) {
          const fnObj = fns[i];
          if (fnObj.fn === fn) {
            fnObj.executing ? (fnObj.fn = null) : fns.splice(i, 1);
            break;
          }
        }
      }
    } else {
      this.fnCaches[key] = null;
    }
  }
}
