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

function game1Preload(){
  treeImage = loadImage("./Game1/apple-tree-1.jpg");
}

function game1Setup(){
  createCanvas(windowWidth, windowHeight);
  background('rgba(0,255,0, 0.25)');
  
  currentActivity = 1;

  treeImage.resize(windowWidth, windowHeight);

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
  strokeWeight(5)
  fill("green");
  ellipse(leafPosx, leafPosy, leafWidth, leafHeight);

  smallerCircleArea = PI * (circleRadius/(19/20)) * (circleRadius/(19/20));
}

function game1Draw(){
  if (canDraw && mouseIsPressed) {
    // Check if the mouse position is inside the circle
    let distanceToCircle = dist(mouseX, mouseY, circlePosx, circlePosy);
    if (distanceToCircle <= circleRadius/2-7) {
      // Calculate the distance traveled by the mouse
      let d = dist(mouseX, mouseY, pmouseX, pmouseY);
      // Add the area of the strip to the filled area
      filledArea += d * 10; // Multiplying by 10 to approximate area based on stroke weight

      // Check if filled area exceeds half circle area
      if (filledArea >= smallerCircleArea) {
        // Clear the canvas
        clear();
        // Redraw the static elements
        background('rgba(0,255,0, 0.25)');
        image(treeImage, 0, 0);
        fill("white");
        stroke("red");
        strokeWeight(10);
        fill("blue");//change to red
        circle(circlePosx,circlePosy,circleRadius);
        stroke("brown");
        rect(stemPosx, stemPosy, stemWidth, stemHeight);
        stroke("green");
        strokeWeight(5)
        fill("green");
        ellipse(leafPosx, leafPosy, leafWidth, leafHeight);
        filledArea = 0; // Reset filled area
        canDraw = false; // Disable drawing

      } else {
        strokeWeight(10); // Set the thickness of the line
        stroke(255, 0, 0); // Set color to red
        line(mouseX, mouseY, pmouseX, pmouseY); // Draw line
      }
    }
  }
}
