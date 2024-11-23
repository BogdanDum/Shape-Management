<template>
  <NuxtPage />
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();

onMounted(() => {
  if (window.location.pathname === '/') {
    router.push('/login'); // Always redirect the root route to the login page
  }
});
</script>
