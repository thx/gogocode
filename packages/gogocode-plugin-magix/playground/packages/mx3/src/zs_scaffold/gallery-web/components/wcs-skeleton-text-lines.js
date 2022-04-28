/*md5:7d11fe4d5b266260582b55e4c0ae13b0*/
import CommonStyle from '../styles/wcs-common.js';
import UtilStyle from '../styles/wcs-util.js';
import SkeletonStyle from '../styles/wcs-skeleton.js';

export default (data) => {
    return `
        <style>
            ${CommonStyle} 
            ${UtilStyle} 
            ${SkeletonStyle}

            .item-line {
                margin-bottom: 12px;
            }
        
            .item-line:last-child {
                margin-bottom: 0;
            }

            .item {
                width: 50%;
                height: 24px;
            }

            .item-first {
                width: 60%;
            }

            .item-btn {
                width: 23%;
                margin-right: 4%;
            }

            .item-progress{
                width: 80%;
            }
        </style>

        <div class="grid skeleton-animation">
            <div class="grid-title">
                <div class="skeleton-title"></div>  
            </div>
            <div class="grid-body">
                ${data.tip ? '<div class="item-line"><div class="skeleton skeleton-item-title"></div></div>' : ''}
                ${data.arr.map(i => `
                    <div class="item-line"><div class="skeleton item ${(i == 0 && data.arr.length > 1) ? 'item-first' : ''}"></div></div>
                `).join('')}
                ${(data.btnArr.length > 0) ? `<div class="item-line clearfix">${data.btnArr.map(i => `<div class="skeleton item-btn fl"></div> `).join('')}</div>` : ''}
                ${data.progress ? '<div class="item-line"><div class="skeleton-progress item-progress"></div></div>' : ''}
            </div>
        </div>
    `;
}