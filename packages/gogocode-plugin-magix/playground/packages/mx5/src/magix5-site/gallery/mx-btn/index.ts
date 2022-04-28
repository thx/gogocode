import Magix5, { type } from 'magix5';
// import * as View from '../mx-util/view';

Magix5.applyStyle('@:./index.less');

enum Size {
  large = 'large',
  normal = 'normal',
  small = 'small',
}

enum Type {
  brand = 'brand',
  default = 'default',
  hollow = 'hollow',
  white = 'white',
  text = 'text',
}

export default Magix5.View.extend({
  tmpl: '@:./index.html',
  assign(data) {
    let _self = this;

    let {
      content = '',
      type = Type.default,
      size = Size.normal,
      disabled,
      tagContent = '',
      tagColor = '',
      width = '100%',
      color = '', // 背景颜色
      colorHover, // 背景hover颜色
      colorText = '#ffffff', // 文本颜色
      colorHoverText, // 文本hover颜色
    } = data;

    let styles = [],
      classes = [];

    // 自定义颜色时
    if (color) {
      classes.push('mx5-btn-custom');
      styles.push(`--mx5-btn-custom-color:${color}`);
      styles.push(`--mx5-btn-custom-color-hover:${colorHover || color}`);
      styles.push(`--mx5-btn-custom-color-text:${colorText}`);
      styles.push(
        `--mx5-btn-custom-color-text-hover:${colorHoverText || colorText}`
      );
    } else {
      // 按钮类型
      if (type in Type && type !== Type.default) {
        classes.push(`mx5-btn-${type}`);
      }
    }

    // 按钮尺寸
    if (size in Size && size !== Size.normal) {
      classes.push(`mx5-btn-${size}`);
    }
    styles.push(`width:${width};`);

    // 是否可用
    disabled = disabled === 'true' ? true : false;

    _self.set({
      content,
      disabled,
      tagContent,
      tagColor,
      styles: styles.join(';'),
      classes: classes.join(' '),
    });
  },
  async render() {
    await this.digest();
  },
});
