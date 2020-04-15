# 第一课 学习方法
### 前端技能模型
- 领域知识（实践中学习）
- 前端知识（建立知识体系）
- 编程能力 + 架构能力 + 工程能力（刻意练习）

### 学习方法
  - 整理法
    - 顺序关系（编译）
    - 组合关系（CSS规则）
    - 维度关系（JS）
    - 分类关系（CSS选择器）
# 第二课 构建知识体系
### 记录
- html属性的值还想加引号，应该怎么办？回答：使用实体。
  ```html
  <a href=".." title="Some &quot;text&quot;">Some text</a>
  ```
- 什么是实体？
  ```
  实体是HTML中的保留字符必须替换为字符实体。键盘上不存在的字符也可以由实体代替。
  ```
  
- DTD(Document Type Definition) 
  文档类型定义, 使用一系列合法的元素来定义文档的结构

  ref: http://www.w3.org/TR/html4/strict.dtd

### 课后作业
- 把课上老师的脑图里的这些实体补全
  | Result |      Description      | Entity Name | Entity Number |
  | :----: | :-------------------: | ----------- | ------------- |
  |        |  non-breaking space   | `&nbsp;`    | `&#160;`      |
  |   <    |       less than       | `&lt;`      | `&#60;`       |
  |   >    |     greater than      | `&gt;`      | `&#62;`       |
  |   &    |       ampersand       | `&amp;`     | `&#38;`       |
  |   "    | double quotation mark | `&quot;`    | `&#34;`       |
  |   '    | single quotation mark | `&apos;`    | `&#39;`       |
  |   ©    |       copyright       | `&copy;`    | `&#169;`      |
  |   ®    | registered trademark  | `&reg;`     | `&#174;`      |
  |   ¥    |          yen          | `&yen;`     | `&#165;`      |

- 你能不能在 ECMA 中找到所有的类型（Type）
  - Reference
  - List
  - Completion
  - Property Descriptor
  - Lexical Environment
  - Environment Record
  - Data Block

# 第三课 工程体系

### 记录
- 数据驱动的思考方式
  - 目标 分析业务目标定数据指标
  - 现状 采集数据 建立数据展示系统
  - 方案 设计技术方案，预估数据
  - 实施 小规模实验 推广全公司落地
  - 结果 统计最终效果 汇报

- 工具链
  - 
### 课后作业
- 把库里边的 URL 解析代码写一下

一个完整的URL是怎样的？
```
  <scheme>://<username>:<password>@<host>:<port>/<path>;<params>?<query>#<frag>
```
URL各部分的解释如下
  | 组件          | 描述                                                         | 默认值                   |
  | ------------- | ------------------------------------------------------------ | ------------------------ |
  | scheme        | 请求协议                                                     | 无                       |
  | username      | 访问资源使用的用户名                                         | 无（匿名）               |
  | password      | 用户的密码，和用户名使用 `:` 分割                            | E-mail                   |
  | host          | 资源服务器主机名或者IP地址                                   | 无                       |
  | port          | 资源服务器监听的端口                                         | HTTP使用80、HTTPS使用443 |
  | path          | 服务器上的资源路径                                           | 无                       |
  | params        | 在某些scheme下指定输入参数，是键值对。可以有多个，使用`;`分割，单个内的多个值使用`,` 分割 | 无                       |
  | query         | 使用`&`来分隔多个query。使用`?`分隔query和其他部分           | 无                       |
  | frag | 一小片或一部分资源名称。引用对象时，不会将fragment传送给服务器，客户端内部使用。通过`#`分隔fragment和其余部分 | 无                       |

用正则写一个解析URL
```js
function parseUrl(url) {
    var pattern = RegExp("^(?:([^/?#]+))\/\/(?:([^:]*)(?::?(.*))@)?(?:([^/?#:]*):?([0-9]+)?)?([^?#]*)(\\?(?:[^#]*))?(#(?:.*))?");
    var matches =  url.match(pattern) || [];
    return {
        protocol: matches[1],
        username: matches[2],
        password: matches[3],
        hostname: matches[4],
        port:     matches[5],
        pathname: matches[6],
        search:   matches[7],
        hash:     matches[8]
    };
}
parseUrl("https://username:password@www.foo.com:3333/file;a=1;b=2?c=3&d=4#test")
```
# 本周作业

在**2. 重学 | 构建知识体系**这节课上，老师所列的知识体系的脑图，自己根据老师所教授的追溯法，并通过理解将其补充完整，形成自己的知识体系。
![前端技术](./前端技术.png)

# 个人思考总结
- 在上第二节直播课的时候，其实整个人是懵的状态，因为很多东西都是没有接触过，听起来很费劲。课后，我尝试着看一次重放，并且跟着做一些笔记，努力让自己印象深刻一些。发现自己能懂了多一点。以前学习JS\HTML\CSS，都是零零散散地学习，也不知道怎么去做成一个体系学习。现在有了这个思维导图，可以让自己清晰知道哪里是自己薄弱的地方，这个很重要。
