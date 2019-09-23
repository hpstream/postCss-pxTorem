在开发页面的时候我们经常需要把px转成rem,比如：
```
width:100px;

// 如果 html 的front-size设置成为37.5px;
width:100/37.5rem;// 或者
width:2.666665rem;
```
这样我们不写注释，可能都不知道原来的px是多少。非常麻烦。
[postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 可以解决这个问题，
基本用法：
```
var px2rem = require('postcss-plugin-px2rem')

px2rem({
  // base on 750px standard.
  rootValue: 75,
  // to leave 1px alone.
  minPixelValue: 1.01
})
```
这个插件有一些问题；不能满足我们现在公司的需求，我们公司的页面，既有640的，也有750的。还有可能有些不想转rem；这样的情况上面的插件就无法满足了,于是自己写了一个插件。

## Install
```
$ cnpm install --save-dev high-pxtorem
```
Usage
```
/*
---
rootSize:37.5,
noTransformFlag:-no-,
toFixed:6
---
*/

body {
  width: 100px;
  border: 1px solid red;

  a {
    border: 37.5px solid wheat;
  }
}

body{width:2.666667rem;border:.026667rem solid red}body a{border:1rem solid wheat}
```

## Example
```
// postcss.config.js
module.exports = {
    syntax: require('postcss-less'),//此处可以换
    plugins: [
        require('postcss-import')(),
        require('postcss-url')(),
        require('autoprefixer')({
            'overrideBrowserslist': [
                '> 0.1%',
                'Android >= 4.1',
                'ios >= 8',
                'not ie < 12'
            ]
        }),
        require('high-pxtorem')({})

    ]
};

```

## options
```
 var defaultObj = {
        rootSize: '37.5',// 与html font-size相同
        noTransformFlag: '-no-',// 此注释前面不进行rem转义
        toFixed: 6,//精度
        whiteTagList: ['width'],//不转rem的属性，
        whiteSelectorList: ['.a','#app']// 不转rem的选择器
    };
```




