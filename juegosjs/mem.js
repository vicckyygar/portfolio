const emojis = ['🍎','🍌','🍒','🍇','🍋','🍑','🍍','🥝'];
let symbols = [];
let first = null, lock = false, moves = 0, matched = 0;

const tablero = document.getElementById('tablero');
const movesEl = document.getElementById('moves');
const btnReiniciar = document.getElementById('reiniciar');

function iniciarJuego() {
  // Reset game state
  tablero.innerHTML = '';
  first = null;
  lock = false;
  moves = 0;
  matched = 0;
  movesEl.textContent = 'Movimientos: 0';

  // Create shuffled symbol array
  symbols = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

  // Create cards
  symbols.forEach(sym => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.symbol = sym;

    const inner = document.createElement('div');
    inner.className = 'card-inner';

    const front = document.createElement('div');
    front.className = 'card-front';

    const back = document.createElement('div');
    back.className = 'card-back';
    back.textContent = sym;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    card.onclick = flip;
    tablero.appendChild(card);
  });
}

function flip() {
  if (lock || this.classList.contains('matched') || this === first) return;

  this.classList.add('flipped');

  if (!first) {
    first = this;
    return;
  }

  moves++;
  movesEl.textContent = `Movimientos: ${moves}`;

  if (this.dataset.symbol === first.dataset.symbol) {
    this.classList.add('matched');
    first.classList.add('matched');
    matched += 2;
    first = null;

    if (matched === symbols.length) {
      setTimeout(() => {
        alert(`¡Ganaste en ${moves} movimientos! 🎉`);
      }, 500);
    }
  } else {
    lock = true;
    setTimeout(() => {
      this.classList.remove('flipped');
      first.classList.remove('flipped');
      first = null;
      lock = false;
    }, 1000);
  }
}

btnReiniciar.onclick = iniciarJuego;

// Iniciar juego al cargar la página
window.onload = iniciarJuego;
