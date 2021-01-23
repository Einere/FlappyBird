const canvas = document.getElementById('view');
const context = canvas.getContext('2d');
const gravity = 0.5;
const interval = 24;
const defaultY = 200;
const canvasSize = defaultY * 2;
const backgroundColor = 'skyblue';
const fontColor = 'black';
const fontFamily = 'sans-serif';
const fontSize = '16px';

class Bird {
  constructor(src) {
    this.image = new Image();
    this.image.src = src;
    this.birdSize = 64;
    this.birdX = 0;
    this.birdY = defaultY;
    this.birdDY = 0;
  }
}

const pipeColor = 'green';
let pipeX = defaultY * 2;
const pipeWidth = 24;
let topPipeBottomY = 24;
const pipeGap = 200;

let bestScore = 0;
let score = 0;

document.getElementById('body').addEventListener('keydown', (e) => {
  e.code === "Space" ? bird.birdDY = -7 : null;
});

const bird = new Bird('bird_64.png');

setInterval(() => {
  // draw background
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvasSize, canvasSize);

  // draw bird
  bird.birdDY += gravity;
  bird.birdY += bird.birdDY;
  context.drawImage(bird.image, bird.birdX, bird.birdY, bird.birdSize, bird.birdSize);

  // draw pipe
  context.fillStyle = pipeColor;
  pipeX -= 8;

  const birdTouchTopPipe = bird.birdY < topPipeBottomY;
  const birdTouchBottomPipe = bird.birdY > topPipeBottomY + pipeGap;
  const birdIsBetweenPipes = pipeX < bird.birdSize;
  const isBirdCollied = birdIsBetweenPipes && (birdTouchTopPipe || birdTouchBottomPipe);
  if (isBirdCollied  || pipeX < -pipeWidth) {
    pipeX = canvasSize;
    topPipeBottomY = pipeGap * Math.random();
  }
  // draw top pipe
  context.fillRect(pipeX, 0, pipeWidth, topPipeBottomY);
  // draw bottom pip
  context.fillRect(pipeX, topPipeBottomY + pipeGap, pipeWidth, canvasSize);

  // calculate score
  context.fillStyle = fontColor;
  score += 1;
  context.font = `${fontSize} ${fontFamily}`;
  context.fillText(`score : ${score}`, 12, 25);
  bestScore = bestScore < score ? score : bestScore;
  context.fillText(`best score : ${bestScore}`, 12, 41);

  // game end
  if (bird.birdY > canvasSize) {
    bird.birdDY = 0; // reset bird's acceleration
    bird.birdY = defaultY; // reset birdY
    pipeX = canvasSize; // reset pipe x
    score = 0;
  }
}, interval);


