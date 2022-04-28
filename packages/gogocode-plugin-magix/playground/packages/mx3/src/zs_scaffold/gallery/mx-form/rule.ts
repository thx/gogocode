/*md5:ccbb6a385c2df71ad01d11b2df708715*/
import * as $ from '$';
import * as I18n from '../mx-medusa/util';

let ByteLen = (str) => {
    return str.replace(/[^\x00-\xff]/g, 'xl').length;
};

// 手机号码校验
let IsMobile = (str) => {
    let regex = {
        //中国移动
        cm: /^(?:0?1)(?:3[456789]|47|5[0124789]|6[5]|7[28]|8[23478]|9[589])\d{8}$/,
        //中国联通
        cu: /^(?:0?1)(?:3[012]|45|5[356]|66|7[156]|8[356]|91)\d{8}$/,
        //中国电信
        ce: /^(?:0?1)(?:[93]3|49|53|7[0347]|8[019])\d{8}$/,
        //虚拟电商
        cn: /^(?:0?1)(?:70)\d{8}$/,
        //中国香港
        hk: /^(?:0?[1569])(?:\d{7}|\d{8}|\d{12})$/,
        //澳门
        macao: /^6\d{7}$/,
        //台湾
        tw: /^(?:0?[679])(?:\d{7}|\d{8}|\d{10})$/
    };
    let flag = false;

    for (let re in regex) {
        if (regex[re].test(str)) {
            flag = true;
        }
    }
    return flag;
}

// 固定电话校验
let IsLandline = (str) => {
    let reg = /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
    return reg.test(str);
}

export = {
    email(val, rule) {
        // 邮箱：名称@域名
        let valid = true,
            tip = I18n['form.check.email'];
        val = $.trim(val);
        let reg = /^[A-Za-z0-9_\-\.]+\@[A-Za-z0-9_\-\.]+\.[A-Za-z]{2,4}$/;
        let domains = [];
        if (val) {
            if ($.isArray(rule)) {
                if (rule[0]) {
                    valid = reg.test(val);
                }
                if (rule[1]) {
                    tip = rule[1];
                }

                if (rule[2] && $.isArray(rule[2])) {
                    domains = rule[2];
                }
            } else {
                if (rule) {
                    valid = reg.test(val);
                }
            }
        }

        if (valid && (domains.length > 0)) {
            // 指定域名校验
            let contain = false;
            let d = val.substring(val.indexOf('@') + 1);
            for (let i = 0; i < domains.length; i++) {
                if (domains[i] == d) {
                    contain = true;
                    break;
                }
            }
            if (!contain) {
                valid = false;
            }
        }
        return {
            valid,
            tip
        };
    },
    url(val, rule) {
        // 中文
        let valid = true,
            tip = I18n['form.check.url'];
        val = $.trim(val);
        let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
        if (val) {
            if ($.isArray(rule)) {
                if (rule[0]) {
                    valid = reg.test(val);
                }
                if (rule[1]) {
                    tip = rule[1];
                }
            } else {
                if (rule) {
                    valid = reg.test(val);
                }
            }
        }
        return {
            valid,
            tip
        };
    },
    english(val, rule) {
        // 中文
        let valid = true,
            tip = I18n['form.check.english'];
        val = $.trim(val);
        let reg = /^[A-Za-z]+$/;
        if (val) {
            if ($.isArray(rule)) {
                if (rule[0]) {
                    valid = reg.test(val);
                }
                if (rule[1]) {
                    tip = rule[1];
                }
            } else {
                if (rule) {
                    valid = reg.test(val);
                }
            }
        }
        return {
            valid,
            tip
        };
    },
    chinese(val, rule) {
        // 中文
        let valid = true,
            tip = I18n['form.check.chinese'];
        val = $.trim(val);
        let reg = /^[\u0391-\uFFE5]+$/;
        if (val) {
            if ($.isArray(rule)) {
                if (rule[0]) {
                    valid = reg.test(val);
                }
                if (rule[1]) {
                    tip = rule[1];
                }
            } else {
                if (rule) {
                    valid = reg.test(val);
                }
            }
        }
        return {
            valid,
            tip
        };
    },
    mobile(val, rule) {
        // 手机号码
        let valid = true,
            tip = I18n['form.check.mobile'];
        val = $.trim(val);
        if (val) {
            if ($.isArray(rule)) {
                if (rule[0]) {
                    valid = IsMobile(val);
                }
                if (rule[1]) {
                    tip = rule[1];
                }
            } else {
                if (rule) {
                    valid = IsMobile(val);
                }
            }
        }
        return {
            valid,
            tip
        };
    },
    landline(val, rule) {
        // 固定电话
        let valid = true,
            tip = I18n['form.check.landline'];
        val = $.trim(val);
        if (val) {
            if ($.isArray(rule)) {
                if (rule[0]) {
                    valid = IsLandline(val);
                }
                if (rule[1]) {
                    tip = rule[1];
                }
            } else {
                if (rule) {
                    valid = IsLandline(val);
                }
            }
        }
        return {
            valid,
            tip
        };
    },
    phone(val, rule) {
        // 手机或者固定电话
        let valid = true,
            tip = I18n['form.check.phone'];
        val = $.trim(val);
        if (val) {
            if ($.isArray(rule)) {
                if (rule[0]) {
                    valid = IsMobile(val) || IsLandline(val);
                }
                if (rule[1]) {
                    tip = rule[1];
                }
            } else {
                if (rule) {
                    valid = IsMobile(val) || IsLandline(val);
                }
            }
        }
        return {
            valid,
            tip
        };
    },
    currency(val, rule) {
        // 金额，最多保留两位小数
        let valid = true,
            tip = I18n['form.check.currency'];
        val = $.trim(val);
        let reg = /^(([1-9]\d*)|0)(\.\d{1,2})?$/;
        if (val) {
            if ($.isArray(rule)) {
                if (rule[0]) {
                    valid = reg.test(val);
                }
                if (rule[1]) {
                    tip = rule[1];
                }
            } else {
                if (rule) {
                    valid = reg.test(val);
                }
            }
        }
        return {
            valid,
            tip
        };
    },
    trim(val, rule) {
        // 两端是否有空格
        // trim: [true, '自定义']
        // trim: true
        let valid = true,
            tip = I18n['form.check.trim'];
        if ($.isArray(rule)) {
            if (rule[0]) {
                valid = /\s/.test(val);
            }
            if (rule[1]) {
                tip = rule[1];
            }
        } else {
            if (rule) {
                valid = /\s/.test(val);
            }
        }
        return {
            valid: !valid,
            tip
        };
    },
    required(val, rule) {
        // 是否必填
        // required: [true, '自定义']
        // required: true
        let valid = true,
            tip = I18n['form.check.required'];
        val = $.trim(val);
        if ($.isArray(rule)) {
            if (rule[0]) {
                valid = (val != '');
            }
            if (rule[1]) {
                tip = rule[1];
            }
        } else {
            if (rule) {
                valid = (val != '');
            }
        }
        return {
            valid,
            tip
        };
    },
    number(val, rule) {
        // 是否为数字
        // number: true
        let valid = true,
            tip = I18n['form.check.number'];

        val = $.trim(val);
        let reg = /(^[\-0-9][0-9]*(.[0-9]+)?)$/;
        if (val) {
            if ($.isArray(rule)) {
                if (rule[0]) {
                    valid = reg.test(val);
                }
                if (rule[1]) {
                    tip = rule[1];
                }
            } else {
                if (rule) {
                    valid = reg.test(val);
                }
            }
        }

        return {
            valid,
            tip
        };
    },
    int(val, rule) {
        // 是否为整数
        // int: true
        let valid = true,
            tip = I18n['form.check.int'];

        val = $.trim(val);
        let reg = /^-?\d+$/;
        if (val) {
            if ($.isArray(rule)) {
                if (rule[0]) {
                    valid = reg.test(val);
                }
                if (rule[1]) {
                    tip = rule[1];
                }
            } else {
                if (rule) {
                    valid = reg.test(val);
                }
            }
        }
        return {
            valid,
            tip
        };
    },
    posint(val, rule) {
        // 是否为正整数
        // posint: true
        // posint: [true, 自定义]
        let valid = true,
            tip = I18n['form.check.posint'];
        val = $.trim(val);
        let reg = /^[0-9]*[1-9][0-9]*$/;
        if (val) {
            if ($.isArray(rule)) {
                if (rule[0]) {
                    valid = reg.test(val);
                }
                if (rule[1]) {
                    tip = rule[1];
                }
            } else {
                if (rule) {
                    valid = reg.test(val);
                }
            }
        }
        return {
            valid,
            tip
        };
    },
    negint(val, rule) {
        // 是否为负整数
        // negint: true
        // negint: [true, 自定义]
        let valid = true,
            tip = I18n['form.check.negint'];
        val = $.trim(val);
        let reg = /^-[0-9]*[1-9][0-9]*$/;
        if (val) {
            if ($.isArray(rule)) {
                if (rule[0]) {
                    valid = reg.test(val);
                }
                if (rule[1]) {
                    tip = rule[1];
                }
            } else {
                if (rule) {
                    valid = reg.test(val);
                }
            }
        }
        return {
            valid,
            tip
        };
    },

    length(val, rule) {
        // 字个数
        // length: [4,8]
        let valid = true,
            tip = I18n['form.word.between'];

        val = $.trim(val);
        if (val) {
            let min = rule[0],
                max = rule[1],
                current = val.length;
            valid = (current >= min) && (current <= max);
            tip = tip.replace(/{min}/g, min).replace(/{max}/g, max).replace(/{current}/g, current);
        }

        return {
            valid,
            tip
        };
    },

    minlength(val, rule) {
        // 最少字个数
        // minlength: 10
        // minlength: [10, '自定义提示']
        let valid = true,
            tip = [I18n['form.less'], rule, I18n['form.word']].join(' ');

        // 兼容checkbox数组检验
        val = $.isArray(val) ? val : $.trim(val);
        if (val) {
            if ($.isArray(rule)) {
                valid = (val.length >= rule[0]);
                if (rule[1]) {
                    tip = rule[1];
                }
            } else {
                valid = (val.length >= rule);
            }
        }
        return {
            valid,
            tip
        };
    },

    maxlength(val, rule) {
        // 最多字个数
        // maxlength: 10
        // maxlength: [10, '自定义提示']
        let valid = true,
            tip = [I18n['form.more'], rule, I18n['form.word']].join(' ');

        // 兼容checkbox数组检验
        val = $.isArray(val) ? val : $.trim(val);
        if (val) {
            if ($.isArray(rule)) {
                valid = (val.length <= rule[0]);
                if (rule[1]) {
                    tip = rule[1];
                }
            } else {
                valid = (val.length <= rule);
            }
        }
        return {
            valid,
            tip
        };
    },

    blength(val, rule) {
        // 字符长度：一个汉字两个字符
        // blength: [10, 20]
        let valid = true,
            tip = I18n['form.char.between'];

        val = $.trim(val);
        if (val) {
            let min = rule[0],
                max = rule[1],
                current = ByteLen(val);
            valid = (current >= min) && (current <= max);
            tip = tip.replace(/{min}/g, min).replace(/{max}/g, max).replace(/{current}/g, current);
        }

        return {
            valid,
            tip
        };
    },
    bminlength(val, rule) {
        // 字符最小长度：一个汉字两个字符
        // bminlength: 10
        // bminlength: [10, 自定义]
        val = $.trim(val);
        let len = ByteLen(val);

        let valid = true,
            tip = I18n['form.less'] + ' ' + rule + ' ' + I18n['form.char'];
        if (val) {
            if ($.isArray(rule)) {
                valid = (len >= rule[0]);
                if (rule[1]) {
                    tip = rule[1];
                }
            } else {
                valid = (len >= rule);
            }
        }

        return {
            valid,
            tip
        };
    },
    bmaxlength(val, rule) {
        // 字符最大长度：一个汉字两个字符
        // bmaxlength: 10
        // bmaxlength: [10, 自定义]
        val = $.trim(val);
        let len = ByteLen(val);

        let valid = true,
            tip = I18n['form.more'] + ' ' + rule + ' ' + I18n['form.char'];
        if (val) {
            if ($.isArray(rule)) {
                valid = (len <= rule[0]);
                if (rule[1]) {
                    tip = rule[1];
                }
            } else {
                valid = (len <= rule);
            }
        }

        return {
            valid,
            tip
        };
    },

    equalto(val, rule) {
        let tip = I18n['form.check.equal'];

        let id;
        if ($.isArray(rule)) {
            // [id, 自定义提示]
            id = rule[0];
            if (rule[1]) {
                tip = rule[1];
            } else {
                tip = tip.replace(/{rule}/g, rule[0]);
            }
        } else {
            id = rule;
            tip = tip.replace(/{rule}/g, rule);
        }

        let to = $('#' + id).val();
        return {
            valid: (to == val),
            tip
        };
    },

    unequalto(val, rule) {
        let tip = I18n['form.check.unequal'];

        // 支持多个id逗号分隔
        let ids;
        if ($.isArray(rule)) {
            // [ids, 自定义提示]
            ids = rule[0];
            if (rule[1]) {
                tip = rule[1];
            }
        } else {
            ids = rule;
        }

        let equalIds = [];
        ids = ids.split(',');
        ids.forEach(id => {
            if ($('#' + id).val() == val) {
                equalIds.push(id);
            }
        })

        tip = tip.replace(/{rule}/g, equalIds.join(','));
        return {
            valid: (equalIds.length == 0),
            tip
        };
    },

    pattern(val, rule) {
        // 正则
        // pattern [reg, 自定义]
        // pattern reg
        let valid = true,
            tip = I18n['form.check.pattern'];
        val = $.trim(val);
        if (val) {
            let reg;
            if ($.isArray(rule)) {
                reg = new RegExp(rule[0]);
                if (rule[1]) {
                    tip = rule[1];
                }
            } else {
                reg = new RegExp(rule);
            }
            valid = reg.test(val);

        }

        return {
            valid,
            tip
        };

    },

    /**
     * 是否为合法json
     */
    json(val, rule) {
        let valid = true,
            tip = I18n['form.check.json'];

        if (val) {
            if (($.isArray(rule) && rule[0]) || rule) {
                try {
                    let obj = JSON.parse(val);
                    valid = Object.prototype.toString.call(obj) == '[object Object]';
                } catch (error) {
                    valid = false;
                }
            }
            if ($.isArray(rule) && rule[1]) {
                tip = rule[1];
            }
        }
        return {
            valid,
            tip
        };
    },

    inranges(val, rules) {
        // 多数字范围 [,] 表示包括边界，(,)表示不包括边界
        // 命中范围表示异常，范围之外正确
        let reg = /^(\[|\()(.*?)(,)(.*?)(\]|\))$/;
        let valid = true, tip = '';

        if ($.trim(val)) {
            val = +$.trim(val);
            for (let i = 0; i < rules.length; i++) {
                let rule = rules[i], inrange = true;
                let [, left, min, , max, right] = $.trim(rule[0] + '').match(reg);

                if ($.trim(min)) {
                    min = +$.trim(min);
                    switch (left) {
                        case '(':
                            inrange = inrange && val > min;
                            break;

                        case '[':
                            inrange = inrange && val >= min;
                            break;
                    }
                }

                if ($.trim(max)) {
                    max = +$.trim(max);
                    switch (right) {
                        case ')':
                            inrange = inrange && val < max;
                            break;

                        case ']':
                            inrange = inrange && val <= max;
                            break;
                    }
                }

                if (inrange) {
                    valid = false;
                    tip = rule[1];
                    break;
                }
            }
        }

        return {
            valid,
            tip,
        };
    },

    range(val, rule) {
        // 数字范围，包括边界
        // range: [2,10,自定义提示]
        let valid = true;
        let min = rule[0],
            max = rule[1];
        let tip = (rule[2] || I18n['form.check.range']) + '';

        val = $.trim(val);
        if (val) {
            valid = (+val >= +min) && (+val <= +max);
        }
        return {
            valid,
            tip: tip.replace(/{min}/g, min).replace(/{max}/g, max)
        };
    },

    rangeborder(val, rule) {
        // 数字范围，不包括边界
        // range: [2,10,自定义提示]
        let valid = true;
        let min = rule[0],
            max = rule[1];
        let tip = (rule[2] || I18n['form.check.range.border']) + '';

        val = $.trim(val);
        if (val) {
            valid = (+val > +min) && (+val < +max);
        }
        return {
            valid,
            tip: tip.replace(/{min}/g, min).replace(/{max}/g, max)
        };
    },

    max(val, rule) {
        // 数字最大值
        // max: [10,自定义]
        // max: 10
        let valid = true,
            max,
            tip = I18n['form.max'];

        if ($.isArray(rule)) {
            max = rule[0];
            if (rule[1]) {
                tip = rule[1];
            }
        } else {
            max = rule;
        }

        val = $.trim(val);
        if (val) {
            valid = (+val <= +max);
        }

        return {
            valid,
            tip: tip.replace(/{max}/g, max)
        };
    },

    maxborder(val, rule) {
        // 数字最大值，不包含边界
        // max: [10,自定义]
        // max: 10
        let valid = true,
            max,
            tip = I18n['form.max.border'];

        if ($.isArray(rule)) {
            max = rule[0];
            if (rule[1]) {
                tip = rule[1];
            }
        } else {
            max = rule;
        }

        val = $.trim(val);
        if (val) {
            valid = (+val < +max);
        }

        return {
            valid,
            tip: tip.replace(/{max}/g, max)
        };
    },

    min(val, rule) {
        // 数字最小值，包含边界
        // min: [10,自定义]
        // min: 10
        let valid = true,
            min,
            tip = I18n['form.min'];

        if ($.isArray(rule)) {
            min = rule[0];
            if (rule[1]) {
                tip = rule[1] + '';
            }
        } else {
            min = rule;
        }

        val = $.trim(val);
        if (val) {
            valid = (+val >= +min);
        }

        return {
            valid,
            tip: tip.replace(/{min}/g, min)
        };
    },

    minborder(val, rule) {
        // 数字最小值，不包含边界
        // min: [10,自定义]
        // min: 10
        let valid = true,
            min,
            tip = I18n['form.min.border'];

        if ($.isArray(rule)) {
            min = rule[0];
            if (rule[1]) {
                tip = rule[1] + '';
            }
        } else {
            min = rule;
        }

        val = $.trim(val);
        if (val) {
            valid = (+val > +min);
        }

        return {
            valid,
            tip: tip.replace(/{min}/g, min)
        };
    },

    /**
     * 以上支持校验项的或组合，只要有一个满足即可通过
     */
    union(val, rule) {
        // rule: {
        //     mobile: true,
        //     email: [true, '只支持qq邮箱', ['qq.com']]
        // }
        let valid = false,
            tips = [];

        for (let r in rule) {
            let info = this[r](val, rule[r]);

            // 有一个符合条件即可
            valid = valid || info.valid;

            if (!info.valid) {
                // 不符合条件的第一个提示
                tips.push(info.tip);
            }
        }

        return {
            valid,
            tip: tips[0] || ''
        };
    }
};