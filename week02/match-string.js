/**
 * 匹配所有的字符串直接量 单引号和双引号
 * 
 * @param {*} string 
 */
function matchString(string) {
  const reg = /(\\?:['"\\bfnrtv\n\r\u2028\u2029]|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4})*/g

  return reg.test(string);
}

/**
 * test case
 */
console.log(matchString("\x10"))
console.log(matchString("\u000A"))
console.log(matchString("\""))
console.log(matchString("\\"))
console.log(matchString("\f"))
console.log(matchString("\'"))
console.log(matchString("\r"))
console.log(matchString("abc"))