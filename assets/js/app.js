let contenedor_categorias = document.getElementById("main-categorias");
let seccion_productos = document.querySelectorAll(".contenedor-categorias");
let seccion_categorias_productos = document.querySelectorAll(".sct-categorias-productos");

let txt_array = ["Consolas", "Accesorios", "Videojuegos"];

fetch('assets/js/productos.json')
  .then(response => response.json())
  .then(data => {
    seccion_productos.forEach(seccion => {
      for (let i = 1; i <= 5; i++) {
        let cards = document.createElement("div");
        cards.classList.add("card");
        seccion.appendChild(cards);

        let cards2 = document.createElement("div");
        cards2.classList.add("card2");
        cards.appendChild(cards2);
      }
    });
  });

for (let i = 1; i <= 3; i++) {
  let nuevoContenedor = document.createElement("div");
  nuevoContenedor.classList.add("items");
  nuevoContenedor.id = `id-item-${i}`;
  nuevoContenedor.innerHTML = `<span>${txt_array[i - 1]}</span>`;
  
  seccion_categorias_productos[i-1].id = `seccion-productos-categorias-${i}`;

  nuevoContenedor.addEventListener("click", () => {
    // obtengo la seccion con su id
    let seccion = document.getElementById(`seccion-productos-categorias-${i}`);
    seccion.scrollIntoView({ behavior: "smooth" });
  });

  contenedor_categorias.appendChild(nuevoContenedor);
}






