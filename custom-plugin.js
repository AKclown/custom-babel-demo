const generate = require('@babel/generator').default;
const targetCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);
module.exports = function ({ types: t }) {
    return {
        visitor: {
            CallExpression(path, state) {
                const calleeName = generate(path.node.callee).code; // 生成console.~字符串
                if (targetCalleeName.includes(calleeName)) {
                    const { line } = path.node.loc.start;
                    path.node.arguments.unshift(t.stringLiteral(`${line}:`))
                }
            }
        }
    };
}