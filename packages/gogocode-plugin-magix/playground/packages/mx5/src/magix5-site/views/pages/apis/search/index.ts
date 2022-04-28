import Magix, { Router } from 'magix5';
import View from '../../../../view';
import { createHashStr } from '../../../../utils';
Magix.applyStyle('@:./index.less');

interface IProps {
    map: object;
}

export default View.extend({
    tmpl: '@:./index.html',
    assign(props: IProps) {
        this.set({
            ...props,
            isOpen: false,
            res: [],
            keyword: '',
            hasSearched: false,
            searching: false,
        });
    },
    async render() {
        await this.digest();
    },
    'open<click>'() {
        this.digest({
            isOpen: true,
        });
    },
    'close<click>'() {
        this.digest({
            isOpen: false,
            res: [],
            keyword: '',
        });
    },
    'search<keydown,click>'(e) {
        const { code, type } = e;
        if (code == 'Enter' || type == 'click') {
            this.digest({
                searching: true,
            });
            setTimeout(() => {
                const { keyword, map } = this.get();
                let res = [];
                if (map.has(keyword)) {
                    res = map.get(keyword);
                    if (!res.length) {
                        res = [res];
                    }
                }
                this.digest({ res, hasSearched: true, searching: false });
            }, 1000);
        }
    },
    'delete<click>'() {
        this.digest({
            keyword: '',
            res: [],
            hasSearched: false,
        });
    },
    'navigate<click>'(e) {
        let {
            params: { to, curr },
        } = e;
        this.digest({
            isOpen: false,
            res: [],
            keyword: '',
            hasSearched: false,
            searching: false,
        });
        const payload = {
            page: to,
            curr,
            hash: '',
        };
        // to的页面即当前页面时，使用hash值强制更新
        const { page } = Router.parse().params;
        if (page === to) {
            payload.hash = createHashStr();
        }

        setTimeout(() => {
            Router.to(payload);
        }, 500);
    },
});
