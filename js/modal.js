const modalCanasta = document.querySelector('.modalCanasta');
const abrirCanasta = document.getElementById('abrir-canasta');
const cerrarCanasta = document.getElementById('cerrar-canasta');
const comprar = document.getElementById('comprar');


abrirCanasta.addEventListener('click', () => {
  modalCanasta.classList.toggle('modal-activo')
});

cerrarCanasta.addEventListener('click', () => {
  modalCanasta.classList.toggle('modal-activo')
});

comprar.addEventListener('click', () => {
  const precioTotalElement = document.getElementById('precioTotal');
  let precioTotalValue = 0;
  try {
    precioTotalValue = parseFloat(precioTotalElement.innerText);
  } catch (error) {
    console.error("Error parseando el precio total:", error);
    Swal.fire("Ha ocurrido un error. Verifique el precio total.");
    return; 
  }
  if (precioTotalValue <= 0) {
    Swal.fire("El carrito está vacío");
  } else {
    comprarTotal();
  }
});