



const LS_CHAVE = 'produtos-selecionados';

document.addEventListener('DOMContentLoaded', () => {
  
  if (!localStorage.getItem(LS_CHAVE)) {
    localStorage.setItem(LS_CHAVE, '[]');
  }

 
  carregarProdutos(produtos);
  atualizarCesto();

  
  window.addEventListener('hashchange', atualizarCesto);
});



function carregarProdutos(lista) {
  const sec = document.querySelector('#produtos');

  sec.querySelectorAll('article').forEach(a => a.remove());

  lista.forEach(prod => {
    const card = criarProdutoCard(prod);
    sec.append(card);
  });
}

function criarProdutoCard(prod) {
  const art = document.createElement('article');
  art.className = 'card';

  const h3 = document.createElement('h3');
  h3.textContent = prod.title;

  const img = document.createElement('img');
  img.src = prod.image;
  img.alt = prod.title;

  const desc = document.createElement('p');
  desc.className = 'descricao';
  desc.textContent = (prod.description || '').toString().slice(0, 180);

  const preco = document.createElement('p');
  preco.className = 'preco';
  preco.textContent = `Preço: ${Number(prod.price).toFixed(2)} €`;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = '+ Adicionar ao Cesto';
  btn.addEventListener('click', () => adicionarAoCesto(prod));

  art.append(h3, img, desc, preco, btn);
  return art;
}



function obterCesto() {
  try {
    return JSON.parse(localStorage.getItem(LS_CHAVE)) ?? [];
  } catch {
    return [];
  }
}

function guardarCesto(lista) {
  localStorage.setItem(LS_CHAVE, JSON.stringify(lista));
}

function adicionarAoCesto(prod) {
  const atual = obterCesto();
  
  const item = {
    id: prod.id,
    title: prod.title,
    price: Number(prod.price),
    image: prod.image
  };
  atual.push(item);
  guardarCesto(atual);
  atualizarCesto();
}

function removerDoCesto(index) {
  const atual = obterCesto();
  atual.splice(index, 1);
  guardarCesto(atual);
  atualizarCesto();
}

function criarProdutoCesto(prod, index) {
  const art = document.createElement('article');
  art.className = 'card';

  const h3 = document.createElement('h3');
  h3.textContent = prod.title;

  const img = document.createElement('img');
  img.src = prod.image;
  img.alt = prod.title;

  const custo = document.createElement('p');
  custo.className = 'custo';
  custo.textContent = `Custo total: ${prod.price.toFixed(2)} €`;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = '− Remover do Cesto';
  btn.addEventListener('click', () => removerDoCesto(index));

  art.append(h3, img, custo, btn);
  return art;
}

function atualizarCesto() {
  const sec = document.querySelector('#cesto');
  
  sec.querySelectorAll('article').forEach(a => a.remove());

  const lista = obterCesto();

  let total = 0;
  lista.forEach((prod, i) => {
    total += Number(prod.price) || 0;
    sec.insertBefore(criarProdutoCesto(prod, i), document.querySelector('#total-cesto'));
  });

  document.querySelector('#total-cesto').textContent =
    `Custo total: ${total.toFixed(2)} €`;
}
