let contenedor_categorias = document.getElementById("main-categorias");
let seccion_categorias_productos = document.querySelectorAll(".sct-categorias-productos");
let seccion_productos = document.querySelectorAll(".contenedor-categorias");

let txt_array = ["Consolas", "Accesorios", "Videojuegos"];

fetch('assets/js/productos.json')
  .then(response => response.json())
  .then(data => {
    // Recorro cada posicion, cuando llega al for, crea elementos "div" para ese índice y esa sección
    txt_array.forEach((categoria_actual, index) => {
      // console.log(txt_array);
      console.log(categoria_actual); // el indice donde estoy parado
      // console.log(index);
      
      let seccion = seccion_productos[index]; // recorro cada section
      console.log(seccion);
      
      let productos_categoria = data.filter(producto => producto.url.includes(categoria_actual.toLowerCase())); // busca en el json si la key "url" tiene el índice valor esperado, por ejemplo 'Consolas'
      console.log(productos_categoria);

      for (let i = 0; i < productos_categoria.length && i < 5; i++) {
        // console.log(i);
      
        let producto = productos_categoria[i]; 

        let cards = document.createElement("div");
        cards.classList.add("card");
        seccion.appendChild(cards);

        let cards2 = document.createElement("div");
        cards2.classList.add("card2");
        cards.appendChild(cards2);

        let newContentImage = document.createElement("div");
        newContentImage.classList.add("content-image");
        newContentImage.id = `image-${categoria_actual}-${i}`;
        cards2.appendChild(newContentImage);
        console.log(newContentImage);

        let image = document.createElement("img");
        image.src = producto.url;
        image.alt = producto.producto;
        newContentImage.appendChild(image);

        let newContentName = document.createElement("div");
        newContentName.classList.add("content-name");
        newContentName.id = `name-${categoria_actual}-${i}`;
        cards2.appendChild(newContentName);
        console.log(newContentName);

        let productName = document.createElement("p");
        productName.textContent = producto.producto;
        newContentName.appendChild(productName);

        let newContentPrice = document.createElement("div");
        newContentPrice.classList.add("content-price");
        newContentPrice.id = `price-${categoria_actual}-${i}`;
        cards2.appendChild(newContentPrice);
        console.log(newContentPrice);

        let price = document.createElement("p");
        price.textContent = `$${producto.precio}`;
        newContentPrice.appendChild(price);

        let newContentButtons = document.createElement("div");
        newContentButtons.classList.add("content-buttons");
        newContentButtons.id = `button-${categoria_actual}-${i}`;
        cards2.appendChild(newContentButtons);

        let btnCarrito = document.createElement("button");
        btnCarrito.classList.add("btn-agregar-carrito", "botones-productos");
        btnCarrito.id = "boton-carrito";
        btnCarrito.innerHTML = `
          <i class="fa-solid fa-cart-shopping"></i>
          <span>Agregar al carrito</span>
        `;
        let btnFavorito = document.createElement("button");
        btnFavorito.classList.add("btn-agregar-favorito", "botones-productos");
        btnFavorito.id = "boton-favorito";
        btnFavorito.innerHTML = `
          <i class="fa-solid fa-heart"></i>
          <span>Agregar a Favoritos</span>
        `;
        let btnCantidad = document.createElement("button");
        btnCantidad.classList.add("btn-cantidades", "botones-productos");
        btnCantidad.id = "boton-cantidad";
        btnCantidad.innerHTML = `
          <span>Cantidad: 0</span>
        `;

        newContentButtons.appendChild(btnCarrito);
        newContentButtons.appendChild(btnFavorito);
        newContentButtons.appendChild(btnCantidad);
      }
    });
  });

for (let i = 1; i <= 3; i++) {
  let nuevoContenedor = document.createElement("div");
  nuevoContenedor.classList.add("items");
  nuevoContenedor.id = `id-item-${i}`;
  nuevoContenedor.innerHTML = `<span>${txt_array[i - 1]}</span>`;

  seccion_categorias_productos[i - 1].id = `seccion-productos-categorias-${i}`;

  nuevoContenedor.addEventListener("click", () => {
    // obtengo la seccion con su id
    let seccion = document.getElementById(`seccion-productos-categorias-${i}`);
    seccion.scrollIntoView({ behavior: "smooth" });
  });

  contenedor_categorias.appendChild(nuevoContenedor);
}

