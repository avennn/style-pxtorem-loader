const { getOptions } = require("loader-utils");

// 将style里面的px转成rem的loader
module.exports = function stylePxToRemLoader(source) {
  const options = getOptions(this);
  const { rootValue } = options;
  // babel-loader之前执行
  return source
    .replace(/\$\{(.+?)\}px/g, (match, p1) => {
      // 处理`${height}px`的情况
      const remRatio = 1 / rootValue;
      return "${" + `${p1}` + " * " + `${remRatio}` + "}rem";
    })
    .replace(/(:?|'|"|\s*?)(\d+?)px/g, (match, p1, p2) => {
      // 处理height: '4px'的情况
      const remValue = (parseInt(p2, 10) / rootValue).toFixed(4);
      return `${p1}${remValue}rem`;
    });
};
