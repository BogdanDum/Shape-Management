// https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   compatibilityDate: '2024-11-01',
//   devtools: { enabled: true }
// })
// import { defineNuxtConfig } from 'nuxt/config';

// // Ensure WebSocket server starts before Nuxt
// export default defineNuxtConfig({

//   server: {
//     port: 3000, // Ensure this is different from WebSocket port
//   },
  
//   css: ['@/assets/css/tailwind.css'],
//   compatibilityDate: '2024-11-22',
// });
export default defineNuxtConfig({
  css: ['@/assets/css/tailwind.css'],
  compatibilityDate: '2024-11-22',
  runtimeConfig: {
    public: {},
  },
  nitro: {
    preset: 'node-server',
  },
});









