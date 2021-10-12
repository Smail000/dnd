
const { input, sleep, randint, clear, joinLine, chooseFunc } = require('./functions.js')
// function randint (min, max) {
//     return Math.floor(Math.random() * (max - min) + min);
// }

class Creature {
    constructor (
    ) {
        this.name = 'Empty'
        this.discription = 'Empty'
        this.phrases = []
        this.drop = []

        this.alive = true

        this.effects = []

        this.abilities = []
        
        this.maxHealth = 200
        this.health = this.maxHealth

        this.maxMana = 0
        this.mana = this.maxMana

        this.baseDamage = 20

        this.criticalHitChance = 0.05
        this.missChance = 0.5
    }

    tick () {
        for (effect of this.effects) {}
    }
    
    get isCriticalHit() {
        return 100*this.criticalHitChance > randint(0, 100)
    }

    get isHit () {
        return 100*(1-this.missChance) > randint(0, 100)
    }

    attack (enemy) {
        if (this.isHit) {
            if (this.isCriticalHit) {
                console.log('Вы попали по существу '+enemy.name+' критическим ударом и \nнанесли '+this.baseDamage*2+' единиц урона')
                enemy.health -= this.baseDamage*2
                enemy.protect()
            } else {
                console.log('Вы попали по существу '+enemy.name+' обычным ударом и \nнанесли '+this.baseDamage+' единиц урона')
                enemy.health -= this.baseDamage
                enemy.protect()
            }
        } else {
            console.log('Промах')
        }
    }

    protect () {
        if (this.health <= 0) {
            this.alive = false
            console.log('Существо '+this.name+' мертво')
        }
    }
}

class Zombie extends Creature {
    constructor (        
    ) {
        super()
        this.name = 'Zombie'
        this.discription = 'Ugly creature'
        this.phrases = [
            'Agrh!',
            'Graaaa!',
            'AAAAAA!',
        ]

        this.maxHealth = 200
        this.health = this.maxHealth

        this.maxMana = 0
        this.mana = this.maxMana
    }
}


module.exports.Creature = Creature
module.exports.Zombie = Zombie

