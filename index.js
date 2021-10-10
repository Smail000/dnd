
const { PerformanceObserver, performance } = require('perf_hooks');
const chalk = require('chalk')
const readlineSync = require('readline-sync');

let time = performance.now()

var answer = readlineSync.question((chalk.red('Say your name, mather facker)\n>')));
console.log(chalk.magenta(`Fuck my ass, borring ${answer}`))
console.log(chalk.rgb(152,250,114)(`You have been thinking ${Math.floor((performance.now() - time) / 1000)} seconds`))

function randint(min, max) {
        return Math.floor(Math.random() * (max+1 - min) + min);
}

// let random = ''
// for (let i = 0; i < 100; i += 1) {
    // random += randint(0, 10) + ' '
    // }
    // console.log()

// console.log(chalk.rgb(152,250,114)('Hello!'));
