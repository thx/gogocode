module.exports = function (source, api, options) {
    // 运行 vue upgrade 升级到 vue-cli 4

    // vue -> vue "^3.0.0"
    // vue-template-compiler -> "@vue/compiler-sfc": "^3.0.0"
    // "vue-router": "^4.0.8",
    // "vuex": "^4.0.0-0"

    // dependencies devDependencies
    function updateDepVersion(pkg, type, key, val) {
        if (pkg[type] && pkg[type][key]) {
            pkg[type][key] = val;
        }
    }

    function addDep(pkg, type, key, val) {
        if (!pkg[type]) {
            pkg[type] = {};
        }
        pkg[type][key] = val;
    }

    function removeDep(pkg, type, key) {
        if (pkg[type] && pkg[type][key]) {
            delete pkg[type][key];
        }
    }

    try {
        const pkg = JSON.parse(source);
        updateDepVersion(pkg, 'dependencies', 'vue', '^3.0.0');
        updateDepVersion(pkg, 'dependencies', 'vue-router', '^4.0.8');
        updateDepVersion(pkg, 'dependencies', 'vuex', '^4.0.2');
        removeDep(pkg, 'dependencies', 'vue-template-compiler');
        removeDep(pkg, 'devDependencies', 'vue-template-compiler');
        addDep(pkg, 'devDependencies', '@vue/cli-service', '^5.0.1');
        addDep(pkg, 'devDependencies', '@vue/cli-plugin-babel', '^5.0.1');
        addDep(pkg, 'devDependencies', '@babel/core', '^7.12.16');
        addDep(pkg, 'dependencies', 'tiny-emitter', '^2.1.0');
        addDep(pkg, 'dependencies', 'core-js', '^3.8.3');
        return JSON.stringify(pkg, null, 2);
    } catch (error) {
        return source;
    }
};
