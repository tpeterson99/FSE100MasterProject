let bubbleMin = 30;
let bubbleCount = 0;
let popCount = 0;
let bubbleInstances = [];
let bubbleObj;
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
  
  menuButton.show();
  game1Button.hide();
  game2Button.hide();
  game3Button.hide();
  game4Button.hide();
  pauseButton.show();
  
  bubbleScore = createP("High Score: " + bubbleHighScore + " Current Score: " + popCount);
  bubbleScore.position(250, 20);
  bubbleScore.style('font-size', '32px');

  bubbleTimeLeft = 60;
  timerDisplay = createP("Time left: " + bubbleTimeLeft + "s");
  timerDisplay.position(windowWidth - 300, 20);
  timerDisplay.style('font-size', '32px');
  
  startTimer();
}

function game3Draw(){
  frameRate(30);
  background(75, 54, 209);
  if(!bubbleIsPaused && bubbleTimeLeft > 0) {
    let addBubble = random(1, 3);
 
    if (bubbleCount < bubbleMin) {
      bubbleCreation(addBubble);
      bubbleCount = addBubble + bubbleCount;
    }

    if (mouseIsPressed) {
      mouseClicked = true;
    } else if (mouseClicked) {
        mouseClicked = false;
        game3MouseClicked();
      }

    bubbleMovement();
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
        updateHighscore(popCount);
        bubbleScore.html("High Score: " + bubbleHighScore + " Current Score: " + popCount);    
    }
  }
}

function bubbleMovement() {
  for (let i = 0; i < bubbleInstances.length; i++) {
    let instance = bubbleInstances[i];
    instance.x = instance.x + random(-3, 3);
    instance.y = instance.y + random(-3, 3);
    if (instance.x <= 0) {
      instance.x = instance.x + 3;
    }
    if (instance.y <= 0) {
      instance.y = instance.y + 3;
    }
    if (instance.x >= windowWidth) {
      instance.x = instance.x - 3;
    }
    if (instance.y >= windowHeight) {
      instance.y = instance.y - 3;
    }
    image(instance.image, instance.x, instance.y);
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
