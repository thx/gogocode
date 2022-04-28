import Magix5 from 'magix5';

Magix5.applyStyle('@:./index.less');
import View from '../../view';

export default View.extend<{
  dispatchEvent(): void;
}>({
  tmpl: '@:./index.html',
  assign(data) {
    let {
      value = '',
      placeholder,
      disabled,
      maxlength,
      showDelete,
      prepend, // 前置
      append, // 后置
    } = data;

    // 类型转换
    disabled = disabled === 'true' ? true : false;
    maxlength = parseInt(maxlength);
    showDelete = showDelete === 'true' ? true : false;

    this.set({
      value,
      placeholder,
      maxlength,
      disabled,
      showDelete,
      prepend,
      append,
    });
  },
  async render() {
    await this.digest();
  },
  dispatchEvent() {
    let node = document.querySelector<HTMLInputElement>(`#${this.id}_input`);
    let value = node.value;
    // 派发事件到该组件的vframe
    Magix5.dispatch(this.root, 'change', {
      value,
    });
  },
  async 'clear<click>'() {
    await this.digest({
      value: '',
    });
    this.dispatchEvent();
  },
  async 'fire<input>'(e) {
    e.stopPropagation();
    this.set({
      value: e.eventTarget.value,
    });
    this.dispatchEvent();
  },
  'stop<change>'(e) {
    e.stopPropagation();
  },
});
