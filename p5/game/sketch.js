//GLOBAL VARS
let track1;
let track2;
<<<<<<< HEAD
=======
let track3;
>>>>>>> 88ca40ec9f933e9cc6f68658b3a9aed33320f5b5
let grass;
let road;
let key;
let car;
let accident;

let crashSound;

let mode;
let timer = 5;

<<<<<<< HEAD
const W = 1440; const H = 700;
=======
// const W = windowWidth; const H = windowHeight;
>>>>>>> 88ca40ec9f933e9cc6f68658b3a9aed33320f5b5

function preload() {
    track1 = loadStrings("track/track1.txt");
    track2 = loadStrings("track/track2.txt");
<<<<<<< HEAD
=======
    track3 = loadStrings("track/track3.txt");
>>>>>>> 88ca40ec9f933e9cc6f68658b3a9aed33320f5b5

    grass = loadImage("images/rock.png");
    road = loadImage("images/path.png");
    key = loadImage("images/key.png");
    carImg = loadImage("images/main.png");  
    accident = new Group(); //if car = grass
    normal = new Group();
<<<<<<< HEAD
    level = new Group()
=======
    difficult2 = new Group(); //for level 2
    difficult3 = new Group(); // for level 3
>>>>>>> 88ca40ec9f933e9cc6f68658b3a9aed33320f5b5
}

//MAP TILES
let level1; 
function setup() {
<<<<<<< HEAD
    createCanvas(W,H);

    mode = 0;

    level1 = new Array(track1.length);
    for (i = 0; i < track1.length; i++) {
=======
    createCanvas(windowWidth,windowHeight);

    mode = 0;

    // Make level1 first
    level1 = new Array(track1.length);
    for (i = 0; i < track1.length && track1[i][0] != ""; i++) {
>>>>>>> 88ca40ec9f933e9cc6f68658b3a9aed33320f5b5
        level1[i] = track1[i].split(""); //split token for txt values
    }
    for(y = 0; y < level1.length; y++) { //tile's y in accordance to txt file
        for(x = 0; x < level1[y].length; x++) {
            makeSprites(value = level1[y][x],x,y);
        }
    }

<<<<<<< HEAD
    car = createSprite(carX,carY);
=======
    car = createSprite(30+carX,30+carY);
    car.rotation = 270;
>>>>>>> 88ca40ec9f933e9cc6f68658b3a9aed33320f5b5
    car.addImage(carImg);
    car.scale = carScale;
}

//CREATE SPRITES 
function makeSprites(value,x,y) { //makeSprite params: value,x,y from for loop
<<<<<<< HEAD
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
=======
    sprite = createSprite(30+x*50,30+y*50, 50, 50);
    if(value == 0){ // grass
        // sprite.scale = (0.80);
        grass.resize(sprite.width, sprite.height);
        sprite.addImage(grass);
        sprite.addToGroup(accident)
        // sprite.setCollider("rectangle",0,0,5,5);
    }
    if(value == 1){ // road
        road.resize(sprite.width, sprite.height);
        sprite.addImage(road);
        sprite.addToGroup(normal);
    }
    if(value == 2){ // level 1 -> 2 key
        // sprite.scale = (0.80)
        key.resize(sprite.width, sprite.height);
        sprite.addImage(key);
        sprite.addToGroup(difficult2);
        // sprite.setCollider("rectangle",0,0,5,5);
    }
    if(value == 3){ // start base
        road.resize(sprite.width, sprite.height);
        sprite.addImage(road);
        sprite.addToGroup(normal);
        carX = x*50; 
        carY = y*50; 
    }
    if(value == 4){ // level 2 -> 3 key
        // sprite.scale = (0.80)
        key.resize(sprite.width, sprite.height);
        sprite.addImage(key);
        sprite.addToGroup(difficult3);
        // sprite.setCollider("rectangle",0,0,5,5);
>>>>>>> 88ca40ec9f933e9cc6f68658b3a9aed33320f5b5
    }
}

let level2;
function level2Track(){
<<<<<<< HEAD
    level2 = new Array(track2.length);
    for (i = 0; i < track2.length; i++) {
=======
    // create level 2 track
    level2 = new Array(track2.length);
    for (i = 0; i < track2.length && track2[i][0] != ""; i++) {
>>>>>>> 88ca40ec9f933e9cc6f68658b3a9aed33320f5b5
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

<<<<<<< HEAD
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
=======
let level3;
function level3Track(){
    // create level 3 track
    level3 = new Array(track3.length);
    for (i = 0; i < track3.length && track3[i][0] != ""; i++) {
        level3[i] = track3[i].split(""); //split token for txt values
    }
    for(y = 0; y < level3.length; y++) { //tile's y in accordance to txt file
        for(x = 0; x < level3[y].length; x++) {
            makeSprites(value = level3[y][x],x,y);
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

    // collide with grass
    if(car.collide(accident)) {
        car.rotation = 270;
        SPEED = 0;
        car.position.x = 30+carX;
        car.position.y = 30+carY;
    }

    // collide with level 2 key in level 1
    if(car.collide(difficult2)) {
        car.rotation = 270;
        SPEED = 0;
        allSprites.removeSprites();
        level2Track();
    }

    // collide with level 3 key in level 2
    if(car.collide(difficult3)) {
        car.rotation = 270;
        SPEED = 0;
        allSprites.removeSprites();
        level3Track();
    }
    
>>>>>>> 88ca40ec9f933e9cc6f68658b3a9aed33320f5b5
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

