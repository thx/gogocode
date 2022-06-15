function addCodeToLifeCycle(scriptAst, lifeCycle, code, pos = 'front', propsName = '') {
    const hasLifeCycle = scriptAst.has(`${lifeCycle}() {}`);

    if (hasLifeCycle) {
        scriptAst.replace(
            `
  export default $_$.extend({
    ${lifeCycle}() {
      $$$2
    },
    $$$1
  })`,
            `
  export default $_$.extend({
    $$$1,
    ${lifeCycle}(${propsName}) {
      ${pos === 'front' ? code : ''}
      $$$2;
      ${pos === 'back' ? code : ''}
    }
  })`
        );
    } else {
        scriptAst.replace(
            `
  export default $_$.extend({
    $$$1
  })`,
            `
  export default $_$.extend({
      ${lifeCycle}(${propsName}) {
        ${code}
      },
      $$$1
  })
    `
        );
    }
    return scriptAst;
}

// function makeMethodToAsync(scriptAst, methodName) {
//   scriptAst
// }

module.exports = {
    addCodeToLifeCycle
}