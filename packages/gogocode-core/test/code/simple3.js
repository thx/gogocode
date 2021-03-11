const code = `Page({
    data: {
        user: {
            userid: 23435,
            nickname: 'cbp'
        }
    },
    onShow(option) {
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
    }
});`;
module.exports = code;