const choices = document.querySelectorAll(".choice");
const message = document.getElementById("message");
const humanScoreEl = document.getElementById("mscore");
const computerScoreEl = document.getElementById("cscore");
const celebrationEl = document.getElementById("celebration");
const humanChoiceImgEl = document.getElementById("human-choice-img");
const computerChoiceImgEl = document.getElementById("computer-choice-img");
const rulesBtn = document.getElementById("rules-btn");
const rulesPopup = document.getElementById("rules-popup");
const closePopup = document.getElementById("close-popup");
const choicesContainer = document.getElementById("choices-container");
const gameResult = document.getElementById("game-result");
const playAgainBtn = document.getElementById("play-again");
const nextBtn = document.getElementById("next-btn");
const headerContainer = document.getElementById("header-container");
const humanChoiceBox = document.getElementById("human-choice");
const computerChoiceBox = document.getElementById("computer-choice");

let humanScore = parseInt(localStorage.getItem("humanScore")) || 0;
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

humanScoreEl.textContent = humanScore;
computerScoreEl.textContent = computerScore;

const choiceImages = {
  rock: "./assets/hand.png",
  paper: "./assets/fist.png",
  scissors: "./assets/scissor.png",
};

const choiceBorders = {
  rock: "#FFD700",
  paper: "blue",
  scissors: "blueviolet",
};

const getComputerChoice = () => {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * 3)];
};

const determineWinner = (human, computer) => {
  if (human === computer) return "tie";
  if (
    (human === "rock" && computer === "scissors") ||
    (human === "scissors" && computer === "paper") ||
    (human === "paper" && computer === "rock")
  ) {
    return "human";
  }
  return "computer";
};

const resetChoices = () => {
  choicesContainer.classList.remove("hidden");
  gameResult.classList.add("hidden");
  nextBtn.classList.add("hidden");
  playAgainBtn.classList.add("hidden");
  humanChoiceImgEl.src = "";
  computerChoiceImgEl.src = "";
  humanChoiceBox.style.border = "2px solid black";
  computerChoiceBox.style.border = "2px solid black";
  humanChoiceBox.classList.remove("wave-effect");
  computerChoiceBox.classList.remove("wave-effect");
  celebrationEl.style.display = "none";
};

const checkNextButton = () => {
  if (humanScore - computerScore >= 1) {
    nextBtn.classList.remove("hidden");
  } else {
    nextBtn.classList.add("hidden");
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const humanChoice = choice.getAttribute("data-choice");
    const computerChoice = getComputerChoice();

    humanChoiceImgEl.src = choiceImages[humanChoice];
    computerChoiceImgEl.src = choiceImages[computerChoice];

    humanChoiceBox.style.border = `14px solid ${choiceBorders[humanChoice]}`;
    computerChoiceBox.style.border = `14px solid ${choiceBorders[computerChoice]}`;

    humanChoiceImgEl.alt = `Your choice: ${humanChoice}`;
    computerChoiceImgEl.alt = `Computer's choice: ${computerChoice}`;

    choicesContainer.classList.add("hidden");
    gameResult.classList.remove("hidden");
    playAgainBtn.classList.remove("hidden");

    humanChoiceBox.classList.remove("wave-effect");
    computerChoiceBox.classList.remove("wave-effect");

    const winner = determineWinner(humanChoice, computerChoice);

    if (winner === "human") {
      humanScore++;
      localStorage.setItem("humanScore", humanScore);
      humanScoreEl.textContent = humanScore;
      message.innerHTML = `YOU WIN <br /> AGAINST PC`;
      humanChoiceBox.classList.add("wave-effect");
    } else if (winner === "computer") {
      computerScore++;
      localStorage.setItem("computerScore", computerScore);
      computerScoreEl.textContent = computerScore;
      message.innerHTML = `YOU LOST <br /> AGAINST PC`;
      computerChoiceBox.classList.add("wave-effect");
    } else {
      message.textContent = `TIE UP`;
    }

    checkNextButton();
  });
});

playAgainBtn.addEventListener("click", resetChoices);

rulesBtn.addEventListener("click", () => {
  rulesPopup.style.display = "block";
});

closePopup.addEventListener("click", () => {
  rulesPopup.style.display = "none";
});

nextBtn.addEventListener("click", () => {
  celebrationEl.style.display = "block";
  headerContainer.classList.add("hidden");
  gameResult.classList.add("hidden");
  playAgainBtn.classList.remove("hidden");
  nextBtn.classList.add("hidden");
});
