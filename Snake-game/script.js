const board = document.getElementById("game-board");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const gameOverEl = document.getElementById("game-over");
const finalScoreEl = document.getElementById("final-score");

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 1, dy = 0;
let score = 0;
let speed = 150; // initial speed
let interval;

let highScore = localStorage.getItem("snakeHighScore") || 0;
highScoreEl.textContent = highScore;

document.addEventListener("keydown", changeDirection);

function startGame() {
  interval = setInterval(gameLoop, speed);
}
startGame();

function gameLoop() {
  moveSnake();

  if (isCollision()) {
    endGame();
    return;
  }

  if (snake[0].x === food.x && snake[0].y === food.y) {
    score++;
    scoreEl.textContent = score;
    snake.push({ ...snake[snake.length - 1] });
    generateFood();
    increaseSpeed();
  }

  drawBoard();
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  snake.pop();
}

function changeDirection(e) {
  if (e.key === "ArrowUp" && dy !== 1) { dx = 0; dy = -1; }
  else if (e.key === "ArrowDown" && dy !== -1) { dx = 0; dy = 1; }
  else if (e.key === "ArrowLeft" && dx !== 1) { dx = -1; dy = 0; }
  else if (e.key === "ArrowRight" && dx !== -1) { dx = 1; dy = 0; }
}

function isCollision() {
  const head = snake[0];

  if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20)
    return true;

  return snake.slice(1).some(seg => seg.x === head.x && seg.y === head.y);
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20)
  };
}

function increaseSpeed() {
  clearInterval(interval);
  speed = Math.max(60, speed - 5);
  interval = setInterval(gameLoop, speed);
}

function drawBoard() {
  board.innerHTML = "";

  snake.forEach(seg => {
    const el = document.createElement("div");
    el.style.gridColumnStart = seg.x + 1;
    el.style.gridRowStart = seg.y + 1;
    el.classList.add("snake");
    board.appendChild(el);
  });

  const foodEl = document.createElement("div");
  foodEl.style.gridColumnStart = food.x + 1;
  foodEl.style.gridRowStart = food.y + 1;
  foodEl.classList.add("food");
  board.appendChild(foodEl);
}

function endGame() {
  clearInterval(interval);
  finalScoreEl.textContent = score;
  gameOverEl.classList.remove("hidden");

  if (score > highScore) {
    localStorage.setItem("snakeHighScore", score);
  }
}

function restartGame() {
  location.reload();
}
