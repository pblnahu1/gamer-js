
import { miContenedorProductosAgregadosCarrito } from "./main.mjs";

const d = document;

export const products_json_carrito = () => {
  d.addEventListener('DOMContentLoaded', function () {
    fetch('assets/js/productos.json')
      .then(response => (response.ok ? response.json() : Promise.reject(`HTTP error! Status: ${response.status}`)))
      .then(data => {

        let cantidadInfo = d.querySelectorAll(".btn-cantidades");
        const botones_carrito = d.querySelectorAll(".btn-agregar-carrito");
        const msg_carrito = d.querySelector(".msg-carrito");
        const boton_comprar = d.getElementById("btn-finalizar-compra");
        let txt_total_productos = d.getElementById("total");

        let total = 0; // variable inicializada en cero para calcular el total.
        let productos_agregados_count = 0; // incrementa en el ícono los productos agregados.
        let productosAgregados = {}; // Objeto para llevar la cuenta de los productos agregados

        const agregarAlCarrito = (boton, index) => {
          const producto = data[index];
          if (producto) {
            if (!productosAgregados[producto.id]) {
              productosAgregados[producto.id] = 0;
            }

            if (producto.cantidad > 0) {
              producto.cantidad--;

              let productosCarrito = d.getElementById(`id-prod-carrito-${index}`);
              if (productosCarrito) {
                let cantidadSpanProductos = productosCarrito.querySelector('.cantidad-producto-carrito');
                cantidadSpanProductos.textContent = parseInt(cantidadSpanProductos.textContent) + 1;
              } else {
                let contenido_producto_carrito = d.createElement('div');
                contenido_producto_carrito.classList.add('productos-carrito');
                contenido_producto_carrito.id = `id-prod-carrito-${index}`;
                miContenedorProductosAgregadosCarrito.appendChild(contenido_producto_carrito);

                let cantidad_productos_agregados_span = d.createElement('span');
                cantidad_productos_agregados_span.classList.add('cantidad-producto-carrito');
                cantidad_productos_agregados_span.textContent = '1';
                contenido_producto_carrito.appendChild(cantidad_productos_agregados_span);

                let contenedor_imagen_producto = d.createElement("div");
                contenedor_imagen_producto.classList.add('div-img-carrito', 'prod-carr');
                contenedor_imagen_producto.id = "id-img-carrito";
                contenido_producto_carrito.appendChild(contenedor_imagen_producto);

                let imagen_producto_carrito = d.createElement("img");
                imagen_producto_carrito.src = producto.url;
                imagen_producto_carrito.alt = producto.producto;
                contenedor_imagen_producto.appendChild(imagen_producto_carrito);

                let contenedor_info_carrito = d.createElement("div");
                contenedor_info_carrito.classList.add('div-info-carrito', 'prod-carr');
                contenedor_info_carrito.id = "id-info-carrito";
                contenido_producto_carrito.appendChild(contenedor_info_carrito);

                let contenedor_nombre_precio_producto = d.createElement("div");
                contenedor_nombre_precio_producto.classList.add('div-nombre-precio-producto');
                contenedor_nombre_precio_producto.id = "id-nombre-precio-producto";
                contenedor_nombre_precio_producto.innerHTML = `
                  <span class="span-nombre">${producto.producto}</span>
                  <span class="span-precio">$${producto.precio}</span>
                `;
                contenedor_info_carrito.appendChild(contenedor_nombre_precio_producto);

                let contenedor_btn_eliminar_producto_carrito = d.createElement("div");
                contenedor_btn_eliminar_producto_carrito.classList.add('div-btn-eliminar-producto-carrito');
                contenedor_btn_eliminar_producto_carrito.id = "id-btn-eliminar-producto-carrito";
                contenedor_info_carrito.appendChild(contenedor_btn_eliminar_producto_carrito);

                let boton_remover_producto = d.createElement("button");
                boton_remover_producto.classList.add("btn-remover-producto");
                boton_remover_producto.onclick = () => {
                  eliminar_producto_carrito(index);
                }
                boton_remover_producto.innerHTML = `
                  <i class="fas fa-trash" style="color:red";></i>
                `;
                contenedor_btn_eliminar_producto_carrito.appendChild(boton_remover_producto);
              }

              let precio_producto = parseInt(`${producto.precio}`);
              total += precio_producto;
              actualizarTotal();

              productosAgregados[producto.id]++;
              productos_agregados_count++;
              numero_productos_agregados();

              console.info(`Agregado al carrito: \nID del Botón: '${boton.id}',\nNombre Producto: '${producto.producto}',\nÍndice: [${index}],\nCantidad Disponible Original: '${producto.cantidad + 1}',\nCantidad Disponible Actual: '${producto.cantidad}'`);

            } else {
              console.warn(`Ya no quedan productos disponibles de ${producto.producto}`);
              const showAlert = () => {
                Swal.fire({
                  title: `Sin stock`,
                  text: `Ya no hay mas productos de "${producto.producto}" en stock.`,
                  icon: 'warning',
                  confirmButtonText: 'Ok'
                });
              };

              showAlert();
            }
          } else {
            console.warn(`No se encontró el producto correspondiente al índice [${index}]`);
          }
        };

        const numero_productos_agregados = () => {
          let $numeroIncrementador = d.getElementById("numero-prod-carrito");
          $numeroIncrementador.textContent = productos_agregados_count;
        };

        const actualizarTotal = () => {
          txt_total_productos.innerText = `Total: $${total}`;
        };

        const eliminar_producto_carrito = (index) => {
          const productoEliminado = data[index];
          productoEliminado.cantidad++;
          let precioEliminado = productoEliminado.precio;
          total -= precioEliminado;
          productos_agregados_count--;
          numero_productos_agregados();
          actualizarTotal();

          let productoCarrito = d.getElementById(`id-prod-carrito-${index}`);
          if (productoCarrito) {
            let cantidadSpan = productoCarrito.querySelector('.cantidad-producto-carrito');
            let cantidadActual = parseInt(cantidadSpan.textContent);
            if (cantidadActual > 1) {
              cantidadSpan.textContent = cantidadActual - 1;
            } else {
              productoCarrito.remove();
            }
          }

          console.log(`Se eliminó del carrito el Producto '${productoEliminado.producto}' y ahora hay '${productoEliminado.cantidad}' disponibles.`);
        };

        let clickContador = 0;
        if (botones_carrito.length > 0 &&
          botones_carrito.length >= 1 &&
          cantidadInfo.length > 0 &&
          botones_carrito.length === cantidadInfo.length
        ) {
          botones_carrito.forEach((boton, index) => {
            boton.addEventListener('click', () => {
              clickContador++;
              console.log(`El usuario ha hecho click ${clickContador} veces`);
              agregarAlCarrito(boton, index);
            });
          });
        } else {
          console.warn("La NodeList de botones para agregar al carrito está vacía.");
        }

        boton_comprar.addEventListener("click", e => {
          const showAlert = () => {
            Swal.fire({
              title: `Compra realizada`,
              text: `Pagaste un total de: $${total}`,
              icon: 'success',
              confirmButtonText: 'Ok'
            });
          };

          showAlert();

          total = 0;
          txt_total_productos.innerText = `Total: $${total}`;

          const $numeroIncrementador = d.getElementById("numero-prod-carrito");
          $numeroIncrementador.textContent = productos_agregados_count = 0;

          const $productosEnCarrito = d.querySelectorAll(".productos-carrito");
          $productosEnCarrito.forEach(producto => {
            producto.remove();
          });

          if ($productosEnCarrito.length === 0) msg_carrito.style.display = "block";

          e.preventDefault();
        });
      })
      .catch(error => console.error('No ha sido posible agregar productos al carrito', error));
  });
}

export default products_json_carrito;
