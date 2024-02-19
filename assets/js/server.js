// Buscar Documentación de todo esto, junto con las propiedades
// Paquete Express, Cors y Middleware
// npm install express cors
// npm install http-proxy-middleware

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
// import express from 'express';
// import { createProxyMiddleware } from 'http-proxy-middleware';
// import cors from 'cors';

const app = express();
const PORT = 3000;

// Habilito CORS
app.use(cors());

// Agrego Middleware de Proxy para redirigir las solicitudes de API remota
app.use('/names.json', createProxyMiddleware({ target: 'http://country.io', changeOrigin: true }));

// Habilito CORS para todas las solicitudes
/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // '*' por el origen específico
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});*/

// Para evitar la redundancia -> si quiero editar las cabeceras, solo paso un objeto a configuración a `cors()`
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));

// Inicio el Servidor
app.listen(PORT, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${PORT}`);
});

