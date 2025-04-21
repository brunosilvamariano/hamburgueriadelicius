function toggleVerMais(containerId, btn) {
  const container = document.getElementById(containerId);
  const cards = container.querySelectorAll('.card-item-grupo');
  const extras = Array.from(cards).filter(card => card.dataset.group === "2");

  const isMostrando = !extras[0].classList.contains('d-none');

  if (isMostrando) {
    // Oculta os extras
    extras.forEach(card => card.classList.add('d-none'));
    btn.textContent = 'Ver mais';
  } else {
    // Mostra os extras
    extras.forEach(card => card.classList.remove('d-none'));
    btn.textContent = 'Ver menos';
  }
}