//GLOBAL VARS
let levels = [];
let activeLevel;
let grass;
let road;
let key;
let stage;
let player;
let crashSound;
let mode;
let timer = 5;
let gravity = 2;
let levelCnt = 3;
let levelTable;

class Player {
    constructor(){
        this.maxHp=100
        this.currentHp=100
        this.sprite = createSprite(30+startX,30+startY);
        this.sprite.collide(stage);
        this.sprite.rotation = 270;
        this.sprite.addImage(playerImg);
        this.sprite.scale = 0.3;
        // this.sprite.maxSpeed = 100;
        this.sprite.friction = 0.5;
    }

    playerMove(){
        this.sprite.collide(stage);
        if(keyIsDown(UP_ARROW) && player.sprite.touching.bottom) {
            player.sprite.velocity.y -= 75;
        }
        if(keyIsDown(DOWN_ARROW)) {
            player.sprite.velocity.y += gravity*2;
        }
        if(keyIsDown(RIGHT_ARROW)) {
            player.sprite.velocity.x += 5;
        }
        if(keyIsDown(LEFT_ARROW)) {
            player.sprite.velocity.x -= 5;
        }
        if(player.sprite.touching.bottom === false){
            // Clamber Function
            // if((player.sprite.touching.left || player.sprite.touching.right) && (keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW))){
                // player.sprite.position.y -= 1;
            // } else {
                player.sprite.velocity.y+=gravity;
            // }
        } 
    }
    // hurt(){//lower their hp somehow

    // }
    // attack(){

    // }
}

class Level_Gate {
    constructor(level_ID){
        // Will finish entry later
        sprite = createSprite(30+x*50,30+y*50, 50, 50);
        key.resize(sprite.width, sprite.height); 
        sprite.addImage(key);
    }
}

function preload() {

    levelTable = loadJSON("levels/levelTable.JSON", table_func);

    grass = loadImage("images/rock.png");
    road = loadImage("images/path.png");
    key = loadImage("images/key.png");
    playerImg = loadImage("images/main.png");  

    stage = new Group();
    stage_background = new Group();
}

function table_func() {
    let temp;
    for(i = 0; i < levelTable["file_names"].length; i++) {
        temp = loadStrings("levels/" + levelTable["file_names"][i], level_proc);
    }
}

function level_proc(temp) {
    levels.push({
        "id":temp[0],
        "level_dat":temp.splice(1)
    })
}

//MAP TILES
function setup() {
    frameRate(60)
    createCanvas(windowWidth-5,windowHeight-5);

    mode = 0;

    // Make level1 first
    console.log()
    loadLVL("L1");
    player = new Player();

}

function loadLVL(lvl_ID){
    let level = [];
    let lvl_index;
    for (i = 0; i < levels.length; i++){
        if (levels[i]["id"] === lvl_ID) {
            lvl_index = i;
        } else if (i >= levels.length) {
            console.log("invalid level link");
        }
    }
    console.log(levels[lvl_index])
    for (i = 0; i < levels[lvl_index]["level_dat"].length && levels[lvl_index]["level_dat"][i][0] != ""; i++) {
        level.push(levels[lvl_index]["level_dat"][i].split(" ")); //split token for txt values
    }
    console.log(level)
    for(y = 0; y < level.length; y++) { //tile's y in accordance to txt file
        for(x = 0; x < level[y].length; x++) {
            makeSprites(value = level[y][x],x,y);
        }
    }
}

//CREATE SPRITES 
function makeSprites(value,x,y) { //makeSprite params: value,x,y from for loop
    if(value == "0"){ // walls
        sprite = createSprite(30+x*50,30+y*50, 50, 50);
        grass.resize(sprite.width, sprite.height);
        sprite.addImage(grass);
        sprite.addToGroup(stage);
    }
    if(value == "1"){ // background
        sprite = createSprite(30+x*50,30+y*50, 50, 50);
        road.resize(sprite.width, sprite.height);
        sprite.addImage(road);
        sprite.addToGroup(stage_background);
    }
    if(value == "2"){ // level change
        sprite = createSprite(30+x*50,30+y*50, 50, 50);
        key.resize(sprite.width, sprite.height);
        sprite.addImage(key);
        sprite.addToGroup(stage);
    }
    if(value == "3"){ // spawn point
        sprite = createSprite(30+x*50,30+y*50, 50, 50);
        road.resize(sprite.width, sprite.height);
        sprite.addImage(road);
        sprite.addToGroup(stage_background);
        startX = x*50; 
        startY = y*50; 
    }
    if(value == "4"){ // Platform
        sprite = createSprite(30+x*50,40+y*50, 50, 30);
        road.resize(50, 50);
        sprite.draw = function(){
            image(road, 0, -10, 50, 50)
            fill("BROWN")
            rect(0,0,50,30);
        }
        sprite.addToGroup(stage)
    }
    if(value.length > 1 && value[0] == "L"){



    }

}

function instruction() {
    stroke("black");
    textSize(25);
    text("To move player.sprite: Up, Left, Right Arrow Keys. To stop player.sprite: Down Arrow Key",0,600);
    text("Tip: When finished turning player.sprite, press Down Arrow Key to stop",50,650)
}

function draw() {
    clear();
    player.playerMove();
    drawSprites();
}

