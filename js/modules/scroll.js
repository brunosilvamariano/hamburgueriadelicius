document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      e.preventDefault();

      // Se Offcanvas estiver aberto, fecha antes de scrollar
      const offcanvasEl = document.querySelector('#offcanvasNavbar');
      const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasEl);

      if (offcanvasInstance && offcanvasEl.classList.contains('show')) {
        // Espera a animação de fechar antes de scrollar
        offcanvasEl.addEventListener('hidden.bs.offcanvas', () => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, { once: true });

        offcanvasInstance.hide();
      } else {
        // Se não está aberto, scrolla direto
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});