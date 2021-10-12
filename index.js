
const { PerformanceObserver, performance } = require('perf_hooks');
const chalk = require('chalk')
const { Zombie } = require('./creatures.js');
const { Data, World, Character } = require('./data.js')
const { input, sleep, randint, clear, joinLine, chooseFunc } = require('./functions.js')


// var answer = readlineSync.question((chalk.red('Say your name, mather facker)\n>')));
// console.log(chalk.magenta(`Fuck my ass, borring ${answer}`))
// console.log(chalk.rgb(152,250,114)(`You have been thinking ${Math.floor((performance.now() - time) / 1000)} seconds`))


clear()

const Player = new Character(
    sex = 'transgender',
    race = 'undead',
    rank = 'knight'
)

let evilTeam = [new Zombie(), ]

let supportId = 0
let choosed = false

while (evilTeam.map(enemy => enemy.alive).indexOf(true) > -1 && (Player.team.map((support => support.alive)).indexOf(true) || Player.alive)) {
    console.log(evilTeam)

    for (let [supportId, support] of Player.team.entries()) {

        if (evilTeam.length == 0) {break}

        let choosed = false
        while (!choosed) {

            clear()

            console.log('Враг преграждает вам дорогу')
            console.log('Очередь хода - '+support.name)

            console.log('='.repeat(19))
            console.log()
            console.log(joinLine(19, evilTeam)[0])
            console.log()
            console.log(joinLine(19, Player.team, [supportId, ])[0])
            console.log()
            console.log('='.repeat(19))
            
            console.log('Что вы сделаете?')
            console.log('1 - Атаковать')
            console.log('2 - Просмотреть характеристики врагов')
            console.log('3 - Просмотреть характеристики членов команды')
            console.log('4 - Пропустить')
            switch (input('>')) {
                case '1':
                    clear()
                    chooseId = chooseFunc(evilTeam)
                    clear()
                    console.log(support.name+' атакует...')
                    sleep(1)
                    support.attack(evilTeam[chooseId], support, log=true)
                    if (!evilTeam[chooseId].alive) { evilTeam.splice(chooseId, 1); }
                    input('E>')
                    choosed = true
                    break
                
                case '2':
                    clear()
                    chooseId = chooseFunc(evilTeam)
                    clear()
                    console.log('Существо - '+evilTeam[chooseId].name+' имеет:')
                    console.log('Описание - '+evilTeam[chooseId].discription)
                    console.log('Здоровье - '+evilTeam[chooseId].health+'/'+evilTeam[chooseId].maxHealth+' единиц')
                    console.log('Мана - '+evilTeam[chooseId].mana+'/'+evilTeam[chooseId].maxMana+' единиц')
                    console.log('Урон - '+evilTeam[chooseId].baseDamage+' единиц')
                    console.log('Наложенные эффекты - '+(evilTeam[chooseId].effects.lenth > 0 ? evilTeam[chooseId].effects.join(', ') : 'нет эффектов'))
                    input('E>')
                    break

                case '3':
                    clear()
                    chooseId = chooseFunc(Player.team)
                    clear()
                    console.log('Существо - '+Player.team[chooseId].name+' имеет:')
                    console.log('Описание - '+Player.team[chooseId].discription)
                    console.log('Здоровье - '+Player.team[chooseId].health+'/'+Player.team[chooseId].maxHealth+' единиц')
                    console.log('Мана - '+Player.team[chooseId].mana+'/'+Player.team[chooseId].maxMana+' единиц')
                    console.log('Урон - '+Player.team[chooseId].baseDamage+' единиц')
                    console.log('Наложенные эффекты - '+(Player.team[chooseId].effects.lenth > 0 ? Player.team[chooseId].effects.join(', ') : 'нет эффектов'))
                    input('E>')
                    break

                case '4':
                    clear()
                    choosed = true
                    break

                default: clear()
            }
        }
    }

    for (let [enemyId, enemy] of evilTeam.entries()) {
        clear()
        console.log('Очередь хода - '+enemy.name)
        console.log('='.repeat(19))
        console.log()
        console.log(joinLine(19, evilTeam, [enemyId, ])[0])
        console.log()
        console.log(joinLine(19, Player.team)[0])
        console.log()
        console.log('='.repeat(19))
        sleep(1)
        console.log(enemy.name+' атакует...')
        sleep(1)
        enemy.attack(Player.team[0], enemy, log=true)
        if (!Player.team[0].alive) { evilTeam.splice(0, 1); }
        input('E>')
        clear()
        
    }
}

if ((Player.team.map((support => support.alive)).indexOf(true) || Player.alive)) {
    console.log('Все враги повержены, можно идти дальше')
} else {
    console.log('Вы проиграли(')
}

clear()
input('Press Enter to exit...')



