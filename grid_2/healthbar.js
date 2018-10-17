"use strict";

class HealthBar {
    constructor() {
        this.livesA = new LivesArray();
    }
    
    init(image) {
        for (let i = 0; i < 3; i++) {
            this.livesA.addOne(new Heart(image, 40,40));

        }
    }
    
    loseLife() {
        this.livesA.subtractOne();
        
    }
    
    gainLife(image,x,y) {
        this.livesA.addOne(new Heart(image, x, y));

    }
    
    display(x,y) {
        if (this.livesA.myLeng() > 0) {
            this.livesA.displayAll(x,y);
        }
    }
    
}