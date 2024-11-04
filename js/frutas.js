//Obtenemos las frutas
let frutas = [];

async function obtenerFrutas() {
  const response = await fetch("https://raw.githubusercontent.com/DarioVen/FruitiTiendaJs-VenenciaDario/refs/heads/main/data/stock.json");
  const frutasObtenidas = await response.json();
  return frutasObtenidas;
}

// Llamamos a la función y asignamos el resultado al array
async function llenarArrayFrutas() {
  const frutasObtenidas = await obtenerFrutas();
  frutas.push(...frutasObtenidas); // Usamos spread operator para agregar todos los elementos
}
llenarArrayFrutas();

//Agregamos las frutas al DOM
const pintarFrutas = async () => {
  const contenedor = document.getElementById("contenedorFrutas");
  const frutas = await obtenerFrutas();

  frutas.forEach(fruta => {
    const div = document.createElement('div');
    div.classList.add("card");
    div.innerHTML += `<img src=${fruta.img} class="card-img-top" alt=${fruta.nombre}>
                      <div class="card-body">
                      <h3 class="card-title">${fruta.nombre}</h3>
                      <p>${fruta.precio}$ * Kg</p>
                        <input type="number" class="kgFruta${fruta.id} w-100 mb-1" placeholder="Kilogramos">
                        <button type="submit" class="btn btn-primary añadir w-100" id="${fruta.id}">Añadir al carrito</button>
                      </div>
                      `
    contenedor.appendChild(div);
  });
};
