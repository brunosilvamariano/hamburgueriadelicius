
  // Carrinho armazenado em memória (poderá ser enviado pro backend futuramente)
  let carrinho = [];

  // Função para adicionar um item ao carrinho
  function adicionarAoCarrinho(item) {
    const existente = carrinho.find(produto => produto.id === item.id);
    if (existente) {
      existente.quantidade += 1;
    } else {
      carrinho.push({ ...item, quantidade: 1 });
    }
    atualizarCarrinhoUI();
  }

  // Atualiza o número de itens e o conteúdo do modal
  function atualizarCarrinhoUI() {
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    document.getElementById('cart-count').textContent = totalItens;

    const modalBody = document.querySelector('#carrinhoModal .modal-body');
    if (carrinho.length === 0) {
      modalBody.innerHTML = `<p class="text-muted">Seu carrinho está vazio.</p>`;
      return;
    }

    modalBody.innerHTML = carrinho.map(item => `
      <div class="d-flex justify-content-between align-items-center border-bottom py-2">
        <div>
          <strong class="text-warning">${item.nome}</strong><br>
          <small>${item.quantidade}x R$ ${item.preco.toFixed(2)}</small>
        </div>
        <div>
          <span class="text-light">R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
        </div>
      </div>
    `).join('');
  }

  // Exemplo de chamada ao clicar em um botão:
  // adicionarAoCarrinho({ id: 1, nome: "X-Bacon", preco: 29.90 });

  // DICA: você pode atrelar isso a todos os botões de adicionar ao carrinho:
  // document.querySelectorAll('.btn-add-carrinho').forEach(btn => {
  //   btn.addEventListener('click', () => {
  //     const item = JSON.parse(btn.dataset.produto);
  //     adicionarAoCarrinho(item);
  //   });
  // });

