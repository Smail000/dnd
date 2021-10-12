
const { Creature, Zombie } = require('./creatures.js')


const Data = {
    race: {
        human: {
            maxHealth: 300,
            maxMana: 300,
            physicalDamage: 1,
            magicDamage: 1,
        }, 
        
        orc: {
            maxHealth: 400,
            maxMana: 200,
            physicalDamage: 0.9,
            magicDamage: 1.1,
        }, 
        
        elf: {
            maxHealth: 200,
            maxMana: 400,
            physicalDamage: 1.1,
            magicDamage: 0.9,
        }, 
        
        undead: {
            maxHealth: 400,
            maxMana: 300,
            physicalDamage: 1.2,
            magicDamage: 1.2,
        },
    }, 
    
    sex: [
        'man',
        'woman'
    ], 
    
    rank: {
        startRanks: {
            knight: {
                health: 300,
                mana: -200
            },

            archer: {
                health: 100,
                mana: 100
            },

            mage: {
                health: -100,
                mana: 300
            },
        }, 
        
        advancedRanks: {
            paladin: {

            },

            ranger: {

            },

            scout: {

            },

            arhimage: {

            },

            warlock: {

            },
        }
    }, 
    
    abilities: {

    }, 
    
    enemies: {

    }, 
    
    items: {
        
    }, 
    
    buildings: {
        shop: {

        },

        casino: {

        },

        aliveHouses: {

        },

        treasure: {

        },
        
        fountain: {

        },

        trader: {

        },

        warpPortal: {

        },

        tavern: {

        },
    },

    bioms: {
        twilightForest: {

        },

        cemetery: {

        },

        undeadTown: {

        },

        cave: {

        },

        swamp: {

        },

        mountain: {

        },

        desert: {

        },

        nether: {

        },
    }
}

class World {
    constructor(current_place=0) {
        this.current_place = current_place
        this.timeHours = 0 // hours
        this.timeMinutes = 0 // minutes
        this.world = [
            ''
        ]
    }
}

class Character extends Creature{
    constructor (
        sex=0,
        race=0,
        rank=0,
    ) {
        super()
        this.name = 'Character'

        this.raceName = Object.keys(Data.race)[race] || race
        this.race = Data.race[this.raceName]

        this.sexName = Data.sex[sex] || sex

        this.rankName = Object.keys(Data.rank.startRanks)[rank] || rank
        this.rank = Data.rank.startRanks[this.rankName]

        this.maxHealth = this.race.maxHealth + this.rank.health
        this.health = this.maxHealth

        this.maxMana = this.race.maxMana + this.rank.mana
        this.mana = this.maxMana

        this.maxFood = 100
        this.food = this.maxFood

        this.backpack = []

    
        this.nothing = {name: 'Nothing'},
        this.equipped = {
            hands: this.nothing,
            head: this.nothing,
            chest: this.nothing,
            pants: this.nothing,
            boots: this.nothing,
            accessory1: this.nothing,
            accessory2: this.nothing,
        }

        this.team = [this, new Zombie()]
        this.teamLimit = 2

        this.baseDamage = 100
    }

    // attack (enemy) {
    //     super(enemy)

    // }
}


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
    for (let i = 0; i < 10; i++) {
        console.log()
    }
}

function joinLine (lenth, args=[], ids=[]) {
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
    for (index of indexes) {
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

// console.log(joinLine(19))



module.exports.Character = Character
module.exports.World = World
module.exports.Data = Data

