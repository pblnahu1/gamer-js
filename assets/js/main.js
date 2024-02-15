let btnCarrito = document.getElementById("btn-carrito");
let miContenedorCarrito = document.getElementById("mi-carrito");
let btnFavorito = document.getElementById("btn-favorito");
let miContenedorFavorito = document.getElementById("mis-favoritos");
let btnPerfil = document.getElementById("btn-perfil");
let miContenedorPerfil = document.getElementById("mi-perfil");

fetch('assets/js/productos.json')
  .then(response => response.json())
  .then(data => {

});

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
  console.log(btnCarrito);

  btnFavorito.addEventListener("click", () => {
    if (miContenedorFavorito.style.display == "none") {
      miContenedorFavorito.style.display = "block";
      miContenedorCarrito.style.display = "none";
      miContenedorPerfil.style.display = "none";

    } else {
      miContenedorFavorito.style.display = "none";
    }
  });
  console.log(btnFavorito);

  btnPerfil.addEventListener("click", () => {
    if (miContenedorPerfil.style.display == "none") {
      miContenedorPerfil.style.display = "block";
      miContenedorFavorito.style.display = "none";
      miContenedorCarrito.style.display = "none";
    } else {
      miContenedorPerfil.style.display = "none";
    }
  });
  console.log(btnPerfil);
}

// Solucionar este error de bloqueo por CORS
const seleccion_paises_nav = () => {
  // Lógica, puede ser usando una api para crear <option> de paises del mundo
  // http://country.io/names.json
  
  let selector = document.getElementById("list-country");
  
  const apiUrl = 'http://localhost:3000/api/countries';

  // Hacer una solicitud a la API: {mode:'cors'} especifica el modo de la solicitud
  fetch(apiUrl, {mode:'cors'})
    .then(response => response.json())
    .then(data => {
      // Iterar sobre los datos de la API y agregar a los option
      for (const countryCode in data) {
        if (data.hasOwnProperty(countryCode)) {
          const countryName = data[countryCode];
          let newElementOption = document.createElement("option");
          newElementOption.value = countryCode;
          newElementOption.textContent = countryName;
          selector.appendChild(newElementOption);
        }
      }
    })
    .catch (error => console.error('Error al leer la API', error));
}

// const agregar_productos_carrito = () => {
  
// }

const render = () => {
  mostrarVentanasNav();
  seleccion_paises_nav();
}

render();




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