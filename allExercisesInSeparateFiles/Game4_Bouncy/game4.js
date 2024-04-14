let disc, discWidth, discHeight, discX, discY;
let bgImage;
let ballX, ballY, ballSpeedX, ballSpeedY, score, gameOver;

function preload() {
  bgImage = loadImage("background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initialize variables
  discWidth = 100;
  discHeight = 20;
  discX = windowWidth / 2 - discWidth / 2;
  discY = windowHeight - discHeight - 10; // Place disc at the bottom with a margin

  ballX = random(windowWidth);
  ballY = 0;
  ballSpeedX = 15;
  ballSpeedY = 15;

  score = 0;
  gameOver = false;

  // Initialize disc
  let x = random(windowWidth);
  let y = random(windowHeight);
  let w = random(10, 40);
  let h = random(10, 40);
  disc = new Disc(x, y, w, h);
}

function draw() {
  background(bgImage);

  // Draw ball
  fill(65);
  ellipse(ballX, ballY, 50, 50);

  // Move ball
  if (!gameOver) {
    ballY += ballSpeedY;
    ballX += ballSpeedX;

    // Check for collision with top and bottom edges
    if (ballY <= 0 || ballY >= windowHeight) {
      ballSpeedY *= -1; // Reverse Y direction
    }

    // Check for collision with left and right edges
    if (ballX <= 0 || ballX >= windowWidth) {
      ballSpeedX *= -1; // Reverse X direction
    }

    // Check for collision with disc
    if (ballY + 10 >= discY && ballX >= discX && ballX <= discX + discWidth) {
      ballSpeedY *= -1; // Reverse Y direction
    }
  }

  // Draw disc
  disc.show();
}

function mousePressed() {
  disc.pressed(mouseX, mouseY);
}

class Disc {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color(255, 255, 255);
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  show() {
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }

    stroke(255);
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
  }

  pressed(px, py) {
    if (px > this.x && px < this.x + this.w && py > this.y && py < this.y + this.h) {
      this.dragging = true;
      this.offsetX = this.x - px;
      this.offsetY = this.y - py;
    }
  }
}
