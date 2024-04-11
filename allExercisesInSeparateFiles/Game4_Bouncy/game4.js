let disc, discWidth, discHeight, discX, discY;
let backgroundPhoto;
let ballX, ballY, ballSpeedY, score, gameOver;

function game4Preload(){
  backgroundPhoto = loadImage("Game4/background.png");
}

function game4Setup(){
  currentActivity = 4;
  backgroundPhoto.resize(windowWidth, windowHeight);

  menuButton.show();
  game1Button.show();
  game2Button.show();
  game3Button.show();
  game4Button.hide();

  let x = random(windowWidth);
  let y = random(windowHeight);
  let w = random(10, 40);
  let h = random(10, 40);
  disc = new Disc(x, y, w, h);

  ballX = random(windowWidth);
  ballY = 0;
  ballSpeedY = 5;

  discWidth = 100;
  discHeight = 10;
  discX = windowWidth / 2 - discWidth / 2;
  discY = windowHeight - 30;

  score = 0;
  gameOver = false;
}

function game4Draw(){
  image(backgroundPhoto, 0, 0);
  
}

function game4MousePressed(){
  // Check if the mouse is pressed within the boundaries of the disc
  if (mouseX > disc.x && mouseX < disc.x + disc.w &&
      mouseY > disc.y && mouseY < disc.y + disc.h) {
    // Handle mouse interaction for the disc
    // For example, you can change the color or behavior of the disc
    disc.color = color(255, 0, 0); // Change disc color to red
  }
}

// Class definition for Disc
class Disc {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color(); 
  }

  show(px, py) {
    if (this.dragging) {
      this.x = px + this.offsetX;
      this.y = py + this.offsetY;
    }

    stroke(255);
    fill(this.color); // Use disc color
    rect(this.x, this.y, this.w, this.h);
  }

  pressed(px, py) {
    if (px > this.x && px < this.x + this.w && py > this.y && py < this.y + this.h) {
      this.dragging = true;
      this.offsetX = this.x - px;
      this.offsetY = this.y - py;
    }
  }

  notPressed(px, py) {
    this.dragging = false;
  }
}
