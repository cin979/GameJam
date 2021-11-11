//GLOBAL VARS
let levels = [];
let activeLevel;
let grass;
let road;
let key;
let playerSprite;
let stage;
let crashSound;
let mode;
let timer = 5;
let gravity = 2;
let levelCnt = 3;

function preload() {
    while(levels.length < levelCnt){
        levels.push(loadStrings("levels/level" + (levels.length+1).toString() + ".txt"))
    }

    grass = loadImage("images/rock.png");
    road = loadImage("images/path.png");
    key = loadImage("images/key.png");
    playerImg = loadImage("images/main.png");  

    stage = new Group(); //if playerSprite = grass
    stage_background = new Group();
}

//MAP TILES
function setup() {
    frameRate(60)
    createCanvas(windowWidth-5,windowHeight-5);

    mode = 0;

    // Make level1 first
    loadLVL(0)

    playerSprite = createSprite(30+startX,30+startY);
    playerSprite.rotation = 270;
    playerSprite.addImage(playerImg);
    playerSprite.scale = 0.4;
    // playerSprite.maxSpeed = 100;
    playerSprite.friction = 0.5;
}

function loadLVL(lvl_ID){
    level = new Array(levels[lvl_ID].length);
    for (i = 0; i < levels[lvl_ID].length && levels[lvl_ID][i][0] != ""; i++) {
        level[i] = levels[lvl_ID][i].split(" "); //split token for txt values
    }
    for(y = 0; y < level.length; y++) { //tile's y in accordance to txt file
        for(x = 0; x < level[y].length; x++) {
            makeSprites(value = level[y][x],x,y);
        }
    }
}

//CREATE SPRITES 
function makeSprites(value,x,y) { //makeSprite params: value,x,y from for loop
    sprite = createSprite(30+x*50,30+y*50, 50, 50);
    if(value == 0){ // walls
        grass.resize(sprite.width, sprite.height);
        sprite.addImage(grass);
        sprite.addToGroup(stage);
    }
    if(value == 1){ // road
        road.resize(sprite.width, sprite.height);
        sprite.addImage(road);
        sprite.addToGroup(stage_background);
    }
    if(value == 2){ // level 1 -> 2 key
        key.resize(sprite.width, sprite.height);
        sprite.addImage(key);
        sprite.addToGroup(stage);
    }
    if(value == 3){ // start base
        road.resize(sprite.width, sprite.height);
        sprite.addImage(road);
        sprite.addToGroup(stage_background);
        startX = x*50; 
        startY = y*50; 
    }
}

function playerMove() {
    playerSprite.collide(stage);

    if(keyIsDown(UP_ARROW) && playerSprite.touching.bottom) {
        playerSprite.velocity.y -= 50;
    }
    if(keyIsDown(DOWN_ARROW)) {
        playerSprite.velocity.y += gravity*2;
    }
    if(keyIsDown(RIGHT_ARROW)) {
        playerSprite.velocity.x += 5;
    }
    if(keyIsDown(LEFT_ARROW)) {
        playerSprite.velocity.x -= 5;
    }
    if(playerSprite.touching.bottom === false){
        playerSprite.velocity.y+=gravity;
    } 
}

function instruction() {
    stroke("black");
    textSize(25);
    text("To move playerSprite: Up, Left, Right Arrow Keys. To stop playerSprite: Down Arrow Key",0,600);
    text("Tip: When finished turning playerSprite, press Down Arrow Key to stop",50,650)
}

function draw() {
    clear();
    playerMove();
    drawSprites();
}

