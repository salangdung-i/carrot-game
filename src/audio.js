const bg = new Audio('./sound/bg.mp3');
const alert = new Audio('./sound/alert.wav');
const bugPull = new Audio('./sound/bug_pull.mp3');
const carrotPull = new Audio('./sound/carrot_pull.mp3');
const gameWin = new Audio('./sound/game_win.mp3');

export function playBg() {
  playSound(bg);
}

export function stopBg() {
  stopSound(bg);
}
export function playAlert() {
  playSound(alert);
}

export function playBugPull() {
  playSound(bugPull);
}

export function playCarrotPull() {
  playSound(carrotPull);
}

export function playGameWin() {
  playSound(gameWin);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

