<script>
    const opciones = ['piedra', 'papel', 'tijera'];
    let jug = 0, cpu = 0;

    function play(eleccion) {
      const cpuChoice = opciones[Math.floor(Math.random() * 3)];
      let resultado = '';

      if (eleccion === cpuChoice) {
        resultado = 'Empate 🤝';
      } else if (
        (eleccion === 'piedra' && cpuChoice === 'tijera') ||
        (eleccion === 'papel' && cpuChoice === 'piedra') ||
        (eleccion === 'tijera' && cpuChoice === 'papel')
      ) {
        jug++;
        resultado = '¡Ganaste! 🎉';
      } else {
        cpu++;
        resultado = 'Perdiste 😢';
      }

      document.getElementById('msg').textContent =
        `Elegiste ${eleccion} y la CPU ${cpuChoice}. ${resultado}`;
      document.getElementById('score').textContent =
        `Jugador ${jug} - ${cpu} CPU`;
    }
  </script>
