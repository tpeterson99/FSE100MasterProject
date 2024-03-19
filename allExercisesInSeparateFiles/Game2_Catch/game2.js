let waves; // Declare the variable to hold the image
let mouseCount = 0; // Variable tracking mouse presses
let lineDrawn = false; // Variable to track if the line is drawn
let landedOnLine = false;
let y = 20; // for ball
let r = 75; // ball radius
let lineY;

function game2Preload(){
  waves = loadImage("Game2/waves.jpeg");
}

function game2Setup(){
  createCanvas(windowWidth, windowHeight);
  currentActivity = 2;
  
  background('#ffffff');

  let imageY = windowHeight - waves.height; 
  image(waves, 0, imageY);
  // Hide the Activity 2 button, show all the other buttons
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
    if(mouseCount > 2) {
     drawLine();
   }
  }
  else if(lineDrawn){
    dropBall(y);
  }

  if(landedOnLine){
    lineDrawn = true;
  }

  // Display mouseCount
  fill(255); // Set text color to white
  textSize(20); // Set text size
  textAlign(CENTER, CENTER); // Align text to center
  text(mouseCount, width / 5, 100); // Display mouseCount
}

function drawBall(y){
    // draw ball  
    let x = width / 2; // for ball
    strokeWeight(10);
    stroke('green'); // Set stroke color to green
    fill('green'); // Set fill color to green
    ellipse(x, y, r*2, r*2);
}

function landedLine(){
  if(y == lineY){
    landedOnLine = true;
  }
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
  lineY = mouseY;
  lineDrawn = true;
}


