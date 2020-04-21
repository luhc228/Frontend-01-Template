/**
 * UTF-8 编码
 * @param {*} string 
 */
function UTF8_Encoding(string) {
  var codePoints = ucs2decode(string);
  var length = codePoints.length;
  var index = 0;
  var codePoint;
  var byteString = '';
  while (index < length) {
    codePoint = codePoints[index++];
    byteString += encodeCodePoint(codePoint);
  }
  return byteString;
}

/**
 * ucs2 解码
 * JS 的编码方式为 ucs2 需要做解码
 * @param {*} string 
 */
function ucs2decode(string) {
  let output = [];
  let counter = 0;
  let length = string.length;
  let val;
  let extra;
  while (counter < length) {
    val = string.charCodeAt(counter++)
    // 码点落在 0xD800 和 0xDBFF 之间，就要连同后面2个字节一起读取
    if (val >= 0xD800 && val <= 0xDBFF && counter < length) {
      extra = string.charCodeAt(counter++) // next character
      if ((extra & 0xFC00) === 0xDC00) {
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        counter--;
        output.push(value);
      }
      output.push()
    } else {
      output.push(val);
    }
  }
  return output;
}

const stringFromCharCode = String.fromCharCode;

// 参考链接：https://github.com/mathiasbynens/utf8.js/blob/2ce09544b62f2a274dbcd249473c0986e3660849/utf8.js#L65
function encodeCodePoint(codePoint) {
  if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
    return stringFromCharCode(codePoint);
  }
  var symbol = '';
  if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
    symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
  }
  else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
    checkScalarValue(codePoint);
    symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
    symbol += createByte(codePoint, 6);
  }
  else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
    symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
    symbol += createByte(codePoint, 12);
    symbol += createByte(codePoint, 6);
  }
  symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
  return symbol;
}

/**
 * UTF-8 编码
 * 使用 ES6 的for of 遍历字符串
 * @param {*} string 
 */
function UTF8_Encoding_ES6(string) {
  let codePoints = []
  let byteString = '';
  const length = Array.from(string).length
  for (let s of string) {
    // 获取码点
    codePoints.push(s.codePointAt())
  }
  let index = 0
  while (index < length) {
    codePoint = codePoints[index++];
    byteString += encodeCodePoint(codePoint);
  }
  return byteString
}

/**
 * test case
 */
console.log(UTF8_Encoding('\xA9'))  // '\xC2\xA9'
console.log(UTF8_Encoding_ES6('\xA9')) // '\xC2\xA9'
