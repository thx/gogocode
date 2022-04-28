/*md5:0649eb90b26bbf90eab0bc18797203b1*/
import CommonStyle from '../styles/wcs-common.js';
import UtilStyle from '../styles/wcs-util.js';
import SkeletonStyle from '../styles/wcs-skeleton.js';

export default () => {
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
        
        <div class="clearfix skeleton-animation" style="margin-left: -8px; margin-right: -8px;">
            ${[0, 1, 2].map(i => `
            <div style="float: left; width: ${(100 / 3)}%; padding: 0 8px;">
                <div class="grid">
                    <div class="grid-title clearfix">
                        <div class="skeleton-title"></div>  
                        <div class="skeleton-title" style="float: right; width: 46px;"></div>  
                    </div>
                    <div class="img-wrapper">
                        ${[0, 1, 2, 3, 4, 5].map(k => `
                            <div class="img">
                                <div class="skeleton" style="height: 40px;"></div> 
                            </div>  
                        `).join('')}
                    </div>
                </div>
            </div>
            `).join('')}
        </div>
    `;
}