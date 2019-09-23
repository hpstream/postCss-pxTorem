#!/usr/bin/env node

const shelljs = require('shelljs');
const chalk = require('chalk');
var webpack = require('webpack');
var ora = require('ora');
var webpackConfig = require('../webpack/webpack.prod.js');
module.exports = function() {
    var spinner = ora(`building for build...`);
    spinner.start();
    shelljs.rm('-rf', 'build');
    webpack(webpackConfig(), function(err, stats) {
        spinner.stop();
        if (err) throw err;
        const info = stats.toJson();
        if (stats.hasErrors()) {
            throw new Error(info.errors);
        }
        if (stats.hasWarnings()) {
            console.warn(info.warnings);
        }
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n');

        console.log(chalk.cyan('  Build complete.\n'));
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
        ));
    });
};

