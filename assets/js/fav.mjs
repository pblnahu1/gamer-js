// Para usar los import y export, a los archivos deben terminar con `.mjs`
import { miContenedorProductosAgregadosFavoritos } from "./main.mjs";

// En esta función hago uso de API Fetch para obtener datos de mi JSON
export const products_json_favoritos = () => {
  document.addEventListener('DOMContentLoaded', () => {
    fetch('assets/js/productos.json')
      .then(response => (response.ok ? response.json() : Promise.reject(`HTTP error! Status: ${response.status}`)))
      .then(data => {
        console.log('Datos de la API Country para Favoritos: ', data);
      })
      .catch(error => console.error('No ha sido posible agregar productos a los Favoritos', error));
  });
}

export default products_json_favoritos;