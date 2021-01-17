const canvas = document.getElementById('view');
const context = canvas.getContext('2d');
const bird = new Image();
bird.src = 'bird_64.png';
const birdSize = 64;
let birdX = 0;
let birdY = 200;
let birdDY = 0;
const gravity = 0.5;
const interval = 24;
const canvasSize = 400;

document.getElementById('body').addEventListener('keydown', (e) => {
  birdDY = -7;
})

setInterval(() => {
  context.fillStyle = "skyblue";
  context.fillRect(0, 0, canvasSize, canvasSize);

  birdDY += gravity;
  birdY += birdDY;
  context.drawImage(bird, birdX, birdY, birdSize, birdSize);

  if(birdY > canvasSize) {
    // game end
  }
}, interval);


