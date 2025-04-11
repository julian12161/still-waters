const readline = require('readline');
const wrap = require("word-wrap");

function w(str, indent = "  ", width = 100) {
  return wrap(str, { width, indent });
}

function sceneTitle(title) {
  console.clear();
  const head = `=== ${title} ===`;
  const pad = " ".repeat((100 - head.length) / 2);
  console.log(pad + head);
  console.log("");
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(query) {
  return new Promise((resolve) => {
    rl.question(query, (input) => resolve(input.trim()));
  });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function close() {
  rl.close();
}

module.exports = {
  sleep,
  w,
  prompt,
  sceneTitle,
  close
};
