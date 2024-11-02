const contenedorFrutas = document.getElementById('contenedorFrutas');
//Creamos el array de carrito

let carrito = [];

//Frutas al carro
contenedorFrutas.addEventListener('click', (e) => {
  if (e.target.classList.contains("añadir")) validarFrutaEnCarrito(e.target.id)
});

const validarFrutaEnCarrito = (frutaId) => {
  const yaEnCarro= carrito.some(fruta => fruta.id == frutaId);

  if (!yaEnCarro) {
    const fruta = frutas.find(fruta => fruta.id == frutaId);
    const cantidadInput = document.querySelector(`.kgFruta${fruta.id}`);
    const cantidadValor = parseInt(cantidadInput.value);
    if (cantidadValor >= 0) {
      fruta.cantidad = cantidadValor;
      carrito.push(fruta);
      pintarFrutaCarrito(fruta);
    } else {
      Swal.fire({
      title: "Ingrese una cantidad valida",
      icon: "warning",
      confirmButtonText: "Entiendo"});
    }
  } else {
    const fruta = carrito.find(fruta => fruta.id == frutaId);
    const cantidadInput = document.querySelector(`.kgFruta${fruta.id}`);
    const cantidadValor = parseInt(cantidadInput.value);
    fruta.cantidad += cantidadValor;
      if (fruta.cantidad <= 0) {
      eliminarFrutaCarrito(frutaId);
      } else {
      actualizarTotalesCarrito(carrito);
      pintarCarrito(carrito);
    }
  }
console.log(carrito)
};

//Pintar fruta en carrito
const pintarFrutaCarrito = (fruta) => {
  const contenedor = document.getElementById("carritoFrutas");
  const div = document.createElement("div");
  div.classList.add("productoEnCarrito");
  div.innerHTML = `
      <p>${fruta.nombre}</p>
      <p>Precio: ${fruta.precio}$</p>
      <p>Cantidad: ${fruta.cantidad}kg</p>
      <button class="btn boton-eliminar" value="${fruta.id}">X</button>
  `
  contenedor.appendChild(div);
  actualizarTotalesCarrito(carrito);
};
// Delegación de eventos para los botones de eliminar
carritoFrutas.addEventListener('click', (event) => {
  if (event.target.classList.contains('boton-eliminar')) {
      const frutaId = event.target.value;
      eliminarFrutaCarrito(frutaId);
  }
});
//Pintar carrito
const pintarCarrito = (carrito) => {
  const contenedor = document.getElementById("carritoFrutas");
    contenedor.innerHTML = "";
    carrito.forEach(fruta => {
    pintarFrutaCarrito(fruta);
  });
};
// Función para eliminar una Fruta del carrito
const eliminarFrutaCarrito = (frutaId) => {
  const productoIndex = carrito.findIndex(fruta => fruta.id == frutaId);
  if (productoIndex !== -1) {
    carrito.splice(productoIndex, 1);
    pintarCarrito(carrito);
    actualizarTotalesCarrito(carrito);
  } else {
    console.error('Fruta no encontrada en el carrito');
  }
};

//total carrito
const actualizarTotalesCarrito = (carrito) => {
  const totalCompra = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  pintarTotalesCarrito(totalCompra);
  guardarCarritoStorage(carrito);
};
const pintarTotalesCarrito = (totalCompra) => {
  const precioTotal = document.getElementById("precioTotal");
  precioTotal.innerText = totalCompra;
};

//Storage carrito
const guardarCarritoStorage = (carritoDeCompras) => {
  localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
};

const obtenerCarritoStorage = () => {
  const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
  return carritoStorage;
}

const cargarCarrito = () => {
  if (localStorage.getItem("carrito")) {
      carrito = obtenerCarritoStorage();
      pintarCarrito(carrito);
      actualizarTotalesCarrito(carrito);
  };
}