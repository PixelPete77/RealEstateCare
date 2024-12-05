<script setup>
    import { RouterLink } from 'vue-router';
    import { IonContent, IonPage } from '@ionic/vue';
</script>

<template>
    <ion-page>
        <ion-content>
            <h1>Not found</h1>
            <p>We're sorry, but the page you are looking for does not exist. Go to the <router-link to="/">Dashboard</router-link>.</p>
        </ion-content>
    </ion-page>
</template>
  
<style scoped>
    
</style>