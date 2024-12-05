<script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { IonApp, IonRouterOutlet } from '@ionic/vue';
  import DefaultLayout from './components/layout/DefaultLayout.vue';
  import LoginLayout from './components/layout/LoginLayout.vue';

  const route = useRoute();
  const layout = computed(() =>
    route.meta.layout === 'login' ? LoginLayout : DefaultLayout
  );
</script>

<template>
  <ion-app>
    <component :is="layout">
      <ion-router-outlet />
    </component>
  </ion-app>
</template>
