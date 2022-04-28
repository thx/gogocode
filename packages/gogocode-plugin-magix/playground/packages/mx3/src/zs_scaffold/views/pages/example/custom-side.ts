
import Magix, { Router } from 'magix'
import View from 'zs_scaffold/view'

export default View.extend({
	tmpl: '@custom-side.html',
	init() {
		this.updater.digest({
			mxCheckboxes: [{
				text: '选项1',
				value: 'checkbox1'
			}, {
				text: '选项2',
				value: 'checkbox2',
			}, {
				text: '选项3',
				value: 'checkbox3'
			}],
			checkboxCards: [{
				text: '选项文案1',
				value: 1,
				tip: '选项说明文案一行或者两行高度一致',
				icon: '<img src="https://img.alicdn.com/imgextra/i3/O1CN01GwJniw1sleczUiFKO_!!6000000005807-2-tps-160-160.png"/>',
			}, {
				text: '选项文案2',
				value: 2,
				tip: '选项说明文案一行或者两行高度一致',
				icon: '<img src="https://img.alicdn.com/imgextra/i3/O1CN01GwJniw1sleczUiFKO_!!6000000005807-2-tps-160-160.png"/>',
			}],
			mxRadioes: [{
				text: '选项1',
				value: 'radio1'
			}, {
				text: '选项2',
				value: 'radio2',
			}, {
				text: '选项3',
				value: 'radio3'
			}],
			radioCards: [{
				text: '选项文案1',
				value: 1,
				tip: '选项说明文案一行或者两行高度一致',
				icon: '<img src="https://img.alicdn.com/imgextra/i3/O1CN01GwJniw1sleczUiFKO_!!6000000005807-2-tps-160-160.png"/>',
			}, {
				text: '选项文案2',
				value: 2,
				tip: '选项说明文案一行或者两行高度一致',
				icon: '<img src="https://img.alicdn.com/imgextra/i3/O1CN01GwJniw1sleczUiFKO_!!6000000005807-2-tps-160-160.png"/>',
			}],
			areas: [{
				value: 11,
				pValue: '',
				text: '上海'
			}, {
				value: 12,
				pValue: '',
				text: '江苏'
			}, {
				value: 13,
				pValue: '',
				text: '浙江'
			}, {
				value: 14,
				pValue: '',
				text: '北京'
			}, {
				value: 15,
				pValue: '',
				text: '四川'
			}, {
				value: 121,
				pValue: 12,
				text: '南京'
			}, {
				value: 122,
				pValue: 12,
				text: '苏州'
			}, {
				value: 123,
				pValue: 12,
				text: '南通'
			}, {
				value: 131,
				pValue: 13,
				text: '杭州'
			}, {
				value: 132,
				pValue: 13,
				text: '宁波'
			}, {
				value: 133,
				pValue: 13,
				text: '温州'
			}, {
				value: 134,
				pValue: 13,
				text: '嘉兴'
			}, {
				value: 135,
				pValue: 13,
				text: '舟山'
			}, {
				value: 136,
				pValue: 13,
				text: '台州'
			}, {
				value: 137,
				pValue: 13,
				text: '湖州'
			}, {
				value: 1311,
				pValue: 131,
				text: '余杭区'
			}, {
				value: 1312,
				pValue: 131,
				text: '西湖区'
			}, {
				value: 1313,
				pValue: 131,
				text: '上城区'
			}, {
				value: 1314,
				pValue: 131,
				text: '下城区'
			}, {
				value: 1315,
				pValue: 131,
				text: '江干区'
			}, {
				value: 1316,
				pValue: 131,
				text: '拱墅区'
			}],
			selected: {
				mxCheckboxes: [],
				mxCheckboxCard: [],
				mxRadio: '',
				mxRadioCard: '',
				str: '', //汉字/字母/数字/下划线
				single: '',  //下拉框单选
				multiComma: '', //下拉框多选逗号分隔
				multiArr: [], //下拉框多选数组
				date: '',
				start: '2021-12-27', //时间段开始时间
				end: '2021-12-29', //时间段结束时间
				area: '', // 地域
				type: 'custom', //默认还是自定义（自定义带输入框）
				int: 10,
				switch: true //开关
			}
		});
	},
	render() {
		this.updater.digest();
	},

	'confirm<click>'(e) {
		let that = this;
		let valid = that.isValid();

		if (valid) {
			// 校验通过
			// 双向绑定的数据，继续执行后续操作
			let { selected } = that.updater.get();
			that.updater.digest({
				tip: '<span class="color-green">校验通过</span>'
			})
		} else {
			// 校验失败
			that.updater.digest({
				tip: '<span class="color-red">校验失败</span>'
			})
		}
	}
})
