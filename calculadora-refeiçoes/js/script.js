const cardapio = {
  pizza: 30.00,
  hamburguer: 15.50,
  salada: 18.00,
  sopa: 21.90,
  suco: 5.50
};

const selectAlimento = document.querySelector('#alimento');
const inputQuantidade = document.querySelector('#quantidade');
const botaoAdicionar = document.querySelector('#adicionar');
const listaPedido = document.querySelector('#lista-pedido');
const divErro = document.querySelector('#erro');
const divTotalGeral = document.querySelector('#total-geral');

function formatar(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

function adicionarItem() {
  const alimento = selectAlimento.value;
  const quantidade = Number(inputQuantidade.value);

  if (!alimento) return mostrarErro("Selecione um alimento.");
  if (quantidade < 1) return mostrarErro("Quantidade inválida.");

  limparErro();
  const precoUnit = cardapio[alimento];
  const totalItem = +(precoUnit * quantidade).toFixed(2);

  const li = document.createElement("li");
  li.classList.add("fade-in");
  li.dataset.total = totalItem;
  li.innerHTML = `
    ${alimento.toUpperCase()} — ${quantidade} x ${formatar(precoUnit)}
    <div>
      <span>${formatar(totalItem)}</span>
      <button class="botao-remover">Remover</button>
    </div>
  `;

  li.querySelector(".botao-remover").addEventListener("click", () => {
    li.remove();
    atualizarTotal();
  });

  listaPedido.appendChild(li);
  atualizarTotal();
  destacarMaisCaro();
  selectAlimento.value = "";
  inputQuantidade.value = 1;
}

function mostrarErro(msg) {
  divErro.textContent = msg;
}

function limparErro() {
  divErro.textContent = "";
}

function atualizarTotal() {
  let total = 0;
  document.querySelectorAll('#lista-pedido li').forEach(li => {
    total += Number(li.dataset.total);
  });
  divTotalGeral.textContent = "Total: " + formatar(total);
  destacarMaisCaro();
}

function destacarMaisCaro() {
  const itens = document.querySelectorAll('#lista-pedido li');
  itens.forEach(i => i.classList.remove("destaque"));
  let maior = null;
  itens.forEach(li => {
    if (!maior || Number(li.dataset.total) > Number(maior.dataset.total)) {
      maior = li;
    }
  });
  if (maior) maior.classList.add("destaque");
}

botaoAdicionar.addEventListener('click', adicionarItem);
