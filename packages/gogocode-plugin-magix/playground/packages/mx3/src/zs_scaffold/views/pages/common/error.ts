import Magix from 'magix';
import View from 'zs_scaffold/view';

export default View.extend({
    tmpl: '@error.html',
    render() {
        let locParams = Magix.Router.parse().params;
        let info = locParams.info ? JSON.parse(locParams.info) : {};
        let type = 'not-found',
            tip = info.msg || '';
        switch (info.errorCode) {
            case 'NOT_FOUND':
                type = 'not-found';
                break;
        }

        let data = {
            info,
            type,
            tip
        }
        this.updater.digest(data);
        if (Magix.config('error')) {
            Magix.config('error')(data);
        }
    }
});
