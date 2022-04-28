/*md5:db7019cbf23951a01dea0e56cf6620ea*/
/**
 * TODO
 * 1. √ 公共资源怎么加载
 * 2. √ 加载状态怎么控制
 * 3. √ 数据变化怎么更新
 * 4. √ 主题样式怎么适配
 */

import Magix from 'magix'
import View from '../../view'
import loadRemoteScript from './loadRemoteScript'
import loadRemoteStyle from './loadRemoteStyle'
import CROSS_ONE_SITE_CONFIG from './CROSS_ONE_SITE_CONFIG'

Magix.applyStyle('@index.less')

const DEBUG = !false

// eslint-disable-next-line camelcase
async function __init_deps__ (app: string) {
  const { scripts, styles } = CROSS_ONE_SITE_CONFIG[app]
  for (let style of styles) {
    await loadRemoteStyle(style)
  }
  for (let library in scripts) {
    if (window[library]) continue
    await loadRemoteScript(scripts[library])
  }
}

interface IViewProps {
  scope: string;
  module: string;
}

interface IRemoteProps extends IViewProps {
  remote: string;
  others: any;
}

// eslint-disable-next-line camelcase
function __parse_remote_props__ (props: IViewProps): IRemoteProps {
  let { scope, module, ...others } = props
  return {
    scope,
    remote: CROSS_ONE_SITE_CONFIG[scope].remote,
    module,
    others
  }
}

export default View.extend({
  tmpl: '@index.html',
  async init (props: IViewProps) {
    // 初始化依赖模块。
    await __init_deps__(props.scope)
    // 手动执行一次参数解析，后续参数变化后，会自动执行。
    await this.assign(props)

    // 监听卸载事件，同步卸载 React 组件。
    this.on('destroy', () => {
      if (!this.$state || !this.$state.callee) return

      if (DEBUG) {
        console.group(`${Date.now()} destroy magix view #${this.id}`)
      }
      this.$state.callee.unmount(
        document.getElementById(this.id),
        () => {
          if (DEBUG) {
            console.log(Date.now(), 'unmount react module', module)
            console.groupEnd()
          }
        }
      )
    })
  },
  async assign (nextProps: IViewProps) {
    // 解析 Magix Veiew 参数
    this.$props = __parse_remote_props__(nextProps)
    // 加载远程 React 模块
    const { loadRemoteModule, ReactCalleeFactory } = window.MPortal
    const { default: Module } = await loadRemoteModule(this.$props /* { remote, module } */)
    // 初始化 callee，统一挂载&卸载 API { mount, unmount }
    this.$state = {
      callee: ReactCalleeFactory(Module)
    }
    // 总是继续执行渲染
    return true
  },
  render () {
    this.updater.digest()

    const nextModuleProps = this.$props.others
    this.$state.callee.mount(
      document.getElementById(this.id),
      nextModuleProps,
      () => {
        if (DEBUG) {
          console.group(`${Date.now()} mount react module at #${this.id}`)
          console.log(this.$props.remote)
          console.log(this.$props.module)
          console.groupEnd()
        }
      }
    )
  }
})
