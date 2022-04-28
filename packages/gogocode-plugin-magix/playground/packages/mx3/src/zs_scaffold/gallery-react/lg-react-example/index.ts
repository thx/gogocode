/*md5:f3ebf04f6c4ff9cde92ef3632dcac9b9*/
import Magix from 'magix'
import View from '../../view'
Magix.applyStyle('@index.less')

window.__CROSS_ONE_SITE_CONFIG__ = {
  'mm-portal-playground-callee': {
    remote: 'https://dev.g.alicdn.com/mmfs/mm-portal-playground-callee/20210709.2200.1234/remote.js',
    scripts: {
      // <!-- 🔧 工具库 自适应 -->
      'CellLibFit': '//g.alicdn.com/cell/lib-fit/0.0.2/index.js',
      // <!-- 🔧 基础框架 React -->
      'React': '//g.alicdn.com/code/lib/react/16.14.0/umd/react.development.js',
      'ReactDOM': '//g.alicdn.com/code/lib/react-dom/16.14.0/umd/react-dom.development.js',
      'ReactRtouerDOM': '//g.alicdn.com/code/lib/react-router-dom/5.2.0/react-router-dom.js',
      'styled': '//g.alicdn.com/code/lib/styled-components/4.3.2/styled-components.js',
      // <!-- 🔧 基础组件 Next -->
      'Next': '//alifd.alicdn.com/npm/@@alifd/next/1.21.16/next.min.js',
      // <!-- 🔧 微前端工具集 MPortal -->
      'MPortal': '//g.alicdn.com/mmfs/mm-portal/0.0.15/umd/MPortal.js'
    },
    styles: [
      // Fusion 自定义主题包
      '//unpkg.alibaba-inc.com/@@alife/theme-blue@@1.4.4/variables.css',
      // DS Token 映射文件，Magix Gallary <=> Fusion Design
      '//g.alicdn.com/mmfs/mm-portal/0.0.15/umd/react.var.min.css',
      // Fusion 默认主题样式
      '//alifd.alicdn.com/npm/@@alifd/next/1.21.16/next.var.min.css'
    ]
  }
}

export default View.extend({
  tmpl: '@index.html',
  async init ({ ...extra }) {
    this.updater.set({
      scope: 'mm-portal-playground-callee'
    })
    // 测试：用于模拟参数变化
    this.updater.set({
      start: Date.now() + 24 * 60 * 60 * 1000 * 2
    })
  },
  render () {
    // 测试：用于模拟参数变化
    setInterval(() => {
      this.updater.set({
        time: this.updater.get('start') - Date.now()
      })
      this.updater.digest()
    }, 1000)
  }
})
