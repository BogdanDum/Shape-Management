<script setup>
const props = defineProps({
  isEditing: Boolean,
  selectedShape: Object,
  newShape: Object,
});

const emit = defineEmits(['save', 'delete', 'close']);

// Save shape (add or edit)
const saveShape = () => {
  emit('save');
};

// Delete shape
const deleteShape = () => {
  emit('delete');
};
</script>

<template>
  <div class="modal">
    <h2 style="color: white;">{{ isEditing ? 'Edit Shape' : 'Add a New Shape' }}</h2>
    <form @submit.prevent="saveShape">
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
        />
      </div>
      <div>
        <label for="left">Left Position:</label>
        <input
          type="number"
          v-model.number="newShape.position.left"
          id="left"
          step="any"
        />
      </div>
      <button type="submit" class="submit-button">{{ isEditing ? 'Save Changes' : 'Add Shape' }}</button>
      <button type="button" class="delete-button" v-if="isEditing" @click="deleteShape">Delete</button>
      <button type="button" class="cancel-button" @click="$emit('close')">Cancel</button>
    </form>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #222;
  padding: 20px;
  border: 1px solid #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
