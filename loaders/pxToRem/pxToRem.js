var postcss = require('postcss');
module.exports = postcss.plugin('postcss-pxToRem', function (options) {
    var pxreg = /"[^"]+"|'[^']+'|url\([^\)]+\)|(\d*\.?\d+)px/g;
    var defaultObj = {
        rootSize: '37.5',
        noTransformFlag: '-no-',
        toFixed: 6,
        whiteTagList: [],
        whiteSelectorList: []
    };

    return function (root, result) {
        // 判断第一个节点是不是 comment 节点
        if (!root.nodes[0]) {
            return;
        }
        if (root.nodes[0].type !== 'comment') {
            return;
        }

        // 判断节点是不是---\n XXXX \n--- 模式
        var text = root.nodes[0].text.replace(/[\r\n]/g, "");
        var regInfo = /^-{3}([\d\D]*)-{3}$/.exec(text);
        // console.log(regInfo);
        var regtext = null;
        var regobj = {};
        // 判断是否有符合条件的
        if (!regInfo) {
            return;
        }
        if (regInfo.length !== 2) {
            return;
        }
        regtext = regInfo[1];

        // 提出此范围的json格式的数据
        regtext.replace(/([^\n:]*):([^:\n,]*)/g, (res, key, value) => {
            regobj[key] = value;
        });

        regobj = Object.assign(defaultObj, regobj);
        root.walkRules(function (rules, i) {
            var {
                rootSize,
                noTransformFlag,
                toFixed,
                whiteTagList,
                whiteSelectorList
            } = regobj;
            if (whiteSelectorList.indexOf(rules.selector) >= 0) {
                return;
            }

            rules.nodes.forEach((rule, j) => {
                var type = rule.type;
                var value = rule.value;
                var prop = rule.prop;
                if (type !== 'decl') { // 获取相关px
                    return;
                }

                // 判断此语句是否不想转换
                if (rules.nodes[j + 1] && rules.nodes[j + 1].type === 'comment' && (rules.nodes[j + 1].text === noTransformFlag)) {
                    return;
                }
                // 如果有不想转rem标签,
                if (whiteTagList.indexOf(prop) >= 0) {
                    return;
                }

                // 转成rem
                var newvalue = value.replace(pxreg, (input, val) => {
                    if (val) {
                        return `${(val / rootSize).toFixed(toFixed)}rem`;
                    }
                    return input;

                });
                rule.value = newvalue;
            });
        });
    };
});
