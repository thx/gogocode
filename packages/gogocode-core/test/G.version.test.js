const $ = require('../index');
const pkg = require('../package.json');

test('$.version: version should be ok', () => {
    expect($.version).toBe(pkg.version);
})
