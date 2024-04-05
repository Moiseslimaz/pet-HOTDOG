function displayCart() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  const cartList = document.getElementById('cart');

  cartList.innerHTML = '';

  if (cart && cart.length > 0) {
      cart.forEach(item => {
          const cartItem = document.createElement('li');

          const itemImage = document.createElement('img');
          itemImage.src = item.image;
          itemImage.alt = item.name;
          cartItem.appendChild(itemImage);

          const itemName = document.createElement('p');
          itemName.textContent = item.name;
          cartItem.appendChild(itemName);

          const itemPrice = document.createElement('p');
          itemPrice.textContent = item.price;
          cartItem.appendChild(itemPrice);

          const removeButton = document.createElement('button');
          removeButton.textContent = 'Remover';
          removeButton.onclick = function() {
              removerDoCarrinho(item.id);
          };
          cartItem.appendChild(removeButton);

          cartList.appendChild(cartItem);
      });

      // Exibir campo de cupom apenas se houver produtos no carrinho
      document.getElementById('cupomContainer').style.display = 'block';
  } else {
      cartList.innerHTML = '<p>Carrinho vazio</p>';
      // Ocultar campo de cupom se o carrinho estiver vazio
      document.getElementById('cupomContainer').style.display = 'none';
  }
}

// Variável para controlar se o cupom já foi usado
let cupomUsado = false;

function aplicarCupom() {
  if (!cupomUsado) {
      const cupomInput = document.getElementById('cupomInput').value;
      
      // Verificar se o cupom é válido (coloque sua lógica de validação aqui)
      if (cupomInput === 'MEUCUPOM') {
          // Aplicar desconto (coloque sua lógica de desconto aqui)
          // Exemplo: 10% de desconto
          const desconto = calcularTotal() * 0.1;
          const totalComDesconto = calcularTotal() - desconto;

          // Exibir mensagem de cupom aplicado com sucesso
          document.getElementById('cupomMessage').textContent = `Cupom aplicado com sucesso! Desconto de 10% aplicado. Total atual: R$ ${totalComDesconto.toFixed(2)}`;

          // Atualizar variável para indicar que o cupom foi usado
          cupomUsado = true;
      } else {
          // Exibir mensagem de cupom inválido
          document.getElementById('cupomMessage').textContent = 'Cupom inválido. Tente novamente.';
      }
  } else {
      // Exibir mensagem de cupom já utilizado
      document.getElementById('cupomMessage').textContent = 'Você já utilizou um cupom de desconto.';
  }
}
function addToCart(event) {
  const product = event.target.parentNode;
  const productName = product.querySelector('h2').innerText;
  const productImage = product.querySelector('img').src;
  const productPrice = product.querySelector('p:nth-child(3)').innerText;

  // Cria um objeto para representar o produto
  const productData = {
    name: productName,
    image: productImage,
    price: productPrice
  };

  // Obtém o carrinho atual do armazenamento local ou cria um novo array vazio
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Adiciona o produto ao carrinho
  cart.push(productData);

  // Salva o carrinho atualizado de volta no armazenamento local
  localStorage.setItem('cart', JSON.stringify(cart));
}

const buyButtons = document.querySelectorAll('.add-to-cart');

buyButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});