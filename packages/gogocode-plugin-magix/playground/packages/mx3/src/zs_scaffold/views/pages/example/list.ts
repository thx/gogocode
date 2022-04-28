/**
 * 本示例列举了常用的公共方法(public/view.ts)使用及一些约定
 */
import Magix from 'magix';
import View from 'zs_scaffold/view';

export default View.extend({
    tmpl: '@list.html',
    init() {
        this.updater.set({
            loading: true,
            list: [],
            count: 0,
            statusList: [
                { key: '枚举1', value: 1 },
                { key: '枚举2', value: 2 },
                { key: '枚举3', value: 3 }
            ],
            searchTypeList: [
                { key: '搜索枚举1', value: 'campaignId' },
                { key: '搜索枚举2', value: 'adgroupId' },
                { key: '搜索枚举3', value: 'crowdId' }
            ],
            params: {  // 约定一个params对象 该对象是用来给列表接口传参
                dropdown: '',
                dropdownMultiple: [],
                singleSearchValue: '',
                searchValue: '',
                searchKey: '',
                box: 2,
                time: '',
                startTime: '',
                endTime: '',
                switch: true,
                radio: '',
                checkbox: [],
                offset: 0,
                pageSize: 20,
                inputObject: {
                    value: ''
                }
            }
        });

        // 通过该方式监听hash变化
        this.observeLocation(Object.keys(this.updater.get('params')));
    },

    async render() {
        // mxGetParams方法将params克隆并结合hash上的参数值，返回新的params，方法本身不会改变params
        let params = this.mxGetParams();
        this.updater.digest({
            params,
        })

        let data = await this.getList();
        this.updater.digest({
            loading: false,
            ...data,
        })
    },

    getList() {
        let that = this;
        return new Promise(resolve => {
            // 通用提交参数处理
            let params = that.mxSetParams();
            // 也可以完全自己处理
            // let {params} = that.updater.get();

            that.fetch({
                name: 'api_test_get',
                params
            }, (err, model) => {
                if (err) {
                    that.alert('系统异常', err.msg, null, {
                        type: 'error'
                    });
                }
                let list = model.get('data.list', [])
                list.forEach(item => {
                    item.field1 = (item.field1 / 100).toFixed(2)
                    item.field2 = (item.field2 / 100).toFixed(2)
                    let ran3 = Math.floor(Math.random() * 3)
                    item.field3 = (item.field3 / 100).toFixed(ran3)
                });
                resolve({
                    list,
                    count: model.get('data.count', 0),
                });
            });
        })
    }
});
