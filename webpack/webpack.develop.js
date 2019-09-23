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
const cleanOptions = "./build"; //需要清除的目录
const vConsole = require("../plugins/vConsole.js");
const seen = new Set();
module.exports = function () {
    return merge(common, {
        mode: 'development',
        optimization: {
            // minimize:false
        },
        output: {
            publicPath: config.develop.publicPath
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
            new OptimizeCssAssetsPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('develop')
                }
            }),
            new vConsole()
        ]
    });
}