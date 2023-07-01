const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const generate = require('@babel/generator').default;

const sourceCode = `
function AKclown(){
  console.log('AKclown')
}
`
const ast = parser.parse(sourceCode, {
  sourceType: 'unambiguous'
});

const targetCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);
traverse(ast, {
  CallExpression(path, state) {
    const calleeName = generate(path.node.callee).code; // 生成console.~字符串

    if (targetCalleeName.includes(calleeName)) {
      const { line } = path.node.loc.start;
      path.node.arguments.unshift(t.stringLiteral(`${line}:`))
    }
  }
});
const code = generate(ast).code;
console.log('code: ', code);