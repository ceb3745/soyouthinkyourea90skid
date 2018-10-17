"use strict";

class EnemyHorde {
    constructor() {
        this.enemyA = new EnemyArray();

    }

    init(image,x,y ,img2) {
        
            this.enemyA.addEnemy(new Enemy(image,x,y, img2));
        
    }

    move(x, y) {

        if (this.enemyA.lengthEnemy() > 0) {
            this.enemyA.moveAll(x, y);
        
        }

    }

    display() {
        if (this.enemyA.lengthEnemy() > 0) {
            this.enemyA.displayAll();
        }
    }
}
