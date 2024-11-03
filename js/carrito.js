const contenedorFrutas = document.getElementById('contenedorFrutas');
//Creamos el array de carrito

let carrito = [];

//Frutas al carro
contenedorFrutas.addEventListener('click', (e) => {
  if (e.target.classList.contains("añadir")) validarFrutaEnCarrito(e.target.id)
});

const falloCarro = () => {
  Swal.fire({
    title: "Ingrese una cantidad valida",
    icon: "warning",
    confirmButtonText: "Entiendo"});
}

const exitoCarro = (fruta) => {
  Swal.fire({
    title: 'Se añadio al carro',
    timer: 700, 
    showConfirmButton: false, 
    timerProgressBar: false 
  });
  document.querySelector(`.kgFruta${fruta.id}`).value = "";
}

const validarFrutaEnCarrito = (frutaId) => {
  const yaEnCarro= carrito.some(fruta => fruta.id == frutaId);
  if (!yaEnCarro) {
    const fruta = frutas.find(fruta => fruta.id == frutaId);
    const cantidadInput = document.querySelector(`.kgFruta${fruta.id}`);
    const cantidadValor = parseInt(cantidadInput.value);
    if (cantidadValor > 0) {
      fruta.cantidad = cantidadValor;
      carrito.push(fruta);
      pintarFrutaCarrito(fruta);
      exitoCarro(fruta);
    } else {
      falloCarro();
    }
  } else {
    const fruta = carrito.find(fruta => fruta.id == frutaId);
    const cantidadInput = document.querySelector(`.kgFruta${fruta.id}`);
    const cantidadValor = parseInt(cantidadInput.value);
    if (cantidadValor > 0) {
      fruta.cantidad += cantidadValor;
      actualizarTotalesCarrito(carrito);
      pintarCarrito(carrito);
      exitoCarro(fruta);
    } else {
      falloCarro();
    } 
  }
};

//Pintar fruta en carrito
const pintarFrutaCarrito = (fruta) => {
  const contenedor = document.getElementById("carritoFrutas");
  const div = document.createElement("div");
  div.classList.add("frutaEnCarrito");
  div.innerHTML = `
      <p>${fruta.nombre}</p>
      <p>Precio: ${fruta.precio}$ *kg</p>
      <p>Cantidad: ${fruta.cantidad}kg</p>
      <button class="btn botonEliminar" value="${fruta.id}">Quitar del carrito</button>
  `
  contenedor.appendChild(div);
  actualizarTotalesCarrito(carrito);
};
// Botones de eliminar
carritoFrutas.addEventListener('click', (e) => {
  e.stopPropagation();
  if (e.target.classList.contains('botonEliminar')) {
      const frutaId = e.target.value;
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

const comprarTotal = () => {
  localStorage.clear();
  carrito = [];
  pintarCarrito(carrito);
  actualizarTotalesCarrito(carrito);
  Swal.fire({
    title: 'Gracias por tu compra, crack!',
    timer: 1500, 
    showConfirmButton: false, 
    timerProgressBar: false 
  });
}

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