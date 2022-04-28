/*md5:edc8e05a18cf0c3b1f4c980699b3a093*/
import CommonStyle from '../styles/wcs-common.js';
import UtilStyle from '../styles/wcs-util.js';
import SkeletonStyle from '../styles/wcs-skeleton.js';

export default (data) => {
    return `
        <style>
            ${CommonStyle} 
            ${UtilStyle} 
            ${SkeletonStyle}

            .img-wrapper {
                display: flex;
                flex-wrap: wrap;
                padding: var(--wcs-grid-body-v-gap, 16px) var(--wcs-grid-body-h-gap, 24px) calc(var(--wcs-grid-body-v-gap, 16px) - 12px) var(--wcs-grid-body-h-gap, 24px);
            }
            
            .img {
                flex: 0 0 calc((100% - 24px) / 3);
                margin-right: 12px;
                padding-bottom: 12px;
            }

            .img:nth-child(3n) {
                margin-right: 0px;
            }
        </style>

        <div class="grid skeleton-animation">
            <div class="grid-title">
                <div class="skeleton-title"></div>  
            </div>
            <div class="img-wrapper clearfix">
                ${data.arr.map(i => `
                    <div class="img">
                        <div class="skeleton" style="height: ${data.height || 88}px;"></div> 
                    </div>  
                `).join('')}
            </div>
        </div>
    `;
}