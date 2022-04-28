/*md5:80cf27b49f549fce690fe905548a0e16*/
import Magix from 'magix';
Magix.applyStyle('@confirm.less');

export default Magix.View.extend({
    tmpl: '@confirm.html',
    init(extra) {
        this['@{dialog}'] = extra.dialog;
        this['@{fn.enter.callback}'] = extra.enterCallback;
        this['@{fn.calcel.callback}'] = extra.cancelCallback;
        this.updater.set(extra);

        this.on('destroy', () => {
            if (this['@{interval.timer}']) {
                clearInterval(this['@{interval.timer}']);
            }
        })
    },
    render() {
        let placeholder = '${countdown}',
            content = this.updater.get('content') + '',
            countdown = +this.updater.get('countdown') || 0;
        if (countdown > 0 && content.indexOf(placeholder) > -1) {
            // 倒计时替换
            this.updater.digest({
                c: content.replace(placeholder, countdown + '')
            });

            this['@{interval.timer}'] = setInterval(() => {
                countdown--;
                if (countdown === 0) {
                    clearInterval(this['@{interval.timer}']);
                    this['@{enter}<click>']();
                } else {
                    this.updater.digest({
                        c: content.replace(placeholder, countdown + '')
                    });
                }
            }, 1000);
        } else {
            this.updater.digest({
                c: content
            });
        }
    },
    '@{enter}<click>'(e) {
        if (this['@{fn.enter.callback}']) {
            this['@{fn.enter.callback}'](e);
        }
        if (!e || !e.isDefaultPrevented || !e.isDefaultPrevented()) {
            this['@{dialog}'].close();
        }
    },
    '@{cancel}<click>'(e) {
        if (this['@{fn.calcel.callback}']) {
            this['@{fn.calcel.callback}'](e);
        }
        if (!e || !e.isDefaultPrevented || !e.isDefaultPrevented()) {
            this['@{dialog}'].close();
        }
    }
});