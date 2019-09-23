const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const fs = require('fs');
const common = require('./webpack.common.js');

const config = require('../config/index.js');
const root = config.common.root;
const seen = new Set();
const cleanOptions = "./build"; //需要清除的目录
module.exports = function () {
    return merge(common, {
        mode: 'production',
        output: {
            publicPath: config.prod.publicPath
        },
        plugins: [
            new CleanWebpackPlugin(cleanOptions, {
                root: root
            }),
            new webpack.NamedChunksPlugin(chunk => {
                if (chunk.name) {
                    return chunk.name
                }
                const modules = Array.from(chunk.modulesIterable)
                if (modules.length > 1) {
                    const hash = require('hash-sum')
                    const joinedHash = hash(modules.map(m => m.id).join('_'))
                    let len = 8
                    while (seen.has(joinedHash.substr(0, len))) len++
                    seen.add(joinedHash.substr(0, len))
                    return `chunk-${joinedHash.substr(0, len)}`
                } else {
                    return modules[0].id
                }
            }),
            // keep module.id stable when vender modules does not change
            new webpack.HashedModuleIdsPlugin(),
            new ParallelUglifyPlugin({
                cacheDir: '.cache/',
                // Optional regex, or array of regex to match file against. Only matching files get minified.
                // Defaults to /.js$/, any f÷

                uglifyJS: {
                    // These pass straight through to uglify-es.
                    // Cannot be used with uglifyJS.
                    // uglify-es is a version of uglify that understands newer es6 syntax. You should use this option if the
                    // files that you're minifying do not need to run in older browsers/versions of node.
                    output: {
                        beautify: false, //不需要格式化
                        comments: false //不保留注释
                    },
                    compress: {
                        // warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
                        drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                        collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                        reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                    }
                }
            }),
            new OptimizeCssAssetsPlugin()
        ]
    })
};

// const webpack = require('webpack');
// const merge = require('webpack-merge');
// const path = require('path');

// module.exports = function(){
// 	const test = require('./webpack.dev.js');
// 	const basicPath = process.cwd().substring(process.cwd().lastIndexOf(path.sep)+1);
// 	const publicPath = "https://qiniuh5.wodidashi.com/web/"+basicPath+"/";
// 	return merge(test, {
// 		mode: 'production',
// 		output: {
// 			publicPath: publicPath
// 		}
// 	})
// };