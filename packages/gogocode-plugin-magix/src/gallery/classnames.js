module.exports = function ({ script, template }, api) {
    if (!template) {
        return { script, template };
    }

    const oldUtilClassNames = ["link-light","link-light","link-grey","link-grey","link-brand","link-brand","fontsize-12","fontsize-14","fontsize-16","fontsize-18","fontsize-20","fontsize-22","fontsize-24","fontsize-26","fontsize-28","fontsize-30","fontsize-32","fontsize-34","fontsize-36","fontsize-38","fontsize-40","lh-ih","lh-ish","lh14","lh16","lh18","lh20","lh22","lh24","lh26","lh28","lh30","lh32","lh34","lh36","w50","w60","w70","w80","w90","w100","w110","w120","w130","w140","w150","w160","w170","w180","w190","w200","w210","w220","w230","w240","w250","w260","w270","w280","w290","w300","w310","w320","w330","w340","w350","w360","w370","w380","w390","w400","w410","w420","w430","w440","w450","w460","w470","w480","w490","w500","w510","w520","w530","w540","w550","w560","w570","w580","w590","w600","h50","h60","h70","h80","h90","h100","h110","h120","h130","h140","h150","h160","h170","h180","h190","h200","h210","h220","h230","h240","h250","h260","h270","h280","h290","h300","h310","h320","h330","h340","h350","h360","h370","h380","h390","h400","h410","h420","h430","h440","h450","h460","h470","h480","h490","h500","h510","h520","h530","h540","h550","h560","h570","h580","h590","h600","min-width-10","min-width-20","min-width-30","min-width-40","min-width-50","min-width-60","min-width-70","min-width-80","min-width-90","min-width-100","min-width-110","min-width-120","min-width-130","min-width-140","min-width-150","min-width-160","min-width-170","min-width-180","min-width-190","min-width-200","min-width-210","min-width-220","min-width-230","min-width-240","min-width-250","min-width-260","min-width-270","min-width-280","min-width-290","min-width-300","min-width-310","min-width-320","max-width-100","max-width-200","max-width-300","max-width-400","max-width-500","max-width-600","max-width-700","max-width-800","max-width-900","max-width-1000","min-height-10","min-height-20","min-height-30","min-height-40","min-height-50","min-height-60","min-height-70","min-height-80","min-height-90","min-height-100","min-height-110","min-height-120","min-height-130","min-height-140","min-height-150","min-height-160","min-height-170","min-height-180","min-height-190","min-height-200","min-height-210","min-height-220","min-height-230","min-height-240","min-height-250","min-height-260","min-height-270","min-height-280","min-height-290","min-height-300","min-height-310","min-height-320","min-height-330","min-height-340","min-height-350","min-height-360","min-height-370","min-height-380","min-height-390","min-height-400","max-height-100","max-height-200","max-height-300","max-height-400","max-height-500","max-height-600","max-height-700","max-height-800","max-height-900","max-height-1000","mt8","mr8","mb8","ml8","pt8","pr8","pb8","pl8","mt16","mr16","mb16","ml16","pt16","pr16","pb16","pl16","mt24","mr24","mb24","ml24","pt24","pr24","pb24","pl24","mt32","mr32","mb32","ml32","pt32","pr32","pb32","pl32","mt40","mr40","mb40","ml40","pt40","pr40","pb40","pl40","mt48","mr48","mb48","ml48","pt48","pr48","pb48","pl48","mt5","mr5","mb5","ml5","mt10","mr10","mb10","ml10","mt15","mr15","mb15","ml15","mt20","mr20","mb20","ml20","mt25","mr25","mb25","ml25","mt30","mr30","mb30","ml30","mt35","mr35","mb35","ml35","mt40","mr40","mb40","ml40","mt45","mr45","mb45","ml45","mt50","mr50","mb50","ml50","mt55","mr55","mb55","ml55","mt60","mr60","mb60","ml60","mt65","mr65","mb65","ml65","mt70","mr70","mb70","ml70","mt75","mr75","mb75","ml75","mt80","mr80","mb80","ml80","mt85","mr85","mb85","ml85","mt90","mr90","mb90","ml90","mt95","mr95","mb95","ml95","mt100","mr100","mb100","ml100","pt5","pr5","pb5","pl5","pa5","pt10","pr10","pb10","pl10","pa10","pt15","pr15","pb15","pl15","pa15","pt20","pr20","pb20","pl20","pa20","pt25","pr25","pb25","pl25","pa25","pt30","pr30","pb30","pl30","pa30","pt35","pr35","pb35","pl35","pa35","pt40","pr40","pb40","pl40","pa40","pt45","pr45","pb45","pl45","pa45","pt50","pr50","pb50","pl50","pa50","pt55","pr55","pb55","pl55","pa55","pt60","pr60","pb60","pl60","pa60","pt65","pr65","pb65","pl65","pa65","pt70","pr70","pb70","pl70","pa70","pt75","pr75","pb75","pl75","pa75","pt80","pr80","pb80","pl80","pa80","pt85","pr85","pb85","pl85","pa85","pt90","pr90","pb90","pl90","pa90","pt95","pr95","pb95","pl95","pa95","pt100","pr100","pb100","pl100","pa100","pt105","pr105","pb105","pl105","pa105","pt110","pr110","pb110","pl110","pa110","pt115","pr115","pb115","pl115","pa115","pt120","pr120","pb120","pl120","pa120","pt125","pr125","pb125","pl125","pa125","pt130","pr130","pb130","pl130","pa130","pt135","pr135","pb135","pl135","pa135","pt140","pr140","pb140","pl140","pa140","tc","tr","tl","clearfix","radius","unselectable","bold","word-break","nowrap","font-number","font-tahoma","font-simhei","color-c","color-3","color-6","color-9","color-f","color-brand","color-h-f","color-h-3","color-h-brand","color-h-error","color-brand-vs","color-red","color-green","color-warn","bt-e6","bb-e6","fl","fr","cursor-default","cursor-pointer","cursor-help","cursor-move","cursor-not-allow","pa","pr","ellipsis"];

    
    const classNameMap = {
        'mc-iconfont': 'mx5-iconfont',
        'mx-': 'mx5-',
    };

    oldUtilClassNames.forEach(className => {
        classNameMap[className] = `mx5-${className}`;
    })


    template.find(['<$_$></$_$>', '<$_$/>']).each((ast) => {
        const attrs = ast.attr('content.attributes') || [];
        const clsAttr = attrs.find((attr) => attr.key.content === 'class');
        if(clsAttr?.value?.content) {
            const classNames = clsAttr.value.content.split(' ')?.map(className => {
                return classNameMap[className] || className;
            });
            clsAttr.value.content = classNames.join(' ');
        }
        
    });
    return { script, template };
};
