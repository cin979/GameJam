//GLOBAL VARS
let track1;
let track2;
let grass;
let road;
let key;
let car;
let accident;

let crashSound;

let mode;
let timer = 5;

// const W = windowWidth; const H = windowHeight;

function preload() {
    track1 = loadStrings("track/track1.txt");
    track2 = loadStrings("track/track2.txt");

    grass = loadImage("images/rock.png");
    road = loadImage("images/path.png");
    key = loadImage("images/key.png");
    carImg = loadImage("images/main.png");  
    accident = new Group(); //if car = grass
    normal = new Group();
    level = new Group();
}

//MAP TILES
let level1; 
function setup() {
    createCanvas(windowWidth,windowHeight);

    mode = 0;

    level1 = new Array(track1.length);
    for (i = 0; i < track1.length && track1[i][0] != ""; i++) {
        level1[i] = track1[i].split(""); //split token for txt values
    }
    for(y = 0; y < level1.length; y++) { //tile's y in accordance to txt file
        for(x = 0; x < level1[y].length; x++) {
            makeSprites(value = level1[y][x],x,y);
        }
    }

    car = createSprite(30+carX,30+carY);
    car.rotation = 270;
    car.addImage(carImg);
    car.scale = carScale;
    console.log(allSprites.length)

}

//CREATE SPRITES 
function makeSprites(value,x,y) { //makeSprite params: value,x,y from for loop
    sprite = createSprite(30+x*50,30+y*50, 50, 50);
    if(value == 0){ //value based on txt
        // sprite.scale = (0.80);
        grass.resize(sprite.width, sprite.height);
        sprite.addImage(grass);
        sprite.addToGroup(accident)
        // sprite.setCollider("rectangle",0,0,5,5);
    }
    if(value == 1){
        road.resize(sprite.width, sprite.height);
        sprite.addImage(road);
        sprite.addToGroup(normal);
    }
    if(value == 2){
        // sprite.scale = (0.80)
        key.resize(sprite.width, sprite.height);
        sprite.addImage(key);
        sprite.addToGroup(level);
        // sprite.setCollider("rectangle",0,0,5,5);
    }
    if(value == 3){
        road.resize(sprite.width, sprite.height);
        sprite.addImage(road);
        sprite.addToGroup(normal);
        carX = x*50; 
        carY = y*50; 
    }
}

let level2;
function level2Track(){
    level2 = new Array(track2.length);
    for (i = 0; i < track2.length; i++) {
        level2[i] = track2[i].split(""); //split token for txt values
    }
    for(y = 0; y < level2.length; y++) { //tile's y in accordance to txt file
        for(x = 0; x < level2[y].length; x++) {
            makeSprites(value = level2[y][x],x,y);
        }
    }
    car = createSprite(carX,carY);
    car.addImage(carImg);
    car.scale = carScale;
}

//CAR VARS:
let carScale = 0.4

let SPEED = 0; //initial speed

function carDrive() {
    car.rotateToDirection = true;
    car.setSpeed(SPEED);
    if(keyIsDown(UP_ARROW)) {
        SPEED+=0.1;
        car.maxSPEED = 1;
    }
    if(keyIsDown(DOWN_ARROW)) {
        SPEED -=0.1;
        if(SPEED != 0) {
            SPEED = 0;
        }
    }
    if(keyIsDown(LEFT_ARROW)) {
        car.rotation-=2;

    }
    if(keyIsDown(RIGHT_ARROW)) {
        car.rotation+=2;
    }

    if(car.collide(accident)) {
        car.rotation = 270;
        SPEED = 0;
        car.position.x = 30+carX;
        car.position.y = 30+carY;
    }

    if(car.collide(level)) {
        car.rotation = 270;
        SPEED = 0;
        allSprites.removeSprites();
        level2Track();
    }
}

function instruction() {
    stroke("black");
    textSize(25);
    text("To move car: Up, Left, Right Arrow Keys. To stop car: Down Arrow Key",0,600);
    text("Tip: When finished turning car, press Down Arrow Key to stop",50,650)
}

function draw() {
    clear()
    if(mode == 0) {
        textAlign(CENTER, CENTER);
        textSize(50);
        text(timer, 375,350);
        text("Loading Game", 375, 450);
        if(frameCount % 60 == 0 && timer > 0) {
            timer--;
        }
        if (timer == 0) {
            mode = 1;
        }
    }
    if(mode == 1) {
    carDrive();
    drawSprites();
    }

}

