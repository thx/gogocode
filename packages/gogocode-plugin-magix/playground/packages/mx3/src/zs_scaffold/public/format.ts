/*md5:aa27efa26f5048ec6eacb59c8ff03b48*/
/*
 * 公共数据格式化处理
 */
// import Magix from 'magix'
import Numeral from './numeral'
import Dayjs from './dayjs'
import All from './constant'
const DefFontSize = 20,
  DefFontGap = 6

export default {
  /**
   * 指标对比
   */
  vs: (a, b) => {
    a = +a || 0
    b = +b || 0
    if (a == 0 || b == 0 || a == b) {
      return ''
    }

    // 只保留整数位
    let percent = parseInt((Math.abs(a - b) / b) * 100 + '')
    if (percent > 0) {
      if (a > b) {
        return `<span class="color-red font-number">+${percent}%</span>`
      } else {
        return `<span class="color-green font-number">-${percent}%</span>`
      }
    } else {
      return ''
    }
  },
  /**
   * 先格式化，再样式处理
   * 入参n为一个纯数字
   */
  over(n, scale, p, fontsize) {
    if (n === null || n === undefined || n === '' || isNaN(+n)) {
      return All.empty
    }

    n = +n || 0
    p = p + '' === '0' ? 0 : +p || 2
    scale = +scale || 1
    fontsize = +fontsize || DefFontSize
    let smallsize = Math.max(fontsize - DefFontGap, 12)

    let v = Numeral(n / scale).format('0,0.'.padEnd(4 + p, '0'))
    let match = (v + '').split('.')
    let result =
      '<span class="fontsize-' +
      fontsize +
      ' bold font-number">' +
      match[0] +
      '</span>'
    if (match[1]) {
      result +=
        '.<span class="fontsize-' +
        smallsize +
        ' bold font-number">' +
        match[1] +
        '</span>'
    }
    return result
  },
  /**
   * 先格式化，再样式处理
   * 入参n为一个纯数字
   */
  overMoney(n, scale, p, fontsize) {
    if (n === null || n === undefined || n === '' || isNaN(+n)) {
      return All.empty
    }

    n = +n || 0
    p = p + '' === '0' ? 0 : +p || 2
    scale = +scale || 1
    fontsize = +fontsize || DefFontSize
    let smallsize = Math.max(fontsize - DefFontGap, 12)

    let v = Numeral(n / scale).format('0,0.'.padEnd(4 + p, '0'))
    let match = (v + '').split('.')
    let result =
      '<span class="fontsize-' +
      fontsize +
      ' bold font-number">' +
      match[0] +
      '</span>'
    if (match[1]) {
      result +=
        '.<span class="fontsize-' +
        smallsize +
        ' bold font-number">' +
        match[1] +
        '</span>'
    }
    return '￥' + result
  },
  /**
   * 可能是格式化之后的入参 v = 1,00.00
   * 该方法仅处理样式
   */
  overStyle(n, fontsize) {
    if (n === null || n === undefined || n === '' || n === '') {
      return All.empty
    }

    fontsize = +fontsize || DefFontSize
    let smallsize = Math.max(fontsize - DefFontGap, 12)

    let match = (n + '').split('.')
    let result =
      '<span class="fontsize-' +
      fontsize +
      ' bold font-number">' +
      match[0] +
      '</span>'
    if (match[1]) {
      result +=
        '.<span class="fontsize-' +
        smallsize +
        ' bold font-number">' +
        match[1] +
        '</span>'
    }

    return result
  },
  /**
   * 数字百分比显示并，号格式化
   * 例：0.01 -> 1.00%     2.1314 -> 213.14%     12345789.1234 -> 12,345,678,912.34%
   */
  formatPer(n) {
    if (n === null || n === undefined || n === '' || isNaN(+n)) {
      return All.empty
    }
    n = +n || 0
    return Numeral(n * 100).format('0,0.00') + '%'
  },
  /**
   * 数字取整并(四舍五入)，号格式化
   * 例：0.1 -> 0     10.1 -> 10     12345789.12 -> 123,456,789
   */
  formatInt(n) {
    if (n === null || n === undefined || n === '' || isNaN(+n)) {
      return All.empty
    }
    n = +n || 0
    return Numeral(Math.round(n)).format('0,0')
  },
  /**
   * 数字，号格式化 P代表小数有几位 默认2位小数
   * p=0为例：0 -> 0     10 -> 10     12345789 -> 123,456,789
   * p=2为例：0 -> 0.00  10 -> 10.00  12345789 -> 123,456,789.00
   */
  formatFloat(n, p) {
    if (n === null || n === undefined || n === '' || isNaN(+n)) {
      return All.empty
    }
    n = +n || 0
    p = p + '' === '0' ? 0 : +p || 2
    return Numeral(n).format('0,0.'.padEnd(4 + p, '0'))
  },
  /**
   * 数字除以100然后再，号格式化 P代表小数有几位 默认2位
   * 常用于现金格式转换 将"分"换算成"元"
   * p=2为例：0 -> 0.00   10 -> 0.10   12345789 -> 1,234,567.89
   * 注意：非数字传入返回0.00
   */
  formatCash(n, p) {
    if (n === null || n === undefined || n === '' || isNaN(+n)) {
      return All.empty
    }
    n = +n || 0
    p = p + '' === '0' ? 0 : +p || 2
    return Numeral(n / 100).format('0,0.'.padEnd(4 + p, '0'))
  },
  /**
   * ￥0,0.00
   */
  formatMoney(n, scale, p) {
    if (n === null || n === undefined || n === '' || isNaN(+n)) {
      return All.empty
    }

    n = +n || 0
    scale = scale || 1
    p = p + '' === '0' ? 0 : +p || 2
    return '￥' + Numeral(n / scale).format('0,0.'.padEnd(4 + p, '0'))
  },
  /**
   * 日期格式化
   * 常用例：2022-01-01 23:59:59 -> 2022-01-01
   */
  formatDate(
    val,
    outFormat = All.dateFormater,
    empty = All.empty,
    inputFormat = undefined
  ) {
    let date = inputFormat ? Dayjs(val, inputFormat) : Dayjs(val)
    if (date.isValid()) {
      return date.format(outFormat)
    }
    return empty
  },

  // 带 + - 的百分比格式化
  formatPerUd(n) {
    const val = this.formatPer(n)
    const isUp = n >= 0
    return `<span class="color-${isUp ? 'red' : 'green'}">${
      isUp ? '+' : ''
    }${val}</span>`
  },

  // 带 + - 的整数格式化
  formatIntUd(n) {
    const val = this.formatInt(n)
    const isUp = n >= 0
    return `<span class="color-${isUp ? 'red' : 'green'}">${
      isUp ? '+' : ''
    }${val}</span>`
  },

  // 带 + - 的浮点数格式化
  formatFloatUd(n, p) {
    const val = this.formatFloat(n, p)
    const isUp = n >= 0
    return `<span class="color-${isUp ? 'red' : 'green'}">${
      isUp ? '+' : ''
    }${val}</span>`
  }
}
