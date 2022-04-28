import Magix from 'magix'
import View from 'zs_scaffold/view'

export default View.extend({
  tmpl: '@side_no.html',
  init(options) {
    this.options = options
  },
  async render() {
    let loc = Magix.Router.parse()
    const [list] = await Promise.all([this.getList()])

    this.updater.digest({
      list
    })
  },

  // 本域下的接口
  async getList() {
    try {
      const params = {}
      const models = [
        {
          name: 'api_list_:id_query_:groupid_get_get',
          pathMap: {
            ':id': 1111,
            ':groupid': 2222
          },
          params
        }
      ]
      const [model] = await this.fetch(models)
      const list = model.get('data.list', [])
      return list
    } catch (error) {
      console.error(error)
    }
  },

  'show<click>'(e) {
    this.mxModal(
      '@./side_dialog',
      {
        callback: data => {
          // 确定回调
        }
      },
      {
        width: 600,
        header: {
          title: '全屏右出浮层',
          tip: '提示信息'
        }
      }
    )
  }
})
