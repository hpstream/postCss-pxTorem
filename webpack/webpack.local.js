const webpack = require('webpack');
const merge = require('webpack-merge');
const vConsole = require("../plugins/vConsole.js");
module.exports = function (proxyUrl) {
	const common = require('./webpack.common.js');
	return merge(common, {
		mode: 'development',
		devtool: 'inline-source-map',
		devServer: {
			contentBase: "./build/", //监听代码变化自动提交并刷新网页
			host: '0.0.0.0',
			port: 8080,
			disableHostCheck: true,
			proxy: { //配置代理
				'/web/webApi': {
					target: proxyUrl,
					secure: false,
					changeOrigin: true
				}
			}
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify('dev')
				}
			}),
			new vConsole()
		]
	})
};