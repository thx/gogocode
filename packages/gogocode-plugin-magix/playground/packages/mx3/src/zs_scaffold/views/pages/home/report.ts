
/**
 * 账户整体的报表预览
 * 
 * 通用报表模块接入说明：
 * https://yuque.antfin-inc.com/yujia.yjq/yxrf9b/coux1g
 * https://yuque.antfin-inc.com/yujia.yjq/yxrf9b/kunxds
 */
import Magix, { Router } from 'magix';
import View from 'zs_scaffold/view';

export default View.extend({
	tmpl: '@report.html',
	init() {
		this.updater.set({
			effects: [{
				text: '单日投放数据',
				value: 'hourId'
			}, {
				text: '历史投放数据',
				value: 'logDate'
			}]
		});

		this.observeLocation(['ef', 'efvs', 'efstart', 'efend']);
	},
	async render() {
		let { effects, Dayjs, all: { dateFormater } } = this.updater.get();
		let today = Dayjs().format(dateFormater),
			yesterday = Dayjs().subtract(1, 'days').format(dateFormater),
			min = Dayjs().subtract(90, 'days').format(dateFormater); // 历史数据最近90天
		let locParams = Router.parse().params;

		let dates = {},
			selected = {
				ef: locParams.ef || effects[0].value,
			};

		switch (selected.ef) {
			case 'hourId':
				// 分时
				// 时间窗：最近90天 + 今天，默认今天非对比
				Magix.mix(dates, {
					min,
					max: today,
					vsenable: true,
					single: true,
					shortkeys: ['today', 'yesterday', 'passed7', 'preWeekMon', 'passed15', 'passedThisMonth', 'passed30', 'preMonth'],
					def: {
						startTime: today,
						endTime: yesterday,
						vs: true
					}
				});

				// 默认今日与昨日对比
				Magix.mix(selected, {
					efvs: (locParams.efvs + '' !== 'false'),
					efstart: locParams.efstart || today,
					efend: locParams.efend || yesterday,
				})
				break

			case 'logDate':
				// 分日
				// 时间窗：最近90天，默认最近30天
				Magix.mix(dates, {
					min,
					max: yesterday,
					vsenable: false,
					single: false,
					shortkeys: ['yesterday', 'passed7', 'preWeekMon', 'passed15', 'passedThisMonth', 'passed30', 'preMonth'],
				});

				// 默认过去30天
				Magix.mix(selected, {
					efvs: false,
					efstart: locParams.efstart || Dayjs().subtract(30, 'days').format(dateFormater),
					efend: locParams.efend || yesterday,
				});
				break;
		};
		this.updater.set({
			dates,
			selected,
		});

		let [fields, data] = await Promise.all([
			this.getFields(),
			this.getData(),
		]);
		this.updater.digest({
			fields,
			...data,
		});
	},

	getFields() {
		return new Promise(resolve => {
			// 获取adc报表配置
			let fields = [{
				code: 'charge',
				description: '选定时间内的推广总花费',
				name: '消耗',
				properties: {
					formater: 'formatFloat',
					groupName: '基础效果',
					groupOrder: 1,
					unit: '元'
				}
			}, {
				code: 'showNum',
				description: '从互动入口点击跳转到落地页的展现量',
				name: '落地页展现量',
				properties: {
					formater: 'formatInt',
					groupName: '基础效果',
					groupOrder: 1
				}
			}, {
				code: 'ecpm',
				description: '消耗/落地页展现量*1000',
				name: '千次展现成本',
				properties: {
					formater: 'formatFloat',
					groupName: '基础效果',
					groupOrder: 1,
					unit: '元'
				}
			}, {
				code: 'interactiveNum',
				description: '推广引导的用户，在互动页面上的互动点击之和。（例如评论、点赞、分享、入会、访问宝贝页面、收藏、加购等行为）',
				name: '落地页互动量',
				properties: {
					formater: 'formatInt',
					groupName: '互动表现',
					groupOrder: 2
				}
			}, {
				code: 'interactiveRate',
				description: '落地页互动量/落地页展现量*100%',
				name: '落地页互动率',
				properties: {
					formater: 'formatPer',
					groupName: '互动表现',
					groupOrder: 2
				}
			}, {
				code: 'interactiveTime',
				description: '互动页面的停留总时长/落地页展现量',
				name: '平均停留时长',
				properties: {
					formater: 'formatInt',
					groupName: '互动表现',
					groupOrder: 2,
					unit: '秒'
				}
			}];

			resolve(fields);
		})
	},

	getData() {
		return new Promise(resolve => {
			let params = {}, selected = this.updater.get('selected');

			// 入参处理
			switch (selected.ef) {
				case 'hourId':
					// 分时
					Magix.mix(params, {
						logDateList: (!selected.efvs || (selected.efvs && selected.efstart == selected.efend)) ? [selected.efstart] : [selected.efstart, selected.efend],
					})
					break;

				case 'logDate':
					// 分日
					Magix.mix(params, {
						startTime: selected.efstart,
						endTime: selected.efend,
					})
					break;

			}

			// todo 获取接口逻辑
			let sum = {
				charge: 12.34,
				showNum: 7827,
				ecpm: 34.33782,
				interactiveNum: 7022,
				interactiveRate: 0.444312,
				interactiveTime: 5000,
				addNewUv: 100,
				addNewUvRate: 12.2,
				favshopNumberIt: 444,
				followNumberIt: 344,
				fsChargeIt: 123,
				xiFenRateIt: null,
				effectInteractNum: 433,
				effectInteractRate: 0.22233,
				rhNum: 98888,
				leadsNum: 34444,
				wwNum: 5433,
			};
			let list = [{
				logDate: '2022-01-02',
				hourId: 1,
				charge: 12.34,
				ecpm: 2,
				interactiveRate: 0.444312,
			}, {
				logDate: '2022-01-03',
				hourId: 3,
				charge: 14.22,
				ecpm: 6,
				interactiveRate: 0.412,
			}, {
				logDate: '2022-01-04',
				hourId: 5,
				charge: 15.21,
				ecpm: 8,
				interactiveRate: 0.23312,
			}, {
				logDate: '2022-01-05',
				hourId: 6,
				charge: 18.88,
				ecpm: 20,
				interactiveRate: 0.87312,
			}, {
				logDate: '2022-01-06',
				hourId: 7,
				charge: 12.34,
				ecpm: 23,
				interactiveRate: 0.64312,
			}, {
				logDate: '2022-01-10',
				hourId: 8,
				charge: 21.34,
				ecpm: 33,
				interactiveRate: 0.2312,
			}];

			let vsSum = {
				charge: 43.12,
				showNum: 3442,
				ecpm: 14.33782,
				interactiveNum: 4022,
				interactiveRate: 0.5612,
				interactiveTime: 2333,
				addNewUv: 233,
				addNewUvRate: 123.2,
				favshopNumberIt: 414,
				followNumberIt: null,
				fsChargeIt: null,
				xiFenRateIt: null,
				effectInteractNum: 433,
				effectInteractRate: 0.56,
				rhNum: 1288,
				leadsNum: 988,
				wwNum: 233,
			};
			let vsList = [{
				logDate: '2022-01-02',
				hourId: 1,
				charge: 21.34,
				ecpm: 22,
				interactiveRate: 0.214312,
			}, {
				logDate: '2022-01-03',
				hourId: 3,
				charge: 4.22,
				ecpm: 61,
				interactiveRate: 0.112,
			}, {
				logDate: '2022-01-04',
				hourId: 5,
				charge: 15.21,
				ecpm: 8,
				interactiveRate: 0.23312,
			}, {
				logDate: '2022-01-05',
				hourId: 6,
				charge: 9.88,
				ecpm: 12,
				interactiveRate: 0.3212,
			}, {
				logDate: '2022-01-06',
				hourId: 7,
				charge: 21.34,
				ecpm: 9,
				interactiveRate: 0.6312,
			}, {
				logDate: '2022-01-10',
				hourId: 8,
				charge: 12.34,
				ecpm: 13,
				interactiveRate: 0.3312,
			}];

			resolve({
				params,
				sum,
				list,
				vsSum,
				vsList,
			});
		})
	},

	'changeEffect<change>'(e) {
		Router.to({
			ef: e.value,
			efstart: '',
			efend: '',
			efvs: ''
		})
	},

	'changeDate<change>'(e) {
		let dates = e.dates;
		Router.to({
			efvs: e.vs || false,
			efstart: dates.startStr,
			efend: dates.endStr,
		})
	}
})
