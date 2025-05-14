    const title = document.getElementById('typing-title');
    const text = "Victoria García";
    let index = 0;

    function type() {
      if (index < text.length) {
        title.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100);
      }
    }

    title.textContent = "";
    type();
    

    // Modo oscuro
    const toggleDarkMode = document.getElementById('dark-mode-toggle');
    toggleDarkMode.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });

    // Menú hamburguesa
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      menu.classList.toggle('active');
    });
    // Cerrar el menú al hacer clic fuera o en un enlace del menú
    document.addEventListener('click', (e) => {
  const isClickInsideMenu = menu.contains(e.target);
  const isClickOnHamburger = hamburger.contains(e.target);

  // Si se hace clic fuera del menú y del ícono hamburguesa
  if (!isClickInsideMenu && !isClickOnHamburger) {
    menu.classList.remove('active');
    hamburger.classList.remove('active');
  }

  // Si se hace clic en un enlace dentro del menú
  if (e.target.tagName === 'A' && menu.classList.contains('active')) {
    menu.classList.remove('active');
    hamburger.classList.remove('active');
  }
});
