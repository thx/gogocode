import Magix from 'magix5';
Magix.applyStyle('@:../../article.less');
import View from '../../article';

import menu from '../../../articles/compiler/menu-config';
import dataMap from '../../../articles/compiler/data/index';

export default View.extend({
    tmpl: '@:../../article.html',
    path: 'compiler',
    assign(extra) {
        this.set({
            ...extra,
            menu,
            dataMap,
            key: this.key,
            path: this.path,
            isGroup: '',
        });
    },
});
