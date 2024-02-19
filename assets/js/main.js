const btnCarrito = document.getElementById("btn-carrito");
const miContenedorCarrito = document.getElementById("mi-carrito");
const btnFavorito = document.getElementById("btn-favorito");
const miContenedorFavorito = document.getElementById("mis-favoritos");
const btnPerfil = document.getElementById("btn-perfil");
const miContenedorPerfil = document.getElementById("mi-perfil");

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

// En esta función hago uso de API Fetch para obtener datos de mi JSON
const products_json_carrito = () => {
  document.addEventListener('DOMContentLoaded', function () {
    fetch('assets/js/productos.json')
      .then(response => response.json())
      .then(data => {
        const botones_carrito = document.querySelectorAll(".btn-agregar-carrito");
        const msg_carrito = document.querySelector(".msg-carrito");
        const boton_comprar = document.getElementById("btn-finalizar-compra");
        let total = 0;

        if (botones_carrito.length > 0) {
          botones_carrito.forEach(function (boton, index) {
            console.info(`Botón con ID '${boton.id}' cumplió la condición.`);
            boton.addEventListener('click', function () {
              msg_carrito.style.display = "none";

              const producto = data[index];

              if (producto) {
                let contenido_producto_carrito = document.createElement('div');
                contenido_producto_carrito.classList.add('productos-carrito');
                contenido_producto_carrito.id = "id-prod-carrito";
                miContenedorCarrito.appendChild(contenido_producto_carrito);

                let contenedor_imagen_producto = document.createElement("div");
                contenedor_imagen_producto.classList.add('div-img-carrito', 'prod-carr');
                contenedor_imagen_producto.id = "id-img-carrito";
                contenido_producto_carrito.appendChild(contenedor_imagen_producto);

                let imagen_producto_carrito = document.createElement("img");
                imagen_producto_carrito.src = producto.url;
                imagen_producto_carrito.alt = producto.producto;
                contenedor_imagen_producto.appendChild(imagen_producto_carrito);

                let contenedor_info_carrito = document.createElement("div");
                contenedor_info_carrito.classList.add('div-info-carrito', 'prod-carr');
                contenedor_info_carrito.id = "id-info-carrito";

                contenedor_info_carrito.innerHTML = `
                    <span class="span-nombre">${producto.producto}</span>
                    <span class="span-precio">${producto.precio}</span>
                  `;
                contenido_producto_carrito.appendChild(contenedor_info_carrito);

                let boton_remover_producto = document.createElement("button");
                boton_remover_producto.classList.add("btn-remover-producto");
                boton_remover_producto.onclick = () => {
                  eliminar_producto_carrito(this);
                }
                boton_remover_producto.innerHTML = `
                    <i class="fas fa-trash" style="color:red";></i>
                  `;
                contenedor_info_carrito.appendChild(boton_remover_producto);

                console.info(`Agregado al carrito: \nID del Botón: '${boton.id}',\nNombre Producto: '${producto.producto}',\nÍndice: [${index}]`);
              } else {
                console.warn(`No se encontró el producto correspondiente al índice [${index}]`);
              }
            });
          });
        } else {
          console.warn(`La NodeList de botones para agregar al carrito está vacía.`);
        }
      })
      .catch(error => console.error('No ha sido posible agregar productos al carrito', error));
  });
}

const eliminar_producto_carrito = (btnEliminar) => {
  let producto_eliminado = btnEliminar.parentElement;
  producto_eliminado.remove();
}

// Solucionar este error de bloqueo por CORS: SOLUCIONADO ⭐
// Esta funcion se relaciona gracias al localhost, lógica implementada en `server.js`
const seleccion_paises_nav = () => {
  const selector = document.getElementById("list-country");
  const apiUrl = 'http://localhost:3000/names.json'; // http://country.io/names.json

  // Hacer una solicitud a la API: {mode:'cors'} especifica el modo de la solicitud
  fetch(apiUrl, { mode: 'cors' })
    .then(response => response.json())
    .then(data => {
      const countryCodes = Object.keys(data).sort(); // ordeno alfabéticamente
      // Iterar sobre los datos de la API y agregar a los option
      countryCodes.forEach(countryCode => { // for (const countryCode in data)
        if (data.hasOwnProperty(countryCode)) { // si `data` tiene la propiedad especificada según `countryCode`
          const countryName = data[countryCode]; // accedo a la propiedad existente del objeto.
          let newElementOption = document.createElement("option");
          newElementOption.value = countryCode;
          newElementOption.textContent = countryName;
          selector.appendChild(newElementOption);
        }
      });
    })
    .catch(error => console.error('Error al leer la API', error));
}

// Para ejecutar las funciones una vez inicializada la app
const render = () => {
  mostrarVentanasNav();
  seleccion_paises_nav();
  products_json_carrito();
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