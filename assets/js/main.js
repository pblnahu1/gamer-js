
const btnCarrito = document.getElementById("btn-carrito");
const miContenedorCarrito = document.getElementById("mi-carrito");
const btnFavorito = document.getElementById("btn-favorito");
const miContenedorFavorito = document.getElementById("mis-favoritos");
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


// En esta función hago uso de API Fetch para obtener datos de mi JSON
const products_json_carrito = () => {

  document.addEventListener('DOMContentLoaded', function () {
    fetch('assets/js/productos.json')
      .then(response => response.json())
      .then(data => {

        let cantidadInfo = document.querySelectorAll(".btn-cantidades");
        const botones_carrito = document.querySelectorAll(".btn-agregar-carrito");
        const msg_carrito = document.querySelector(".msg-carrito");
        const boton_comprar = document.getElementById("btn-finalizar-compra");
        let total = 0;
        let cantidadesDisponibles;


        if (botones_carrito.length > 0 && cantidadInfo.length > 0) {
          botones_carrito.forEach((boton, index) => {
            boton.addEventListener('click', () => {
              agregarAlCarrito(boton, index);
            });
          });
        } else {
          console.warn("La NodeList de botones para agregar al carrito está vacía.");
        }


        const agregarAlCarrito = (boton, index) => {
          const producto = data[index];
          msg_carrito.style.display = "none";
          if (producto) {
            cantidadesDisponibles = producto.cantidad;
            if (cantidadesDisponibles !== 0) {
              producto.cantidad--;

              let contenido_producto_carrito = document.createElement('div');
              contenido_producto_carrito.classList.add('productos-carrito');
              contenido_producto_carrito.id = `id-prod-carrito-${index}`;
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
                eliminar_producto_carrito(index);
              }
              boton_remover_producto.innerHTML = `
                <i class="fas fa-trash" style="color:red";></i>
              `;
              contenedor_info_carrito.appendChild(boton_remover_producto);

              console.info(`Agregado al carrito: \nID del Botón: '${boton.id}',\nNombre Producto: '${producto.producto}',\nÍndice: [${index}],\nCantidad Disponible Original: '${cantidadesDisponibles}',\nCantidad Disponible Actual: '${cantidadesDisponibles - 1}'`);

              console.log(producto);
            } else {
              console.warn(`Ya no quedan productos disponibles de ${producto.producto}`);
            }
          } else {
            console.warn(`No se encontró el producto correspondiente al índice [${index}]`);
          }
        }


        const eliminar_producto_carrito = (index) => {
          const productoEliminado = data[index];
          productoEliminado.cantidad++;
          if (productoEliminado) {
            if (cantidadInfo.length > 0) {
              cantidadInfo.forEach((btn, i) => {
                const productoCant = data[i];
                if (productoCant) {
                  let idCantidad = document.getElementById(btn.id);
                  if (idCantidad) {
                    idCantidad.innerHTML = `Cantidad: ${productoCant.cantidad}`;
                  } else {
                    console.warn("Ocurrió un error al intentar actualizar las Cantidades Disponibles");
                  }
                } else {
                  console.warn("Hubo un error al acceder a los datos del JSON para las Cantidades Disponibles");
                }
              });
            } else {
              console.warn("Ha ocurrido un error: No hay elementos para los botones de cantidades.");
            }
          } else {
            console.warn("Hubo un error al acceder a los datos del JSON para los Productos Eliminados");
          }

          console.info(`Se ha eliminado del carrito el Producto '${productoEliminado.producto}' y ahora hay '${productoEliminado.cantidad}' disponibles`);

          let producto_eliminado = document.getElementById(`id-prod-carrito-${index}`);
          if (producto_eliminado) {
            producto_eliminado.remove();
          } else {
            console.warn(`No ha sido posible eliminar el producto '${productoEliminado.producto}' del carrito`);
          }
        }
      })
      .catch(error => console.error('No ha sido posible agregar productos al carrito', error));
  });
}


const productos_json_favoritos = () => { /* code */}


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
      console.log('Datos de la API Country: ', data);

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
  productos_json_favoritos(); // Realizar esta función
}

render();