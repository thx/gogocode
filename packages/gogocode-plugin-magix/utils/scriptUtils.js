function addCodeToLifeCycle(scriptAst, lifeCycle, code, propsName = '') {
    const hasLifeCycle = scriptAst.has(`${lifeCycle}() {}`);

    if (hasLifeCycle) {
        scriptAst.replace(
            `
  export default $_$.extend({
    ${lifeCycle}(${propsName}) {
      $$$2
    },
    $$$1
  })`,
            `
  export default $_$.extend({
    $$$1,
    ${lifeCycle}(${propsName}) {
      $$$2;
      ${code}
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

module.exports = {
    addCodeToLifeCycle
}