function setup() {
  createCanvas(windowWidth, windowHeight);
  playerSprite = createSprite(windowWidth/2, windowHeight/2);
  playerSprite.draw = function() {
    stroke("YELLOW");
    strokeWeight(5);
    noFill();
    ellipse(0, 0, 20, 20);
  }
}

function draw() {
  background("YELLOW");
  drawSprites();
};