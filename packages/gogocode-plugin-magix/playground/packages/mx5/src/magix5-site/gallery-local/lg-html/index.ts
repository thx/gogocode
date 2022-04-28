import Magix5 from 'magix5';

Magix5.applyStyle('@:./index.less');

import View from '../../view';
import highlight from 'highlight';

export default View.extend({
  tmpl: '@:./index.html',
  init() {
    this.on('domready', () => {
      highlight.highlightAll();
    });
  },
  assign(extra) {
    this.set(extra);
  },
  async render() {
    await this.digest();
  },
});
