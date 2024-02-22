// Para usar los import y export, a los archivos deben terminar con `.mjs`
import { miContenedorProductosAgregadosCarrito } from "./main.mjs";

// En esta función hago uso de API Fetch para obtener datos de mi JSON
export const products_json_carrito = () => {
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
              miContenedorProductosAgregadosCarrito.appendChild(contenido_producto_carrito);

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
              contenido_producto_carrito.appendChild(contenedor_info_carrito);

              let contenedor_nombre_precio_producto = document.createElement("div");
              contenedor_nombre_precio_producto.classList.add('div-nombre-precio-producto');
              contenedor_nombre_precio_producto.id = "id-nombre-precio-producto";
              contenedor_nombre_precio_producto.innerHTML = `
                <span class="span-nombre">${producto.producto}</span>
                <span class="span-precio">$${producto.precio}</span>
              `;
              contenedor_info_carrito.appendChild(contenedor_nombre_precio_producto);

              let contenedor_btn_eliminar_producto_carrito = document.createElement("div");
              contenedor_btn_eliminar_producto_carrito.classList.add('div-btn-eliminar-producto-carrito');
              contenedor_btn_eliminar_producto_carrito.id = "id-btn-eliminar-producto-carrito";
              contenedor_info_carrito.appendChild(contenedor_btn_eliminar_producto_carrito);

              let boton_remover_producto = document.createElement("button");
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
            const productosEnCarrito = document.querySelectorAll('.productos-carrito');
            if (productosEnCarrito.length === 0) {
              msg_carrito.style.display = "block";
            }
          } else {
            console.warn(`No ha sido posible eliminar el producto '${productoEliminado.producto}' del carrito`);
          }
        }
      })
      .catch(error => console.error('No ha sido posible agregar productos al carrito', error));
  });
}

export default products_json_carrito;