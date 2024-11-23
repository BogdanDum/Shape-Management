// const { WebSocketServer } = require('ws');

// const wss = new WebSocketServer({ port: 8080 }); // Choose any available port

// const clients = new Set();

// wss.on('connection', (ws) => {
//   console.log('New client connected');
//   clients.add(ws);

//   ws.on('message', (message) => {
//     console.log('Received:', message);
//   });

//   ws.on('close', () => {
//     console.log('Client disconnected');
//     clients.delete(ws);
//   });
// });

// const broadcast = (data) => {
//   for (const client of clients) {
//     if (client.readyState === client.OPEN) {
//       client.send(JSON.stringify(data));
//     }
//   }
// };

// module.exports = { broadcast };
import { WebSocketServer } from 'ws';

const PORT = process.env.WS_PORT || 8083;

const clients = new Set();
const wss = new WebSocketServer({ port: PORT });

console.log(`WebSocket server running on ws://localhost:${PORT}`);

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log('Client connected.');

  ws.on('message', (message) => {
    console.log('Received:', message.toString());
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected.');
  });
});

export const broadcast = (data) => {
  const message = JSON.stringify(data);
  for (const client of clients) {
    if (client.readyState === client.OPEN) {
      client.send(message);
    }
  }
};









