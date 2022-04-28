/*md5:104638a849ece2ae18e059a393a6349f*/
export default `
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
    `)}
`;