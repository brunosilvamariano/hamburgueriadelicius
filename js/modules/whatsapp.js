document.addEventListener("DOMContentLoaded", function () {
  const modal = new bootstrap.Modal(document.getElementById("pedidoModal"));
  const form = document.getElementById("formPedido");

  const campoTroco = document.getElementById("campoTroco");
  const pagamento = document.getElementById("pagamento");
  const cepInput = document.getElementById("cep");
  const campoSobremesa = document.getElementById("campoSobremesa");
  const sobremesaCheckbox = document.getElementById("temSobremesa");

  document.querySelectorAll(".btn-pedir").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const produto = btn.getAttribute("data-produto");
      const preco = btn.getAttribute("data-preco");

      document.getElementById("produtoSelecionado").value = produto;
      document.getElementById("precoSelecionado").value = preco;
      modal.show();
    });
  });

  pagamento.addEventListener("change", function () {
    campoTroco.classList.toggle("d-none", pagamento.value !== "Dinheiro");
  });

  sobremesaCheckbox.addEventListener("change", function () {
    campoSobremesa.classList.toggle("d-none", !this.checked);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const cep = cepInput.value.trim();
    const produto = document.getElementById("produtoSelecionado").value;
    const preco = parseFloat(document.getElementById("precoSelecionado").value.replace(",", "."));
    const formaPagamento = pagamento.value;
    const troco = document.getElementById("troco").value.trim();

    let valorTotal = preco;
    let mensagem = `🍔 *Pedido Novo!*%0A`;
    mensagem += `*👤 Nome:* ${nome}%0A`;
    mensagem += `*📍 Endereço:* ${endereco}%0A`;
    mensagem += `*📦 Produto:* ${produto} - R$ ${preco.toFixed(2)}%0A`;

    if (document.getElementById("refri").checked) {
      const refri = document.getElementById("refrigeranteSelecionado").value;
      if (refri) {
        const [nomeRefri, precoRefri] = refri.split(" - R$ ");
        const valorRefri = parseFloat(precoRefri.replace(",", "."));
        valorTotal += valorRefri;
        mensagem += `*🥤 Refrigerante:* ${nomeRefri} - R$ ${valorRefri.toFixed(2)}%0A`;
      }
    }

    if (document.getElementById("suco").checked) {
      const suco = document.getElementById("sucoSelecionado").value;
      if (suco) {
        const [nomeSuco, precoSuco] = suco.split(" - R$ ");
        const valorSuco = parseFloat(precoSuco.replace(",", "."));
        valorTotal += valorSuco;
        mensagem += `*🧃 Suco:* ${nomeSuco} - R$ ${valorSuco.toFixed(2)}%0A`;
      }
    }

    if (sobremesaCheckbox.checked) {
      const sobremesa = document.getElementById("sobremesaSelecionada").value;
      if (sobremesa) {
        const [nomeSobremesa, precoSobremesa] = sobremesa.split(" - R$ ");
        const valorSobremesa = parseFloat(precoSobremesa.replace(",", "."));
        valorTotal += valorSobremesa;
        mensagem += `*🍰 Sobremesa:* ${nomeSobremesa} - R$ ${valorSobremesa.toFixed(2)}%0A`;
      }
    }

    mensagem += `*💳 Pagamento:* ${formaPagamento}%0A`;
    if (formaPagamento === "Dinheiro" && troco) {
      mensagem += `*💰 Troco para:* ${troco}%0A`;
    }

    mensagem += `*📦 Total:* R$ ${valorTotal.toFixed(2)}%0A`;
    mensagem += `*✅ CEP:* ${cep}%0A`;

    const cepsNaoAtendidos = ["00000-000", "99999-999", "12345-000"];
    if (cepsNaoAtendidos.includes(cep)) {
      alert("Desculpe, ainda não entregamos nessa região 😢");
      return;
    }

    // Se for Pix, gera código Pix
    if (formaPagamento === "Pix") {
      const codigoPix = gerarCodigoPix(valorTotal, nome);
      mensagem += `%0A🔁 *Pagamento via Pix*%0A`;
      mensagem += `Copie o código Pix abaixo no seu app bancário e envie o comprovante:%0A`;
      mensagem += `\`\`\`${codigoPix}\`\`\``;
    }

    const numeroWhatsApp = "47991597258";
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
    window.open(url, "_blank");

    modal.hide();
    form.reset();
    campoTroco.classList.add("d-none");
    campoSobremesa.classList.add("d-none");
  });

  // Gera código Pix dinâmico
  function gerarCodigoPix(valor, nomeCliente) {
    const chavePix = "j.brunomariano@gmail.com";
    const nomeRecebedor = "Bruno Mariano Silva";
    const cidade = "Joinville";
    const idTransacao = `PEDIDO${Date.now()}`.slice(0, 25);
    const valorFormatado = valor.toFixed(2);

    const payload = [
      "000201",
      `26580014br.gov.bcb.pix0114${chavePix.length.toString().padStart(2, "0")}${chavePix}`,
      "52040000",
      "5303986",
      `54${valorFormatado.length.toString().padStart(2, "0")}${valorFormatado}`,
      "5802BR",
      `59${nomeRecebedor.length.toString().padStart(2, "0")}${nomeRecebedor}`,
      `60${cidade.length.toString().padStart(2, "0")}${cidade}`,
      `62${"05"}05${idTransacao.length.toString().padStart(2, "0")}${idTransacao}`
    ];

    const semCRC = payload.join("");
    const comCRC = semCRC + "6304" + calcularCRC(semCRC + "6304");
    return comCRC;
  }

  function calcularCRC(str) {
    let crc = 0xFFFF;
    for (let i = 0; i < str.length; i++) {
      crc ^= str.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        crc = (crc & 0x8000) ? (crc << 1) ^ 0x1021 : (crc << 1);
      }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, "0");
  }
});
