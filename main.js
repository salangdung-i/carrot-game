let status = false;
let index = 10;
const button = document.querySelector('.header__button');
const headerCount = document.querySelector('.header__count');

button.addEventListener('click', (event) => {
  event.preventDefault(); //페이지 로드되는것 방지

  itemPosition();
  let value = event.target.dataset.value;
  if (value == 'play') {
    event.target.src = '/img/stop-solid.png';
    event.target.dataset.value = 'stop';
    counter = setInterval(timer, 1000);
  } else {
    event.target.src = '/img/play-solid.png';
    event.target.dataset.value = 'play';
    clearInterval(counter);

  }
});

let count = 10;
let counter;
// = setInterval(timer, 1000);
function timer() {

  if (count < 0) {
    clearInterval(counter);
    document.querySelector('.header__timer').innerHtml = '0:0';
    alert('lose');
    return;
  }
  document.querySelector('.header__timer').innerHTML = `0:${count}`;
  count--;
}




// 이미지 클릭했을때 
// 당근 클릭 당근이미지삭제 -> count --
// count == 0 win, timer 멈춤
// 벌레 클릭 , timer 멈춤, lose 

// 벌레, 당근 무작위로 위치 
const bugs = document.querySelectorAll('.bug[data-key=bug]');
const carrots = document.querySelectorAll('.carrot[data-key=carrot]');

const bug = document.querySelectorAll('.bug');
const carrot = document.querySelectorAll('.carrot');
function itemPosition() {

  for (let i = 0; i < bugs.length; i++) {
    bug[i].style.visibility = `visible`;
    carrot[i].style.visibility = `visible`;

    carrots[i].style.transform = `translate(${(Math.random() * 80)}px, ${(Math.random() * 100)}px)`;
    bugs[i].style.transform = `translate(${(Math.random() * 300)}px, ${(Math.random() * 150)}px)`;
  }
}

document.addEventListener('click', (event) => {
  event.preventDefault(); //페이지 로드되는것 방지

  let key = event.target.dataset.key;
  let value = event.target.dataset.value;
  if (key == 'bug') {
    alert('lose');
    clearInterval(counter);
  } else if (key == 'carrot') {
    const toBeDelete = document.querySelector(`.carrot[data-value="${value}"]`);
    toBeDelete.remove();
    index--;
    headerCount.innerHTML = index;
    if (index == 0) {
      alert('win');;
      clearInterval(counter);
    }
  }

});
