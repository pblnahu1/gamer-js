let btnCarrito = document.getElementById("btn-carrito");
let miContenedorCarrito = document.getElementById("mi-carrito");

btnCarrito.addEventListener("click", () => {  
  if (miContenedorCarrito.style.display == "none") {
    miContenedorCarrito.style.display = "block";
  } else {
    miContenedorCarrito.style.display = "none";
  }
});

// fetch('assets/js/productos.json')
//   .then(response => response.json())
//   .then(data => {
//     carrito.forEach(e => {
//       let newContent = document.createElement("div");
//       newContent.classList.add("contenedor-carrito", "content-products-header");
//       newContent.id = "contenedor-carrito";
//       newContent.style.display = "block";

//       newContent.style.top = header.offsetHeight + "px";
//       newContent.style.display = "none";

//       list.appendChild(newContent);

//       newContent.style.display = "block";

//       console.log(newContent);
//     })
//   });




// btnCarrito.addEventListener("mouseenter", () => {
//   miCarrito.style.display = "block";
// });

// btnCarrito.addEventListener("mouseleave", () => {
//   miCarrito.style.display = "none";
// });

// miCarrito.addEventListener("mouseenter", () => {
//   miCarrito.style.display = "block";
// });

// miCarrito.addEventListener("mouseleave", () => {
//   miCarrito.style.display = "none";
// });