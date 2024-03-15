let treeImage;

let circlePosx = 900;
let circlePosy = 500;
let circleRadius = 100;
let stemPosx = 897;
let stemPosy = 426;
let stemHeight = 25;
let stemWidth = 7;
let leafPosx = 917;
let leafPosy = 444;
let leafWidth = 30;
let leafHeight = 20;

function game1Preload(){
  treeImage = loadImage("./Game1/apple-tree-1.jpg");
}

function game1Setup(){
  background('rgba(0,255,0, 0.25)');
  
  currentActivity = 1;

  treeImage.resize(windowWidth, windowHeight);

  fill('black');
  text('Activity 1 goes here', 200, 200);
 
  image(treeImage, 0, 0);
  
  fill("white");
  circle(circlePosx,circlePosy,circleRadius);
  rect(stemPosx, stemPosy, stemWidth, stemHeight);
  ellipse(leafPosx, leafPosy, leafWidth, leafHeight);
}

function game1Draw(){


  if (mouseIsPressed) {
    strokeWeight(10); // Set the thickness of the line
    stroke(255, 0, 0); // Set the color of the line
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}
