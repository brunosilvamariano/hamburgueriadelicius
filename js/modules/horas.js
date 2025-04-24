
document.addEventListener("DOMContentLoaded", function () {
    const statusElement = document.querySelector(".hero-info .status");
    const statusModal = document.getElementById("statusHorario");

    const hoje = new Date();
    const diaSemana = hoje.getDay(); // 0 = domingo, 6 = sábado
    const horaAtual = hoje.getHours() + hoje.getMinutes() / 60;

    let aberto = false;

    if (diaSemana >= 1 && diaSemana <= 5) {
      // Segunda a Sexta: 17:00 às 23:30
      aberto = horaAtual >= 17.0 && horaAtual < 23.5;
    } else if (diaSemana === 6) {
      // Sábado: 17:00 às 00:00
      aberto = horaAtual >= 17.0 && horaAtual < 24.0;
    } else if (diaSemana === 0) {
      // Domingo: 17:00 às 22:30
      aberto = horaAtual >= 17.0 && horaAtual < 22.5;
    }

    if (aberto) {
      statusElement.innerHTML = `<i class="bi bi-check-circle-fill me-1"></i> Aberto agora`;
      statusElement.classList.remove("text-danger");
      statusElement.classList.add("text-success");
      if (statusModal) statusModal.textContent = "Estamos abertos agora! Faça seu pedido :)";
    } else {
      statusElement.innerHTML = `<i class="bi bi-x-circle-fill me-1"></i> Fechado no momento`;
      statusElement.classList.remove("text-success");
      statusElement.classList.add("text-danger");
      if (statusModal) statusModal.textContent = "Voltamos em breve! Consulte os horários.";
    }
  });

