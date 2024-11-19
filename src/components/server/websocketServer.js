// src/server/websocketServer.js
const WebSocket = require('ws');

const PORT = 8080;
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (ws) => {
  console.log('Cliente conectado.');

  // Escuchar mensajes entrantes
  ws.on('message', (message) => {
    console.log('Mensaje recibido:', message);

    // Reenviar los datos a todos los clientes conectados
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Cliente desconectado.');
  });
});

console.log(`Servidor WebSocket escuchando en ws://localhost:${PORT}`);
