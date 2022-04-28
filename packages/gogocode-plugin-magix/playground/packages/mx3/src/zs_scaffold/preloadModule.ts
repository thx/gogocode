export default {
  // 预加载静态资源
  start (customOptions = {}) {
    const options = {
      BATCH_COUNT: 5, // 一次批量加载 BATCH_COUNT 个模块
      TIME_INTERVAL: 3000, // 每次批量加载模块的间隔时间，单位(ms)
      PRELOAD_DELAY: 5000// 开启预加载静态资源的延迟时间，单位(ms)
    }
    Object.assign(options, customOptions)

    seajs.use(['zs_scaffold/preloadModuleList'], (ModuleList) => {
      if (!ModuleList) {
        return
      }

      setTimeout(e => {
        let i = 0

        // 间隔预加载资源主函数
        function recur () {
          const currModules = ModuleList.default.slice(i * options.BATCH_COUNT, (i + 1) * options.BATCH_COUNT)
          i++
          if (currModules.length) {
            console.log('%c预加载模块: ', 'color: blue')
            console.log(currModules.join('\n'))
            seajs.use(currModules)
            setTimeout(() => {
              recur()
            }, options.TIME_INTERVAL)
          } else {
            console.log('%c所有模块预加载完毕！', 'color: green')
          }
        }

        recur()
      }, options.PRELOAD_DELAY)
    })
  }
}
