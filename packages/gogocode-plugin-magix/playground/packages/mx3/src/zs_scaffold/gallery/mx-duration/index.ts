/*md5:d2d7a3645d73115d2614cde3a0894985*/
/**
 * 时段溢价
 * discount：已选数据 '00:00-12:00:100,12:00-24:00:250;00:00-24:00:100;00:00-24:00:100;00:00-24:00:100;00:00-24:00:100;00:00-24:00:100;00:00-24:00:100',
 * width：容器宽度，最小
 * type：half 半小时，hour一小时，默认half
 */
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
import * as Form from '../mx-form/index';
import * as Validator from '../mx-form/validator';
import ColorMap from './colors';
const Data = {
    none: '0;0;0;0;0;0;0',
    def: '00:00-24:00:100;00:00-24:00:100;00:00-24:00:100;00:00-24:00:100;00:00-24:00:100;00:00-24:00:100;00:00-24:00:100'
}
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@index.html',
    mixins: [Form, Validator],
    init(extra) {
        let that = this;
        that.assign(extra);

        that.on('destroy', () => {
            $(document.body).off('mousemove.duration');
            $(document.body).off('mouseup.duration');
            clearTimeout(that.hoverTimeout);
            clearTimeout(that.hideTimeout);
        })
    },
    assign(extra) {
        let that = this;
        that.updater.snapshot();

        let half = (/^true$/i).test(extra.half),
            custom = (extra.custom + '' !== 'false'), //是否支持自定义折扣范围，默认true
            timeDiscount = extra.selected || Data.none,
            gap = 24,
            columnNum = 7, //一列有多少个格子
            multiple = half ? 2 : 1; //倍数

        let colorMap = ColorMap[extra.bizCode] || ColorMap.def;
        let discountColorMap = {};
        for (let i = 0; i <= 250; i++) {
            discountColorMap[i] = '#ffffff';
            for (let k in colorMap) {
                let range = k.substring(1, k.length - 1).split(',');
                let rangeMin = +range[0], rangeMax = +range[1];
                if (i >= rangeMin && i < rangeMax) {
                    discountColorMap[i] = colorMap[k];
                    break;
                }
            }
        }

        // 提示渐变点
        let dots = [];

        // 支持的折扣设置选项
        let settingList = [{
            text: '无折扣',
            value: 2
        }, {
            text: '不投放',
            value: 3
        }];

        if (custom) {
            settingList.unshift({
                text: '自定义',
                value: 1
            })
            dots = [{
                text: '30-100%',
                value: discountColorMap[65]
            }, {
                text: '100-200%',
                value: discountColorMap[150]
            }, {
                text: '200-250%',
                value: discountColorMap[225]
            }]
        }

        // 单格宽度
        let boxWidth = +extra.boxWidth;
        if (!boxWidth) {
            boxWidth = half ? 18 : 32;
        }
        let maxWidth = boxWidth * (25 * multiple);
        let rowNum = gap * multiple;
        let boxLength = rowNum * columnNum;

        that.updater.set({
            readonly: (extra.readonly + '' === 'true'),
            discountColorMap,
            dots,
            timeDiscount,
            weeks: ['一', '二', '三', '四', '五', '六', '日'],
            ranges: ['00:00 - 06:00', '06:00 - 12:00', '12:00 - 18:00', '18:00 - 24:00'],
            multiple, //以一小时算一格还是半小时算一格 1半小时，2一小时
            maxWidth, //容器整体宽度
            rowNum, //一行有多少个格子
            columnNum, //一列有多少个格子
            headerHeight: 60, //头部内容高度（+border1）
            boxWidth, //单个格子宽度
            boxHeight: 40, //单个格子高度
            boxLength, //格子总数
            boxZones: that.getBoxzone(boxLength),
            valid: '', //整体校验
            maskInfo: { //选择区域遮罩浮层
                show: false,
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                startRow: 0,
                endRow: 0,
                startColumn: 0,
                endColumn: 0,
                selectedZones: []
            },
            settingList,
            settingInfo: { //选中区域设置浮层
                show: false,
                week: '',
                time: '',
                discount: '',
                type: settingList[0].value
            },
            hoverInfo: { //鼠标hover提示浮层
                show: false,
                left: 0,
                top: 0,
                week: '',
                time: '',
                discount: ''
            }
        })

        let altered = that.updater.altered();
        return altered;
    },

    /**
     * 精度问题：https://github.com/camsong/blog/issues/9
     * 只保留一位小数
     * strip(num, precision = 12) {
     *      return +(parseFloat(num.toPrecision(precision)).toFixed(2));
     * }
     */
    render() {
        let that = this;
        let { timeDiscount, boxLength } = that.updater.get();

        let array = that.report2Array(timeDiscount);
        for (let i = 0; i < boxLength; i++) {
            that.setBoxDiscount(i, array[i]);
        }

        that.updater.digest();
        that.wrapper = $('#' + that.id + '_duration');
    },

    /**
     * 提交格式转化为数组，半小时一格
     * 00:00-24:00:100;
     * 00:00-01:00:100,01:00-14:00:120,14:00-21:00:70,21:00-24:00:200;
     * 00:00-24:00:100......
     */
    report2Array(report) {
        let array = [];
        let that = this;
        let { rowNum, multiple } = that.updater.get();

        let arr = report.split(';'); // ;分隔天的内容
        for (let i = 0, aLen = arr.length; i < aLen; i++) {
            let list = arr[i].split(','); // ,分隔一天内时段的内容
            for (let j = 0, lLen = list.length; j < lLen; j++) {
                if (list[j] == '0') { // 该日下全部不投放
                    continue;
                }
                let darray = list[j].match(/(\d{2}):(\d{2})-(\d{2}):(\d{2}):(\d+)/);
                // for (let t = 1; t <= 5; t++) {
                //     darray[t] = parseInt(darray[t]);
                // }
                // 00:00-24:00:100
                // 分解成['00:00-24:00:100', '00', '00', '24', '00', '100']
                //i表示星期几，第几行
                let start = parseInt(darray[1]) * multiple + rowNum * i;
                if (darray[2] == '30') {
                    start++;
                }
                let end = parseInt(darray[3]) * multiple + rowNum * i;
                if (darray[4] == '30') {
                    end++;
                }

                let discount = parseInt(darray[5]);

                for (let index = start; index <= end - 1; index++) {
                    array[index] = discount;
                }
            }
        }
        return array;
    },

    /**
     * 将时段设置成对应的折扣值及颜色
     */
    setBoxDiscount(index, discount) {
        let that = this;
        discount = parseInt(discount) || 0;

        let { discountColorMap, boxZones } = this.updater.get();
        Magix.mix(boxZones[index], {
            bg: discountColorMap[discount],
            discount
        })

        that.updater.set({
            boxZones
        })
    },

    /**
     * 时段选择
     */
    'select<mousedown>'(downEvent) {
        downEvent.preventDefault();

        let that = this;
        let { readonly, hoverInfo, settingInfo, maskInfo, boxWidth, multiple, headerHeight } = that.updater.get();
        if (readonly) {
            return;
        }

        hoverInfo.show = false;
        settingInfo.show = false;

        let wrapper = that.wrapper;
        let { left: wrapperLeft, top: wrapperTop } = wrapper.offset();
        let startX = downEvent.pageX - wrapperLeft;
        let startY = downEvent.pageY - wrapperTop;

        $(document.body).off('mousemove.duration')
            .on('mousemove.duration', function (moveEvent) {
                moveEvent.preventDefault();

                let diffX = moveEvent.pageX - wrapperLeft;
                let diffY = moveEvent.pageY - wrapperTop;
                let endX = Math.min(diffX, wrapper.outerWidth());
                let endY = Math.min(diffY, wrapper.outerHeight());

                let left = Math.max(boxWidth * multiple, Math.min(startX, endX)),
                    top = Math.max(headerHeight, Math.min(startY, endY));
                that.updater.digest({
                    hoverInfo,
                    settingInfo,
                    maskInfo: Magix.mix(maskInfo, {
                        left,
                        top: top + 1,
                        width: Math.max(startX, endX) - left,
                        height: Math.max(startY, endY) - top,
                        show: true
                    })
                })
            });

        $(document.body).off('mouseup.duration')
            .on('mouseup.duration', function (upEvent) {
                if (!maskInfo.show) {
                    return;
                }

                upEvent.preventDefault();
                $(document.body).off('mousemove.duration');

                that.selectEnd();
                $(document.body).off('mouseup.duration');
            });
    },

    selectEnd(indexStart) {
        let that = this;
        let updater = that.updater;
        let { maskInfo, headerHeight, boxHeight, boxWidth, multiple, columnNum, rowNum } = updater.get();

        // 从0开始
        let row1 = parseInt((maskInfo.top - headerHeight) / boxHeight);
        let row2 = parseInt((maskInfo.height + maskInfo.top - headerHeight) / boxHeight);
        let column1 = parseInt((maskInfo.left - boxWidth * multiple) / boxWidth);
        let column2 = parseInt((maskInfo.width + maskInfo.left - boxWidth * multiple) / boxWidth);
        let startRow = Math.max(0, row1);
        let endRow = Math.min(columnNum - 1, row2);
        let startColumn = Math.max(0, column1);
        let endColumn = Math.min(rowNum - 1, column2);

        let selected = [];
        for (let i = startRow; i <= endRow; i++) {
            for (let j = startColumn; j <= endColumn; j++) {
                selected.push(i * rowNum + j);
            }
        }

        Magix.mix(maskInfo, {
            selectedZones: selected,
            startRow,
            endRow,
            startColumn,
            endColumn,
            left: boxWidth * multiple + startColumn * boxWidth,
            top: headerHeight + startRow * boxHeight + 1,
            width: (endColumn - startColumn + 1) * boxWidth,
            height: (endRow - startRow + 1) * boxHeight,
            show: true
        })

        that.showSetting();
    },

    /**
     * 选中情况下点击其他区域隐藏选中区域
     */
    'clickOutside<click>'(event) {
        let that = this;
        let { readonly, maskInfo } = that.updater.get();
        if (readonly) {
            return;
        }

        let index = +event.params.index;
        if (!maskInfo.show ||
            (maskInfo.show && maskInfo.selectedZones.indexOf(index) > -1)) {
            return;
        }
        event.preventDefault();
        $(document.body).off('mousemove.duration');
        $(document.body).off('mouseup.duration');
        $(document.body).off('click.duration');
        that['cancelSetting<click>']();
    },

    'changeSettingType<change>'(event) {
        let that = this;
        let settingInfo = that.updater.get('settingInfo');
        settingInfo.type = event.params.type;
        that.updater.digest({
            settingInfo
        })
    },

    'submitSetting<click>'() {
        let that = this;
        let { settingList, settingInfo, maskInfo } = that.updater.get();
        let discount = 0;
        let valid = true;

        switch (+settingInfo.type) {
            case 1: //自定义
                valid = that.isValid();
                discount = settingInfo.discount;
                break;
            case 2: //无折扣
                discount = 100;
                break;
            case 3: //不投放
                discount = 0;
                break;

        }

        if (!valid) {
            return;
        }

        settingInfo.show = false;
        settingInfo.type = settingList[0].value;
        maskInfo.show = false;

        for (let i = 0; i < maskInfo.selectedZones.length; i++) {
            that.setBoxDiscount(maskInfo.selectedZones[i], discount);
        }

        that.updater.digest({
            settingInfo,
            maskInfo
        })
    },

    'cancelSetting<click>'() {
        let that = this;
        let { settingList, settingInfo, maskInfo } = that.updater.get();

        maskInfo.show = false;
        settingInfo.show = false;
        settingInfo.type = settingList[0].value;
        that.updater.digest({
            settingInfo,
            maskInfo
        })
    },

    showSetting() {
        let that = this;
        let { settingInfo, maskInfo, boxZones } = that.updater.get();

        let startweek = maskInfo.startRow + 1;
        let endweek = maskInfo.endRow + 1;

        let week;
        if (startweek != endweek) {
            week = that.formatweek(startweek) + ' - ' + that.formatweek(endweek);
        } else {
            week = that.formatweek(startweek);
        }
        settingInfo.week = week;
        settingInfo.time = that.getDuration(maskInfo.startColumn, maskInfo.endColumn + 1, '%s - %s');

        let selectedZones = maskInfo.selectedZones;
        let lastDiscount;
        let isSame = true;
        for (let i = 0; i < selectedZones.length; i++) {
            let index = selectedZones[i];
            let tempDiscount = boxZones[index].discount;
            if (!tempDiscount || (lastDiscount && tempDiscount != lastDiscount)) {
                isSame = false;
                break;
            }
            lastDiscount = tempDiscount;
        }
        settingInfo.discount = isSame ? lastDiscount : '';

        let settingInfoWidth = 260;
        let settingInfoHeight = 238;
        let wrapperWdith = that.wrapper.outerWidth();
        let wrapperHeight = that.wrapper.outerHeight();

        let left = (maskInfo.left + maskInfo.width / 2);
        if (left + settingInfoWidth > wrapperWdith) {
            left -= settingInfoWidth;
        }
        let top = (maskInfo.top + maskInfo.height / 2);
        if (top + settingInfoHeight > wrapperHeight + 100) {
            top -= settingInfoHeight;
        }

        that.updater.digest({
            boxZones,
            settingInfo: Magix.mix(settingInfo, {
                left,
                top,
                show: true
            }),
            maskInfo
        })
    },

    /**
     * 鼠标hover时段tip
     */
    'showTip<mouseover>'(event) {
        if (Magix.inside(event.relatedTarget, event.eventTarget)) {
            return;
        }

        let that = this;
        clearTimeout(that.hoverTimeout);
        clearTimeout(that.hideTimeout);
        let { maskInfo, settingInfo, boxWidth, boxHeight, headerHeight, rowNum, hoverInfo, boxZones } = that.updater.get();
        if (maskInfo.show || settingInfo.show) {
            return;
        }

        that.hoverTimeout = setTimeout(() => {
            let index = parseInt(event.params.index);

            let left = boxWidth + (index % rowNum + 1) * boxWidth;
            let top = headerHeight + (parseInt(index / rowNum) + 1) * boxHeight;
            let week = that.formatweek(parseInt(index / rowNum) + 1);
            let time = that.getDuration(index, index + 1, '%s - %s');
            let discount = boxZones[index].discount;

            that.updater.digest({
                hoverInfo: Magix.mix(hoverInfo, {
                    left,
                    top,
                    week,
                    time,
                    discount,
                    show: true
                })
            })
        }, 200);
    },

    'hideTip<mouseout>'(event) {
        if (Magix.inside(event.relatedTarget, event.eventTarget)) {
            return;
        }

        let that = this;
        clearTimeout(that.hoverTimeout);
        clearTimeout(that.hideTimeout);
        let updater = that.updater;
        let { maskInfo, settingInfo, hoverInfo } = updater.get();
        if (maskInfo.show || settingInfo.show) {
            return;
        }

        that.hideTimeout = setTimeout(() => {
            hoverInfo.show = false;
            that.updater.digest({
                hoverInfo
            })
        }, 200)
    },

    /**
     * 重置
     */
    'reset<click>'(event) {
        let that = this;
        let boxLength = that.updater.get('boxLength');

        for (let i = 0; i < boxLength; i++) {
            that.setBoxDiscount(i, 100);
        }
        that.updater.digest();
    },

    /**
     * 清空
     */
    'clear<click>'(event) {
        let that = this;
        let updater = that.updater;
        let boxLength = updater.get('boxLength');
        for (let i = 0; i < boxLength; i++) {
            that.setBoxDiscount(i, 0);
        }
        that.updater.digest();
    },

    array2Report(array) {
        let that = this;
        let updater = that.updater;
        let { columnNum, rowNum, multiple } = updater.get();

        let result = [];
        for (let row = 0; row < columnNum; row++) {
            result[row] = 0;
            let rowDatas = [];
            for (let column = 0; column < rowNum; column++) {
                let index = row * rowNum + column;
                let discount = array[index];
                if (!discount) {
                    continue;
                }

                let last = rowDatas[rowDatas.length - 1];
                if (last && last.discount == discount && last.end == column) {
                    last.end = column + 1;
                } else {
                    rowDatas.push({
                        start: column,
                        end: column + 1,
                        discount: discount
                    })
                }
            }
            let rowStrs = rowDatas.map(r => {
                return that.getDuration(r.start, r.end) + ':' + r.discount;
            })
            if (rowStrs && rowStrs.length > 0) {
                result[row] = rowStrs.join(',');
            }
        }
        return result.join(';');
    },

    val() {
        let that = this;
        let { boxZones } = that.updater.get();
        let discounts = boxZones.map(zone => {
            return zone.discount;
        })
        return that.array2Report(discounts);
    },

    /**
     * 包含校验
     */
    submit() {
        let val = this.val();
        if (val == Data.none) {
            return {
                ok: false
            }
        } else {
            return {
                ok: true,
                val: val
            }
        }
    },

    update() {
        let that = this;
        let { timeDiscount, boxLength } = that.updater.get();
        let array = that.report2Array(timeDiscount);
        for (let i = 0; i < boxLength; i++) {
            that.setBoxDiscount(i, array[i]);
        }
    },

    formatweek(week) {
        return '星期' + ['日', '一', '二', '三', '四', '五', '六'][week % 7];
    },
    getDuration(start, end, format) {
        let rowNum = this.updater.get('rowNum');
        let startStr = this.getTimeFromNum(start);
        let endStr = '';
        if (end % rowNum == 0) {
            endStr = '24:00';
        } else {
            endStr = this.getTimeFromNum(end);
        }
        let str = startStr + '-' + endStr;
        if (format) {
            str = format.replace('%s', startStr).replace('%s', endStr);
        }
        return str;
    },

    getTimeFromNum(num) {
        let that = this;
        let { rowNum, multiple } = that.updater.get();
        let h = Math.floor((num % rowNum) / multiple);
        if ((h + '').length == 1) {
            h = '0' + h;
        }
        let m = ((num % rowNum) % multiple == 1) ? '30' : '00';
        return h + ':' + m;
    },

    getBoxzone(boxLength) {
        let boxzone = []; //可选择范围
        for (let i = 0; i < boxLength; i++) {
            boxzone.push({
                index: i,
                bg: '#ffffff',
                discount: 0
            })
        };

        return boxzone;
    }
});
