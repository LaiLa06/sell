// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        //js 结束的时候要有分号
        'semi': ['error', 'always'], //每句js后面加分号
        'indent': 0, //禁止不缩进就报错
        'no-tabs': 'off', //禁止没有空格就要报错
        'eol-last': 0, //禁止每句js写完都要换行
        'space-before-function-paren': 0,
    }
}