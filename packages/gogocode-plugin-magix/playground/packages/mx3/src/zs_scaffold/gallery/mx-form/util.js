/*md5:c527770080e022a4b1bd4e4780c04752*/
let $ = require('$');
module.exports = {
    addCheckbox: (name, src, actions) => {
        $('input[name="' + name + '"]:checked').each((idx, item) => {
            let value = item.value;
            if (actions.number) {
                value = parseFloat(value);
            }
            idx = src.indexOf(value);
            if (idx === -1) {
                src.push(value);
            }
        });
    },
    indexOf: (src, value) => {
        // 兼容字符串和数字
        let s_str = src.map(v => {
            return v + '';
        })
        let s_value = value + '';

        return $.inArray(s_value, s_str);
    },
    fix: (actions, value) => {
        // if (actions.number) {
        //     value = parseFloat(value);
        // }
        // return value;
    }
}