import products_json_favoritos from "./fav.mjs";
import products_json_carrito from "./carrito.mjs";

const d = document;

const btnCarrito = d.getElementById("btn-carrito");
const miContenedorCarrito = d.getElementById("mi-carrito");
export const miContenedorProductosAgregadosCarrito = d.getElementById("contenedor-carrito");

const btnFavorito = d.getElementById("btn-favorito");
const miContenedorFavorito = d.getElementById("mis-favoritos");
export const miContenedorProductosAgregadosFavoritos = d.getElementById("contenedor-fav");

const btnPerfil = d.getElementById("btn-perfil");
const miContenedorPerfil = d.getElementById("mi-perfil");

const btnCerrarNav = d.getElementById("btn-cerrar-nav");

const mostrarVentanasNav = () => {
  // `toggle` y `remove`
  btnCarrito.addEventListener("click", (e) => {
    if (miContenedorCarrito.style.display == "none") {
      miContenedorCarrito.style.display = "block";
      miContenedorFavorito.style.display = "none";
      miContenedorPerfil.style.display = "none";
    } else {
      miContenedorCarrito.style.display = "none";
    }
    e.preventDefault();
  });
 

  btnFavorito.addEventListener("click", (e) => {
    if (miContenedorFavorito.style.display == "none") {
      miContenedorFavorito.style.display = "block";
      miContenedorCarrito.style.display = "none";
      miContenedorPerfil.style.display = "none";

    } else {
      miContenedorFavorito.style.display = "none";
    }
    e.preventDefault();
  });
  

  btnPerfil.addEventListener("click", (e) => {
    if (miContenedorPerfil.style.display == "none") {
      miContenedorPerfil.style.display = "block";
      miContenedorFavorito.style.display = "none";
      miContenedorCarrito.style.display = "none";
    } else {
      miContenedorPerfil.style.display = "none";
    }
    e.preventDefault();
  });
 
}


// Implementando función para seleccionar países con Promesas y la Fetch API
// Hace una solicitud a la API remota, maneja las promesas, ordena alfabéticamente los datos
// y actualiza un selector en la UI con las opciones correspondientes.
// 🤯 Solucionar este error de bloqueo por CORS: SOLUCIONADO ⭐
// Esta funcion se relaciona gracias al localhost, lógica implementada en `js/server.js`
const seleccion_paises_nav = () => {

  const selector = d.getElementById("list-country");
  const apiUrl = 'http://localhost:3000/names.json'; // http://country.io/names.json

  // Hacer una solicitud a la API: {mode:'cors'} especifica el modo de la solicitud
  fetch(apiUrl, { mode: 'cors' })
    // .then(response => (response.ok ? response.json() : Promise.reject(`HTTP error! Status: ${response.status}`)))
    // Verifico si la respuesta es exitosa, sino lanza un error
    .then(response => {
      console.log(response);
      if (!response) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Datos de la API Country para Carrito: ', data);

      const countryCodes = Object.keys(data).sort(); // Agarro las claves de los datos y ordeno alfabéticamente

      // Iterar sobre los datos de la API y agregar a los option
      if (countryCodes) {
        countryCodes.forEach(countryCode => { // for (const countryCode in data)
          if (data.hasOwnProperty(countryCode)) { // si `data` tiene la propiedad especificada según `countryCode`
            const countryName = data[countryCode]; // accedo a la propiedad existente del objeto.
            let newElementOption = d.createElement("option");
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