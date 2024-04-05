function addToCart(event) {
    // Obtém o produto clicado
    const product = event.target.closest('.product');
  
    // Verifica se o produto foi encontrado
    if (!product) {
      console.error("Produto não encontrado.");
      return;
    }
  
    // Extrai informações do produto
    const productName = product.querySelector('h2').innerText;
    const productImage = product.querySelector('img').src;
    const productPrice = parseFloat(product.querySelector('p.price').innerText.replace('R$', '').trim());
  
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
  
    // Atualiza o contador de itens no carrinho
    updateCartItemCount();
  }
  
  // Atualiza o contador de itens no carrinho
  function updateCartItemCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemCount = cart.length;
    document.getElementById('cartItemCount').textContent = cartItemCount;
  }
  
  // Adiciona listeners aos botões de adicionar ao carrinho
  const buyButtons = document.querySelectorAll('.add-to-cart');
  buyButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });
  
  // Atualiza o contador de itens no carrinho quando a página é carregada
  window.addEventListener('load', updateCartItemCount);
  