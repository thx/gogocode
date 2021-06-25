module.exports = function (ast) {
    const script =
    ast.parseOptions && ast.parseOptions.language === 'vue'
        ? ast.find('<script></script>')
        : ast;
    script.replace(
        `{
      data: {
        $$$1
      },
      $$$2
    }`,
        `{
      data() {
        return {
          $$$1
        }
      },
      $$$2
  }`
    );
    return ast;
};
