let cart = JSON.parse(localStorage.getItem("cart")) || [];
document.getElementById("buscar").addEventListener("input", buscarProductos);
function addToCart(nombre, precio, cantidad = 1) {
  cantidad = parseInt(cantidad) || 1;
  const item = cart.find((p) => p.nombre === nombre);
  if (item) {
    item.cantidad += cantidad;
  } else {
    cart.push({ nombre, precio, cantidad });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  // Mensaje visual de añadido
  if (typeof mostrarMensajeAgregado === "function")
    mostrarMensajeAgregado(nombre);
}

function updateCartCount() {
  const countDisplay = document.getElementById("cart-count");
  if (countDisplay) {
    countDisplay.innerText = cart.reduce((sum, i) => sum + i.cantidad, 0);
  }
}

function renderCart() {
  const itemsContainer = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("total-price");
  updateCartCount();

  if (!itemsContainer || !totalDisplay) return;

  itemsContainer.innerHTML = "";

  if (cart.length === 0) {
    itemsContainer.innerHTML =
      "<p style='text-align:center;color:#a67c52;font-size:1.2em;'>Tu carrito está vacío.</p>";
    totalDisplay.innerText = "0";
    return;
  }

  cart.forEach((item, index) => {
    // Puedes personalizar la imagen según el producto si lo deseas
    let imgSrc = "imagenes/imagenes_zopo/1_1.png";
    if (item.nombre.includes("Arte")) imgSrc = "imagenes/imagenes_zopo/2.png";
    if (item.nombre.includes("Creatividad"))
      imgSrc = "imagenes/imagenes_zopo/3.png";
    if (item.nombre.includes("Caja")) imgSrc = "imagenes/imagenes_zopo/10.png";

    const div = document.createElement("div");
    div.className = "item-carrito";
    div.innerHTML = `
      <img src="${imgSrc}" alt="${item.nombre}" class="img-carrito" />
      <div class="item-carrito-info">
        <h4>${item.nombre}</h4>
        <p>Cantidad: ${item.cantidad}</p>
        <p>Precio: $${(item.precio * item.cantidad).toLocaleString(
          "es-CO"
        )} COP</p>
      </div>
      <button class="item-carrito-remove" title="Eliminar" onclick="removeItem(${index})">&#10005;</button>
    `;
    itemsContainer.appendChild(div);
  });

  const total = cart.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  totalDisplay.innerText = "$" + total.toLocaleString("es-CO") + " COP";
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function finalizarCompra() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }
  alert("Gracias por tu compra. Pronto recibirás confirmación por correo.");
  cart = [];
  localStorage.removeItem("cart");
  renderCart();
  updateCartCount();
}

/* About Us */
function animar() {
  const imagen = document.getElementById("imagen");
  const marco = document.getElementById("marco");
  if (!imagen || !marco) return;

  let posImagen = -350;
  let posMarco = -700;
  const velocidadImagen = 4.1;
  const velocidadMarco = 4;

  function mover() {
    let sigue = false;

    // Mover imagen
    if (posImagen < window.innerWidth + 300) {
      posImagen += velocidadImagen;
      imagen.style.left = posImagen + "px";
      sigue = true;
    } else {
      imagen.style.display = "none";
      marco.style.display = "block"; // mostrar marco al terminar imagen
    }

    // Simular entrada del marco desde la izquierda
    if (posMarco < window.innerWidth / 2) {
      posMarco += velocidadMarco;
      marco.style.left = posMarco + "px";
      marco.style.transform = "translateX(-50%)";
      sigue = true;
    }

    if (sigue) {
      requestAnimationFrame(mover);
    }
  }

  marco.style.left = "-700px"; // inicia fuera de pantalla
  setTimeout(() => {
    mover();
  }, 5000);
}

// --- NUEVO: LÓGICA PARA PRODUCTO INDIVIDUAL ---
function cargarProductoIndividual() {
  const productos = {
    1: {
      nombre: "Caja de Herramientas Perfecta",
      precio: 120000,
      img: "imagenes/imagenes_zopo/10.png",
      desc: "Producto artesanal único, elaborado con materiales de alta calidad. Perfecto para decorar tu hogar o regalar a alguien especial.",
    },
    2: {
      nombre: "Arte en Madera",
      precio: 95000,
      img: "imagenes/imagenes_zopo/9_1.png",
      desc: "Hecho a mano con madera seleccionada. Una pieza única para tu espacio.",
    },
    3: {
      nombre: "Creatividad Visual",
      precio: 135000,
      img: "imagenes/imagenes_zopo/7_1.png",
      desc: "Dale vida a tus ideas con creatividad y diseño original.",
    },
  };
  const params = new URLSearchParams(window.location.search);
  const prod = productos[params.get("producto")];
  if (prod && document.getElementById("producto-img")) {
    document.getElementById("producto-img").src = prod.img;
    document.getElementById("producto-img").alt = prod.nombre;
    document.getElementById("producto-nombre").innerText = prod.nombre;
    document.getElementById("producto-precio").innerText =
      "$" + prod.precio.toLocaleString("es-CO") + " COP";
    document.getElementById("producto-desc").innerText = prod.desc;
    // Actualiza el botón para añadir la cantidad seleccionada
    const btn = document.getElementById("btn-add-cart");
    if (btn) {
      btn.onclick = function () {
        const cantidad = document.getElementById("cantidad")?.value || 1;
        addToCart(prod.nombre, prod.precio, cantidad);
      };
    }
  }
}
function mostrarOpcionesPago() {
  document.getElementById("modal").style.display = "flex";
}

function cerrarOpcionesPago() {
  document.getElementById("modal").style.display = "none";
}

function elegirMetodo(metodo) {
  alert("Has elegido pagar con " + metodo);
  cerrarOpcionesPago();
}
function mostrarOpcionesPago() {
  document.getElementById("modal").style.display = "flex";
  document.getElementById("opcionesPago").style.display = "block";
  document.getElementById("contenidoPago").innerHTML = "";
}

// Cerrar modal y limpiar contenido
function cerrarModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("contenidoPago").innerHTML = "";
}

// Elegir método de pago y mostrar formulario correspondiente
function elegirMetodo(metodo) {
  document.getElementById("opcionesPago").style.display = "none";
  mostrarFormularioPago(metodo);
}

// Mostrar formulario de pago según método
function mostrarFormularioPago(metodo) {
  const contenedor = document.getElementById("contenidoPago");
  let formularioHTML = "";

  if (metodo === "Nequi") {
    formularioHTML = `
  <h3>Pago con Nequi</h3>
  <label for="nequiTelefono">Número de celular:</label>
  <input type="tel" id="nequiTelefono" placeholder="3001234567" required />
  
  <button onclick="procesarPago('${metodo}')">Pagar</button>
  <button onclick="mostrarOpcionesPago()">Cancelar</button>
`;
  } else {
    formularioHTML = `
    <h3>Pago con ${metodo}</h3>
    <label for="nombreTarjeta">Nombre del Titular:</label>
    <input type="text" id="nombreTarjeta" required />
    
    <label for="numeroTarjeta">Número de tarjeta:</label>
    <input type="text" id="numeroTarjeta" maxlength="16" required />
    
    <label for="fechaVencimiento">Fecha de vencimiento:</label>
    <input type="month" id="fechaVencimiento" required />
    
    <label for="cvc">CVC:</label>
    <input type="text" id="cvc" maxlength="4" required />
    
    <button onclick="procesarPago('${metodo}')">Pagar</button>
    <button onclick="mostrarOpcionesPago()">Cancelar</button>
  `;
  }

  contenedor.innerHTML = formularioHTML;
}

// Procesar pago con validación simple
function procesarPago(metodo) {
  if (metodo === "Nequi") {
    const telefono = document.getElementById("nequiTelefono").value.trim();
    const regexTelefono = /^[0-9]{10}$/;

    if (!regexTelefono.test(telefono)) {
      alert("Por favor, ingresa un número de celular válido (10 dígitos).");
      return;
    }
  } else {
    const nombre = document.getElementById("nombreTarjeta").value.trim();
    const numero = document.getElementById("numeroTarjeta").value.trim();
    const vencimiento = document
      .getElementById("fechaVencimiento")
      .value.trim();
    const cvc = document.getElementById("cvc").value.trim();

    if (!nombre || !numero || !vencimiento || !cvc) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (!/^[0-9]{16}$/.test(numero)) {
      alert("El número de tarjeta debe tener 16 dígitos.");
      return;
    }

    if (!/^[0-9]{3,4}$/.test(cvc)) {
      alert("El CVC debe tener 3 o 4 dígitos.");
      return;
    }
  }

  alert(`Has pagado con ${metodo}. Gracias por tu compra.`);
  cart = [];
  localStorage.removeItem("cart");
  renderCart();
  cerrarModal();
}
function buscarProductos() {
  const input = document.getElementById("buscar");
  const filtro = input.value.trim().toLowerCase();
  const productos = document.querySelectorAll(".producto");

  productos.forEach((producto) => {
    const nombre = producto.querySelector("h3").textContent.toLowerCase();
    const categoria = (
      producto.getAttribute("data-category") || ""
    ).toLowerCase();

    if (nombre.includes(filtro) || categoria.includes(filtro)) {
      producto.style.display = "";
    } else {
      producto.style.display = "none";
    }
  });
}

// Opcional: mensaje visual al añadir al carrito
function mostrarMensajeAgregado(nombre) {
  let msg = document.createElement("div");
  msg.innerText = `"${nombre}" añadido al carrito`;
  msg.style.position = "fixed";
  msg.style.top = "30px";
  msg.style.right = "30px";
  msg.style.background = "#a67c52";
  msg.style.color = "#fff";
  msg.style.padding = "14px 28px";
  msg.style.borderRadius = "8px";
  msg.style.fontSize = "1.1em";
  msg.style.zIndex = 9999;
  msg.style.boxShadow = "0 2px 8px rgba(44,44,44,0.18)";
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 1800);
}

// Inicialización
window.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();
  animar();
  cargarProductoIndividual();
});
