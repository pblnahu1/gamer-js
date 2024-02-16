let btnCarrito = document.getElementById("btn-carrito");
let miContenedorCarrito = document.getElementById("mi-carrito");
let btnFavorito = document.getElementById("btn-favorito");
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

const products_json_carrito = () => {
  fetch('assets/js/productos.json')
    .then(response => response.json())
    .then(data => {
      agregar_productos_carrito(data);
    });
}

const agregar_productos_carrito = (datos) => {
  let botones_carrito = document.getElementById("boton-carrito");
  let msg_carrito = document.querySelector(".msg-carrito");
  // let total = document.getElementById("total");
  let boton_comprar = document.getElementById("btn-finalizar-compra");
  let total = 0;

  // botones_carrito.forEach((boton, index) => {
    botones_carrito.addEventListener("click", () => {
      msg_carrito.style.display = "none";

      let producto = datos[0];

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
        eliminarProducto(this);
      }
      boton_remover_producto.innerHTML = `
        <i class="fas fa-trash" style="color:red";></i>
      `;
      contenedor_info_carrito.appendChild(boton_remover_producto);
    });
  // });
}

// Solucionar este error de bloqueo por CORS: SOLUCIONADO ⭐
const seleccion_paises_nav = () => {
  let selector = document.getElementById("list-country");
  const apiUrl = 'http://localhost:3000/names.json'; // http://country.io/names.json

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