<script setup>
  import { computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAuthStore } from '@/stores/authStore';
  import { IonApp, IonRouterOutlet } from '@ionic/vue';
  import DefaultLayout from './components/layout/DefaultLayout.vue';
  import LoginLayout from './components/layout/LoginLayout.vue';

  const auth = useAuthStore();
  const route = useRoute();
  
  // Determine which layout to use based on the current route's meta property
  const layout = computed(() =>
    route.meta.layout === 'login' ? LoginLayout : DefaultLayout
  );

  // Check if a session exists and restore user data
  onMounted(() => {
    auth.restoreUser();
  });
</script>

<template>
  <ion-app>
    <component :is="layout">
      <ion-router-outlet />
    </component>
  </ion-app>
</template>
