

# 课后作业

- 写一个正则表达式 匹配所有 Number 直接量

  [match-number](https://github.com/luhc228/Frontend-01-Template/blob/master/week02/match-number.js)

- 写一个 UTF-8 Encoding 的函数

  [utf8-encoding](https://github.com/luhc228/Frontend-01-Template/blob/master/week02/utf8-encoding.js)

- 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

  [match-string](https://github.com/luhc228/Frontend-01-Template/blob/master/week02/match-string.js)

# 第二周总结

### 1. 计算机语言分类

**强类型语言与弱类型语言的区别**：支持隐式类型转换（即不需要告诉引擎变量是什么类型，引擎在运行代码时候可以计算出来）的语言称为弱类型语言，反之，则为强类型语言。

```c++
// cpp
int a = 2;
bool c = true;
c = a;
```

```javascript
var foo
foo = 12 
bar = " 你好 "
bar = false
```

**动态与静态语言的区别**：在使用之前就需要确认其变量数据类型的称为静态语言，在运行过程中需要检查数据类型的语言称为动态语言。

- 动态弱类型语言
  - JavaScript
  - VB
  - PHP
- 动态强类型语言
  - Python
  - Ruby
- 静态强类型语言
  - C#
  - Java
  - Go
  - Rust
- 静态弱类型语言
  - C
  - CPP

## 2. 0.1 + 0.2 != 0.3 问题

JavaScript 采用 IEEE754 浮点数，具体的数据格式表示如下

```
sign  exponent         fraction
+---+----------+---------------------+
| 1 |   2~12   |         13~64       |
+---+----------+---------------------+
```

- 符号位：高位第 1 位，如图 sign 部分（共1位）
- 指数位：高位第 2~12 位，如图 exponent 部分 （共11位）
- 尾数位：剩下的 fraction 部分（共52位） fraction 尾数部分有要求，只允许 52 位，超过部分进一舍零。

一个十进制数 转换成 二进制数 需要进行相应的转换

比如：

一个十进制数是整数的，应该使用短除法（除以2）来计算

一个十进制数是小数的，应该使用乘2取整

如果一个十进制数是既包含整数，又包含小数，则两个部分分别计算，再相加得到结果。

回到0.1 + 0.2 != 0.3，很明显是浮点数运算的精度问题导致让我们觉得奇怪的现象

```
0.1D = 2^-4 * 1.1001100110011001100110011001100110011001100110011010B
0.2D = 2^-3 * 1.1001100110011001100110011001100110011001100110011010B
0.3D = 2^-2 * 1.0011001100110011001100110011001100110011001100110011B


0.1 + 0.2 === 0.30000000000000004 // true
0.1 + 0.2 === 0.3 // false
```

解决方法

```js
Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON

parseFloat((0.1 + 0.2).toFixed(10)) === 0.3 // true
```

## 3. ASCII，GB，Unicode 和 UTF-8

### 什么是ASCII？

在计算机内部，所有信息最终都是一个二进制。一个字节（8个二进制位）可以表示256个不同的符号，也就是从 `0000 0000` 到 `1111 1111`。而在上个世纪60年代，美国制定了一套字符编码，对英语字符与二进制位之间的关系，做了统一的规定，并把它叫 ASCII 码((American Standard Code for Information Interchange): 美国信息交换标准代码）。当时世界上所有的计算机都用同样的`ASCII`编码来保存英文文字。ASCII 码一共有128个字符，最前面一位统一规定是 0。

### 什么是GB？

英文用128个符号编码就足够了，但是用来表示其他语言，128个符号是不够的。比如中文，使用符号非常多，因此他们需要找出一种编码，来适应他们的国家。比如 GB2312 & GBK & GB18030。

- 中国人民对**ASCII**编码的中文扩充，出现了**GB2312**编码，可以表示6000多个常用汉字。
- 后来大家发现，**GB2312**编码无法满足需求，需要添加进繁体和其他字符，于是出现了**GBK**编码，当然包括**GB2312**中的编码。
- 中国是个多民族国家，各个民族几乎都有自己独立的语言系统，为了表示那些字符，继续把 GBK 编码扩充为 GB18030 编码。

### 为什么出现Unicode？

Unicode（统一码、万国码、单一码）是计算机科学领域里的一项业界标准，包括字符集、编码方案等。Unicode 是为了解决传统的字符编码方案的局限而产生的，它为每种语言中的每个字符设定了统一并且唯一的二进制编码，以满足跨语言、跨平台进行文本转换、处理的要求。（摘自百科）

最前面的65536个字符位，称为基本平面（缩写BMP），它的码点范围是从0一直到216-1，写成16进制就是从U+0000到U+FFFF。所有最常见的字符都放在这个平面，这是Unicode最先定义和公布的一个平面。

剩下的字符都放在辅助平面（缩写SMP），码点范围从U+010000一直到U+10FFFF。

但是同时，也出现了两个问题

- Unicode只规定了每个字符的码点，到底用什么样的字节序表示这个码点

- 在**Unicode**里面，至少使用两个字节存储一个字符。原有的英文编码从单字节变成双字节，只需要把高字节全部填为0就可以。显然，每个英文字符前，至少有一个字节是0，这会非常浪费存储空间。
- 计算机如何区别**Unicode**和**ASCII**？我们比如让计算机知道三个字节是表示一个符号而不是分别表示三个符号。

### UTF-8的出现

由于上述出现的两个问题，便出现了**UTF-8**这个编码方式。注意是，**UTF-8**是**Unicode**的实现方式之一，**Unicode**是字符集合，而**UTF-8**是实现方式。当然还有**UTF-16**、**UTF-32**等编码方式。UTF-8最大的一个特点，就是它是一种变长的编码方式。它可以使用1~4个字节表示一个符号，根据不同的符号而变化字节长度，当字符在ASCII码的范围时，就用一个字节表示，保留了ASCII字符一个字节的编码做为它的一部分。从**Unicode**到**UTF-8**并不是直接的对应，而是要过一些算法和规则来转换。

| 编号范围            | 字节 |
| ------------------- | ---- |
| 0x0000 - 0x007F     | 1    |
| 0x0080 - 0x07FF     | 2    |
| 0x0800 - 0xFFFF     | 3    |
| 0x010000 - 0x10FFFF | 4    |

### UTF-16编码

基本平面的字符占用2个字节**（U+0000到U+FFFF）**，辅助平面的字符占用4个字节**（U+010000到U+10FFFF）**。编号大于 0xFFFF 字符，一般映射在 0xD800 ~ 0xDBFF，另一半在 0xDC00 ~ 0xDFFF。

在基本平面内，从U+D800到U+DFFF是一个空段，即这些码点不对应任何字符。

前10位映射在U+D800到U+DBFF（空间大小2^10），称为高位（H），后10位映射在U+DC00到U+DFFF（空间大小2^10），称为低位（L）。

当遇到两个字节，发现码点在 U+D800 到 U+DBFF 之间，就可以断定，紧跟在后面的两个字节的码点

辅助平面字符 Unicode - UTF-16 计算公式

```
H = Math.floor((c-0x10000) / 0x400)+0xD800

L = (c - 0x10000) % 0x400 + 0xDC00
```

JavaScript使用的也不是 UTF-8，也不是 UTF-16，而是UCS-2编码。JS 的所有字符在这门语言都是2个字节，如果是4个字节的字符，会当作两个双字节的字符处理。

```js
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
```

ES6 引入的 `for of`可以自动识别4字节的码点

```js
for (let s of string) {
   let codePoints = []
   const length = Array.from(string).length
   for (let s of string) {
       // 获取码点
       codePoints.push(s.codePointAt())
   }
   let index = 0
}
```

