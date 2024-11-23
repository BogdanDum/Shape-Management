<script setup>
const props = defineProps({
  shapes: Array, // Array of shapes
});
const emit = defineEmits(['editShape', 'dragEnd', 'resizeEnd']);

// Handle dragging shapes
const handleDragEnd = (event, shape) => {
  const container = event.target.offsetParent;
  const rect = container.getBoundingClientRect();
  shape.position = {
    top: event.clientY - rect.top,
    left: event.clientX - rect.left,
  };
  emit('dragEnd', shape);
};

// Handle resizing shapes
const handleResizeEnd = (event, shape) => {
  const target = event.target;
  shape.width = target.offsetWidth;
  shape.height = target.offsetHeight;
  emit('resizeEnd', shape);
};
</script>

<template>
  <div v-for="shape in shapes" :key="shape.id">
    <div
      :style="{
        position: 'absolute',
        top: `${shape.position.top}px`,
        left: `${shape.position.left}px`,
        backgroundColor: shape.type === 'triangle' ? 'transparent' : shape.color,
        width: `${shape.width}px`,
        height: `${shape.height}px`,
        borderRadius: shape.type === 'circle' ? '50%' : '0',
        borderLeft: shape.type === 'triangle' ? '25px solid transparent' : 'none',
        borderRight: shape.type === 'triangle' ? '25px solid transparent' : 'none',
        borderBottom: shape.type === 'triangle' ? `50px solid ${shape.color}` : 'none',
      }"
      class="resizable-shape"
      draggable="true"
      @click.stop="$emit('editShape', shape)"
      @dragend="(e) => handleDragEnd(e, shape)"
      @mouseup="(e) => handleResizeEnd(e, shape)"
    ></div>
  </div>
</template>

<style scoped>
.resizable-shape {
  resize: both;
  overflow: hidden;
  border: 2px dashed white;
  cursor: grab;
}
.resizable-shape:active {
  border-color: yellow;
}
</style>
