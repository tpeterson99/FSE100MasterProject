let waves; // Declare the variable to hold the image
let shark; // shark image declaration
let mouseCount = 0; // Variable tracking mouse presses
let lineDrawn = false; // Variable to track if the line is drawn
let landedOnLine = false; // true if ball collides with either end of line y coordinate
let y = 20; // for ball y coordinate
let r = 75; // ball radius
let x; // x coordinate of ball
let lineY; // saves last y coordinate of line drawn
let xVelocity = 2.5; // for rolling ball
let startX; // saves start x coordinate of line drawn
let startY; // saves start y coordinate of line drawn
let lAngle; // angle of line
let rolls = false; // true if |lAngle| > 5, signals for ball to start rolling
let sharkEats = false; // true if ball x coordinate == 1/4 or 3/4 of console width
let drawShark = false;
let sharkX = 0;
let sharkY = 0;
let imageY;
let win = false;


function game2Preload(){
  waves = loadImage("Game2/waves.jpeg");
  shark = loadImage("Game2/shark_game_shark.png")
}

function game2Setup(){
  createCanvas(windowWidth, windowHeight);
  currentActivity = 2;
  
  background('#ffffff');

  imageY = windowHeight - waves.height; 
  image(waves, 0, imageY);
  // image(shark, 0, imageY);

  // Hide the Activity 2,4,1 buttons, show all the other buttons
  fill(0);
  rect(menuButton, 30, 10);
  menuButton.show();
  game1Button.hide();
  game2Button.hide();
  game3Button.show();
  game4Button.hide();

  // Set the size of the waves image
  waves.resize(windowWidth, 0);
  frameRate(20);

  if(!lineDrawn){
    drawBall(y);
  }
}

function game2Draw(){
  // draw line if mouse is pressed
  if (mouseIsPressed) {
    ++mouseCount;

    // get starting line coordinate
    if(mouseCount == 2){
    startX = mouseX;
    startY = mouseY;
    }

    // draw line so user can see where they are drawing
    if(mouseCount > 2) {
     drawLine();
   }
  } // if the line is drawn drop the ball
  else if(lineDrawn){
    line(startX, startY, lineX, lineY);
    dropBall(y);
    checkBallOnLine(startY,y,r);

    if(drawShark){
      sharkY = windowHeight - shark.height;
      image(shark, sharkX, sharkY);
    }
  }

  // once ball lands on line, determines if line is straight
  if(landedOnLine){

    lineAngle(startX, startY, lineX, lineY);
    console.log(lAngle);


    // if the line isn't straight roll the ball
    if(rolls){
      ballRolls();
      if(lAngle < 0){ // checks if ball is at 1/4 of width of screen (moving in that direction)
        sharkEatBallLeft();
        console.log(sharkEats);
        console.log("rolls:", rolls);
      }
      else{
        sharkEatBallRight();
        console.log(sharkEats);
        console.log("rolls:", rolls);
      }
    } // display win message if the ball is on straight line
    else if(landedOnLine && win){  
      textSize(width*0.1);
      textAlign(CENTER, CENTER);
      stroke('green');
      fill('green');
  
     // Display text on the screen
      text("You win!", width/2, height/2);
      image(waves, 0, imageY);
    }
  }
  else if(!landedOnLine && sharkEats){
      ellipse(x, y, r*2, r*2);
      console.log("ball stop, shark eat");
      console.log("x and y coords,", x, " ", y);
      
      // move shark image to ball coordinates
      moveShark();

      textSize(width*0.1);
      textAlign(CENTER, CENTER);
      stroke('red');
      fill('red');
  
     // Display text on the screen
      text("You lose!", width/2, height/2);
      image(waves, 0, imageY);
  }
}

//function to move shark coordinates to ball coordinates
function moveShark(){

  sharkX = x;
  sharkY = y;
  drawShark = false;


  //this will slowly move shark but leaves a trail
  // let difX = Math.abs(sharkX - x);
  // let difY = Math.abs(sharkY - y);

  //   // move x coords
  // if(x > sharkX && difX > 5){
  //   sharkX++;
  // }
  // else if(difX > 5){
  //   sharkX--;
  // }

  // // move y coords
  // if(y > sharkY && difY > 5){
  //   sharkY++;
  // }
  // else if(difY > 5){
  //    sharkY--;
  // }

  // cover the ellipse
  fill('#ffffff');
  strokeWeight(10);
  stroke('#ffffff'); 
  ellipse(x, y, r*2, r*2);

  image(shark, sharkX - shark.width / 2, sharkY - shark.height / 2);

  // cover shark with waves
  image(waves, 0, imageY);

}
// function to get angle of line
function lineAngle(sX, sY, eX, eY){
  lAngle = Math.atan2(eY - sY, eX - sX) * 180 / Math.PI;
  if(Math.abs(lAngle) > 5){
    rolls = true;
  }
  else{
    win = true;
  }
}
// Function to check if the ball has landed on the line
// Checks the last known y value
function checkBallOnLine(x, y, r){
  // Calculate the distance between the ball's center and the line
  let distance = abs(y - lineY);
  let distance2 = abs(y - startY)
    
 // Check if the distance is less than or equal to the ball's radius
  if(distance <= r || distance2 <= r){
    lineDrawn = false; // to stop ball being drawn
    landedOnLine = true;
  }
}

// rolls the ball along the angle of the line 
function ballRolls(){
  fill('#ffffff'); // clear path where ball has already been
  strokeWeight(10);
  stroke('#ffffff'); 
  ellipse(x, y, r * 2 + 10, r * 2 + 10);
  nAngle = lAngle;

  // if the angle is negative subtract the values
  if(nAngle < 0){ 
    nAngle += 360;
    x -= xVelocity * cos(nAngle * Math.PI / 180);
    y -= xVelocity * sin(nAngle * Math.PI / 180);
  }
  else{
    x += xVelocity * cos(nAngle * Math.PI / 180);
    y += xVelocity * sin(nAngle * Math.PI / 180);
  }

  // draw ball
  strokeWeight(10);
  stroke('green'); // Set stroke color to green
  fill('green'); // Set fill color to green
  ellipse(x, y, r*2, r*2);
}


function drawBall(y){
    // draw ball  
    x = width / 2; // for ball
    strokeWeight(10);
    stroke('green'); // Set stroke color to green
    fill('green'); // Set fill color to green
    ellipse(x, y, r*2, r*2);
}

// drops ball
function dropBall(){
  fill('#ffffff'); // clear path where ball has already been
  strokeWeight(10);
  stroke('#ffffff'); // Set stroke color to green
  ellipse(width / 2, y, r * 2 + 10, r * 2 + 10);
  ++y;
  drawBall(y); // draw dropping ball
}

// draws red line on screen
function drawLine(){
  strokeWeight(10); // Set the thickness of the line
  stroke(255, 0, 0); // Set the color of the line
  line(mouseX, mouseY, pmouseX, pmouseY);
  //if(mouseX == width / 2){
   lineY = mouseY;
   lineX = mouseX;
 // }
  lineDrawn = true;
  drawShark = true;
}

// returns true if ball is at end of line or 1/4 of width of screen
function sharkEatBallLeft(){
  if(x <= startX - 100 || x <= width / 4){
    sharkEats = true;
    rolls = false;
    landedOnLine = false;
  }
}

// returns true if ball is at end of line or 3/4 of width of screen
function sharkEatBallRight(){
  if(x >= lineX + 100 || x >= width * 0.75){
    sharkEats = true;
    rolls = false;
    landedOnLine = false;
  }
}
