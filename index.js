#!/usr/bin/env node
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const server = require('./server/server.js');
const test = require('./server/test.js');
const build = require('./server/build.js');
const develop = require('./server/develop.js');
const paramarr = ['start', 'test', 'testoverseas', 'build', 'develop'];
const param = process.argv[2];

if (!paramarr.includes(param)) {
    console.log(logSymbols.error, chalk.red('不能输入违法指令'));
    return;
}
// console.log(process.cwd());
// console.log(1);
if (param == 'start') {
    server();
}
if (param == 'test') {
    test();
}
if (param == 'develop') {
    develop();
}
if (param == 'build') {
    build();
}
