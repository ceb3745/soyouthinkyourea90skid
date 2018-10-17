"use strict";
let heartimg;
let healthbar;

let enemyimg;
let enemyhorde;

let x1;
let y1;
let speed;

let moveUfoX;
let moveUfoY;

//tile setup
let tiles = [];
let images = [];
let tileSize = 100;
let rows = 7;
let cols = 10;

//array for collectable objects
let objs = [];
let level = 0;

//ufo array
let aliens = [];

////variables for the unicorn animation array
let uni;
var anim;
var nFrms = 6; // Number of frames in the animation
var animationRate = 10;

//variables for the star animation array
var tileAnim;
var tileFrm = 4; // Number of frames in the animation
var tileAnimRate = 10;

//variables for the ufo animation array
let ufo;
var enAnim;
var enFrm = 3; // Number of frames in the animation
var enAnimRate = 20;

//variables for the planet animation array
let planet;
var pAnim;
var pFrm = 3; // Number of frames in the animation
var pAnimRate = 10;

let score = 0;
let screen;
let enter = false;

let lives;
let myfont;
let randX = 0;
let randY = 0;
let board = [];

//variables for the cat animation array
function preload() {
    heartimg = loadImage("../images/heart.png"); //heart/lives artwork goes here
    myfont = loadFont('../font/Thefont.ttf');
    
    screen = loadImage("../images/open.png");

    //images for the tiles
    images.push(loadImage("../images/tile1.png"));
    images.push(loadImage("../images/tile1.png"));
    images.push(loadImage("../images/tile2.png"));
    images.push(loadImage("../images/tile3.png"));
    images.push(loadImage("../images/tile4.png"));
    images.push(loadImage("../images/tile5.png"));
    images.push(loadImage("../images/tile4.png"));
    images.push(loadImage("../images/tile5.png"));
    images.push(loadImage("../images/bh.png"));

    //new array for the unicorn animation
    anim = new Array(nFrms);

    //image frames for the unicorn animation
    for (var i = 0; i < nFrms; i++) {
        anim[i] = loadImage("../unicorn/unicorn" + i + ".png");
    }

    //new array for the star animation
    tileAnim = new Array(tileFrm);

    enAnim = new Array(enFrm)

    //image frames for ufo animation
    for (var i = 0; i < enFrm; i++) {
        enAnim[i] = loadImage("../ufo/ufo" + i + ".png");
    }

    pAnim = new Array(pFrm)

    //image frames for planet animation
    for (var i = 0; i < pFrm; i++) {
        pAnim[i] = loadImage("../planet/ob" + i + ".png");
    }


    //image frames for star animation
    for (var i = 0; i < tileFrm; i++) {
        tileAnim[i] = loadImage("../star/star" + i + ".png");
    }
    
    for(let i=0;i<7;i++){
        board.push([0])
        for(let j=0; j<10; j++){
            board[i][j] = 0;
        }
    }
}

function setup() {
    //basic setup
    //create grid
    createCanvas(cols * tileSize, rows * tileSize);
    background(180);
    tileSize = width / cols;

    lives = 3;

    for (let r = 0; r < rows; r++) {
        let tempArray = [];
        for (let c = 0; c < cols; c++) {
            tempArray.push(new Tile(
                c * tileSize,
                r * tileSize,
                r,
                c,
                "#AD91BA",
                images));

        }
        tiles.push(tempArray);
    }






    x1 = width / 2;
    y1 = height / 2;

    speed = 1;

    //create healthbar
    healthbar = new HealthBar();
    enemyhorde = new EnemyHorde();
    //initialize healthbar

    healthbar.init(heartimg, 100, 20);
    enemyhorde.init(enFrm, x1, y1, enAnim);





    //shows tile #
    console.log(tiles);

    //creates unicorn sprite
    uni = new Sprite(nFrms, 6, 5, anim);

    objs = [];


    planet = [];

    //stars initialize
    for (let s = 0; s < 5; s++) {
        randX = Math.floor(random(0, rows));
        randY = Math.floor(random(0, cols)); 
        while(board[randX][randY] != 0){
            randX = Math.floor(random(0, rows));
            randY = Math.floor(random(0, cols));   
        }
        objs.push(new Star(tileFrm, randX, randY, tileAnim));
        board[randX][randY] = 1;
    }



    for (let p = 0; p < 3; p++) {
        randX = Math.floor(random(0, rows));
        randY = Math.floor(random(0, cols)); 
        while(board[randX][randY] != 0){
            randX = Math.floor(random(0, rows));
            randY = Math.floor(random(0, cols));   
        }
        uni.addObstacle(randX, randY);
        planet.push(new Planet(pFrm, randX, randY, pAnim));
        board[randX][randY] = 2;
    }

    moveUfoX = Math.floor(random(0, cols));
    moveUfoY = Math.floor(random(0, rows));


}

function draw() {
    background(130);
    //display healthbar



    // enemies move i dont know where else to put this so it works, relies on being called constantly





    //    //sets cursor to a pawprint image
    //    cursor("../images/curs1.png");

    //updates tile images in real time
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            tiles[r][c].update();

        }
    }

    if (frameCount % animationRate == 0) {
        uni.transition(); // Advance the animation to the next frame

    }

    uni.display(); // Display the frame


    //makes planets
    if (frameCount % pAnimRate == 0) {
        for (let p = 0; p < planet.length; p++) {
            planet[p].transition(); // Advance the animation to the next frame
        }

    }

    for (let p = 0; p < planet.length; p++) {
        planet[p].display(); // Display the frame
    }


    //the unicorn collects the star objects
    for (let i = 0; i < objs.length; i++) {
        if (uni.row == objs[i].row && uni.col == objs[i].col) {
            objs.splice(i, 1);
            score++;
        }

        fill(255);
        stroke("purple");
        textSize(20);
        textFont(myfont);
        text('LEVEL ' + level, 20, 100);
    }

    //next level
    if (objs.length == 0) {
        level++;
        hardReset(level);
        textFont(myfont);
        text('LEVEL ' + level, 20, 100);
    }

    //COLLISION


    if ((uni.col * tileSize)-50 < x1 && (uni.col * tileSize)+50  > x1 && (uni.row * tileSize)-50 < y1 && (uni.row * tileSize)+50  > y1 ) {
        healthbar.loseLife();
        enemyhorde.move(moveUfoX, moveUfoY);
        x1 = moveUfoX;
        y1 = moveUfoY;

        lives -= 1;
    }

    healthbar.display();
    enemyhorde.display();

    textFont(myfont);
    text("SCORE "+score, 20, 120);

    if (frameCount % tileAnimRate == 0) {
        for (let s = 0; s < objs.length; s++) {
            objs[s].transition(); // Advance the animation to the next frame
        }

    }

    for (let s = 0; s < objs.length; s++) {
        objs[s].display(); // Display the frame
    }

    if (enter == false) {
        image(screen, width / 2, height / 2);
    } else if (enter == true) {
        
        for (let a = 0; a < aliens.length; a++) {
            aliens[a].display(); // Display the frame
        }

        if (uni.col * tileSize < x1) { // Mouse is to the left of the Bot
            x1 = x1 - speed;
        } // Move speed pixels left
        else {
            x1 = x1 + speed; // Move speed pixels right
        }

        if (uni.row * tileSize < y1) { // Mouse is above the Bot
            y1 -= speed;
        } // Move speed pixels up (Note -= operator)
        else {
            y1 += speed; // Move speed pixels down
        }

        enemyhorde.move(x1, y1);
    }

    if (lives == 0) {
        background("#5B328B");
        textSize(100);
        textAlign(CENTER);
        text("GAME OVER", width / 2, height / 2);
        textSize(50);
        textAlign(CENTER);
        text("refresh to try again", width / 2, height / 1.5);
        return;
    }

}


function hardReset(level) {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            tiles[r][c].update();
        }
    }

    if (frameCount % animationRate == 0) {
        uni.transition(); // Advance the animation to the next frame

    }

    uni.display(); // Display the frame
    

    for (let s = 0; s < objs.length; s++) {
        objs[s].display(); // Display the frame
    }

    for (let a = 0; a < aliens.length; a++) {
        aliens[a].display(); // Display the frame
    }


    for (let s = 0; s < 5; s++) {
        randX = Math.floor(random(0, rows));
        randY = Math.floor(random(0, cols)); 
        while(board[randX][randY] != 0){
            randX = Math.floor(random(0, rows));
            randY = Math.floor(random(0, cols));   
        }
        objs.push(new Star(tileFrm, randX, randY, tileAnim));
        board[randX][randY] = 1;
    }

    for (let s = 0; s < Math.floor(random(1, 5)); s++) {
        aliens.push(new Enemy(enFrm, Math.floor(random(1, rows)), Math.floor(random(1, cols)), enAnim));
    }
}

function keyReleased() {
    if (keyCode == 13) {
        enter = true;

    }
}
