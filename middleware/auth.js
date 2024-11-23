export default defineNuxtRouteMiddleware((to, from) => {
    const userId = localStorage.getItem('userId');
  
    // Redirect to login if not authenticated
    if (!userId && to.path !== '/login') {
      return navigateTo('/login');
    }
  
    // Prevent accessing the login page if already logged in
    if (userId && to.path === '/login') {
      return navigateTo('/lists'); // Redirect to the lists overview
    }
  });
  