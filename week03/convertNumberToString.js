/**
 * 转换数字变成字符串
 * @param {*} number 
 * @param {*} x 
 */
function convertNumberToString(number, x = 10) {
  // 取整数部分
  var integer = Math.floor(number);
  var fraction = number - integer;
  var string = '';
  // 处理整数部分
  while (integer > 0) {
    string = integer % x + string;
    integer = Math.floor(integer / x);
  }
  // 处理小数部分
  if (fraction) {
    string += '.'

    while ((fraction / (1 / x)) > 1) {
      const temp = (Math.floor(fraction / (1 / x))) % x
      string += temp
      fraction = (fraction / (1 / x)) - temp;
    }
  }

  return string;
}

/**
 * test case
 */
console.log(convertNumberToString(199))
console.log(convertNumberToString(199.99))