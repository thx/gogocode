/*md5:6cc3081cd093a8033968bc5671ea1201*/
var i18n = {};
var defaultLocale = 'zh-cn';
i18n['zh-cn'] = require('./zh-cn.js');
i18n['en-us'] = require('./en-us.js');

for (var locale in i18n) {
  if (!i18n.hasOwnProperty(locale)) {
    continue;
  }
  if (locale == defaultLocale) {
    continue;
  }
  for (var key in i18n[defaultLocale]) {
    if (!i18n[defaultLocale].hasOwnProperty(key)) {
      continue;
    }
    if (!i18n[locale].hasOwnProperty(key)) {
      i18n[locale][key] = i18n[defaultLocale][key];
    }
  }
}

//把其它信息也加上去
i18n.appName = 'magix3-zs-gallery';
i18n.groupName = 'magix3';
i18n.defaultLocale = defaultLocale;

module.exports = i18n;

