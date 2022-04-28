import Magix5 from 'magix5';

export default Magix5.View.extend({
  tmpl: '@:./index.html',
  init(extra) {
    this.assign(extra);
  },
  assign(extra, configs) {
    this.set(extra);
  },
  async render() {
    await this.digest();
  },
});
