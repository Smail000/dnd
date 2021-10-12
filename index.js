
const { PerformanceObserver, performance } = require('perf_hooks');
const chalk = require('chalk')
const { Zombie } = require('./creatures.js');
const { Data, World, Character } = require('./data.js')
const { input, sleep, randint, clear, joinLine, chooseFunc } = require('./functions.js')


// var answer = readlineSync.question((chalk.red('Say your name, mather facker)\n>')));
// console.log(chalk.magenta(`Fuck my ass, borring ${answer}`))
// console.log(chalk.rgb(152,250,114)(`You have been thinking ${Math.floor((performance.now() - time) / 1000)} seconds`))




const Player = new Character(
    sex = 'transgender',
    race = 'undead',
    rank = 'knight'
)

let evilTeam = [new Zombie()]
let supportId = 0

while (evilTeam.map((enemy => enemy.alive)).indexOf(true) > -1 && Player.alive) {
    clear()

    console.log('='.repeat(19))
    console.log()
    console.log(joinLine(19, evilTeam)[0])
    console.log()
    console.log(joinLine(19, [Player, ...Player.team])[0])
    console.log()
    console.log('='.repeat(19))

    console.log('Враг преграждает вам дорогу')
    console.log('Что вы сделаете?')
    console.log('1 - Атаковать')
    console.log('2 - Просмотреть характеристики')
    switch (input('>')) {
        case '1':
            chooseId = chooseFunc(evilTeam)
            clear()
            console.log('Вы атакуете...')
            sleep(1)
            Player.attack(evilTeam[chooseId])
            if (!evilTeam[chooseId].alive) { evilTeam.splice(chooseId, 1); }
            input('E>')
            break
        
        case '2':
            chooseId = chooseFunc(evilTeam)
            clear()
            console.log('Существо - '+evilTeam[chooseId].name+' имеет:')
            console.log('Описание - '+evilTeam[chooseId].discription)
            console.log('Здоровье - '+evilTeam[chooseId].health+'/'+evilTeam[chooseId].maxHealth+' единиц')
            console.log('Мана - '+evilTeam[chooseId].mana+'/'+evilTeam[chooseId].maxMana+' единиц')
            console.log('Урон - '+evilTeam[chooseId].baseDamage+' единиц')
            console.log('Наложенные эффекты - '+(evilTeam[chooseId].effects.lenth > 0 ? evilTeam[chooseId].effects.join(', ') : 'нет эффектов'))
            input('E>')
    }
}


console.log('Все враги повержены, можно идти дальше')



