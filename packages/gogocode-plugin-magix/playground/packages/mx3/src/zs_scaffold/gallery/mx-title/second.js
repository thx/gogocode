/*md5:cb383c39b4a9cdaaa1b6529d814bbeaf*/
let Magix = require('magix');
let Base = require('@./base');

module.exports = Base.extend({
    render() {
        this.updater.digest({
            second: true
        });
    }
});