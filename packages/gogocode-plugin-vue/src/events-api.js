const scriptUtils = require('../utils/scriptUtils');
module.exports = function (ast, api, options) {

    // gogocodeTransfer.js 文件不需要转换
    if (options.filePath && options.filePath.includes('gogocodeTransfer.js')) {
        return ast;
    }

    const script = ast.parseOptions && ast.parseOptions.language === 'vue' ? ast.find('<script></script>') : ast;

    const emitterCode = `
    const eventRegistryMap = new WeakMap()
    function getRegistry(instance) {
      let events = eventRegistryMap.get(instance)
      if (!events) {
        eventRegistryMap.set(instance, (events = Object.create(null)))
      }
      return events
    }
    export function $on(instance, event, fn) {
      if (Array.isArray(event)) {
        event.forEach((e) => $on(instance, e, fn))
      } else {
        const events = getRegistry(instance)
        ;(events[event] || (events[event] = [])).push(fn)
      }
      return instance
    }
    export function $once(instance, event, fn) {
      const wrapped = (...args) => {
        $off(instance, event, wrapped)
        fn.call(instance, ...args)
      }
      wrapped.fn = fn
      $on(instance, event, wrapped)
      return instance
    }
    export function $off(instance, event, fn) {
      const vm = instance
      // all
      if (!event) {
        eventRegistryMap.set(instance, Object.create(null))
        return vm
      }
      // array of events
      if (Array.isArray(event)) {
        event.forEach((e) => $off(instance, e, fn))
        return vm
      }
      // specific event
      const events = getRegistry(instance)
      const cbs = events[event]
      if (!cbs) {
        return vm
      }
      if (!fn) {
        events[event] = undefined
        return vm
      }
      events[event] = cbs.filter((cb) => !(cb === fn || cb.fn === fn))
      return vm
    }
    export function $emit(instance, event, ...args) {
      instance && instance.$emit && instance.$emit(event, ...args)
      const cbs = getRegistry(instance)[event]
      if (cbs) {
        cbs.map((cb) => cb.apply(instance, args))
      }
      return instance
    }
    `;

    if (script.find(['$_$1.$emit($$$)', '$_$1.$on($$$)', '$_$1.$off($$$)', '$_$1.$once($$$)']).length) {
        const relativePath = scriptUtils.addUtils(api.gogocode, emitterCode, options.outRootPath, options.outFilePath);

        script
            .replace('$_$1.$emit($$$)', `$emit($_$1, $$$)`)
            .replace('$_$1.$on($$$)', `$on($_$1, $$$)`)
            .replace('$_$1.$off($$$)', `$off($_$1, $$$)`)
            .replace('$_$1.$once($$$)', `$once($_$1, $$$)`);

        if (!script.has(`import { $on, $off, $once, $emit } from '${relativePath}'`)) {
            script.before(`import { $on, $off, $once, $emit } from '${relativePath}';\n`);
        }
    }

    return ast;
};
