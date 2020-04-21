/**
 * 使用正则表达式匹配所有 Number 直接量
 * 
 * @param {*} input
 */
function matchNumber(input) {
  input = typeof input === 'string' ? input : String(input)
  console.log(input)
  const reg = /(^\d*(\.)?\d*$)|(^\d*(\.)?\d*[Ee]\d+$)|(^0b[01]+$)|(^0o[0-7]+$)|(^0x[0-9a-fA-F]+$)/g;

  return reg.test(input)
}

/**
 * test case
 */
console.log(matchNumber('12.3'))
console.log(matchNumber('.3'))
console.log(matchNumber('3.'))
console.log(matchNumber('12.3E10'))
console.log(matchNumber('12.3e10'))
console.log(matchNumber('0b1011'))
console.log(matchNumber('0o10'))
console.log(matchNumber('0x2f'))
