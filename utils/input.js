const readline = require('readline');

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
  prompt,
  close
};
