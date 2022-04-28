/*md5:7b0fbac971733eac5bb21f8afe16e4cc*/
import SkeletonReport from '../components/wcs-skeleton-report.js';
import SkeletonCircleText from '../components/wcs-skeleton-circle-text.js';
import SkeletonBizList from '../components/wcs-skeleton-biz-list.js';
import SkeletonRanks from '../components/wcs-skeleton-ranks.js';
import SkeletonImgs from '../components/wcs-skeleton-imgs.js';
import SkeletonImg from '../components/wcs-skeleton-img.js';
import SkeletonCourses from '../components/wcs-skeleton-courses.js';
import SkeletonBox from '../components/wcs-skeleton-box.js';
import SkeletonTextLines from '../components/wcs-skeleton-text-lines.js';

class WcsSkeleton extends HTMLElement {
    constructor() {
        super();

        let type = this.getAttribute('type');

        // 不同场景默认高度不一致，此处无需统一设置抄底值
        let height = this.getAttribute('height');

        // 计数
        let num = +this.getAttribute('num') || 3;
        let arr = [];
        for (let i = 0; i < num; i++) {
            arr.push(i);
        }

        // report 展开收起动画  
        let expand = (this.getAttribute('expand') + '' === 'true');

        // 是否需要间距 16px 24px
        let gap = (this.getAttribute('gap') + '' === 'true');

        // text-lines 类型用
        let tip = (this.getAttribute('tip') + '' === 'true');
        let progress = (this.getAttribute('progress') + '' === 'true');
        let btns = +this.getAttribute('btns') || 0;
        let btnArr = [];
        for (let i = 0; i < btns; i++) {
            btnArr.push(i);
        }

        let data = {
            type, height, num, arr, expand, gap, tip, progress, btnArr
        };

        let templates = {
            'report': SkeletonReport(data),
            'circle-text': SkeletonCircleText(data),
            'biz-list': SkeletonBizList(data),
            'ranks': SkeletonRanks(data),
            'imgs': SkeletonImgs(data),
            'img': SkeletonImg(data),
            'courses': SkeletonCourses(data),
            'box': SkeletonBox(data),
            'text-lines': SkeletonTextLines(data)
        };

        let shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = templates[type] || templates['text-lines'];
    }

    connectedCallback() {
        // 入场动画
        setTimeout(() => { this.shadowRoot.host.style.opacity = 1; }, 0);
    }
}

if (!window.customElements.get('wcs-skeleton')) {
    window.customElements.define('wcs-skeleton', WcsSkeleton);
}