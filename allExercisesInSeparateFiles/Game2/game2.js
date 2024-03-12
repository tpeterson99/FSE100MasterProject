let waves; // Declare the variable to hold the image

function game2Preload(){
  waves = loadImage("Game2/waves.jpeg");
}

function game2Setup(){
  background('rgba(0,255,0, 0.25)');
  createCanvas(windowWidth, windowHeight);
  currentActivity = 2;
  
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
}

function game2Draw(){
  background('#ffffff');
  
  fill('black');
  text('Activity 2 goes here', 200, 200);

  // Set the size of the wave image
  let imageY = windowHeight - waves.height; 
  image(waves, 0, imageY);
}

function game2MousePressed(){
  
}
