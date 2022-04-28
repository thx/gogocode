/*md5:720d857e5d0698c3e0b3069786839a5d*/
import CommonStyle from '../styles/wcs-common.js';
import UtilStyle from '../styles/wcs-util.js';
import SkeletonStyle from '../styles/wcs-skeleton.js';

export default (data) => {
    return `
        <style>
            ${CommonStyle} 
            ${UtilStyle} 
            ${SkeletonStyle}

            .item {
                position: relative;
                margin-bottom: 32px;
                padding-right: 72px;
            }
            
            .item:last-child {
                margin-bottom: 0;
            }

            .right {
                position: absolute;
                top: 50%;
                right: 0;
                width: 36px;
                margin-top: -9px;
            }

            .line {
                height: 18px;
            }

            .line1 {
                margin-right: 36px;
                margin-bottom: 8px;
            }
        </style>
        
        <div class="clearfix skeleton-animation" style="margin-left: -8px; margin-right: -8px;">
            ${[0, 1, 2].map(i => `
            <div style="float: left; width: ${(100 / 3)}%; padding: 0 8px;">
                <div class="grid">
                    <div class="grid-title clearfix">
                        <div class="skeleton-title"></div>  
                    </div>
                    <div class="grid-body">
                        ${data.arr.map(j => `
                            <div class="item">
                                <div class="left">
                                    <div class="skeleton line line1"></div>
                                    <div class="skeleton line"></div>
                                </div>
                                <div class="right skeleton line"></div>
                            </div>  
                        `).join('')}
                    </div>
                </div>
            </div>
            `).join('')}
        </div>
    `;
}