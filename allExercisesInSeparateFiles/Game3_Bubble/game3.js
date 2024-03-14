let bubbleMin = 20;
let bubbleCount = 0;

function game3Preload(){
  
}

function bubbleCreation(addbubbleCount) {
  stroke('black');
  const c = color(5, 45, 90);
  fill(c);
  for (int i = 0; i < addbubbleCount; i++) {
    circle(random(75, 325),random(75, 325), 10);
  }
}

function game3Setup(){
  background(220);
  currentActivity = 3;

  let initialBubbleCount = random(25, 50);
  
  stroke(0);
  line(50, 50, 50, 350);
  line(50, 350, 350, 350);
  line(350, 350, 350, 50);
  line(350, 50, 50, 50);
  
  // Hide the Activity 3 button, show home and pause button
  menuButton.show();
  game1Button.hide();
  game2Button.hide();
  game3Button.hide();
  game4Button.hide();
  pauseButton.show();
  
  bubbleCreation(initialBubbleCount);
  bubbleCount = initialBubbleCount;
  
}

function game3Draw(){
  
  let addBubble = random(25, 50);

  if (bubbleCount < bubbleMin) {
    bubbleCreation(addBubble);
    bubbleCount = addBubble + bubbleCount;
  }
}