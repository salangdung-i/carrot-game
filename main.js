'use strict';

const bg = new Audio('./sound/bg.mp3');

// start button click event 
// bg start
// 1. timer start
// 2. change img 'stop' 
// 3. bug, carrot spread into field
const gameBtn = document.querySelector('.state-btn');
gameBtn.addEventListener('click', () => {

  // bg.play();
  // timerStart();
  sprayItem();
});


// function bgStart() {

//   bg.pause();
// }


function sprayItem() {
  const field = document.querySelector('.field');
  const fieldRect = field.getBoundingClientRect();

  const carrotNum = 5;
  const bugNum = 20;
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - 80;
  const y2 = fieldRect.height - 80;

  for (let i = 0; i < carrotNum; i++) {
    const carrot = document.createElement('img');
    carrot.setAttribute('class', carrot);
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

