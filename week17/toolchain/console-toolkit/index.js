var tty = require('tty')
var ttys = require('ttys')
var readline = require('readline')

var stdin = ttys.stdin;
var stdout = ttys.stdout

// stdout.write('Hello World!\n')
// stdout.write('\033[1A')
// stdout.write('luhc \n')


// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// async function ask(question) {
//   return new Promise((resolve, reject) => {
//     rl.question(question, (answer) => {
//       resolve(answer);
//       stdout.write(answer)
//       rl.close()
//     })
//   })
// }

// ask('你喜欢猫吗？')


stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// stdin.on('data', function (key) {
//   // ctrl-c (end of text)
//   if (key === '\u0003') {
//     process.exit();
//   }

//   process.stdout.write(key.toString().charCodeAt(0).toString())


// })

function getChar() {
  return new Promise((resolve, reject) => {
    stdin.once('data', function (key) {
      resolve(key)
    })
  })
}

function up(n = 1) {
  stdout.write('\033[' + n + 'A');
}

function down(n = 1) {
  stdout.write('\033[' + n + 'B');
}

function right(n = 1) {
  stdout.write('\033[' + n + 'C');
}

function left(n = 1) {
  stdout.write('\033[' + n + 'D');
}

async function select(choices) {
  let selected = 0;

  for (let i = 0; i < choices.length; i++) {
    let choice = choices[i]
    if (i === selected) {
      stdout.write("[*]" + choice + "\n");
    } else {
      stdout.write("[ ]" + choice + "\n");
    }
  };

  up(choices.length);
  right();

  while (true) {
    let char = await getChar();
    if (char === '\u0003') {
      process.exit();
    }
    if (char === 'w' && selected > 0) {
      stdout.write(" ");
      left();
      selected--;
    }
  }
}

void async function () {
  await select(['vue', 'react', 'angular']);
  while (true) {
    let char = await getChar();
    if (char === '\u0003') {
      process.exit();
      break
    }
    console.log(char.split('').map(c => c.charCodeAt(0)))
  }
}()