const secretNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;

    function checkGuess() {
      const guess = Number(document.getElementById("guess").value);
      const result = document.getElementById("result");
      if (!guess || guess < 1 || guess > 100) {
        result.textContent = "Por favor ingresa un número válido entre 1 y 100.";
        result.style.color = "red";
        return;
      }

      attempts++;
      if (guess === secretNumber) {
        result.textContent = `¡Correcto! Lo lograste en ${attempts} intento${attempts > 1 ? "s" : ""}.`;
        result.style.color = "green";
      } else if (guess < secretNumber) {
        result.textContent = "Demasiado bajo. Intenta de nuevo.";
        result.style.color = "#d17a00";
      } else {
        result.textContent = "Demasiado alto. Intenta de nuevo.";
        result.style.color = "#d17a00";
      }
    }