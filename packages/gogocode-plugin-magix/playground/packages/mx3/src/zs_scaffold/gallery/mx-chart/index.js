/*md5:aee59e8e37ec99ea7277014e1a9982f3*/
let Chartx = require('../../chartpark/index');
Chartx = Chartx.default || Chartx;

let ChartFactory = require('./chart');

let View = ChartFactory(Chartx);

module.exports = View;