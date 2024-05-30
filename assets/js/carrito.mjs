// Para usar los import y export, a los archivos deben terminar con `.mjs`
import { miContenedorProductosAgregadosCarrito } from "./main.mjs";

const d = document;

// En esta función hago uso de API Fetch para obtener datos de mi JSON
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
        
        let cantidadesDisponibles; // variable que verifica, según la clave "Cantidad" del JSON, cuantos productos quedan para agregar al carrito y lo muestro en consola también.


        if (botones_carrito.length > 0 && cantidadInfo.length > 0) {
          botones_carrito.forEach((boton, index) => {
            boton.addEventListener('click', () => {
              agregarAlCarrito(boton, index);
            });
          });
        } else {
          console.warn("La NodeList de botones para agregar al carrito está vacía.");
        }


        agregarAlCarrito = (boton, index) => {
          const producto = data[index];
          console.log(producto)
          msg_carrito.style.display = "none";
          
          if (producto) {
            cantidadesDisponibles = producto.cantidad;
            if (cantidadesDisponibles !== 0) {
              producto.cantidad--;

              let contenido_producto_carrito = d.createElement('div');
              contenido_producto_carrito.classList.add('productos-carrito');
              contenido_producto_carrito.id = `id-prod-carrito-${index}`;
              miContenedorProductosAgregadosCarrito.appendChild(contenido_producto_carrito);

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

              console.info(`Agregado al carrito: \nID del Botón: '${boton.id}',\nNombre Producto: '${producto.producto}',\nÍndice: [${index}],\nCantidad Disponible Original: '${cantidadesDisponibles}',\nCantidad Disponible Actual: '${cantidadesDisponibles - 1}'`);

              console.log(producto);

              // const toNumber = (precio) => { return parseInt(precio) };
              let precio_producto = parseInt(`${producto.precio}`);
              total += precio_producto;
              console.log(total);
              productos_agregados_count++;
              numero_productos_agregados();
              actualizarTotal();

              
            } else {
              console.warn(`Ya no quedan productos disponibles de ${producto.producto}`);
            }
          } else {
            console.warn(`No se encontró el producto correspondiente al índice [${index}]`);
          }
        }

        const numero_productos_agregados = () => {
          let $numeroIncrementador = d.getElementById("numero-prod-carrito");
          $numeroIncrementador.textContent = productos_agregados_count;
        }


        const actualizarTotal = () => {
          txt_total_productos.innerText = `Total: $${total}`;
        }


        const eliminar_producto_carrito = (index) => {
          const productoEliminado = data[index];
          productoEliminado.cantidad++;
          let precioEliminado = productoEliminado.precio;
          total -= precioEliminado;
          productos_agregados_count--;
          numero_productos_agregados();
          actualizarTotal();
          if (productoEliminado) {
            if (cantidadInfo.length > 0) {
              cantidadInfo.forEach((btn, i) => {
                const productoCant = data[i];
                if (productoCant) {
                  let idCantidad = d.getElementById(btn.id);
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

          let producto_eliminado = d.getElementById(`id-prod-carrito-${index}`);
          if (producto_eliminado) {
            producto_eliminado.remove();
            const productosEnCarrito = d.querySelectorAll('.productos-carrito');
            if (productosEnCarrito.length === 0) {
              msg_carrito.style.display = "block";
            }
          } else {
            console.warn(`No ha sido posible eliminar el producto '${productoEliminado.producto}' del carrito`);
          }
        }

        boton_comprar.addEventListener("click", e => {
          const showAlert = () => {
            Swal.fire({
              title: `Compra realizada`,
              text: `Pagaste un total de: $${total}`,
              icon: 'success', // Puedes cambiar esto a 'success', 'warning', 'error', etc.
              confirmButtonText: 'Ok'
            });
          };

          showAlert();

          total = 0
          txt_total_productos.innerText = `Total: $${total}`;

          const $numeroIncrementador = d.getElementById("numero-prod-carrito");
          $numeroIncrementador.textContent = productos_agregados_count = 0;

          const $productosEnCarrito = d.querySelectorAll(".productos-carrito");
          $productosEnCarrito.forEach(producto => {
            producto.remove()
          })

          if ($productosEnCarrito.length === 0) msg_carrito.style.display = "block";

          e.preventDefault(); // para prevenir un comportamiento indebido del evento
        })
      })
      .catch(error => console.error('No ha sido posible agregar productos al carrito', error));
  });
}

export default products_json_carrito;