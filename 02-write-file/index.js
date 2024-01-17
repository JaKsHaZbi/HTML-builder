const fs = require('fs');
const path = require('path');
const readline = require('readline');
const process = require('process');

const filePath = path.join(__dirname, 'text.txt');
const writebleStream = fs.createWriteStream(filePath);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Введите текст или "exit" для выхода:');

rl.on('line', (input) => {
  if (input.match(/^exit?$/i)) {
    rl.close();
  }
  writebleStream.write(`${input}\n`);
});

rl.on('close', () => {
  console.log('THE END');
  writebleStream.end();
  process.exit();
});
