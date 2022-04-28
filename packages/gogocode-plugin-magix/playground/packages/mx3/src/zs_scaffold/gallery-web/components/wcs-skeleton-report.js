/*md5:034394c8843dbce522ddfdda380b2e6c*/
import CommonStyle from '../styles/wcs-common.js';
import UtilStyle from '../styles/wcs-util.js';
import SkeletonStyle from '../styles/wcs-skeleton.js';

export default (data) => {
    // 显示指定height=0时表示没有图表区域，其余情况有图表
    let hideChart = (data.height + '' === '0');

    // 图表高度
    let height = data.height || 248;

    return `
        <style>
            ${CommonStyle} 
            ${UtilStyle} 
            ${SkeletonStyle}

            .left {
                float: left;
                width: 150px;
            }
            
            .right {
                float: right;
                width: 200px;
            }

            .item {
                float: left;
                width: 16.6%;
            }

            .item-line {
                margin-bottom: 8px;
            }
        
            .item-line:last-child {
                margin-bottom: 0;
            }

            .item-info1 {
                width: 40%;
                height: 24px;
            }

            .item-info2 {
                width: 50%;
                height: 24px;
            }

            @keyframes anim-chart-expand {
                0% {
                    opacity: 0;
                    height: 0;
                    margin-top: 0;
                }
            
                100% {
                    opacity: 1;
                    height: ${(height + 24 + 32)}px;
                    margin-top: 24px;
                }
            }

            .item-chart-anim {
                opacity: 0;
                height: 0;
                margin-top: 0;
                overflow: hidden;
                animation: anim-chart-expand var(--wcs-duration) ease-out;
                animation-fill-mode: forwards;
                animation-delay: var(--wcs-duration);
            }

            .item-chart {
                margin-top: 24px;
            }
        </style>

        <div class="grid skeleton-animation">
            <div class="grid-title">
                <div class="skeleton-title"></div>  
            </div>
            <div class="grid-body">
                <div class="clearfix">
                    <span class="skeleton left"></span>
                    <span class="skeleton right"></span>
                </div>
                <div class="clearfix mt24">
                    ${data.arr.map(i => `
                        <div class="item" style="width: ${(100 / data.arr.length)}%;">
                            <div class="item-line">
                                <div class="skeleton skeleton-item-title"></div>
                            </div>
                            <div class="item-line item-info1 skeleton"></div>
                            <div class="item-line item-info2 skeleton"></div>
                        </div>
                    `).join('')}
                </div>
                ${hideChart ? '' : `
                    <div class="${data.expand ? 'item-chart-anim' : 'item-chart'}">
                        <div class="clearfix">
                            <span class="skeleton left mr16"></span>
                            <span class="skeleton left"></span>
                            <span class="skeleton right"></span>
                        </div>
                        <div class="skeleton-img mt24" style="height: ${height}px;"></div>
                    </div>
                `}
            </div>
        </div>
    `;
}