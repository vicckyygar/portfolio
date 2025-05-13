const board = document.getElementById('board');
let tiles = [];

function init() {
  tiles = [...Array(15).keys()].map(n => n + 1).concat(['']);
  render();
  shuffle();
}

function render() {
  board.innerHTML = '';
  tiles.forEach((num, i) => {
    const div = document.createElement('div');
    div.className = 'tile' + (num === '' ? ' empty' : '');
    div.textContent = num;
    div.onclick = () => move(i);
    board.appendChild(div);
  });
}

function move(idx) {
  const empty = tiles.indexOf('');
  const vecinos = [idx - 4, idx + 4, idx - 1, idx + 1];
  const mismaFila = Math.floor(empty / 4) === Math.floor(idx / 4);
  if (vecinos.includes(empty) && (Math.abs(empty - idx) !== 1 || mismaFila)) {
    [tiles[idx], tiles[empty]] = [tiles[empty], tiles[idx]];
    render();
    checkWin();
  }
}

function shuffle() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  if (!solvable()) return shuffle();
  render();
}

function solvable() {
  let inv = 0;
  for (let i = 0; i < 15; i++) {
    for (let j = i + 1; j < 15; j++) {
      if (tiles[i] && tiles[j] && tiles[i] > tiles[j]) inv++;
    }
  }
  const filaVacia = Math.floor(tiles.indexOf('') / 4);
  return (filaVacia % 2 === 0) ? inv % 2 === 1 : inv % 2 === 0;
}

function checkWin() {
  for (let i = 0; i < 15; i++) {
    if (tiles[i] !== i + 1) return;
  }
  alert('¡Felicidades! Completaste el rompecabezas');
}

init();