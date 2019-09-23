/**
 * 功能：存放不同文件的打包区别
 */
const path = require('path');
var dirname = process.cwd().split(path.sep).pop() + path.sep;
var cwd = process.cwd();
module.exports = {
  common: {
    entry: path.resolve(cwd, 'src'),
    root: path.resolve(cwd, ) // 根目录
  },
  test: {
    publicPath: 'https://t1.zhuhuiyao.cn/web/' + dirname
  },
  testoverseas: {
    publicPath: './'
  },
  prod: {
    publicPath: 'https://www.wodidashi.com/web/' + dirname
  },
  develop:{
    publicPath: 'https://tdev.kuaishebao.com/web/' + dirname
  }
}