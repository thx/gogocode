function isObject(value) {
    return typeof value == 'object' && value;
}

const hasOwn = Object.prototype.hasOwnProperty.call.bind(Object.prototype.hasOwnProperty);

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
}

module.exports = {
    isObject,
    hasOwn,
    escapeRegExp
}