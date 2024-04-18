let disc, discWidth, discHeight, discX, discY;
let bgImage;
let ballX, ballY, ballSpeedX, ballSpeedY, score, gameOver;

function game4Preload() {
  bgImage = loadImage("background.png");
}

function game4Setup() {
  

  menuButton.show();
  game1Button.hide();
  game2Button.hide();
  game3Button.hide();
  game4Button.hide();
  

  discWidth = 100;
  discHeight = 20;
  discX = windowWidth / 2 - discWidth / 2;
  discY = windowHeight - discHeight - 10; 

  ballX = random(windowWidth);
  ballY = 0;
  ballSpeedX = 5;
  ballSpeedY = 5;

  score = 0;
  gameOver = false;

  // Initialize disc
  let x = random(windowWidth);
  let y = random(windowHeight);
  let w = 100;
  let h = 20;
  disc = new Disc(x, y, w, h);
}

function game4Draw() {
  background(bgImage);

  // Draw ball
  fill(65);
  ellipse(ballX, ballY, 50, 50);


  if (!gameOver) {
    ballY += ballSpeedY;
    ballX += ballSpeedX;


    if (ballY <= 0 || ballY >= windowHeight) {
      ballSpeedY *= -1; // Reverse Y direction
    }


    if (ballX <= 0 || ballX >= windowWidth) {
      ballSpeedX *= -1;
    }


    if (ballY + 10 >= discY && ballX >= discX && ballX <= discX + discWidth) {
      ballSpeedY *= -1; // Reverse Y direction
      score++; // Increment the score
    }

    if (ballY > (windowHeight - 50)) {
      gameOver = true;
    }
  } else {
    fill(255, 0, 0);
    textSize(50);
    textAlign(CENTER);
    text("Game Over!", windowWidth / 2, windowHeight / 2);
  }


  // Draw disc
  disc.show();

  // Display the score on the screen
  fill(255,0,0,);
  textSize(30);
  textAlign(CENTER);
  text("Score: " + score, windowWidth / 2, 50);
}

function game4MousePressed() {
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
      discX = this.x;
      discY = this.y;
    }

    stroke(225);
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
