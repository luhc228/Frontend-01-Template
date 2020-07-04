async function afoo() {
  console.log("-2")

  await new Promise(resolve => resolve());
  console.log("-1")
}

new Promise(resolve => (console.log("0"), resolve()))
  .then(() => (
    console.log("1"),
    new Promise(resolve => resolve())
      .then(() => console.log("1.5"))));

setTimeout(function () {
  console.log("2");

  new Promise(resolve => resolve()).then(console.log("3"))
}, 0)
console.log("4");
console.log("5");
afoo()


async function foo() {
  console.log("foo start");
  await foo1();
  console.log("foo end")
}

async function foo1() {
  console.log("foo1")
}

foo();

new Promise((resolve) => {
  console.log("resolve");
  resolve();
}).then(() => {
  console.log(1)
})

setTimeout(function () {
  console.log("setTimeout start");
  new Promise((resolve) => resolve()).then(() => console.log(2))
}, 1000)

