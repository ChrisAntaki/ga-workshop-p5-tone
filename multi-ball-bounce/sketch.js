// p5-ball-bounce// tone-synth-keys

let synth;
let bgR, bgG, bgB;
let randomNote;
const balls = [];
const ballCount = 7;
let xSpeed = 2;
let ySpeed = 3;
let radius = 20;
let hasStarted = false;

const AMinorScale = ["A3", "B3", "C4", "D4", "E4", "F4", "G4"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // set up our synth
  synth = new Tone.Synth().toDestination();

  // set up our background RGB
  bgR = random(255);
  bgG = random(255);
  bgB = random(255);

  for (let i = 0; i < ballCount; i++) {
    const ball = {
      xPos: random(windowWidth),
      yPos: random(windowHeight),
      xSpeed: Math.random() * 2 + 1,
      ySpeed: Math.random() * 3 + 1,
    };
    balls.push(ball);
  }
}

function draw() {
  background(bgR, bgG, bgB);
  fill(255, 255, 255);

  for (const ball of balls) {
    ellipse(ball.xPos, ball.yPos, radius * 2, radius * 2);

    // update our ball location
    if (hasStarted) {
      ball.xPos += ball.xSpeed;
      ball.yPos += ball.ySpeed;
    }

    if (ball.xPos > width - radius || ball.xPos < radius) {
      console.log(111);
      handleCollision();
      ball.xSpeed *= -1;
    }
    if (ball.yPos > height - radius || ball.yPos < radius) {
      handleCollision();
      ball.ySpeed *= -1;
    }
  }
}

function handleCollision() {
  // choose random colors for bg
  bgR = random(255);
  bgG = random(255);
  bgB = random(255);

  // choose a random note from the scale
  randomNote = int(random(0, AMinorScale.length));
  // console.log(randomNote);

  // play the random note
  synth.triggerAttackRelease(AMinorScale[randomNote], "16n");
}

function mousePressed() {
  hasStarted = true;
  Tone.start();
}
