let btnCarrito = document.getElementById("btn-carrito");
let btnFavorito = document.getElementById("btn-favorito");
let miContenedorCarrito = document.getElementById("mi-carrito");
let miContenedorFavorito = document.getElementById("mis-favoritos");
let btnPerfil = document.getElementById("btn-perfil");
let miContenedorPerfil = document.getElementById("mi-perfil");

const mostrarVentanasNav = () => {
  // También puedo usar la clase `toggle` y `remove`
  btnCarrito.addEventListener("click", () => {
    if (miContenedorCarrito.style.display == "none") {
      miContenedorCarrito.style.display = "block";
      miContenedorFavorito.style.display = "none";
      miContenedorPerfil.style.display = "none";
    } else {
      miContenedorCarrito.style.display = "none";
    }
  });

  btnFavorito.addEventListener("click", () => {
    if (miContenedorFavorito.style.display == "none") {
      miContenedorFavorito.style.display = "block";
      miContenedorCarrito.style.display = "none";
      miContenedorPerfil.style.display = "none";

    } else {
      miContenedorFavorito.style.display = "none";
    }
  });

  btnPerfil.addEventListener("click", () => {
    if (miContenedorPerfil.style.display == "none") {
      miContenedorPerfil.style.display = "block";
      miContenedorFavorito.style.display = "none";
      miContenedorCarrito.style.display = "none";
    } else {
      miContenedorPerfil.style.display = "none";
    }
  });
}

const seleccion_paises_nav = () => {
  // Lógica, puede ser usando una api para crear <option> de paises del mundo
}

const render = () => {
  mostrarVentanasNav()
  seleccion_paises_nav()
}

render()


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