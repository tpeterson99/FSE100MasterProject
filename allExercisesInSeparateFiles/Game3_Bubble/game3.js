let bubbleMin = 20;
let bubbleCount = 0;
let popCount = 0;

function game3Preload(){
  
}

function bubbleCreation(addbubbleCount) {
  stroke('black');
  const c = color(5, 45, 90);
  fill(c);
  for (let i = 0; i < addbubbleCount; i++) {
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
  
}

function game3Draw(){
  
  let addBubble = random(25, 50);
  console.log(typeof popCount);

  if (bubbleCount < bubbleMin) {
    translate(width / 2, height / 2);
    translate(p5.Vector.fromAngle(millis() / 1000, 40));
    bubbleCreation(addBubble);
    bubbleCount = addBubble + bubbleCount;
  }
}

function game3MouseClicked(){

  if (c === 0) {
    c = 255;
    popCount++;
  }
}