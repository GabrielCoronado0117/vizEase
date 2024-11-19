// src/services/websocketClient.js
let socket;

export const connectWebSocket = (url, onMessage) => {
  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log('Conexión WebSocket establecida.');
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onerror = (error) => {
    console.error('Error en WebSocket:', error);
  };

  socket.onclose = () => {
    console.log('Conexión WebSocket cerrada.');
  };
};

export const sendWebSocketMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error('No se puede enviar el mensaje. WebSocket no está conectado.');
  }
};
