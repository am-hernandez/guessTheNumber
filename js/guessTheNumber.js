// target elements
const prevGuesses = document.getElementById("prevGuesses");
const closenessMessage = document.getElementById("closenessMessage");
const userGuess = document.getElementById("userGuess");
const btnGuess = document.getElementById("btnGuess");
const btnPlay = document.getElementById("btnPlay");
const btnHint = document.getElementById("btnHint");

let game;
btnGuess.disabled = true;

function generateWinningNumber() {
  // generate a random number from 0-100
  return Math.floor(Math.random() * 100) + 1;
}

function shuffle(array) {
  let m = array.length;
  let t;
  let i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function newGame() {
  return new Game();
}

function addToPrevGuesses() {
  for (let i = 0; i < game.pastGuesses.length; i++) {
    if (prevGuesses.children[i].innerText === "") {
      prevGuesses.children[i].innerText += game.pastGuesses[i];
    }
  }
}

function clearPrevGuesses() {
  for (const guess of prevGuesses.children) {
    guess.innerText = "";
  }
}

function makeHint(hintArray) {
  hintArray.forEach((hint) => {
    let li = document.createElement("li");
    hintMessage.appendChild(li).innerHTML = `${hint}`;
  });
}

class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }
  difference() {
    return Math.abs(this.winningNumber - this.playersGuess);
  }
  isLower() {
    return this.playersGuess < this.winningNumber ? true : false;
  }
  checkGuess() {
    if (this.playersGuess === this.winningNumber) {
      return "You Win!";
    } else if (this.pastGuesses.includes(this.playersGuess)) {
      return "You have already guessed that number.";
    } else {
      this.pastGuesses.push(this.playersGuess);
    }
    if (this.pastGuesses.length === 5) {
      return "You Lose.";
    }
    if (this.difference() < 10) {
      return "You're burning up!";
    } else if (this.difference() < 25) {
      return "You're lukewarm.";
    } else if (this.difference() < 50) {
      return "You're a bit chilly.";
    } else if (this.difference() < 100) {
      return "You're ice cold!";
    }
  }
  provideHint() {
    let hint = [this.winningNumber];
    while (hint.length < 10) {
      let hintElement = generateWinningNumber();
      if (hint.includes(hintElement) === false) {
        hint.push(hintElement);
      }
    }
    return shuffle(hint);
  }

  playersGuessSubmission(num) {
    this.playersGuess = num;
    if (num < 1 || num > 100 || typeof num !== "number") {
      throw "That is an invalid guess.";
    }
    return this.checkGuess();
  }
}

btnPlay.addEventListener("click", function () {
  if (game) {
    clearPrevGuesses();
  }
  game = newGame();
  btnGuess.disabled = false;
});

btnGuess.addEventListener("click", function () {
  closenessMessage.innerText = game.playersGuessSubmission(
    parseInt(userGuess.value)
  );
  addToPrevGuesses();
  userGuess.value = "";
});

btnHint.addEventListener("click", function () {
  const hintArray = game.provideHint();
  makeHint(hintArray);
});
