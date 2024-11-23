<template>
  <div style="background-color: black; color: white; min-height: 100vh; padding: 20px;">
    <h1>Shapes Management</h1>

    <!-- Instructions -->
    <div style="margin-bottom: 20px; padding: 10px; border: 1px solid #fff; border-radius: 5px;">
      <p>Instructions:</p>
      <ul>
        <li>Click on a shape to edit or delete it.</li>
        <li>Drag shapes to move them around.</li>
        <li>Resize shapes by dragging the resize handles.</li>
        <li>Use the "Add Shape" button to create new shapes.</li>
        <li>Adjust positions or colors via the form in the shape menu.</li>
      </ul>
    </div>

    <button @click="openShapeMenu()" class="add-button">Add Shape</button>

    <!-- Add/Edit Shape Menu -->
    <div v-if="showShapeMenu" class="modal">
      <h2 style="color: white;">{{ isEditing ? 'Edit Shape' : 'Add a New Shape' }}</h2>
      <form @submit.prevent="isEditing ? editShape() : addShape()">
        <div>
          <label for="type">Shape Type:</label>
          <select v-model="newShape.type" id="type">
            <option value="circle">Circle</option>
            <option value="square">Square</option>
            <option value="triangle">Triangle</option>
          </select>
        </div>
        <div>
          <label for="color">Shape Color:</label>
          <input type="color" v-model="newShape.color" id="color" />
        </div>
        <div>
          <label for="top">Top Position:</label>
          <input
            type="number"
            v-model.number="newShape.position.top"
            id="top"
            step="any"
            placeholder="Enter top position (px)"
          />
        </div>
        <div>
          <label for="left">Left Position:</label>
          <input
            type="number"
            v-model.number="newShape.position.left"
            id="left"
            step="any"
            placeholder="Enter left position (px)"
          />
        </div>
        <button type="submit" class="submit-button">{{ isEditing ? 'Save Changes' : 'Add Shape' }}</button>
        <button type="button" class="delete-button" v-if="isEditing" @click="deleteShape">Delete</button>
        <button type="button" class="cancel-button" @click="showShapeMenu = false">Cancel</button>
      </form>
    </div>

    <!-- Shapes Display -->
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
        :class="{
          'rounded-full': shape.type === 'circle',
          'rounded-lg': shape.type === 'square',
        }"
        @click.stop="openShapeMenu(shape)"
        draggable="true"
        @dragend="(e) => handleDragEnd(e, shape)"
        @mouseup="(e) => handleResizeEnd(shape, e)"
      ></div>
    </div>
    <button @click="goBack" class="back-button">Back</button>
  </div>
</template>

<script setup>
defineProps(['shapes', 'openShapeMenu', 'isEditing', 'newShape', 'editShape', 'addShape', 'deleteShape', 'showShapeMenu', 'handleDragEnd', 'handleResizeEnd', 'goBack']);
</script>
