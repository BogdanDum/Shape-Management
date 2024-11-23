import { ref } from 'vue';

export const ws = ref(null);

export const initWebSocket = (handleWebSocketMessage) => {
  ws.value = new WebSocket('ws://localhost:8080'); // Replace with your WebSocket server URL

  ws.value.onopen = () => {
    console.log('WebSocket connected');
  };

  ws.value.onmessage = handleWebSocketMessage;

  ws.value.onclose = () => {
    console.log('WebSocket disconnected. Reconnecting...');
    setTimeout(() => initWebSocket(handleWebSocketMessage), 1000); // Reconnect after 1 second
  };

  ws.value.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
};

export const closeWebSocket = () => {
  if (ws.value) {
    ws.value.close();
  }
};
