# 每周总结可以写在这里

## 思考题

为什么first-letter 可以设置 float 之类的，而 first-line 不行？



first-line 为什么能改字体？
行盒（line-box）


## 作业题

```js
function match(selector, element) {
    return true;
}
 
 
match("div #id.class", document.getElementById("id"));
```


## 正常流排版
- 收集盒进行
- 计算盒在行中的排布
- 计算行的排布

IFC：inline formatting context
BFC：block formatting context

### inline-block
- 中文不管基线(base line)，英文才有。类似于英文本的红色的线。
- Vertical-align: baseline，是拿自己的 baseline 去对其行的 baseline 

- Vertical-align: top，middle，bottom，是拿自己的 ”顶部“ “中线” ”底部“ 去对其行的 ”顶部“ “中线” ”底部“ 

- vertical-align: text-top，text-bottom，是拿自己的 ”顶部“ ”底部“ 去对齐行的 text-top 和 text-bottom 线

### float & clear
- 建议float 的使用是在文字环绕的场景下使用
- first-letter 是 html 中第一个字母
- first-line 是浏览器排版的第一行

### margin
- margin 折叠发生在 BFC(纵向从上往下排盒子) 中的
- flex 不是 bfc，但是 flex-item 是 bfc，因为它们之间不会产生边距折叠问题
- overflow: visible 和 flex 不产生BFC
- block-level 表示可以被放入bfc
- block-container 表示可以容纳bfc
- block-box = block-level + block-container
- block-box 如果 overflow 是 visible， 那么就跟父bfc合并