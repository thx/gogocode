/*md5:dba2a33d3a9de8cb19c01febc5122711*/
export default `
    :host {
        opacity: 0;
        display: block;
        transition: opacity var(--wcs-duration) var(--wcs-timing-function);
    }

    @-webkit-keyframes skeleton-loading {
        0% {
            background-position: 100% 50%;
        }

        to {
            background-position: 0 50%
        }
    }

    .skeleton-title,
    .skeleton,
    .skeleton-img,
    .skeleton-progress {
        display: block;
        border-radius: var(--wcs-border-radius);
        vertical-align: middle;
    }

    .skeleton-title,
    .skeleton,
    .skeleton-progress {
        background: linear-gradient(90deg, #F0F0F0 40%, #F5F5F5 50%, #F0F0F0 60%);
        background-size: 400% 100%;
    }

    .skeleton-img {
        background: linear-gradient(90deg, #F5F5F5 40%, #FAFAFA 50%, #F5F5F5 60%);
        background-size: 400% 100%;
    }

    .skeleton-title {
        display: inline-block;
        width: 96px;
        height: 24px;
        margin: calc((var(--wcs-input-height) - 24px) / 2) 0;
    }

    .skeleton {
        height: var(--wcs-input-height);
    }

    .skeleton-progress {
        height: 6px;
        border-radius: 3px;
    }
    
    .skeleton-animation .skeleton-title,
    .skeleton-animation .skeleton,
    .skeleton-animation .skeleton-img,
    .skeleton-animation .skeleton-progress {
        animation: skeleton-loading 2s var(--wcs-timing-function) infinite;
    }

    .skeleton-item-title {
        display: inline-block;
        width: 40px;
        max-width: 30%;
        height: 18px;
    }

    .skeleton-item-tip {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-left: 5px;
    }
`;