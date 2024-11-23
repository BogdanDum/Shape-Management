import { ref } from 'vue';

export const shapes = ref([]);

export const fetchShapes = async (userId) => {
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

export const addShape = async (shapePayload) => {
  try {
    const response = await fetch('/api/shapes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shapePayload),
    });

    if (!response.ok) {
      console.error('Failed to add shape:', await response.text());
      return null;
    }

    const createdShape = await response.json();
    shapes.value.push(createdShape);
    return createdShape;
  } catch (error) {
    console.error('Error adding shape:', error);
    return null;
  }
};

export const editShape = async (shapeId, updatedPayload) => {
  try {
    const response = await fetch(`/api/shapes/${shapeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPayload),
    });

    if (!response.ok) {
      console.error('Failed to edit shape:', await response.text());
      return null;
    }

    const updatedShape = await response.json();
    const index = shapes.value.findIndex((shape) => shape.id === updatedShape.id);
    if (index !== -1) {
      shapes.value[index] = updatedShape;
    }
    return updatedShape;
  } catch (error) {
    console.error('Error editing shape:', error);
    return null;
  }
};

export const deleteShape = async (shapeId) => {
  try {
    await fetch(`/api/shapes/${shapeId}`, {
      method: 'DELETE',
    });

    shapes.value = shapes.value.filter((shape) => shape.id !== shapeId);
  } catch (error) {
    console.error('Failed to delete shape:', error);
  }
};
