function setup() {
  createCanvas(windowWidth, windowHeight);
  playerSprite = createSprite(windowWidth/2, windowHeight/2);
  playerSprite.draw = function() {
    stroke("BLACK");
    strokeWeight(5);
    noFill();
    ellipse(0, 0, 20, 20);
  }
}

function draw() {
<<<<<<< HEAD
  background("PINK");
=======
  background("YELLOW");
>>>>>>> 88ca40ec9f933e9cc6f68658b3a9aed33320f5b5
  drawSprites();
};