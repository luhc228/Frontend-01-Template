## 选择器优先级

- div#a.b .c[id=x]     [0, 1, 3, 1]   [id=x] 是和类选择器一个优先级
- #a:not(#b)       [0, 2, 0, 0] :not 不参与计算
- *.a          [0, 0,1, 0]     * 不改变优先级 是0

- div.a      [0, 0, 1, 1]

## 伪类

- 可以与可访问性联系起来

- :nth-last-child :last-child :only-child 不推荐使用，浏览器实现比较复杂，可能会造成多次渲染

## CSS 排版
- 标签Tag -- 源代码
- 元素Element -- 语义
- 盒Box --- 表现
- HTML代码中可以书写开始标签，结束标签和自封闭标签
- 一对起止标签，表示一个元素。
- DOM树中存储的是元素和其他类型的节点（Node）