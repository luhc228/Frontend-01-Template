# 每周总结可以写在这里

# 课后作业

### 1. 补充写完函数 convertStringToNumber
  [convertStringToNumber](https://github.com/luhc228/Frontend-01-Template/blob/master/week03/convertStringToNumber.js)

### 2. 补充函数 convertNumberToString
  [convertNumberToString](https://github.com/luhc228/Frontend-01-Template/blob/master/week03/convertNumberToString.js)

### 3. 找出 JavaScript 标准里所有的对象，分析有哪些对象是我们无法实现出来的，这些对象都有哪些特性？

### JavaScript 标准提供的对象

#### 1. 普通对象

由{}语法、Object 构造器或者 class 关键字或者 function 关键字 定义类创建的对象，它能够被原型继承。

#### 2. 原生对象

能够通过语言本身的构造器创建的对象（用 new 运算）称为原生对象。

| 基本类型 | 数据结构    | 错误类型       | 二进制操作        | 带类型的数组      |
| -------- | ----------- | -------------- | ----------------- | ----------------- |
| Boolean  | Array       | Error          | ArrayBuffer       | Float32Array      |
| String   | Date        | EvalError      | SharedArrayBuffer | Float64Array      |
| Number   | RegExp      | RangeError     | DataView          | Int8Array         |
| Symbol   | Promise(es6 | ReferenceError |                   | Int16Array        |
| Object   | Proxy       | SyntaxError    |                   | Int32Array        |
| Function | Map         | TypeError      |                   | UInt8Array        |
|          | WeakMap     | URIError       |                   | UInt16Array       |
|          | Set         |                |                   | UInt32Array       |
|          | WeakSet     |                |                   | UInt8ClampedArray |

But, 上面的构造函数没法用 JS 代码实现，也没法继承。

#### 3. 固有对象

随着JS运行时创建而自动创建的对象实例叫固有对象。

除了上面的 34 个原生对象，还包括以下的一些属性

- 4个用做命名空间的对象
  - Atomics
  - JSON
  - Math
  - Reflect
- 9 个函数
  - eval
  - isFinite
  - isNaN
  - parseFloat
  - parseInt
  - decodeURI
  - decodeURIComponent
  - encodeURI
  - encodeURIComponent

### 对象的特性

对象：其实是由一个或者多个无序键值对组合成的集合，每个键值对就是对象的属性or方法。对象中的每个属性都有其属性描述符。其中属性描述符包括 **数据描述符**和**存储描述符**。*数据描述符*是一个具有值的属性，该值可以是可写的，也可以是不可写的。*存取描述符*是由 getter 函数和 setter 函数所描述的属性。一个描述符只能是这两者其中之一；不能同时是两者。

#### [[Configurable]]

当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，也能够被删除。

默认为 false。

#### [[Enumerable]]

当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。
默认为 false。

数据描述符还具有以下可选键值：

#### [[Value]]

该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。
默认为  `undefined`。

#### [[Writable]]

当且仅当该属性的 `writable` 键值为 `true` 时，属性的值，也就是上面的 `value`，才能被赋值运算符改变。
默认为`false`。

存取描述符还具有以下可选键值：

#### [[Get]]

属性的 getter 函数，如果没有 getter，则为 `undefined`。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 `this` 对象（由于继承关系，这里的`this`并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。
默认是 undefined。

#### [[Set]]

属性的 setter 函数，如果没有 setter，则为 `undefined`。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 `this` 对象。
默认是 undefined。



#### [[call]]

具有[[call]]私有字段的对象，就可以被 JS 函数调用语法支持。

#### [[construct]]

具有私有字段[[construct]]的对象，就可以被JS 用关键字 new 创建一个对象。



#### [[OwnPropertyKeys]]
Object.keys() Object.entries() Object.values()

#### [[GetPrototypeOf]]

获取对象原型

#### [[SetPrototypeOf]]

设置对象原型

#### [[GetOwnPropertyDescriptor(s)]]

getOwnPropertyDescriptor(s) 获取对象属性的描述列表

```js
var  o = {a: 1, b: 3}
Object.getOwnPropertyDescriptors(o)
Object.getOwnPropertyDescriptor(o, 'a')
```

#### [[GetOwnPropertyNames]]

获取对象属性名，返回一个数组

#### [[DefineOwnProperty]]

defineProperty 定义对象属性

```js
var o = {a: 1}
Object.defineProperty(o, "b", {value: 3})
```

#### [[HasOwnProperty]]

hasOwnProperty 判断对象是否含有某个属性

#### [[IsExtensible]]

isExtensible 判断对象是否可扩展

#### [[PreventExtensions]]

preventExtension 控制对象是否可以添加属性

#### [[Delete]]

delete 操作符，表示对象的属性能否被删除


#### [[Module]]
模块引入

#### [[Exports]]

模块导出
