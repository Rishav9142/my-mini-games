const grid = document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restart");

const icons = ["🍎","🍌","🍇","🍒","🍋","🍉","🥝","🍓"];
let cardValues = [...icons, ...icons]; // duplicate for pairs
let firstCard = null;
let lockBoard = false;
let moves = 0;

// Shuffle array
function shuffle(array) {
  array.sort(() => 0.5 - Math.random());
}

// Create board
function createBoard() {
  shuffle(cardValues);
  grid.innerHTML = "";
  cardValues.forEach((icon) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.icon = icon;
    card.textContent = "❓";
    card.addEventListener("click", flipCard);
    grid.appendChild(card);
  });
}

// Flip logic
function flipCard() {
  if (lockBoard || this.classList.contains("flipped")) return;

  this.classList.add("flipped");
  this.textContent = this.dataset.icon;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  moves++;
  scoreDisplay.textContent = `Moves: ${moves}`;

  if (firstCard.dataset.icon === this.dataset.icon) {
    firstCard = null;
  } else {
    lockBoard = true;
    setTimeout(() => {
      this.classList.remove("flipped");
      firstCard.classList.remove("flipped");
      this.textContent = "❓";
      firstCard.textContent = "❓";
      firstCard = null;
      lockBoard = false;
    }, 700);
  }

  // Check win
  const flipped = document.querySelectorAll(".flipped");
  if (flipped.length === cardValues.length) {
    setTimeout(() => {
      alert(`You won in ${moves} moves! 🎉`);
    }, 300);
  }
}

// Restart
restartBtn.addEventListener("click", () => {
  firstCard = null;
  lockBoard = false;
  moves = 0;
  scoreDisplay.textContent = "Moves: 0";
  createBoard();
});

// Init
createBoard();
