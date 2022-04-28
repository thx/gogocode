/*md5:d74e33abf38f3b960af18cae0b797a23*/
//#gallery-config
module.exports = {
    'mx-dropdown.item'(tag) {
        return `<i ${tag.attrs} class="none">${tag.content}</i>`;
    }
}