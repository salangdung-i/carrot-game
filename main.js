'use strict';

const bg = new Audio('./sound/bg.mp3');
const alert = new Audio('./sound/alert.wav');
const bugPull = new Audio('./sound/bug_pull.mp3');
const carrotPull = new Audio('./sound/carrot_pull.mp3');
const gameWin = new Audio('./sound/game_win.mp3');

const popUp = document.querySelector('.pop-up');
const field = document.querySelector('.field');
const carrotNum = 5;
const bugNum = 20;

const gameBtn = document.querySelector('.state-btn');
let gameStatus = true;

// start button click event 
// bg start
// 1. timer start
// 2. change img 'stop' 
// 3. bug, carrot spread into field

gameBtn.addEventListener('click', () => {

  bg.play();
  timerClick();
  sprayItem();
  gameBtn.style.visibility = 'hidden';
});



let timeInterval = null;
let time = 10;

function timerClick() {
  clearInterval(timeInterval);
  timeInterval = setInterval(timer, 1000);
}

function timer() {
  time = time - 1;
  if (time < 1 || !gameStatus) {
    clearInterval(timeInterval);
    popUp.style.visibility = 'visible';
    bg.pause();
  }

  document.querySelector('.timer').innerHTML = `00:0${time}`;
}


function sprayItem() {
  const fieldRect = field.getBoundingClientRect();
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - 80;
  const y2 = fieldRect.height - 80;

  for (let i = 0; i < carrotNum; i++) {
    const carrot = document.createElement('img');
    carrot.setAttribute('class', 'carrot');
    carrot.setAttribute('src', 'img/carrot.png');
    carrot.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    carrot.style.left = `${x}px`;
    carrot.style.top = `${y}px`;
    field.appendChild(carrot);
  }


  for (let i = 0; i < bugNum; i++) {
    const bug = document.createElement('img');
    bug.setAttribute('class', 'bug');
    bug.setAttribute('src', 'img/bug.png');
    bug.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    bug.style.left = `${x}px`;
    bug.style.top = `${y}px`;
    field.appendChild(bug);
  }
};

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

const popUpText = document.querySelector('.pop-up-text');
// bug, carrot click event
// bug click >  bug_pull bg, game stop(timer) > visible pop-up(lose)
// carrot click > carrot_pull bg, count--, if(count == 0) game stop, bg stop, game_win bg , visible pop-up(win)
let catchCarrot = 0;
let count = 0;
const carrotCount = document.querySelector('.carrot-count');
field.addEventListener('click', (event) => {
  const target = event.target;
  console.log(event.target)
  if (target.matches('.carrot')) {
    target.remove();
    carrotPull.play();
    catchCarrot++;
    count = carrotNum - catchCarrot;
    carrotCount.innerHTML = `${count}`;
    if (count == 0) {
      popUpText.innerHTML = 'YOU WIN';
      gameStatus = false;
      gameWin.play();

    }

  } else if (target.matches('.bug')) {

    popUpText.innerHTML = 'YOU LOST';
    gameStatus = false;
    bugPull.play();
  }
});

const popUpBtn = document.querySelector('.pop-up-btn');
popUpBtn.addEventListener('click', () => {
  reset();
  popUp.style.visibility = 'hidden';
  gameBtn.style.visibility = 'visible';
});


function reset() {
  catchCarrot = 0;
  time = 10;
  document.querySelector('.timer').innerHTML = `00:${time}`;
  carrotCount.innerHTML = `${carrotNum}`;
  gameStatus = true;
  while (field.hasChildNodes()) { field.removeChild(field.firstChild); }

}