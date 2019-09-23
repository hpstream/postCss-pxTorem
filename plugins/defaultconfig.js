var cheerio = require('cheerio');

function Defaulconfig(options) {
    // Configure your plugin with options...
    this.options = options || {
        options: [
            'https://qiniuh5.wodidashi.com/web/front-static/common/rem/1.0/rem.min.js',
            'https://qiniuh5.wodidashi.com/web/front-static/common/wb/1.0/base.css'
        ]
    };
}

Defaulconfig.prototype.apply = function(compiler) {
    compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
        compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('MyPlugin', (data, cb) => {
            // 将 html 转化成jquery对象
            var $ = cheerio.load(data.html);

            const str = '<script src="https://qiniuh5.wodidashi.com/web/front-static/common/rem/1.0/rem.min.js"></script><link rel="stylesheet" href="https://qiniuh5.wodidashi.com/web/front-static/common/wb/1.0/base.css">';

            $('head').prepend(str);
            var strhtml = $('head').html();

            data.html = data.html.replace(/<head>([\s\S]*?)<\/head>/, `<head>${strhtml}</head>`);
            cb(null, data);
        });
    });
};

module.exports = Defaulconfig;
