
let cart = [];

function addToCart(nombre, precio) {
  const item = cart.find(p => p.nombre === nombre);
  if (item) {
    item.cantidad++;
  } else {
    cart.push({ nombre, precio, cantidad: 1 });
  }
  document.getElementById("cart-count").innerText = cart.reduce((sum, i) => sum + i.cantidad, 0);
  localStorage.setItem("cart", JSON.stringify(cart));
}

window.onload = function () {
  const itemsContainer = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("total-price");
  const countDisplay = document.getElementById("cart-count");

  cart = JSON.parse(localStorage.getItem("cart")) || [];
  countDisplay.innerText = cart.reduce((sum, i) => sum + i.cantidad, 0);

  if (itemsContainer && totalDisplay) {
    if (cart.length === 0) {
      itemsContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
    } else {
      cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
          <p><strong>${item.nombre}</strong> — $${item.precio} x ${item.cantidad}</p>
          <button onclick="removeItem(${index})">Eliminar</button>
        `;
        itemsContainer.appendChild(div);
      });

      const total = cart.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
      totalDisplay.innerText = total.toFixed(2);
    }
  }
};

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function finalizarCompra() {
  alert("Gracias por tu compra. Pronto recibirás confirmación por correo.");
  localStorage.removeItem("cart");
  location.reload();
}
