'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const name0El = document.querySelector('#name--0');
const name1El = document.querySelector('#name--1');
const score0El = document.querySelector('#score--0');
const section0El = document.querySelector('#section--0');
const score1El = document.getElementById('score--1');
const section1El = document.getElementById('section--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const x = document.getElementById('myAudio');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  section0El.classList.add('img-hide');
  section1El.classList.add('img-hide');
  pauseAudio();
};
init();

function playAudio() {
  x.play();
}

function pauseAudio() {
  x.pause();
}

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    playAudio();

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
      pauseAudio();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    pauseAudio();
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 50) {
      console.log(activePlayer);
      if (activePlayer === 0) {
        name0El.textContent = 'PLAYER 1 WINS';
        score0El.style.color = 'white';
        score0El.style.fontSize = '70px';
        section0El.classList.remove('img-hide');
      }
      if (activePlayer === 1) {
        name1El.textContent = 'PLAYER 2 WINS';
        score1El.style.color = 'white';
        score1El.style.fontSize = '70px';
        section1El.classList.remove('img-hide');
      }
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
