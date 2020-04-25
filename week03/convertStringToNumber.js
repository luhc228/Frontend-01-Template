/**
 * 
 * @param {*} string 
 * @param {*} x 2 ~ 10进制
 */
function convertStringToNumber(string, x = 10) {
  let chars = string.split('');
  let number = 0;
  // 记录字符串的下标值
  let i = 0;
  // 处理整数部分
  while (i < chars.length && chars[i] !== '.' && chars[i] !== 'e' && chars[i] !== 'E') {
    number = number * x;
    number += chars[i].codePointAt(0) - '0'.codePointAt(0)
    i++
  }
  if (chars[i] === '.') {
    i++
  }
  // 处理小数部分
  var fraction = 1 // 分数
  while (i < chars.length && chars[i] !== 'e' && chars[i] !== 'E') {
    fraction = fraction / x;
    number += fraction * (chars[i].codePointAt(0) - '0'.codePointAt(0))
    i++
  }
  // 处理带指数（也就是 e 和 E）
  var order = 10 // 阶数
  if (chars[i] === 'e' || chars[i] === 'E') {
    var res = string.slice(string.indexOf(chars[i]) + 1)
    // res must be integer
    if (res.indexOf('.') !== -1) {
      throw new Error('指数必须是整数')
    }
    res = Number(res)
    i = 0
    order = res >= 0 ? order : 1 / order
    res = Math.abs(res)

    while (i < res) {
      number *= order
      i++
    }
  }
  return number;
}

// Test Case
console.log(convertStringToNumber("100.02"))
console.log(convertStringToNumber("100e2"))
console.log(convertStringToNumber("10e-2"))
