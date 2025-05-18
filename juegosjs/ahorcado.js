 const palabras = ["javascript", "ahorcado", "programar", "desafio", "computadora", "oxigeno", "exquisito", "electrodomestico", "francia"];
    const partesCuerpo = ["cabeza", "torso", "brazo-izq", "brazo-der", "pierna-izq", "pierna-der"];
    const palabra = palabras[Math.floor(Math.random() * palabras.length)];
    let progreso = Array(palabra.length).fill("_");
    let intentos = 6;

    document.getElementById("palabraOculta").textContent = progreso.join(" ");

    function mostrarLetras() {
      const contenedor = document.getElementById("letras");
      for (let i = 97; i <= 122; i++) {
        const letra = String.fromCharCode(i);
        const btn = document.createElement("button");
        btn.textContent = letra;
        btn.onclick = () => adivinarLetra(letra, btn);
        contenedor.appendChild(btn);
      }
    }

    function adivinarLetra(letra, boton) {
      boton.disabled = true;
      let acierto = false;

      for (let i = 0; i < palabra.length; i++) {
        if (palabra[i] === letra) {
          progreso[i] = letra;
          acierto = true;
        }
      }

      if (!acierto) {
        intentos--;
        mostrarParteCuerpo(6 - intentos);
        document.getElementById("intentos").textContent = `Te quedan ${intentos} intentos.`;
      }

      document.getElementById("palabraOculta").textContent = progreso.join(" ");

      if (!progreso.includes("_")) {
        document.getElementById("estado").textContent = "¡Ganaste!";
        deshabilitarBotones();
      } else if (intentos === 0) {
        document.getElementById("estado").textContent = `¡Perdiste! La palabra era: ${palabra}`;
        deshabilitarBotones();
      }
    }

    function mostrarParteCuerpo(numero) {
      const parte = partesCuerpo[numero - 1];
      const elemento = document.querySelector(`.${parte}`);
      if (elemento) elemento.style.display = "block";
    }

    function deshabilitarBotones() {
      document.querySelectorAll(".letras button").forEach(b => b.disabled = true);
    }

    mostrarLetras();