let bubbleMin = 1000;
let bubbleCount = 0;
let popCount = 0;
let bubbleInstances = [];
let bubbleObj;
let bubbleScore;
let bubbleTimer;
let bubbleTimeLeft = 60;
let bubbleIsPaused = false;

function game3Preload(){
  bubbleObj = loadImage("./Game3_Bubble/fullbubble.png");
}

function bubbleCreation(addbubbleCount) {
  bubbleObj.loadPixels();
  for (let i = 0; i < addbubbleCount; i++) {
    let x = random(100, windowWidth - 100);
    let y = random(100, windowHeight - 200);
    bubbleObj.resize(100, 100);
    bubbleInstances.push({ image: bubbleObj, x: x, y: y});
    image(bubbleObj, x, y);
  }
}

function game3Setup(){
  background(75, 54, 209);
  currentActivity = 3;
  popCount = 0;
  
  stroke(0);
  
  // Hide the Activity 3 button, show home and pause button
  menuButton.show();
  game1Button.hide();
  game2Button.hide();
  game3Button.hide();
  game4Button.hide();
  pauseButton.show();
  
  bubbleScore = createP("High Score: " + bubbleHighScore + " Current Score: " + popCount);
  bubbleScore.position(250, 20);
  bubbleScore.style('font-size', '32px');

  timerDisplay = createP("Time left: " + bubbleTimeLeft + "s");
  timerDisplay.position(windowWidth - 300, 20);
  timerDisplay.style('font-size', '32px');
  
  startTimer();
}

function game3Draw(){
  if(!bubbleIsPaused && bubbleTimeLeft > 0) {
    let addBubble = random(10, 20);
 
    if (bubbleCount < bubbleMin) {
      bubbleCreation(addBubble);
      bubbleCount = addBubble + bubbleCount;
    }

    if (mouseIsPressed) {
      game3MouseClicked();
    }
  } 
}

function game3MouseClicked(){
  for (let i = 0; i < bubbleInstances.length; i++) {
    let instance = bubbleInstances[i];
    if (mouseX >= instance.x && mouseX <= instance.x + instance.image.width && mouseY >= instance.y && mouseY <= instance.y + instance.image.height) {
        bubbleInstances.splice(i, 1);
        redrawBubbles();
        bubbleCount--;
        popCount++;
        bubbleScore.html("High Score: " + bubbleHighScore + " Current Score: " + popCount);
        updateHighscore(popCount);
        break;
    }
  }
}

function redrawBubbles() {
  background(75, 54, 209);
  for (let i = 0; i < bubbleInstances.length; i++) {
    let instance = bubbleInstances[i];
    image(instance.image, instance.x, instance.y);
  }
}

function updateHighscore(score) {
  if (score > bubbleHighScore) {
    bubbleHighScore = score;
  }
}

function startTimer() {
  bubbleTimer = setInterval(() => {
    bubbleTimeLeft--;
    if (bubbleTimeLeft <= 0) {
      clearInterval(bubbleTimer);
      timerDisplay.html("Game Over");
    } else {
      timerDisplay.html("Time left: " + bubbleTimeLeft + "s");
    }
  }, 1000); // Update timer every second (1000 milliseconds)
}
