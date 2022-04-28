import Magix5 from 'magix5';

Magix5.applyStyle('@:./banner.less');

import View from '../../../view';

export default View.extend({
  tmpl: '@:./banner.html',
  assign(extra) {
    this.set(extra);
  },
  async render() {
    await this.digest();
  },
  'navigate<click>'(e) {
    const { path, target = '_blank' } = e.params;
    window.open(path, target);
  },
});
