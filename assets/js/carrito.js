let carrito = document.getElementById("btn-carrito");
let header = document.querySelector("nav");
let list = document.getElementById("list-cart");

fetch('assets/js/productos.json')
  .then(response => response.json())
  .then(data => {
    carrito.forEach(e => {
      let newContent = document.createElement("div");
      newContent.classList.add("contenedor-carrito", "content-products-header");
      newContent.id = "contenedor-carrito";
      newContent.style.display = "block";

      newContent.style.top = header.offsetHeight + "px";
      newContent.style.display = "none";

      list.appendChild(newContent);

      newContent.style.display = "block";

      console.log(newContent);
    })
  });
