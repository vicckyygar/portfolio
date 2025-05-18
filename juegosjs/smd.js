  const colores = ["green", "red", "yellow", "blue", "purple", "orange", "pink", "gray"];
    let secuencia = [];
    let secuenciaUsuario = [];
    let nivel = 0;
    let esperandoInput = false;
    const modoDificil = true;

    function empezarJuego() {
      nivel = 0;
      secuencia = [];
      secuenciaUsuario = [];
      document.getElementById("level").textContent = "Nivel: 0";
      siguienteNivel();
    }

    function siguienteNivel() {
      esperandoInput = false;
      nivel++;
      secuenciaUsuario = [];
      document.getElementById("level").textContent = "Nivel: " + nivel;

      let cantidadNuevosColores = modoDificil && nivel >= 10 ? 2 : 1;

      for (let i = 0; i < cantidadNuevosColores; i++) {
        let nuevoColor;
        do {
          nuevoColor = colores[Math.floor(Math.random() * colores.length)];
        } while (modoDificil && secuencia[secuencia.length - 1] === nuevoColor);
        secuencia.push(nuevoColor);
      }

      setTimeout(reproducirSecuencia, 500);
    }

    function reproducirSecuencia() {
      let i = 0;
      const velocidadBase = modoDificil ? 400 : 700;
      const velocidad = Math.max(150, velocidadBase - (nivel * 10));

      const intervalo = setInterval(() => {
        activarColor(secuencia[i]);
        i++;
        if (i >= secuencia.length) {
          clearInterval(intervalo);
          esperandoInput = true;
        }
      }, velocidad);
    }

    function activarColor(color) {
      const boton = document.getElementById(color);
      const sonido = document.getElementById("sound-" + color);
      if (sonido) {
        sonido.currentTime = 0;
        sonido.play().catch(() => {}); // Silenciar error si el usuario aún no interactuó
      }
      boton.classList.add("active");
      setTimeout(() => boton.classList.remove("active"), 400);
    }

    colores.forEach(color => {
      const boton = document.getElementById(color);
      boton.addEventListener("click", () => {
        if (!esperandoInput) return;
        activarColor(color);
        secuenciaUsuario.push(color);
        comprobarInput(secuenciaUsuario.length - 1);
      });
    });

    function comprobarInput(index) {
      if (secuenciaUsuario[index] !== secuencia[index]) {
        alert("¡Perdiste en el nivel " + nivel + "!\nSecuencia máxima alcanzada: " + secuencia.length + " colores.");
        empezarJuego();
        return;
      }

      if (secuenciaUsuario.length === secuencia.length) {
        setTimeout(siguienteNivel, 1000);
      }
    }