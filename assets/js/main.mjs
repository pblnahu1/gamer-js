import products_json_favoritos from "./fav.mjs";
import products_json_carrito from "./carrito.mjs";

const btnCerrarNav = document.getElementById("btn-cerrar-nav");

const btnCarrito = document.getElementById("btn-carrito");
const miContenedorCarrito = document.getElementById("mi-carrito");
export const miContenedorProductosAgregadosCarrito = document.getElementById("contenedor-carrito");

const btnFavorito = document.getElementById("btn-favorito");
const miContenedorFavorito = document.getElementById("mis-favoritos");
export const miContenedorProductosAgregadosFavoritos = document.getElementById("contenedor-fav");


const btnPerfil = document.getElementById("btn-perfil");
const miContenedorPerfil = document.getElementById("mi-perfil");


const mostrarVentanasNav = () => {
  // `toggle` y `remove`
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


// Solucionar este error de bloqueo por CORS: SOLUCIONADO ⭐
// Esta funcion se relaciona gracias al localhost, lógica implementada en `server.js`
const seleccion_paises_nav = () => {

  const selector = document.getElementById("list-country");
  const apiUrl = 'http://localhost:3000/names.json'; // http://country.io/names.json

  // Hacer una solicitud a la API: {mode:'cors'} especifica el modo de la solicitud
  fetch(apiUrl, { mode: 'cors' })
    // .then(response => (response.ok ? response.json() : Promise.reject(`HTTP error! Status: ${response.status}`)))
    .then(response => {
      if (!response) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Datos de la API Country para Carrito: ', data);

      const countryCodes = Object.keys(data).sort(); // ordeno alfabéticamente
      // Iterar sobre los datos de la API y agregar a los option
      if (countryCodes) {
        countryCodes.forEach(countryCode => { // for (const countryCode in data)
          if (data.hasOwnProperty(countryCode)) { // si `data` tiene la propiedad especificada según `countryCode`
            const countryName = data[countryCode]; // accedo a la propiedad existente del objeto.
            let newElementOption = document.createElement("option");
            newElementOption.value = countryCode;
            newElementOption.textContent = countryName;
            selector.appendChild(newElementOption);
          } else {
            console.warn("Error: Se esperaba una respuesta de parte la API para agregar los datos a las etiquetas 'option'.");
          }
        });
      } else {
        console.warn("Ocurrió un error al ordenar alfabéticamente.");
      }

    })
    .catch(error => console.error('Error al realizar la solicitud a la API...', error));
}



const render = () => {
  mostrarVentanasNav();
  seleccion_paises_nav();
  products_json_carrito();
  products_json_favoritos();
}

render();