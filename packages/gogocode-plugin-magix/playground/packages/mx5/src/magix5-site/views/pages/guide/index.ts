import Magix from 'magix5';
Magix.applyStyle('@:../../article.less');
import View from '../../article';

import menu from '../../../articles/guide/menu-config';
import dataMap from '../../../articles/guide/data/index';

export default View.extend({
    tmpl: '@:../../article.html',
    path: 'guide',
    assign(extra) {
        this.set({
            ...extra,
            menu,
            dataMap,
            key: this.key,
            path: this.path,
            isGroup: true,
        });
    },
});
