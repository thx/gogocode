

const input = `
Page({
    data: {
        user: {
            userid: 23435,
            nickname: 'cbp'
        }
    },
    onShow(a, b, { v }) {
        this.setData({
            list: []
        });
        this.getData();
    },
    async getData() {
        await this.fetchSth()
    },
    handleTabClick(event) {
        my.alert({
            title: '提示',
            content: '您本月的账单已出',
            success: () => {
                my.navigateBack()
            }
        })
        my.alert({
            title: '提示',
            content: '您本月的账单已出',
            content: '222',
            success: () => {
                my.navigateBack()
            }
        })
    }
});
`

const $ = require('../index');

const res = $(input)
    .replace(`
    Page({
        onShow($_$1) {
            $$$1
        },
        $$$2
    })
    `, 
    `
    View.extend({
        init() {
            this.onInit();
            this.didMount();
        },
        render($_$1) {
            var a = 1
            $$$1
        },
        $$$2
    })
    `)
    .generate()
console.log(res)
// 这个方案走不通 还是得想办法实现$$$类似于...$_$ 不放在find里 而是replace前后去处理？