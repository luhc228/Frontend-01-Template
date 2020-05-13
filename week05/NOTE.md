# 每周总结可以写在这里

## 前言

在上直播课的时候，对 `Realm` 听得一知半解，糊里糊涂，无法搞懂它究竟是啥。课后查阅一下资料，便在这周总结写下我对 `Realm` 的理解。

## Realms 是什么

Realms 通过其自己的全局对象、标准库的副本和 `intrinsics` （未绑定到全局变量的标准对象，如`Object.prototype`的初始值），抽象出来的独特的全局环境的概念。简单的说，是使用的基础库和内置对象实例。

## 为什么需要 Realms

最主要的原因是允许语言本身虚拟化，也就是说可以在不同环境中，Realm 的对象是不一致。

在一些场景下需要用到Realms

- testing/mocking(jsdom)
- Test Frameworks(test in browser or in node)
- Sandboxing
- server side rendering(服务端渲染) 避免数据冲突和数据泄露
- in-browser code editors
- Web-based IDEs
- ...

这些场景都是对对象操作在不同的环境下有不同的差异有较高要求。

## Realms 实际应用场景

选取两个不同 Realm 对象

```js
var iframe = document.createElement('iframe');
document.body.appendChild(iframe)
iframe.src = "javascript:var b = {};"

var b1 = iframe.contentWindow.b;
var b2 = {}

console.log(typeof b1) // object
console.log(typeof b2) // object

console.log(b1 instanceof Object) // false
console.log(b2 instanceof Object) // true
```

可以看到，b2 和本土的 Object 做 `instanceof` 产生差异。

 