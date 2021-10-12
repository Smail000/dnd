
const readlineSync = require('readline-sync');
const { PerformanceObserver, performance } = require('perf_hooks');

function randint (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function sleep(time) {
    let start_time = performance.now()
    while((performance.now() - start_time) / 1000 < time) {
        ;
    }
}

function input (arg) {
    return readlineSync.question(arg)
}

function clear () {
    for (let i = 0; i < 30; i++) {
        console.log()
    }
}

function joinLine (lenth=19, args=[], ids=[]) {
    let split = Math.floor(lenth / (args.length+1))
    let line = ''
    let indexes = []
    let id = 0
    for (arg of args) {
        try { line += ' '.repeat(split) + arg.name[0] } catch { line += ' '.repeat(split) + arg[0] }
        indexes.push((id+1)*split+id)
        id++
    } 
    line += ' '.repeat(split)

    id = 0
    for (let index of indexes) {
        if (ids.includes(id)) {
            line = line.split('')
            line[index-1] = '['
            line[index+1] = ']'
            line = line.join('')
        }
        id++
    }

    return [line, indexes]
}

function chooseFunc (team) {
    let choosed = false
    let chooseId = 0

    while (!choosed) {
        clear()
        console.log('Выберете цель:')
        console.log('='.repeat(19))
        console.log()
        console.log(joinLine(19, team, [chooseId,])[0])
        console.log()
        console.log('='.repeat(19))
        console.log('1 - влево\n2 - вправо\nEnter - подтверждение выбора')
        switch (input('>')) {
            case '2':
                chooseId++
                if ( chooseId == team.length) { chooseId = 0 } 
                break
            case '1': 
                chooseId--
                if ( chooseId == -1) { chooseId = team.length-1 } 
                break
            case '':
                choosed = true
                break
        }
    }
    return chooseId
}



module.exports.input = input
module.exports.sleep = sleep
module.exports.randint = randint
module.exports.clear = clear
module.exports.joinLine = joinLine
module.exports.chooseFunc = chooseFunc