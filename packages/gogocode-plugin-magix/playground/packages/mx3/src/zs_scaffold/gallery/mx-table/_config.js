/*md5:35d577160a36036e0d5d013589579b98*/
//#gallery-config
module.exports = {
    'mx-table'(tag) {
        let content = tag.content;
        let ctrl = tag.seprateAttrs('div');
        content = content.replace(/<table/g, '<div>$&').replace(/<\/table>/g, '$&</div>');
        return `<${ctrl.tag} mx-view="${tag.mxView}" ${ctrl.attrs} ${ctrl.viewAttrs}>${content}</${ctrl.tag}>`;
    },
    'mx-table.excel'(tag) {
        let content = tag.content;
        let ctrl = tag.seprateAttrs('div');
        content = content.replace(/<table/g, '<div>$&').replace(/<\/table>/g, '$&</div>');

        let arr = [];

        // 匹配中thead
        let reg1 = /<thead[^>]*>[\s\S]*?<\/thead>/g;

        // 匹配第一个tr
        let reg2 = /<tr[^>]*>[\s\S]*?<\/tr>/;

        // 匹配第一个tr中的所有th
        let reg3 = /<th[^>]*>[\s\S]*?<\/th>/g;

        // 匹配colspan
        let reg4 = /colspan\s*="\s*([\d\.]+)"/;

        let theads = content.match(reg1);
        for (let i = 0; i < theads.length; i++) {
            let tr = theads[i].match(reg2)[0];
            let str = '<colgroup mx-table-placeholder>';

            let ths = tr.match(reg3);
            for (let j = 0; j < ths.length; j++) {
                let th = ths[j];
                let span = 1;
                let m = th.match(reg4);
                if (m) {
                    span = +m[1];
                }

                for (let k = 0; k < span; k++) {
                    str += `<col span="1" />`;
                }
            }
            str += '</colgroup>';
            arr.push(str);
        }
        let index = 0;
        content = content.replace(/<thead/g, (...results) => {
            index++;
            return arr[index - 1] + results[0];
        });

        return `<${ctrl.tag} mx-view="${tag.mxView}" ${ctrl.attrs} ${ctrl.viewAttrs}>${content}</${ctrl.tag}>`;
    },
    'mx-table.sticky'(tag) {
        let content = tag.content;
        let ctrl = tag.seprateAttrs('div');
        content = content.replace(/<table/g, '<div>$&').replace(/<\/table>/g, '$&</div>');

        let arr = [];

        // 匹配中thead
        let reg1 = /<thead[^>]*>[\s\S]*?<\/thead>/g;

        // 匹配第一个tr
        let reg2 = /<tr[^>]*>[\s\S]*?<\/tr>/;

        // 匹配第一个tr中的所有th
        let reg3 = /<th[^>]*>[\s\S]*?<\/th>/g;

        // 匹配colspan
        let reg4 = /colspan\s*="\s*([\d\.]+)"/;

        let theads = content.match(reg1);
        for (let i = 0; i < theads.length; i++) {
            let tr = theads[i].match(reg2)[0];
            let str = '<colgroup mx-table-placeholder>';

            let ths = tr.match(reg3);
            for (let j = 0; j < ths.length; j++) {
                let th = ths[j];
                let span = 1;
                let m = th.match(reg4);
                if (m) {
                    span = +m[1];
                }

                for (let k = 0; k < span; k++) {
                    str += `<col span="1" />`;
                }
            }
            str += '</colgroup>';
            arr.push(str);
        }
        let index = 0;
        content = content.replace(/<thead/g, (...results) => {
            index++;
            return arr[index - 1] + results[0];
        });

        return `<${ctrl.tag} mx-view="${tag.mxView}" ${ctrl.attrs} ${ctrl.viewAttrs}>${content}</${ctrl.tag}>`;
    }
}
