"use strict";

class Heart {
    constructor(imageheart,x,y) {
        this.heart = imageheart;
        this.x = x;
        this.y = y;
    }
    
    display(incre) {
        image(this.heart,this.x+incre,this.y, this.heart.width/1.5, this.heart.height/1.5);
        //last 2 params change scale, probably take that out if heart is sized correctly
        //incre is for spacing between the hearts
    }
}