<script setup>
  import { computed, onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAuthStore } from '@/stores/authStore';
  import { IonApp, IonRouterOutlet } from '@ionic/vue';
  import { applyTheme } from './composables/applyTheme';
  import DefaultLayout from './components/layout/DefaultLayout.vue';
  import LoginLayout from './components/layout/LoginLayout.vue';
  import LoaderAnim from './components/loader/loaderAnim.vue';

  const auth = useAuthStore();
  const ready = ref(false);
  const route = useRoute();

  // Determine which layout to use based on the current route's meta property
  const layout = computed(() =>
    route.meta.layout === 'login' ? LoginLayout : DefaultLayout
  );

  // 
  // set the theme and check if a session exists and restore user data
  onMounted(async () => {
    const theme = localStorage.getItem('theme'); // Get the theme from localStorage
    applyTheme(theme || 'system'); // Apply the theme from localStorage or default to 'system' if not set

    await auth.restoreUser();
    ready.value = true;
  });
</script>

<template>
  <ion-app>
    <component :is="layout" v-if="ready">
      <ion-router-outlet />
    </component>
    <div v-else class="loader-wrapper">
      <LoaderAnim />
      <p>Loading application</p>
    </div>
  </ion-app>
</template>

<style scoped>
  .loader-wrapper {
    inline-size: 100%;
    block-size: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: .5rem;
  }
</style>
