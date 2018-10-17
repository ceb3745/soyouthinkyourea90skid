"use strict";


class LivesArray { //sets up array of hearts
    constructor() {
        this.arrayLives = [];
        
    }
    
    subtractOne() { //removes last heart
        //pop
        this.arrayLives.pop();
    }
    
    addOne(item) { //add heart
        //push
        this.arrayLives.push(item);
    }
    
    myLeng() { //returns length of array for for loops
        return this.arrayLives.length;
    }
    
    clear() { //clear array, used for game over/resetting game
        this.arrayLives = [];
    }
    
    displayAll() {
        //display all of the array imgs
        for (let i = 0; i < this.myLeng(); i++) {
            this.arrayLives[i].display(i*100);
        }
    }
}