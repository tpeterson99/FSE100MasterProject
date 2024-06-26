let waves; // Declare the variable to hold the image
let shark; // shark image declaration
let mouseCount = 0; // Variable tracking mouse presses
let lineDrawn = false; // Variable to track if the line is drawn
let landedOnLine = false; // true if ball collides with either end of line y coordinate
let bally2y = 20; // for ball y coordinate
let ball2r = 75; // ball radius
let ball2x; // x coordinate of ball
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
let canDraw2 = true;
let wHeight; // stores original height of waves

function game2Preload(){
  waves = loadImage("./Game2_Catch/waves.jpeg");
  shark = loadImage("./Game2_Catch/shark_game_shark.png")
}

function game2Setup(){
  createCanvas(windowWidth, windowHeight);
  currentActivity = 2;
  
  background('#ffffff');
  wHeight = waves.height;

  imageY = windowHeight - wHeight; 
  image(waves, 0, imageY);

  // Hide the Activity 2,4,1 buttons, show all the other buttons
  fill(0);
  rect(menuButton, 30, 10);
  menuButton.show();
  game1Button.hide();
  game2Button.hide();
  game3Button.hide();
  game4Button.hide();
  // playAgainButton = createButton('Play Again');
  // playAgainButton.position(10,0);
  // playAgainButton.mousPressed(reloadPage2);
  // playAgainButton.show();

  // Set the size of the waves image
  //waves.resize(windowWidth, 0);
  frameRate(20);

  // reset values to start so game resets
  reloadPage2();

  if(!lineDrawn){
    drawBall(ball2y);
  }
}

function game2Draw(){
  // draw line if mouse is pressed
  if (mouseIsPressed && canDraw2) {
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
    dropBall(ball2y);
    checkBallOnLine(startY,ball2y,ball2r);

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
      // g2PlayAgainButton.show();
    }
  }
  else if(!landedOnLine && sharkEats){
      ellipse(ball2x, ball2y, ball2r*2, ball2r*2);
      console.log("ball stop, shark eat");
      console.log("x and y coords,", ball2x, " ", ball2y);
      
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

  sharkX = ball2x;
  sharkY = ball2y;
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
  ellipse(ball2x, ball2y, ball2r*2, ball2r*2);

  image(shark, sharkX - shark.width / 2, sharkY - shark.height / 2);

  // cover shark with waves
  image(waves, 0, imageY);

}
// function to get angle of line
function lineAngle(sX, sY, eX, eY){
  lAngle = Math.atan2(eY - sY, eX - sX) * 180 / Math.PI;
  if(Math.abs(lAngle) > 2){
    rolls = true;
  }
  else{
    win = true;
  }
}
// Function to check if the ball has landed on the line
// Checks the last known y value
function checkBallOnLine(x, ball2y, r){
  // Calculate the distance between the ball's center and the line
  let distance = abs(ball2y - lineY);
  let distance2 = abs(ball2y - startY);
  
  // check if line is outside of ball's range
  if(lineX < width/2+20){
    if(startX < width/2+20){
      console.log("ball timsey is", ball2x)
      if(distance <= ball2r || distance2 <= ball2r){
        lineDrawn = false;
        moveShark();

        textSize(width*0.1);
        textAlign(CENTER, CENTER);
        stroke('red');
        fill('red');
  
     // Display text on the screen
        text("You lose!", width/2, height/2);
        image(waves, 0, imageY);
      }
      return;
    }
  }
  else if(lineX > width/2+20){
    if(startX > width/2+20){
      console.log("ball timsey is", ball2x)
      console.log("start x is", startX)
      console.log("line x is", lineX)
      if(distance <= ball2r || distance2 <= ball2r){
        lineDrawn = false;
        moveShark();

        textSize(width*0.1);
        textAlign(CENTER, CENTER);
        stroke('red');
        fill('red');
  
     // Display text on the screen
        text("You lose!", width/2, height/2);
        image(waves, 0, imageY);
      }
      return;
    }
  }

 // Check if the distance is less than or equal to the ball's radius
  if(distance <= ball2r || distance2 <= r){
    lineDrawn = false; // to stop ball being drawn
    landedOnLine = true;
  }
}

// rolls the ball along the angle of the line 
function ballRolls(){
  fill('#ffffff'); // clear path where ball has already been
  strokeWeight(10);
  stroke('#ffffff'); 
  ellipse(ball2x, ball2y, ball2r * 2 + 10, ball2r * 2 + 10);
  nAngle = lAngle;

  // if the angle is negative subtract the values
  if(nAngle < 0){ 
    nAngle += 360;
    ball2x -= xVelocity * cos(nAngle * Math.PI / 180);
    ball2y -= xVelocity * sin(nAngle * Math.PI / 180);
  }
  else{
    ball2x += xVelocity * cos(nAngle * Math.PI / 180);
    ball2y += xVelocity * sin(nAngle * Math.PI / 180);
  }

  // draw ball
  strokeWeight(10);
  stroke('green'); // Set stroke color to green
  fill('green'); // Set fill color to green
  ellipse(ball2x, ball2y, ball2r*2, ball2r*2);
}


function drawBall(y){
    // draw ball  
    ball2x = width / 2; // for ball
    strokeWeight(10);
    stroke('green'); // Set stroke color to green
    fill('green'); // Set fill color to green
    ellipse(ball2x, ball2y, ball2r*2, ball2r*2);
}

// drops ball
function dropBall(){
  fill('#ffffff'); // clear path where ball has already been
  strokeWeight(10);
  stroke('#ffffff'); // Set stroke color to green
  ellipse(width / 2, ball2y, ball2r * 2 + 10, ball2r * 2 + 10);
  ++ball2y;
  drawBall(ball2y); // draw dropping ball
  canDraw2 = false;
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
  if(ball2x <= startX - 100 || ball2x <= width / 4){
    sharkEats = true;
    rolls = false;
    landedOnLine = false;
  }
}

// returns true if ball is at end of line or 3/4 of width of screen
function sharkEatBallRight(){
  if(ball2x >= lineX + 100 || ball2x >= width * 0.75){
    sharkEats = true;
    rolls = false;
    landedOnLine = false;
  }
}

function reloadPage2() {
  mouseCount = 0; // Variable tracking mouse presses
  lineDrawn = false; // Variable to track if the line is drawn
  landedOnLine = false; // true if ball collides with either end of line y coordinate
  ball2y = 20; // for ball y coordinate
  ball2r = 75; // ball radius
  ball2x; // x coordinate of ball
  lineY; // saves last y coordinate of line drawn
  xVelocity = 2.5; // for rolling ball
  startX; // saves start x coordinate of line drawn
  startY; // saves start y coordinate of line drawn
  lAngle; // angle of line
  rolls = false; // true if |lAngle| > 5, signals for ball to start rolling
  sharkEats = false; // true if ball x coordinate == 1/4 or 3/4 of console width
  drawShark = false;
  sharkX = 0;
  sharkY = 0;
  // imageY;
  win = false;
  canDraw2 = true;
  wHeight = wHeight;

//   background('#ffffff');

//   imageY = windowHeight - waves.height; 
//   image(waves, 0, imageY);
}
