'use strict';

import PopUp from './popup.js';

const bg = new Audio('./sound/bg.mp3');
const alert = new Audio('./sound/alert.wav');
const bugPull = new Audio('./sound/bug_pull.mp3');
const carrotPull = new Audio('./sound/carrot_pull.mp3');
const gameWin = new Audio('./sound/game_win.mp3');

const gameBtn = document.querySelector('.game--start-btn');
const gameCount = document.querySelector('.game--count');
const gameTimer = document.querySelector('.game--timer');


const gameBanner = new PopUp();
gameBanner.setClickListener(() => {
  // startGame();
  gameBtn.style.visibility = 'visible';
  while (field.hasChildNodes()) { field.removeChild(field.firstChild) }
});

let gameStatus = true;
let catchCarrot = 0;
let count = 0;
const CARROT_SIZE = 80;
let timeInterval = null;
let time = 10;

const field = document.querySelector('.field');
const fieldRect = field.getBoundingClientRect();

let CARROT_COUNT = 0;
let BUG_COUNT = 0;

let GAME_STATE = 1;

function gameInit() {
  gameStatus = true;
  time = 10;
  catchCarrot = 0;

  gameTimer.innerHTML = `00:${time}`;
}


function gameStart() {
  bg.play();
  timerClick();
  if (GAME_STATE == 1) {
    CARROT_COUNT = 3;
    BUG_COUNT = 5;
  } else if (GAME_STATE == 2) {
    CARROT_COUNT = 5;
    BUG_COUNT = 10;
  } else if (GAME_STATE == 3) {
    CARROT_COUNT = 10;
    BUG_COUNT = 20;
  }
  gameCount.innerHTML = `${CARROT_COUNT}`;

  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');
  gameBtn.style.visibility = 'hidden';
}

function gameStop(state) {
  let text;
  gameStatus = false;
  bg.pause();
  stopGameTimer();

  if (state) {
    ++GAME_STATE;

    gameWin.play();
    if (GAME_STATE > 3) {
      text = `NO NEXT STAGE❗️ 
      YOU'RE THE BEST 🏆`;
    } else {
      text = `YOU WIN 🎉 
      DO YOU WANT NEXT ${GAME_STATE} STAGE❓`;
    }
  } else {
    text = `YOU LOST 🥲 
    TRY AGAIN ${GAME_STATE} STAGE❓`;
  }

  gameBanner.showWithText(text);

}

gameBtn.addEventListener('click', () => {
  gameInit();
  if (gameStatus) {
    gameStart();
  } else {
    gameStop();
  }
});

field.addEventListener('click', (event) => {
  const target = event.target;
  if (target.matches('.carrot')) {
    target.remove();
    carrotPull.play();
    catchCarrot++;
    count = CARROT_COUNT - catchCarrot;
    gameCount.innerHTML = `${count}`;
    if (count == 0) {
      gameStop(true);
    }
  } else if (target.matches('.bug')) {
    bugPull.play();
    gameStop(false);
  }
});

// popUpBtn.addEventListener('click', () => {
//   popUp.style.visibility = 'hidden';
//   gameBtn.style.visibility = 'visible';
//   while (field.hasChildNodes()) { field.removeChild(field.firstChild); }

// });


function timerClick() {
  updateTimerText(time);
  clearInterval(timeInterval);
  timeInterval = setInterval(timer, 1000);
}

function stopGameTimer() {
  clearInterval(timeInterval);
}

function timer() {
  updateTimerText(--time);
  if (time < 1 || !gameStatus) {
    clearInterval(timeInterval);
    gameStop();
  }

}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60) > 9 ? Math.floor(time / 60) : '0' + Math.floor(time / 60);
  const seconds = time % 60 > 9 ? time : '0' + time;
  gameTimer.innerText = `${minutes}:${seconds}`;
}


function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}





