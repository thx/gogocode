/*md5:0020cf5e5b02009463273720d84dba59*/
import CommonStyle from '../styles/wcs-common.js';
import UtilStyle from '../styles/wcs-util.js';
import SkeletonStyle from '../styles/wcs-skeleton.js';

export default (data) => {
    return `
        <style>
            ${CommonStyle} 
            ${UtilStyle} 
            ${SkeletonStyle}
        </style>

        <div class="grid skeleton-animation">
            <div class="grid-title">
                <div class="skeleton-title"></div>  
            </div>
            <div class="skeleton-img" style="height: ${(data.height || 160)}px; ${data.gap ? 'margin: var(--wcs-grid-body-v-gap, 16px) var(--wcs-grid-body-h-gap, 24px);' : 'border-top-left-radius: 0; border-top-right-radius: 0;'}"></div>  
        </div>
    `;
}