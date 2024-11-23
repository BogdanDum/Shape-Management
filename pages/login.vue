<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit" class="login-button">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const login = async () => {
  localStorage.clear(); // Clear old data before setting new values.

  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.value, password: password.value }),
  });

  const data = await response.json();

  if (data.error) {
    error.value = data.error;
  } else {
    localStorage.setItem('userId', data.userId); // Save new userId.
    router.push('/'); // Redirect to the main page.
  }
};



</script>

<style>
/* Global reset to ensure fullscreen black background */
html, body {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Login Container Styling */
.login-container {
  max-width: 400px;
  text-align: center;
  background-color: black;
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);
}

input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #333;
  color: white;
}

input::placeholder {
  color: #ccc;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
