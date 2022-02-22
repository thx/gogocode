const icon = require('./icon')
const vModelEle = require('./v-model-ele')

module.exports = [
    { name: 'icon', rule: icon, test: /\.vue$/ },
    { name: 'v-model-ele', rule: vModelEle, test: /\.vue$/ },
];
