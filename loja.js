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

      document.getElementById('cupomContainer').style.display = 'block';
  } else {
      cartList.innerHTML = '<p>Carrinho vazio</p>';
      document.getElementById('cupomContainer').style.display = 'none';
  }
}

let cupomUsado = false;


function addToCart(event) {
  const product = event.target.parentNode;
  const productName = product.querySelector('h2').innerText;
  const productImage = product.querySelector('img').src;
  const productPrice = product.querySelector('p:nth-child(3)').innerText;

  const productData = {
    name: productName,
    image: productImage,
    price: productPrice
  };

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart.push(productData);

  localStorage.setItem('cart', JSON.stringify(cart));
}

const buyButtons = document.querySelectorAll('.add-to-cart');

buyButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});