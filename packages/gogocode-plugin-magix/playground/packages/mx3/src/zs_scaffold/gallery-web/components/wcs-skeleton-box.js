/*md5:3f52906cbe5c94c49ea41d573c6ab3a4*/
import CommonStyle from '../styles/wcs-common.js';
import UtilStyle from '../styles/wcs-util.js';
import SkeletonStyle from '../styles/wcs-skeleton.js';

export default (data) => {
    let height = data.height || 110;
    return `
        <style>
            ${CommonStyle} 
            ${UtilStyle} 
            ${SkeletonStyle}

            .left {
                float: left;
                width: 20%;
                height: 80px;
                margin-top: 15px;
            }

            .right {
                float: right;
                width: 76%;
                height: 110px;
            }
        </style>

        <div class="grid skeleton-animation">
            <div class="grid-title">
                <div class="skeleton-title"></div>  
            </div>
            <div class="grid-body clearfix">
                <div class="skeleton-img left" style="height: ${(height - 30)}px;"></div>  
                <div class="skeleton-img right" style="height: ${height}px;"></div>  
            </div>
        </div>
    `;
}