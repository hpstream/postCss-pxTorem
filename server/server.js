var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var configfn = require('../webpack/webpack.local.js');
const open = require('open');
const getParame = require('../webpack/util/getParame.js');
// var port = config.devServer.port;
const portfinder = require('portfinder');
var proxyUrlOBj = {
    1: 'http://t1.zhuhuiyao.cn',
    2: 'http://tdev.kuaishebao.com'
};
module.exports = function() {
    // 结束依赖关系
    var info = getParame['npm_config_proxyUrl'] || 1;
    var proxyUrl = proxyUrlOBj[info] || info;

    var config = configfn(proxyUrl);
    //  添加热加载链接
    var entrys = config.entry;
    portfinder.basePort = process.env.PORT || config.devServer.port;
    const devServerOptions = Object.assign({}, config.devServer);
    portfinder.getPort((err, port) => {
        if (err) {
            // console.log(err);
        } else {
        // 在进程中存储下当前最新端口
            process.env.PORT = port;
            if (getParame['npm_config_port']) {
                port = getParame['npm_config_port'];
            }
            console.log(port);
            // 把 module.exports 中逻辑放在里面来
            for (var key in entrys) {
                entrys[key].unshift(`webpack-dev-server/client?http://localhost:${port}/`);
            }
            config.entry = entrys;
            // console.log(entrys);

            var compiler = webpack(config);
            var server = new WebpackDevServer(compiler, devServerOptions);
            open(`http://localhost:${port}`, {
                app: ['google chrome', '--incognito']
            });
            server.listen(port);
        }
    });
};
