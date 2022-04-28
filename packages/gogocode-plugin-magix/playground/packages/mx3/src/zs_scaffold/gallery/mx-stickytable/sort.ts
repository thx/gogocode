/*md5:74db5df6b713e27dc0b18471bfb1a193*/
export = {
    /**
     * 本地排序
     */
    sort(list, orderField, orderBy) {
        list = list || [];
        if (!orderField || !(orderBy == 'asc' || orderBy == 'desc')) {
            return list;
        }

        let emptyList = [];
        for (var i = 0; i < list.length; i++) {
            let item = list[i];
            if (item[orderField] + '' === 'undefined' || item[orderField] + '' === 'null') {
                emptyList.push(item);
                list.splice(i--, 1);
            }
        }

        list = list.sort((a, b) => {
            let ax = a[orderField] + '',
                bx = b[orderField] + '';

            let compare;
            if (isNaN(parseInt(ax)) || isNaN(parseInt(bx))) {
                // 字符串排序，忽略大小写
                switch (orderBy) {
                    case 'desc':
                        // 降序
                        if (bx.toUpperCase() < ax.toUpperCase()) {
                            compare = -1;
                        } else {
                            compare = 1;
                        }
                        break;
                    case 'asc':
                        // 升序
                        if (ax.toUpperCase() < bx.toUpperCase()) {
                            compare = -1;
                        } else {
                            compare = 1;
                        }
                        break;
                }
            } else {
                // 数字排序
                switch (orderBy) {
                    case 'desc':
                        // 降序
                        compare = (+bx) - (+ax);
                        break;
                    case 'asc':
                        // 升序
                        compare = (+ax) - (+bx);
                        break;
                }
            }

            return compare;
        });
        return list.concat(emptyList);
    }
}