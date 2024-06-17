
import { miContenedorProductosAgregadosFavoritos } from "./main.mjs";

const d = document;
const $msg_favoritos = d.querySelector(".msg-favoritos");
let productos_favoritos_count = 0;

// Función para inicializar la carga del JSON y establcer los eventos
export const products_json_favoritos = () => {
  d.addEventListener('DOMContentLoaded', () => {
    fetch('assets/js/productos.json')
      .then(response => (response.ok ? response.json() : Promise.reject(`HTTP error! Status: ${response.status}`)))
      .then(data => {
        inicializarEventos(data);
      })
      .catch(error => console.error('No ha sido posible agregar productos a los Favoritos', error));
  });
}

// Inicializar los eventos de los botones de agregar a favoritos
const inicializarEventos = (data) => {
  const $botones_favoritos = d.querySelectorAll(".btn-agregar-favorito");
  if ($botones_favoritos.length > 0) {
    $botones_favoritos.forEach((boton, index) => {
      boton.addEventListener('click', () => {
        //console.log(`Botón de agregar a favoritos clickeado: ${boton.id}`);
        agregarAFavoritos(data, boton, index);
      });
    });
  } else {
    console.warn("La NodeList de botones para agregar a favoritos está vacía.");
  }
}

// Agregar un producto a favoritos
const agregarAFavoritos = (data,boton, index) => {
  const producto = data[index];
  if (producto) {
    let $productoFavorito = d.getElementById(`id-prod-favorito-${index}`);
    if ($productoFavorito) {
      Swal.fire({
        title: 'Advertencia',
        text: 'Este producto ya está en favoritos.',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
    } else {
      crearElementoProductoFavorito(producto, index);

      //console.info(`Agregado a favoritos: \nID del Botón: '${boton.id}',\nNombre Producto: '${producto.producto}',\nÍndice: [${index}]`);

      productos_favoritos_count++;
      numero_productos_favoritos();
    }
  } else {
    console.warn(`No se encontró el producto correspondiente al índice [${index}]`);
  }
};

// Crea el elemento del producto en favoritos
const crearElementoProductoFavorito = (producto, index) => {
  let $contenido_producto_favorito = d.createElement('div');
  $contenido_producto_favorito.classList.add('productos-favoritos');
  $contenido_producto_favorito.id = `id-prod-favorito-${index}`;
  miContenedorProductosAgregadosFavoritos.appendChild($contenido_producto_favorito);

  let $cantidad_productos_favoritos_span = d.createElement('span');
  $cantidad_productos_favoritos_span.classList.add('cantidad-producto-favorito');
  $cantidad_productos_favoritos_span.textContent = '1';
  $contenido_producto_favorito.appendChild($cantidad_productos_favoritos_span);

  let $contenedor_imagen_producto = d.createElement("div");
  $contenedor_imagen_producto.classList.add('div-img-favoritos', 'prod-fav');
  $contenedor_imagen_producto.id = "id-img-favoritos";
  $contenido_producto_favorito.appendChild($contenedor_imagen_producto);

  let $imagen_producto_favorito = d.createElement("img");
  $imagen_producto_favorito.src = producto.url;
  $imagen_producto_favorito.alt = producto.producto;
  $contenedor_imagen_producto.appendChild($imagen_producto_favorito);

  let $contenedor_info_favorito = d.createElement("div");
  $contenedor_info_favorito.classList.add('div-info-favoritos', 'prod-fav');
  $contenedor_info_favorito.id = "id-info-favoritos";
  $contenido_producto_favorito.appendChild($contenedor_info_favorito);

  let $contenedor_nombre_precio_producto = d.createElement("div");
  $contenedor_nombre_precio_producto.classList.add('div-nombre-precio-producto');
  $contenedor_nombre_precio_producto.id = "id-nombre-precio-producto";
  $contenedor_nombre_precio_producto.innerHTML = `
    <span class="span-nombre">${producto.producto}</span>
    <span class="span-precio">$${producto.precio}</span>
  `;
  $contenedor_info_favorito.appendChild($contenedor_nombre_precio_producto);

  let $contenedor_btn_eliminar_producto_favorito = d.createElement("div");
  $contenedor_btn_eliminar_producto_favorito.classList.add('div-btn-eliminar-producto-favoritos');
  $contenedor_btn_eliminar_producto_favorito.id = "id-btn-eliminar-producto-favoritos";
  $contenedor_info_favorito.appendChild($contenedor_btn_eliminar_producto_favorito);

  let $boton_remover_producto = d.createElement("button");
  $boton_remover_producto.classList.add("btn-remover-producto");
  $boton_remover_producto.onclick = () => {
    eliminar_producto_favorito(index);
  }
  $boton_remover_producto.innerHTML = `
    <i class="fas fa-trash" style="color:red";></i>
  `;
  $contenedor_btn_eliminar_producto_favorito.appendChild($boton_remover_producto);
}

// Actualiza el número de productos agregados en el carrito (icono)
const numero_productos_favoritos = () => {
  let $numeroIncrementador = d.getElementById("numero-prod-favoritos");
  if ($numeroIncrementador) {
    $numeroIncrementador.textContent = productos_favoritos_count;
  } else {
    console.warn("Elemento de número de productos favoritos no encontrado.");
  }
};

// Elimina el producto de favoritos
const eliminar_producto_favorito = (index) => {
  const $productoFavorito = d.getElementById(`id-prod-favorito-${index}`);
  if ($productoFavorito) {
    $productoFavorito.remove();

    productos_favoritos_count--;
    numero_productos_favoritos();

    //console.info(`Se ha eliminado de favoritos el Producto con índice [${index}]`);
  } else {
    console.warn(`No ha sido posible eliminar el producto con índice [${index}] de favoritos`);
  }
};

export default products_json_favoritos;
