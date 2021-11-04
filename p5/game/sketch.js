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

const W = 1440; const H = 700;

function preload() {
    track1 = loadStrings("track/track1.txt");
    track2 = loadStrings("track/track2.txt");

    grass = loadImage("images/rock.png");
    road = loadImage("images/path.png");
    key = loadImage("images/key.png");
    carImg = loadImage("images/main.png");  
    accident = new Group(); //if car = grass
    normal = new Group();
    level = new Group()
}

//MAP TILES
let level1; 
function setup() {
    createCanvas(W,H);

    mode = 0;

    level1 = new Array(track1.length);
    for (i = 0; i < track1.length; i++) {
        level1[i] = track1[i].split(""); //split token for txt values
    }
    for(y = 0; y < level1.length; y++) { //tile's y in accordance to txt file
        for(x = 0; x < level1[y].length; x++) {
            makeSprites(value = level1[y][x],x,y);
        }
    }

    car = createSprite(carX,carY);
    car.addImage(carImg);
    car.scale = carScale;
}

//CREATE SPRITES 
function makeSprites(value,x,y) { //makeSprite params: value,x,y from for loop
    sprite = createSprite(x*50,y*50);
    if(value == 0){ //value based on txt
        sprite.addImage(grass);
        sprite.addToGroup(accident)
        sprite.setCollider("circle",0,0,5,5);
        sprite.scale = (0.80)
    }
    if(value == 1){
        sprite.addImage(road);
        sprite.addToGroup(normal);
    }
    if(value == 2){
        sprite.addImage(key);
        sprite.addToGroup(level);
        sprite.setCollider("circle",0,0,5,5);
        sprite.scale = (0.80)
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
let carX = W/2; //car initial x W/2 
let carY = 625; //car initial y 625
let SPEED = 0; //initial speed

function carDrive() {
    car.setSpeed(SPEED);
    if(keyCode == UP_ARROW) {
        SPEED+=0.01;
        car.maxSPEED = 1;
    }
    else if(keyCode == DOWN_ARROW) {
        SPEED -=0.01;
        if(SPEED = 0) {
            SPEED = 0;
        }
    }
    else if(keyCode == LEFT_ARROW) {
        car.rotation-=1;

    }
    else if(keyCode == RIGHT_ARROW) {
        car.rotation+=1;
    }

    if(car.collide(accident)) {
        SPEED = 0;
        car.position.x = carX;
        car.position.y = carY;
    }

    if(car.collide(level)) {
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

