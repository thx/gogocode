import Magix5 from 'magix5';

Magix5.applyStyle('@:./index.less');

import View from '../../../view';

export default View.extend({
  tmpl: '@:./index.html',
  assign(extra) {
    this.set(extra);
  },
  async render() {
    await this.digest();
  },
});
