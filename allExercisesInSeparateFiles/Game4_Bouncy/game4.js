let disc, discWidth, discHeight, discX, discY;
let backgroundPhoto;
let ballX, ballY, ballSpeedY, score, gameOver;

function game4Preload(){
  backgroundPhoto = loadImage("Game4/background.png");
  
}

function game4Setup(){

  currentActivity = 4;
  backgroundPhoto.resize(windowWidth, windowHeight);
  image(backgroundPhoto, 0, 0);

  menuButton.show();
  game1Button.show();
  game2Button.show();
  game3Button.show();
  game4Button.hide();

  let x = random(windowWidth);
  let y = random(windowHeight);
  let w = random(10, 40);
  let h = random(10, 40);
  disc = new disc(x, y, w, h);
  
  ballX = random(windowWidth); // Start ball at random X position
  ballY = 0; // Start ball at top of the screen
  ballSpeedY = 5; // Set initial vertical speed of the ball
  
  discWidth = 100;
  discHeight = 10;
  discX = windowWidth / 2 - discWidth / 2; // Start disc at the middle of the screen horizontally
  discY = windowHeight - 30; // Start disc at the bottom of the screen
  
  score = 0; // Initialize score
  gameOver = false; // Set game over flag to false

}

function game4Draw(){
  image(backgroundPhoto, 0, 0); 
}



class Disc {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragging = false;
    this.rollover = false;
  }

  show(px, py) {
    if (this.dragging) {
      this.x = px + this.offsetX;
      this.y = py + this.offsetY;
    }

    stroke(255);
    noFill();
    rect(this.x, this.y, this.w, this.h);
  }

  pressed(px, py) {
    if (px > this.x && px < this.x + this.w && py > this.y && py < this.y + this.h) {
      print("clicked on rect");
      this.dragging = true;
      this.offsetX = this.x - px;
      // print(this.offsetX);
      this.offsetY = this.y - py;
      // print(this.offsetY);
    }
  }

  notPressed(px, py) {
    	print("mouse was released");
      this.dragging = false;
      

  }

}
