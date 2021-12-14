'use strict';

const bg = new Audio('./sound/bg.mp3');
const alert = new Audio('./sound/alert.wav');
const bugPull = new Audio('./sound/bug_pull.mp3');
const carrotPull = new Audio('./sound/carrot_pull.mp3');
const gameWin = new Audio('./sound/game_win.mp3');

const field = document.querySelector('.field');

// start button click event 
// bg start
// 1. timer start
// 2. change img 'stop' 
// 3. bug, carrot spread into field
const gameBtn = document.querySelector('.state-btn');
gameBtn.addEventListener('click', () => {

  bg.play();
  timerClick();
  sprayItem();
});


function timerClick() {
  let time = 10;
  const timeInterval = setInterval(timer, 1000);

  function timer() {
    time = time - 1;
    if (time < 1) {
      clearInterval(timeInterval);
    }
    document.querySelector('.timer').innerHTML = `00:0${time}`
  }
}


function sprayItem() {
  const fieldRect = field.getBoundingClientRect();

  const carrotNum = 5;
  const bugNum = 20;
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

// bug, carrot click event
// bug click >  bug_pull bg, game stop(timer) > visible pop-up(lose)
// carrot click > carrot_pull bg, count--, if(count == 0) game stop, bg stop, game_win bg , visible pop-up(win)

field.addEventListener('click', (event) => {
  const target = event.target;
  if (target.matches('.carrot')) {
    target.remove();
  } else if (target.matches('.bug')) {

  }
});