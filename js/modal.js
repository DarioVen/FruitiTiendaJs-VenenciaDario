const modalCanasta = document.querySelector('.modalCanasta');
const abrirCanasta = document.getElementById('abrir-canasta');
const cerrarCanasta = document.getElementById('cerrar-canasta');


abrirCanasta.addEventListener('click', () => {
  modalCanasta.classList.toggle('modal-activo')
});

cerrarCanasta.addEventListener('click', () => {
  modalCanasta.classList.toggle('modal-activo')
});
