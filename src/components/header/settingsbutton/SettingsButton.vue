<script setup>
    import { IonButton } from '@ionic/vue';
    import { NotificationsIcon } from '@/components/icons/';
</script>

<template>
    <ion-button color="dark" size="large">
        <NotificationsIcon slot="icon-only"/>
    </ion-button>
</template>

<style scoped>
    button {
        background: none;
        color: inherit;
        padding: .75rem;
    }
    
    ion-button svg {
        inline-size: 1.5rem;
    }
</style>