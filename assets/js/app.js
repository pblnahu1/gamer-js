let contenedor_categorias = document.getElementById("main-categorias");

// let txt_array = ["Consolas", "Accesorios", "Videojuegos"];

for (let i = 1; i <= 3; i++) {
    let nuevoContenedor = document.createElement("div");
    nuevoContenedor.classList.add("items");
    nuevoContenedor.id = `id-item-${i}`;
    contenedor_categorias.appendChild(nuevoContenedor);
}



