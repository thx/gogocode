function isObject(value) {
    return typeof value == 'object' && value;
}

const hasOwn = Object.prototype.hasOwnProperty.call.bind(Object.prototype.hasOwnProperty);

module.exports = {
    isObject,
    hasOwn
}