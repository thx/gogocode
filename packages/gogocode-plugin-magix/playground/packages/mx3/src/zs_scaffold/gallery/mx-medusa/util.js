/*md5:7fcfce461106bb470c062c6b119ad555*/
let I18n = require('./index');
let Magix = require('magix');
let Map = {
    zh: 'zh-cn',
    en: 'en-us'
}

let Get = () => {
    let lang = Magix.config('medusa');
    if(!lang){
        let ua = navigator.userAgent;
        let result = ua.match(/language\/(\S+)/);
        if (result && result.length > 0) {
            lang = result[1];
        } else {
            // browserLanguage 判断IE浏览器使用语言
            // language 判断除IE外其他浏览器使用语言
            lang = navigator.browserLanguage || navigator.language || I18n.defaultLocale;
        }
    }
    //获取浏览器配置语言前两位
    lang = Map[(lang.toLowerCase()).substr(0, 2)];

    let map = I18n[lang] || I18n[I18n.defaultLocale];
    return map;
}
module.exports = Get();