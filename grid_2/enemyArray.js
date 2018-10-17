"use strict";
class EnemyArray {
    constructor() {
        this.arrayEnemies = [];
    }

    addEnemy(item) {
        this.arrayEnemies.push(item);
    }

    clearEnemy() {
        this.arrayEnemies = [];
    }

    lengthEnemy() {
        return this.arrayEnemies.length;
    }

    moveAll(x, y) {
        for (let i = 0; i < this.lengthEnemy(); i++) {
            this.arrayEnemies[i].move(x,y);
        }

    }
    displayAll() {
        for (let i = 0; i < this.lengthEnemy(); i++) {
            this.arrayEnemies[i].display();
        }
    }
}
