const board = document.getElementById('board');
const levelSelect = document.getElementById('level');
let gridSize = 4;
let tiles = [];

function init() {
  const total = gridSize * gridSize;
  tiles = [...Array(total - 1).keys()].map(n => n + 1).concat(['']);
  board.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
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
  const vecinos = [
    idx - gridSize,
    idx + gridSize,
    idx - 1,
    idx + 1
  ];
  const mismaFila = Math.floor(empty / gridSize) === Math.floor(idx / gridSize);
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
  for (let i = 0; i < tiles.length - 1; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      if (tiles[i] && tiles[j] && tiles[i] > tiles[j]) inv++;
    }
  }
  const filaVacia = Math.floor(tiles.indexOf('') / gridSize);
  return (gridSize % 2 === 1) ? inv % 2 === 0 : (filaVacia % 2 === 0 ? inv % 2 === 1 : inv % 2 === 0);
}

function checkWin() {
  for (let i = 0; i < tiles.length - 1; i++) {
    if (tiles[i] !== i + 1) return;
  }
  alert('¡Felicidades! Completaste el rompecabezas');
}

function changeLevel() {
  gridSize = parseInt(levelSelect.value);
  init();
}

init();
