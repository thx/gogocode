/*md5:7092b39bce234ccf1b666753004d79ad*/
export default `
    .fl {
        float: left;
    }

    .fr {
        float: right;
    }

    .grid:before,
    .grid:after,
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .grid:after,
    .clearfix:after {
        clear: both;
    }

    .grid {
        background: #fff;
        border-radius: var(--wcs-border-radius);
        box-shadow: var(--wcs-comp-shadow-card);
        transition: box-shadow var(--wcs-duration) var(--wcs-timing-function);
    }

    .grid:hover {
        box-shadow: var(--wcs-comp-shadow-card-hover);
    }

    .grid-title {
        padding: var(--wcs-grid-title-v-gap, 10px) var(--wcs-grid-title-h-gap, 24px);
        border-bottom: 1px solid var(--wcs-grid-title-color-border, #e6e6e6);
    }

    .grid-body {
        padding: var(--wcs-grid-body-v-gap, 16px) var(--wcs-grid-body-h-gap, 24px);
    }

    .color-brand {
        color: var(--wcs-color-brand);
    }

    .color-brand-vs {
        color: var(--wcs-color-brand-vs);
    }

    ${[8, 16, 24, 32].map(n => `
        .mt${n} {
            margin-top: ${n}px;
        }

        .mr${n} {
            margin-right: ${n}px;
        }

        .mb${n} {
            margin-bottom: ${n}px;
        }

        .ml${n} {
            margin-left: ${n}px;
        } 
    `).join('')}

    ${[100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000].map(n => `
        .w${n} {
            width: ${n}px;
        }
    `).join('')}
`;