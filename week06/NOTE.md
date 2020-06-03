# 每周总结可以写在这里

## 作业一
有限状态机: [match-6.js](./match-6.js)

## 作业二
DOM 树构建: [toy-browser](./toy-browser/parser.js)

## 我对有限状态机的理解

### 前言
以前在学校里写小车避障的时候也是使用状态机去实现的，但是当时听得云里雾里，不知道状态机是什么？有什么用？最近，在winter的课上看到使用有限状态机实现了 toy-browser。好像对有限状态机有那么一点感觉了。于是我就顺藤摸瓜，去探究一下这里有什么？

### 正文
#### 有限状态机是什么
有限状态机是一种用来进行对象行为建模的工具，其作用主要是描述对象在它的生命周期内所经历的状态序列，以及如何响应来自外界的各种事件。

总的来说，有以下三个特点

- 有限状态数
- 任何时刻，只在一种状态下
- 某种条件下，会从一种状态转变到另一种状态中

```js
  var todos = {
    isFinished: false 

    transition: function (e) {
      switch(e) {
        case 'finished':
          this.isFinished = true;
          break;
        case 'unfinished':
          this.isFinished = false;
          break;
        default:
          console.log("Invalid State");
          break;
      }
    }
  }

  console.log(todos.isFinished)
  todos.transition('finished')
  console.log(todos.isFinished)
  todos.transition('unfinished')
  console.log(todos.isFinished)
```

TODO: 用状态机自己写一个 Promise 出来