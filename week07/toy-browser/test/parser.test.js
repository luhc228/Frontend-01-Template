import { parseHTML } from '../src/parser.js';
let assert = require('assert')

it('test', () => {
  assert.equal(1 + 1, 2)
})

it('test witch <', () => {
  let doc = parseHTML("<div>a < b</div>")
  let text = doc.children[0].children[0]
  assert.equal(text.content, "a < b")
  assert.equal(text.type, "text")
})

it('with property', () => {
  let doc = parseHTML('<div id="a" class="cls" data=\"abc\"></div>')
  let div = doc.children[0];

  let count = 0;
  for (let attr of div.attributes) {
    if (attr.name === "id") {
      assert.equal(attr.value, "a");
      return;
    }

    if (attr.name === "class") {
      assert.equal(attr.value, "cls");
      return;
    }

    if (attr.name === "data") {
      assert.equal(attr.value, "abc");
      return;
    }
  }

  assert.ok(false)
})

it('with property 2', () => {
  let doc = parseHTML('<div id="a" class="cls" data=\"abc\"></div>')
  let div = doc.children[0];


})

it('with property 3', () => {
  let doc = parseHTML('<div id="a" class="cls" data=\"abc\" />')
  let div = doc.children[0];
  let count = 0;
  for (let attr of div.attributes) {
    if (attr.name === "id") {
      count++
      assert.equal(attr.value, "a");
      return;
    }

    if (attr.name === "class") {
      count++
      assert.equal(attr.value, "cls");
      return;
    }

    if (attr.name === "data") {
      count++
      assert.equal(attr.value, "abc");
      return;
    }
  }

  assert.ok(count === 3)
})

it('script', () => {
  // const content = `
  // <div>abcd</div>
  // <span>x</span>
  // /script>
  // <script
  // <
  // </
  // </s
  // </scr
  // </scri
  // </scrip
  // </script`
  const content = `<scr`
  let doc = parseHTML(`<script>${content}</script>`);
  let text = doc.children[0].children[0];

  assert.equal(text.content, content);
  assert.equal(text.type, "text")
})

it('attribute with no value', () => {
  let doc = parseHTML("<div class />")
})

it('attribute with no value', () => {
  let doc = parseHTML("<div class id />")
})

it('attribute with no value', () => {
  let doc = parseHTML("<div />")
})