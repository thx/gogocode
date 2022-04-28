
import Magix from 'magix';
import View from 'zs_scaffold/view';

export default View.extend({
    tmpl: '@index.html',
    render() {
        this.updater.digest({
            imgs: {
                title: '产品新动态',
                icon: 'NEW',
                iconTip: '新功能上线拉~',
                linkText: '查看详情',
                link: 'https://www.taobao.com/',
                list: [{
                    'image': '//alp.alicdn.com/1604273062450-320-160.jpg',
                    'link': 'https://www.taobao.com/',
                    'out': true
                }, {
                    'image': 'https://img.alicdn.com/tfs/TB1lQnb3pT7gK0jSZFpXXaTkpXa-648-332.jpg',
                    'link': 'https://mo.m.taobao.com/amp/page_20201125_180613_254?__t__=1606485809897',
                    'out': true
                }, {
                    'image': '//alp.alicdn.com/1607371299027-320-160.jpg',
                    'link': 'https://www.taobao.com/',
                    'out': true
                }]
            }
        });
    },
    'show<click>'(e) {
        this.mxModal('@./dialog', {
            callback: (data) => {
                // 确定回调
            }
        }, {
            width: 600,
            header: {
                title: '全屏右出浮层',
                tip: '提示信息'
            }
        });
    }
});
