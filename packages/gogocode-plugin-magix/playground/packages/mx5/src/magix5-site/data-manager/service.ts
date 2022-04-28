export const services = new Map();

interface IPart {
  state: any;
  handles: any;
}

function Service(manager) {
  this.manager = manager;
  this.members = new Map();
  this.addMember = () => {};
  this.removeMember = () => {};

  this.use = (name: string, part: IPart | IPart[]) => {
    return this.manager.use(part);
  };
  this.dispatch = (name: string, methodName: string, ...args) => {};
}

export function createService(key, manager) {
  if (!services.get(key)) {
    const service = new Service(manager);
    services.set(key, service);
    return Service;
  }
}

export function getService(key) {
  let service;
  if ((service = services.get(key))) {
    return service;
  }
}
