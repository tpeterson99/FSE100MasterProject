let treeImage;
let circlePosx = 900;
let circlePosy = 500;
let circleRadius = 100;
let stemPosx = 897;
let stemPosy = 415;
let stemHeight = 25;
let stemWidth = 7;
let leafPosx = 920;
let leafPosy = 435;
let leafWidth = 30;
let leafHeight = 20;
let filledArea = 0;
let halfCircleArea;
let canDraw = true;
let fallSpeed = 5;

function game1Preload(){
  treeImage = loadImage("./Game1/apple-tree-1.jpg");
}

function game1Setup(){
  createCanvas(windowWidth, windowHeight);
  background('rgba(0,255,0, 0.25)');
  
  currentActivity = 1;

  treeImage.resize(windowWidth, windowHeight);
  menuButton.show();
  game1Button.hide();
  //game2Button.hide();
  //game3Button.hide();
  //game4Button.hide();

  fill('black');
  text('Activity 1 goes here', 200, 200);
 
  image(treeImage, 0, 0);
  
  fill("white");
  stroke("red");
  strokeWeight(10);
  circle(circlePosx,circlePosy,circleRadius);
  stroke("brown");
  rect(stemPosx, stemPosy, stemWidth, stemHeight);
  stroke("green");
  strokeWeight(5);
  fill("green");
  ellipse(leafPosx, leafPosy, leafWidth, leafHeight); 

  circleArea = PI * (circleRadius) * (circleRadius); 
}

let prevX, prevY; // Variables to store previous mouse position

function game1Draw() {
  if (canDraw) {
    // Display instructions while the apple is still white
    stroke("black")
    fill("black");
    strokeWeight(1);
    textSize(25);
    text("Color in the apple!", (width/9), height-(height/18));
  }

  // Check if the mouse position is inside the circle
  let distanceToCircle = dist(mouseX, mouseY, circlePosx, circlePosy);
  if (distanceToCircle <= circleRadius/2) {
    // Draw only if the mouse is inside the circle
    if (canDraw && mouseIsPressed) {
      if (prevX !== undefined && prevY !== undefined) {
        // Calculate the distance traveled by the mouse
        let d = dist(mouseX, mouseY, prevX, prevY);
        // Add the area of the strip to the filled area
        filledArea += d * 6.4; // Multiplying by around 10 to approximate area based on stroke weight

        strokeWeight(7); // Set the thickness of the line
        stroke(255, 0, 0); // Set color to red
        line(mouseX, mouseY, prevX, prevY); // Draw line
      }
      prevX = mouseX; // Update previous X position
      prevY = mouseY; // Update previous Y position
    }
  } else {
    // Erase drawing if mouse is outside the circle
    prevX = undefined; // Reset previous X position
    prevY = undefined; // Reset previous Y position
  }

  // Check if filled area exceeds circle area
  if (filledArea >= circleArea) {
    // Clear the canvas
    clear();
    // Redraw the static elements
    background('rgba(0,255,0, 0.25)');
    image(treeImage, 0, 0);
    fill("white");
    stroke('#C31B1B'); // change to darker red
    strokeWeight(10);
    fill('#C31B1B'); // change to darker red
    circle(circlePosx,circlePosy,circleRadius);
    stroke("brown");
    rect(stemPosx, stemPosy, stemWidth, stemHeight);
    stroke("green");
    strokeWeight(5)
    fill("green");
    ellipse(leafPosx, leafPosy, leafWidth, leafHeight);
    filledArea = 0; // Reset filled area
    canDraw = false; // Disable drawing
  }

  if (!canDraw) {
    // apple drop
    if (circlePosy + circleRadius < windowHeight) {
      circlePosy += fallSpeed; // Move circle down
      stemPosy += fallSpeed;
      leafPosy += fallSpeed;
    }
    // Redraw the static elements
    background('rgba(0,255,0, 0.25)');
    image(treeImage, 0, 0);
    fill("white");
    stroke('#C31B1B');//change to darker red
    strokeWeight(10);
    fill('#C31B1B');//change to darker red
    circle(circlePosx, circlePosy, circleRadius);
    stroke("brown");
    rect(stemPosx, stemPosy, stemWidth, stemHeight);
    stroke("green");
    strokeWeight(5);
    fill("green");
    ellipse(leafPosx, leafPosy, leafWidth, leafHeight);
  }
  if (canDraw) {
    // Display instructions while the apple is still white
    stroke("black")
    fill("black");
    strokeWeight(1);
    textSize(25);
    text("Color in the apple!", (width/9), height-(height/18));
  }
  
}
