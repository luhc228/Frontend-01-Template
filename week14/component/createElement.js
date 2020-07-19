
function createElement(Cls, attributes, ...children) {

  let o = new Cls({
    timer: {}
  });

  for (let name in attributes) {
    o.setAttribute(name, attributes[name]);
  }

  //console.log(children);
  for (let child of children) {
    o.children.push(child);
  }

  return o;
}
