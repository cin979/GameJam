//GLOBAL VARS
let levels = [];
let activeLevel;
let grass;
let road;
let keyImg;
let key_obj;
let stage_background;
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
        this.sprite = createSprite(30+startX,30+startY, 40, 40);
        playerImg.resize(this.sprite.width, this.sprite.height);
        this.sprite.rotation = 270;
        this.sprite.addImage(playerImg);
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
            player.sprite.velocity.x += 10;
        }
        if(keyIsDown(LEFT_ARROW)) {
            player.sprite.velocity.x -= 10;
        }
        if(player.sprite.touching.bottom === false){
            if (player.sprite.velocity.y > 0) {
                player.sprite.velocity.y+= gravity*4;
            } else {
                player.sprite.velocity.y+= gravity/8;
            }
            // Clamber Function
            // if((player.sprite.touching.left || player.sprite.touching.right) && (keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW))){
                // player.sprite.position.y -= 1;
            // } else {
                // player.sprite.velocity.y+=gravity;
            // }
        } 
    }
    // hurt(){//lower their hp somehow

    // }
    // attack(){

    // }
}

class Level_Gate {
    constructor(value){
        // Will finish entry later
        this.sprite = createSprite(30+x*50,30+y*50, 50, 50);
        keyImg.resize(sprite.width, sprite.height); 
        this.sprite.addImage(keyImg);
        for (i = 0; i < levels.length; i++){
            if (levels[i]["id"] === value) {
                this.lvl_index = i;
            } else if (i >= levels.length) {
                console.log("invalid level link");
            }
        }
        this.sprite.debug = true;
    }
}

function preload() {

    levelTable = loadJSON("p5/game/levels/levelTable.JSON", table_func);

    grass = loadImage("p5/game/images/rock.png");
    road = loadImage("p5/game/images/path.png");
    keyImg = loadImage("p5/game/images/key.png");
    playerImg = loadImage("p5/game/images/main.png");  

    keys = new Group();
    stage_background = new Group();
    stage = new Group();
}

function table_func() {
    let temp;
    for(i = 0; i < levelTable["file_names"].length; i++) {
        temp = loadStrings("p5/game/levels/" + levelTable["file_names"][i], level_proc);
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
    for (i = 0; i < levels[lvl_index]["level_dat"].length && levels[lvl_index]["level_dat"][i][0] != ""; i++) {
        level.push(levels[lvl_index]["level_dat"][i].split(" ")); //split token for txt values
    }
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
        sprite.immovable = true;
        sprite.addToGroup(stage);
    }
    if(value == "1"){ // background
        sprite = createSprite(30+x*50,30+y*50, 50, 50);
        road.resize(sprite.width, sprite.height);
        sprite.addImage(road);
        sprite.immovable = true;
        sprite.addToGroup(stage_background);
    }
    if(value == "2"){ // level change
        sprite = createSprite(30+x*50,30+y*50, 50, 50);
        keyImg.resize(sprite.width, sprite.height);
        sprite.addImage(keyImg);
        sprite.immovable = true;
        sprite.addToGroup(stage);
    }
    if(value == "3"){ // spawn point
        sprite = createSprite(30+x*50,30+y*50, 50, 50);
        road.resize(sprite.width, sprite.height);
        sprite.addImage(road);
        sprite.immovable = true;
        sprite.addToGroup(stage_background);
        startX = x*50; 
        startY = y*50; 
    }
    if(value == "4"){ // Platform
        sprite = createSprite(30+x*50,30+y*50, 50, 50);
        road.resize(50, 50);
        sprite.draw = function(){
            // image(road, 0, -10, 50, 50)
            fill("BROWN")
            rect(0,0,50,50);
        }
        sprite.addToGroup(stage);
    }
    if(value.length > 1 && value[0] == "L"){
        key_obj = new Level_Gate(value);
    }

}

function draw() {
    clear();
    player.playerMove();
    player.sprite.collide(stage);
    if(player.sprite.overlap(key_obj.sprite)){
        allSprites.removeSprites();
        loadLVL(levels[key_obj.lvl_index]["id"]);
        player = new Player();
    }
    drawSprites();
}

