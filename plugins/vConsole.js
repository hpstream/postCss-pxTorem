var cheerio = require('cheerio');

function MyPlugin(options) {
    // Configure your plugin with options...
    this.options = options || {
        options: 'https://qiniuh5.wodidashi.com/web/front-static/common/vconsole/v3.3.0/vconsole.min.js'
    };
}

MyPlugin.prototype.apply = function(compiler) {
    compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
        compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('MyPlugin', (data, cb) => {
            // 将 html 转化成jquery对象
            var $ = cheerio.load(data.html);
            const str = `<script src="https://qiniuh5.wodidashi.com/web/front-static/common/vconsole/v3.3.0/version02.js"></script>
            `;
            $('head').append(str);
            var strhtml = $('head').html();

            data.html = data.html.replace(/<head>([\s\S]*?)<\/head>/, `<head>${strhtml}</head>`);
            cb(null, data);
        });
    });
};

module.exports = MyPlugin;
