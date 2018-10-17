//Tile class

class Tile {
    constructor(x, y, c, r, bgCol, imList) {
        this.x = x;
        this.y = y;
        this.size = 100;
        this.bgCol = bgCol;
        this.imageList = imList;
        this.imgNum = Math.floor(random(0, 9));
        this.indexC = c;
        this.indexR = r;
    }


    update() {
        fill(this.bgCol);
        
        
        
        rect(this.x, this.y, this.size, this.size);
        image(this.imageList[this.imgNum], this.x+50, this.y+50, this.size, this.size);
    }

    nextImage() {
        this.imgNum++;
        if (this.imgNum == this.imageList.length) {
            this.imgNum = 0;
        }
    }

    showNum() {
        console.log(this.indexR, this.indexC);
    }

    checkWithin(x, y) {
        if (x > this.x &&
            x < this.x + this.size &&
            y > this.y &&
            y < this.y + this.size) {

            return true;
        } else {
            return false;
        }
    }

}
