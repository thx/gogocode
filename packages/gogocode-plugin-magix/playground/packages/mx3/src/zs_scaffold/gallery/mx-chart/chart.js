/*md5:d610a712264b03bc7b31389352de8ea8*/
let Magix = require('magix');
let $ = require('$');

function stringify(obj) {
    return JSON.stringify(obj, function (key, value) {
        if (typeof value === 'function') {
            return value.toString();
        }
        return value;
    });
}

module.exports = function (Chartx) {
    return Magix.View.extend({
        init(options) {
            let me = this;
            me.assign(options);
        },
        /**
     * 检测当前传入属性是否变化，变化后则重绘组件
     * @param {Object} extra 用户传入属性
     * @param {number} extra.chartId 可选、chartpark 图表id; 若不传入chartId则必须传入options
     * @param {Array} extra.data 必选、绘制图表使用的数据
     * @param {Object} extra.variables 可选、绘制图表使用的变量
     * @param {Boolean} extra.force 可选、是否强制重绘，如无特殊需求，不建议开启
     * @param {Object} extra.options 可选、绘制图表使用的配置；无chartId时，使用options直接作为图表配置；若同时传入chartId，则使用options覆盖chartpark中的图表配置
     * @param {Object} ctrl Magix传入
     * @return {Boolean} 是否重绘组件，true则重绘
     */
        assign(extra, ctrl) {
            if (ctrl) {
                ctrl.deep = false;
            }
            let {
                chartId: oldChartId,
                options: oldOptions,
                data: oldData,
                variables: oldVariables
            } = this.updater.get();
            let { chartId, options, data, variables, force } = extra;
            this.updater.set({ chartId, options, data, variables });
            let chart = this.capture('chart');

            if (!chart || force) {
                if (chart && force) {
                    chart.destroy();
                }
                let newChartOptions = Chartx.getOptions(chartId, options, data, variables);
                chart = Chartx.create(this.id, data, this.removeUndefined(newChartOptions));
                this.capture('chart', chart);
                return !!force;
            }

            if (oldChartId !== chartId) {
                let newChartOptions = Chartx.getOptions(chartId, options, data, variables);
                chart.reset(this.removeUndefined(newChartOptions), data);
            } else {
                let userOptionsChange = stringify(options) !== stringify(oldOptions)
                    || stringify(variables) !== stringify(oldVariables);
                let dataChange = stringify(data) !== stringify(oldData);

                if (userOptionsChange) {
                    let newChartOptions = Chartx.getOptions(chartId, options, data, variables);

                    chart.reset(this.removeUndefined(newChartOptions), data);
                } else if (dataChange) {
                    chart.resetData(data);
                }
            }
            return false;
        },
        removeUndefined(options) {
            for (let key in options) {
                if (options[key] === undefined) {
                    delete options[key]
                }
            }
            return options;
        },
        render() {
        },
        '$doc<navslidend>'() {
            Chartx.resize();
        },
        '$win<resize>'() {
            Chartx.resize();
        }
    });
}