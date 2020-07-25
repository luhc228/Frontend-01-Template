/**
 * 如何设计 attributes property children
 * 
 * @param {*} Cls 
 * @param {*} attributes 
 * @param  {...any} children 
 */
function createElement(Cls, attributes, ...children) {
  // console.log(arguments)

  let o = new Cls({
    timer: {}
  });

  for (let name in attributes) {
    // o[name] = attributes[name]
    o.setAttribute(name, attributes[name])
  }

  // console.log("children:", children)
  for (let child of children) {
    o.children.push(child)
  }

  return o;
}

class Parent {
  constructor(config) {
    this.children = []
  }

  set class(v) { // property
    console.log("Parent::class", v)
  }

  setAttribute(name, value) { // attribute
    console.log("setAttribute", name, value)
  }

  // appendChild(child) {
  //   console.log("appendChild:", child);
  // }
}

class Child {

}

let component = <Parent id="a" class="ab">
  <Child></Child>
  <Child></Child>
  <Child></Child>
</Parent>

// var component = createElement(
//   Parent,
//   {
//     id: "a",
//     class: "b"
//   },
//   createElement(Child, null),
//   createElement(Child, null),
//   createElement(Child, null)
// )

console.log(component);

// Component.setAttribute("id", "a")