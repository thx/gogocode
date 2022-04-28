export function createHashStr(len = 18) {
    const strs =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let hashStr = '';

    for (let i = 0; i < len; i++) {
        hashStr += strs.charAt(Math.floor(Math.random() * strs.length));
    }

    return hashStr;
}
