<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import './style.css';
import ShapesManagementView from './ShapesManagementView.vue';

const router = useRouter();
const shapes = ref([]);
let userId = null;

const ws = ref(null);



// WebSocket message handler
const handleWebSocketMessage = (event) => {
  const message = JSON.parse(event.data);

  switch (message.event) {
    case 'shapeAdded':
      shapes.value.push(message.data);
      break;
    case 'shapeUpdated':
      const index = shapes.value.findIndex((shape) => shape.id === message.data.id);
      if (index !== -1) {
        shapes.value[index] = message.data;
      }
      break;
    case 'shapeDeleted':
      shapes.value = shapes.value.filter((shape) => shape.id !== message.data.id);
      break;
  }
};

// Initialize WebSocket connection
const initWebSocket = () => {
  ws.value = new WebSocket('ws://localhost:8080'); // Replace with your WebSocket server URL

  ws.value.onopen = () => {
    console.log('WebSocket connected');
  };

  ws.value.onmessage = handleWebSocketMessage;

  ws.value.onclose = () => {
    console.log('WebSocket disconnected. Reconnecting...');
    setTimeout(initWebSocket, 1000); // Reconnect after 1 second
  };

  ws.value.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
};

// Cleanup WebSocket on component unmount
onUnmounted(() => {
  if (ws.value) {
    ws.value.close();
  }
});

// Fetch shapes and initialize WebSocket on component mount
onMounted(() => {
  userId = parseInt(localStorage.getItem('userId'), 10);
  if (!userId || isNaN(userId)) {
    alert('User ID not found. Please log in again.');
    router.push('/login');
    return;
  }
  fetchShapes();
  initWebSocket();
});




// State for the Add/Edit Shape Menu
const showShapeMenu = ref(false);
const isEditing = ref(false); // Determines whether we are editing or adding
const selectedShape = ref(null); // Holds the shape being edited
const newShape = ref({
  type: 'circle', // Default shape type
  color: '#0000FF', // Default shape color
  position: { top: 300, left: 220 }, // Default position
});

// Fetch shapes from the API
const fetchShapes = async () => {
  try {
    const response = await fetch(`/api/shapes?userId=${userId}`);
    if (!response.ok) {
      console.error('Error fetching shapes:', await response.text());
      return;
    }
    shapes.value = await response.json();
  } catch (error) {
    console.error('Error fetching shapes:', error);
  }
};

// Open the Add/Edit Shape Menu
const openShapeMenu = (shape = null) => {
  if (shape) {
    isEditing.value = true;
    selectedShape.value = shape;
    newShape.value = { ...shape, position: { ...shape.position } }; // Pre-fill with current shape properties
  } else {
    isEditing.value = false;
    selectedShape.value = null;
    newShape.value = {
      type: 'circle',
      color: '#0000FF',
      position: { top: 300, left: 220 },
    };
  }
  showShapeMenu.value = true;
};

// Add a new shape
const addShape = async () => {
  const userId = parseInt(localStorage.getItem('userId'), 10);
  if (!userId || isNaN(userId)) {
    alert('User ID not found. Please log in again.');
    return;
  }

  const shapePayload = {
    type: newShape.value.type,
    color: newShape.value.color,
    position: {
      top: parseFloat(newShape.value.position.top) || 50,
      left: parseFloat(newShape.value.position.left) || 50,
    },
    width: 50,
    height: 50,
    userId, // Make sure this is passed correctly
  };

  try {
    const response = await fetch('/api/shapes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shapePayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to add shape:', errorText);
      alert('Failed to add shape. Please check the logs.');
      return;
    }

    const createdShape = await response.json();
    shapes.value.push(createdShape);
    showShapeMenu.value = false;
  } catch (error) {
    console.error('Error adding shape:', error);
    alert('Failed to add shape. Please check the logs.');
  }
};

// Edit an existing shape
const editShape = async () => {
  if (!selectedShape.value) return;

  const shapePayload = {
    ...newShape.value,
    position: {
      top: parseFloat(newShape.value.position.top),
      left: parseFloat(newShape.value.position.left),
    },
  };

  try {
    const response = await fetch(`/api/shapes/${selectedShape.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shapePayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to edit shape:', errorText);
      alert('Failed to edit shape. Please check the logs.');
      return;
    }

    const updatedShape = await response.json();
    const index = shapes.value.findIndex((shape) => shape.id === updatedShape.id);
    if (index !== -1) {
      shapes.value[index] = updatedShape;
    }
    showShapeMenu.value = false;
  } catch (error) {
    console.error('Error editing shape:', error);
  }
};

// Delete a shape
const deleteShape = async () => {
  if (!selectedShape.value) return;

  try {
    await fetch(`/api/shapes/${selectedShape.value.id}`, {
      method: 'DELETE',
    });

    // Remove the shape locally
    shapes.value = shapes.value.filter((shape) => shape.id !== selectedShape.value.id);
    selectedShape.value = null;
    showShapeMenu.value = false;
  } catch (error) {
    console.error('Failed to delete shape:', error);
    alert('Failed to delete shape.');
  }
};

// Handle Dragging and Persist Position
const handleDragEnd = async (event, shape) => {
  const container = event.target.offsetParent;
  const rect = container.getBoundingClientRect();
  shape.position = {
    top: event.clientY - rect.top,
    left: event.clientX - rect.left,
  };

  try {
    const response = await fetch(`/api/shapes/${shape.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ position: shape.position }),
    });

    if (!response.ok) {
      console.error('Failed to update shape position:', await response.text());
      alert('Failed to update shape position.');
    }
  } catch (error) {
    console.error('Error updating shape position:', error);
  }
};

// Handle Resizing
const handleResizeEnd = async (shape, event) => {
  const target = event.target;
  shape.width = target.offsetWidth;
  shape.height = target.offsetHeight;

  try {
    const response = await fetch(`/api/shapes/${shape.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ width: shape.width, height: shape.height }),
    });

    if (!response.ok) {
      console.error('Failed to update shape size:', await response.text());
    }
  } catch (error) {
    console.error('Error updating shape size:', error);
  }
};

// Navigate back to the login page
const goBack = () => {
  router.push('/login');
};

// Fetch shapes on page load
onMounted(() => {
  userId = parseInt(localStorage.getItem('userId'), 10);
  if (!userId || isNaN(userId)) {
    alert('User ID not found. Please log in again.');
    router.push('/login');
    return;
  }
  fetchShapes();
});
</script>



<template>
  <ShapesManagementView
    :shapes="shapes"
    :openShapeMenu="openShapeMenu"
    :isEditing="isEditing"
    :newShape="newShape"
    :editShape="editShape"
    :addShape="addShape"
    :deleteShape="deleteShape"
    :showShapeMenu="showShapeMenu"
    :handleDragEnd="handleDragEnd"
    :handleResizeEnd="handleResizeEnd"
    :goBack="goBack"
  />
</template>





