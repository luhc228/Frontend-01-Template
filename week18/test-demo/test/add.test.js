import assert from 'assert';
import { add } from '../src/add.js';

// const { add } = require("../src/add.js")
// const test = require('ava')

describe('add', function () {
  it('add(1, 2) is equal to 3', function () {
    assert.equal(add(1, 2), 3)
  })
})

// test('add', (t) => {
//   if (add(3, 4) === 7) {
//     t.pass();
//   }
// })