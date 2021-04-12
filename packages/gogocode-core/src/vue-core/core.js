const parse = require('./parse');
const core = {
    buildAstByAstStr(str, astPatialMap = {}, { isProgram = false, parseOptions } = {}) {
        try {
            const program = parse(str, parseOptions);
            if (program) {
                if (isProgram) {
                    return program;
                } else {
                    if (program.template && program.template.ast) {
                        return program.template
                    } else return null
                }
            } else {
                return null;
            }
        } catch(e) {
            console.log('buildAstByAstStr failed:' + e)
        }
    }
}

module.exports = core;