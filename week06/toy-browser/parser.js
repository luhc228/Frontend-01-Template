let currentToken = null
let currentAttribute = null
let currentTextNode = null

let stack = [{ type: 'document', children: [] }]

function emit(token) {
  // if (token.type === "text") {
  //   return
  // }
  // 遇到开始标签时创建元素入栈，遇到结束标签时出栈
  // 自封闭节点可视为入栈后立刻出栈
  let top = stack[stack.length - 1]
  if (token.type == 'startTag') {
    let element = {
      type: 'element',
      children: [],
      attributes: []
    };
    element.tagName = token.tagName;
    for (let p in token) {
      if (p != "type" && p != "tagName") {
        element.attributes.push({
          name: p,
          value: token[p]
        })
      }
    }
    top.children.push(element)
    element.parent = top

    if (!token.isSelfClosing) {
      stack.push(element)
    }
    currentTextNode = null
  } else if (token.type === "endTag") {
    if (top.tagName != token.tagName) {
      throw new Error("Tag start end dosesn't match!")
    } else {
      stack.pop()
    }
    currentTextNode = null
  } else if (token.type === "text") {
    if (currentTextNode == null) {
      currentTextNode = {
        type: "text",
        content: ""
      }
      top.children.push(currentTextNode)
    }
    currentTextNode.content += token.content
  }
}

const EOF = Symbol("EOF"); // EOF: End of file

// start
function data(c) {
  if (c == "<") {
    return tagOpen
  } else if (c == EOF) {
    emit({
      type: 'EOF'
    })
    return
  } else {
    emit({
      type: "text",
      content: c
    })
    return data
  }
}

function tagOpen(c) {
  if (c == "/") {
    return endTagOpen
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: ''
    }
    return tagName(c)
  } else {
    return
  }
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === "/") {
    return selfClosingStartTag
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c
    return tagName
  } else if (c == ">") {
    emit(currentToken)
    return data
  } else {
    currentToken.tagName += c;
    return tagName
  }
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === ">" || c === "/" || c === EOF) {
    return afterAttributeName(c)
  } else if (c == "=") {
    // return beforeAttributeName
  } else {
    currentAttribute = {
      name: "",
      value: ""
    }
    return attributeName(c)
  }
}

function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c === "/" || c === ">" || c === EOF) {
    return afterAttributeName(c)
  } else if (c === "=") {
    return beforeAttributeValue;
  } else if (c === "\u0000") {

  } else if (c == "\"" || c === "'" || c === "<") {

  } else {
    currentAttribute.name += c;
    return attributeName
  }
}

function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/) || c === "/" || c === ">" || c === EOF) {
    return beforeAttributeValue;
  } else if (c == "\"") {
    return doubleQuotedAttributeValue
  } else if (c == "\'") {
    return singleQuotedAttributeValue
  } else if (c === ">") {

  } else {
    return UnquotedAttributeValue(c)
  }
}

// TODO: 补充各种情况
function afterAttributeName(c) {
  console.log(c)
  if (c == ">") {
    emit(currentToken)
    return data
  } else if (c === "/") {
    return selfClosingStartTag
  } else if (c.match(/^[\t\n\f ]$/)) {
    return data
  }
}

/**
 * 属性双引号处理
 * @param {*} c 
 */
function doubleQuotedAttributeValue(c) {
  if (c === "\"") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c === "\u0000") {

  } else if (c === EOF) {

  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue
  }
}

/**
 * 属性单引号处理
 * @param {*} c 
 */
function singleQuotedAttributeValue(c) {
  if (c === "\'") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c === "\u0000") {

  } else if (c === EOF) {

  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue
  }
}

function afterQuotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeValue;
  } else if (c == "/") {
    return selfClosingStartTag;
  } else if (c == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken);
    return data
  } else if (c === EOF) {

  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue
  }
}

/**
 * 属性无引号处理
 * @param {*} c 
 */
function UnquotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if (c === "/") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  } else if (c == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken)
    return data
  } else if (c === "\u0000") {

  } else if (c === "\"" || c === "'" || c === "<" || c == "=" || c == "`") {

  } else if (c == EOF) {

  } else {
    currentAttribute.value += c;
    return UnquotedAttributeValue
  }
}

/**
 * 自封闭标签
 * @param {*} c 
 */
function selfClosingStartTag(c) {
  if (c == ">") {
    currentToken.isSelfClosing = true;
    return data
  } else if (c == "EOF") {

  } else {

  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: ""
    }
    return tagName(c)
  } else if (c === ">") {

  } else if (c === EOF) {

  } else {

  }
}

module.exports.parseHTML = function parseHTMl(html) {
  let state = data;
  for (let c of html) {
    state = state(c)
  }

  state = state(EOF)
  console.log(stack[0]);
}