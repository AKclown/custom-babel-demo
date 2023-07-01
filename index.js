const { transformSync } = require("@babel/core");
const customPlugin = require('./custom-plugin');

const sourceCode = `
function AKclown(){
  console.log('AKclown')
}
`
const { code } = transformSync(sourceCode, {
    plugins: [customPlugin],
    parserOpts: {
        sourceType: 'unambiguous',
    }
});

console.log('code: ', code);
