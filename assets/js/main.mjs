import products_json_favoritos from "./fav.mjs"
import products_json_carrito from "./carrito.mjs"

const d = document

const btnCarrito = d.getElementById("btn-carrito")
const miContenedorCarrito = d.getElementById("mi-carrito")
export const miContenedorProductosAgregadosCarrito = d.getElementById("contenedor-carrito")

const btnFavorito = d.getElementById("btn-favorito")
const miContenedorFavorito = d.getElementById("mis-favoritos")
export const miContenedorProductosAgregadosFavoritos = d.getElementById("contenedor-fav")

const btnCerrarNav = d.querySelectorAll(".btn-cerrar-nav")

const mostrarVentanasNav = () => {
  // `toggle` and `remove`
  btnCarrito.addEventListener("click", (e) => {
    if (miContenedorCarrito) {
      if (miContenedorCarrito.style.display === "none") {
        miContenedorCarrito.style.display = "block";
        miContenedorFavorito.style.display = "none";
      } else {
        miContenedorCarrito.style.display = "none";
      }
    }
    e.preventDefault();
  });


  btnFavorito.addEventListener("click", (e) => {
    if (miContenedorFavorito) {
      if (miContenedorFavorito.style.display === "none") {
        miContenedorFavorito.style.display = "block";
        miContenedorCarrito.style.display = "none";
      } else {
        miContenedorFavorito.style.display = "none";
      }
    }
    e.preventDefault();
  });
}

// when using querySelectorAll we need to iterate over the NodeList with a forEach
const ocultarVentanasNav = () => {
  if (btnCerrarNav) {
    btnCerrarNav.forEach((btn) => {
      if (btn) {
        btn.addEventListener("click", (e) => {
          if (miContenedorCarrito) {
            miContenedorCarrito.style.display = "none";
          }
          if (miContenedorFavorito) {
            miContenedorFavorito.style.display = "none";
          }
          e.preventDefault();
        });
      }
    });
  }
}

const render = () => {
  mostrarVentanasNav()
  products_json_carrito()
  products_json_favoritos()
  ocultarVentanasNav()
}

render()
