/*md5:265a9894bf4378e27ef34770403c3cdf*/
import CommonStyle from '../styles/wcs-common.js';
import UtilStyle from '../styles/wcs-util.js';
import SkeletonStyle from '../styles/wcs-skeleton.js';

export default (data) => {
    return `
        <style>
            ${CommonStyle} 
            ${UtilStyle} 
            ${SkeletonStyle}

            .line{
                height: 18px;
                margin-top: 8px;
            }
        </style>

        <div class="grid skeleton-animation">
            <div class="grid-title">
                <div class="skeleton-title"></div>  
            </div>
            <div class="grid-body">
                <div class="skeleton-img" style="height: ${(data.height || 200)}px;"></div>  
                ${data.arr.map(i => `
                    <div class="skeleton line"></div>  
                `).join('')}
            </div>
        </div>
    `;
}