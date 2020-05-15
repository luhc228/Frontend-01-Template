// 每个函数是一个状态

function match(string) {
  let state = start; // 当前状态
  for (let c of string) {
    console.log(c)
    state = state(c)  // 产生新的状态
  }
  return state === end
}

// 进入到这个状态就不会进入别的状态了
function end(c) {
  return end
}

function start(c) {
  if (c === "a") {
    return foundA
  } else {
    // 状态不变
    return start
  }
}

function foundA(c) {
  if (c === "b") {
    return foundB
  } else {
    return start(c)
  }
}

function foundB(c) {
  if (c === "c") {
    return foundC
  } else {
    return start(c)
  }
}

function foundC(c) {
  if (c === "a") {
    return foundA2
  } else {
    return start(c)
  }
}

function foundA2(c) {
  if (c === "b") {
    return foundB2
  } else {
    return start(c)
  }
}

function foundB2(c) {
  if (c === "x") {
    return end
  } else {
    return foundB(c)
  }
}


console.log(match('abcabcabx'))
