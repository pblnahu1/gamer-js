// npm install express cors

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = 3000;

// habilito cors para todas las solicitudes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Puedes cambiar '*' por el origen específico de tu aplicación
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// agrego middleware de proxy para redirigir las solicitudes de API remota
app.use('/api/countries', createProxyMiddleware({ target: 'http://country.io', changeOrigin: true }));

// inicio el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express en ejecución en http://localhost:${PORT}`);
});

