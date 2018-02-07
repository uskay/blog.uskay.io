const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: {
        common: [
            'babel-polyfill', 
            './public/src/uskayui/blog/UskayGlobalHeader.js',
            './public/src/uskayui/blog/UskayGlobalFooter.js',
            './public/src/uskayui/blog/UskayProfile.js'
        ],
        top: [
            './public/src/uskayui/blog/UskayArticleList.js'
        ],
        article: [
            './public/src/uskayui/blog/UskayArticle.js'
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public/src/uskayui/blog/bundle')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ["transform-custom-element-classes"]
                    }
                }
            }
        ]
    },
    plugins: [
        new UglifyJsPlugin()
    ]
};