/*md5:138484d0e2c3959c21a1850c0f76f2f8*/
export default `
    :host {
        /* 字体 */
        --wcs-line-height: var(--line-height, 1.5);
        --wcs-font-color: var(--font-color, #333);
        --wcs-font-size: var(--font-size, 12px);
        --wcs-font-family: Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
        --wcs-input-height: var(--input-height, 32px);
        --wcs-input-small-height: var(--input-small-height, 26px);

        /* 品牌色 */
        --wcs-color-brand: var(--color-brand, #385ACC);
        --wcs-color-brand-hover: var(--color-brand-hover, #2e4aa7);
        --wcs-color-brand-vs: var(--color-brand-vs, #f7664d);
        --wcs-color-brand-light: var(--color-brand-light, #d7def6);
        --wcs-color-brand-opacity: var(--color-brand-opacity, #eff2fb);
        --wcs-color-brand-text: var(--color-brand-text, #ffffff);
        --wcs-color-brand-text-hover: var(--color-brand-text-hover, #ffffff);

        /* 品牌按钮颜色，支持渐变 */
        --wcs-btn-border-radius: var(--btn-border-radius, var(--border-radius));
        --wcs-btn-brand: var(--btn-brand, var(--color-brand));
        --wcs-btn-brand-hover: var(--btn-brand-hover, var(--color-brand-hover));
        --wcs-btn-brand-text: var(--btn-brand-text, var(--color-brand-text));
        --wcs-btn-brand-text-hover: var(--btn-brand-text-hover, var(--color-brand-text-hover));
        --wcs-btn-text: var(--btn-text, #333);
        --wcs-btn-text-hover: var(--btn-text-hover, #333);
        --wcs-btn-border: var(--btn-border, var(--color-brand));
        --wcs-btn-border-hover: var(--btn-border-hover, var(--color-brand));
        --wcs-btn-bg: var(--btn-bg, var(--color-brand-opacity));
        --wcs-btn-bg-hover: var(--btn-bg-hover, var(--color-brand-light));

        /* 边框 */
        --wcs-color-border: var(--color-border, #e6e6e6);
        --wcs-border-radius: var(--border-radius, 4px);
        --wcs-border-highlight: var(--border-highlight, #9095A1);
        --wcs-border-highlight-hover: var(--border-highlight-hover, var(--color-brand));

        /* 提示颜色 */
        --wcs-color-warn: var(--color-warn, #ffb400);
        --wcs-color-red: var(--color-red, #d52112);
        --wcs-color-green: var(--color-green, #30ab66);
        --wcs-color-blue: var(--color-blue, #4d7fff);

        /* 背景色 */
        --wcs-color-bg: var(--color-bg, #f5f5f5);
        --wcs-color-bg-hover: var(--color-bg-hover, var(--color-brand-opacity));
        
        /* 动画 */
        --wcs-duration: var(--duration, 0.2s);
        --wcs-timing-function: var(--timing-function, ease-out);

        /* 阴影 */
        --wcs-comp-shadow-box-border: var(--mx-comp-shadow-box-border, #f5f5f6);
        --wcs-comp-shadow-box: var(--mx-comp-shadow-box, 0 1px 1px 0 rgba(0, 0, 0, 0.08));
        --wcs-comp-shadow-card: var(--mx-comp-shadow-card, 0 1px 1px 0 rgba(0, 0, 0, 0.08));
        --wcs-comp-shadow-card-hover: var(--mx-comp-shadow-card-hover, 0 4px 6px 0 rgba(0, 0, 0, 0.08));

        /* grid 卡片 */
        --wcs-grid-title-v-gap: var(--mx-grid-title-v-gap, 10px);
        --wcs-grid-title-h-gap: var(--mx-grid-title-h-gap, 24px);
        --wcs-grid-title-font-weight: var(--mx-grid-title-font-weight, normal);
        --wcs-grid-title-font-size: var(--mx-grid-title-font-size, 16px);
        --wcs-grid-title-color-border: var(--mx-grid-title-color-border, var(--color-border));
        --wcs-grid-title-link-font-size: var(--mx-grid-title-link-font-size, 12px);
        --wcs-grid-title-link-color: var(--mx-grid-title-link-color, var(--color-brand));
        --wcs-grid-title-link-color-hover: var(--mx-grid-title-link-color-hover, var(--color-brand-hover));
        --wcs-grid-body-v-gap: var(--mx-grid-body-v-gap, 16px);
        --wcs-grid-body-h-gap: var(--mx-grid-body-h-gap, 24px);

        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: var(--wcs-font-color);
        font-family: var(--wcs-font-family);
        font-size: var(--wcs-font-size);
        line-height: var(--wcs-line-height);
        -webkit-font-smoothing: antialiased;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }
`;