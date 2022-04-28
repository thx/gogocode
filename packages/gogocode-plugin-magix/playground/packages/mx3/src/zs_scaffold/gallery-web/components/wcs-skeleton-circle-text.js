/*md5:c1db4c0ae5b6c029744abd0fd5a33b78*/
import CommonStyle from '../styles/wcs-common.js';
import UtilStyle from '../styles/wcs-util.js';
import SkeletonStyle from '../styles/wcs-skeleton.js';

export default (data) => {
    let { arr } = data;
    return `
        <style>
            ${CommonStyle} 
            ${UtilStyle} 
            ${SkeletonStyle}

            .item {
                position: relative;
                float: left;
                width: 20%;
                padding-left: 58px;
            }

            .item-img {
                position: absolute;
                top: 50%;
                left: 0;
                width: 48px;
                height: 48px;
                margin-top: -24px;
                border-radius: 50%;
            }

            .item-info1 {
                width: 50%;
                height: 18px;
                margin-bottom: 8px;
            }

            .item-info2 {
                width: 30%;
                height: 24px;
            }
        </style>

        <div class="grid skeleton-animation">
            <div class="grid-title">
                <div class="skeleton-title"></div>  
            </div>
            <div class="grid-body clearfix">
                ${arr.map(i => `
                    <div class="item clearfix" style="width: ${(100 / arr.length)}%;">
                        <div class="skeleton-img item-img"></div>
                        <div class="skeleton item-info1"></div>
                        <div class="skeleton item-info2"></div>
                    </div> 
                `).join('')}
            </div>
        </div>
    `;
}