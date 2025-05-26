document.addEventListener("DOMContentLoaded", () => {
  // Obtener el parámetro 'producto' de la URL
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("producto"));

  // Cargar productos desde productos.json
  fetch("productos.json")
    .then((response) => response.json())
    .then((productos) => {
      // Buscar el producto por id
      const producto = productos.find((p) => p.id === id);
      if (!producto) {
        document.getElementById("producto-nombre").innerText =
          "Producto no encontrado";
        document.getElementById("btn-add-cart").disabled = true;
        return;
      }

      // Mostrar la información del producto
      document.getElementById("producto-img").src = producto.image;
      document.getElementById("producto-img").alt = producto.name;
      document.getElementById("producto-nombre").innerText = producto.name;
      document.getElementById("producto-precio").innerText =
        "$" + producto.price.toLocaleString("es-CO") + " COP";
      document.getElementById("producto-desc").innerText = producto.description;

      // Añadir al carrito
      const btn = document.getElementById("btn-add-cart");
      btn.onclick = function () {
        const cantidad =
          parseInt(document.getElementById("cantidad").value) || 1;
        if (typeof addToCart === "function") {
          addToCart(producto.name, producto.price, cantidad);
        }
      };
    })
    .catch(() => {
      document.getElementById("producto-nombre").innerText =
        "Error al cargar el producto";
      document.getElementById("btn-add-cart").disabled = true;
    });
});
