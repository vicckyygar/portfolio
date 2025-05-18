 const cartas = ['🍒', '🍋', '🍉', '🍇', '🍓', '🥝', '🍍', '🍊'];
    let tablero = [];
    let primerasCartas = [];
    let movimientos = 0;
    let bloqueado = false;

    const tableroDiv = document.getElementById('tablero');
    const movesDisplay = document.getElementById('moves');
    const reiniciarBtn = document.getElementById('reiniciar');

    function mezclarArray(array) {
      return array.sort(() => Math.random() - 0.5);
    }

    function crearTablero() {
      tableroDiv.innerHTML = '';
      tablero = mezclarArray([...cartas, ...cartas]);
      movimientos = 0;
      movesDisplay.textContent = `Movimientos: ${movimientos}`;
      primerasCartas = [];
      bloqueado = false;

      tablero.forEach((emoji) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.valor = emoji;

        card.innerHTML = `
          <div class="card-inner">
            <div class="card-front"></div>
            <div class="card-back">${emoji}</div>
          </div>
        `;

        card.addEventListener('click', () => voltearCarta(card));
        tableroDiv.appendChild(card);
      });
    }

    function voltearCarta(card) {
      if (
        bloqueado ||
        card.classList.contains('flipped') ||
        card.classList.contains('matched')
      ) return;

      card.classList.add('flipped');
      primerasCartas.push(card);

      if (primerasCartas.length === 2) {
        movimientos++;
        movesDisplay.textContent = `Movimientos: ${movimientos}`;
        bloquearTablero(true);

        if (
          primerasCartas[0].dataset.valor ===
          primerasCartas[1].dataset.valor
        ) {
          // Encontró par
          primerasCartas.forEach((c) => c.classList.add('matched'));

          // Verificar si ya ganó
          if (document.querySelectorAll('.card.matched').length === cartas.length * 2) {
            setTimeout(() => {
              alert('🎉 ¡Ganaste! Has encontrado todos los pares.');
            }, 600);
          }

          bloquearTablero(false);
          primerasCartas = [];
        } else {
          // No es par
          setTimeout(() => {
            primerasCartas.forEach((c) => c.classList.remove('flipped'));
            primerasCartas = [];
            bloquearTablero(false);
          }, 1000);
        }
      }
    }

    function bloquearTablero(status) {
      bloqueado = status;
    }

    reiniciarBtn.addEventListener('click', crearTablero);
    crearTablero();
