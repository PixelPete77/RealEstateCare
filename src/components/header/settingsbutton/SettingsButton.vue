<script setup>
    import { ref } from 'vue';
    import { IonButton } from '@ionic/vue';
    import { NotificationsIcon, NotificationsOffIcon } from '@/components/icons/';
    import { useUserStore } from '@/stores/userStore';

    const userStore = useUserStore();
    const notifications = ref(userStore.user.settings.notifications);  // Set initial notifications based on value from auth store

    const toggleNotifications = () => {
        notifications.value = !notifications.value;  // Toggle notifications
        userStore.updateNotifications(notifications.value);  // Update the auth store with the new value
    }
</script>

<template>
    <ion-button color="dark" size="large" @click="toggleNotifications">
        <template v-if="notifications">
            <NotificationsIcon slot="icon-only"/>
            <span class="sr-only">Turn notifications off</span>
        </template>
        <template v-else>
            <NotificationsOffIcon slot="icon-only"/>
            <span class="sr-only">Turn notifications on</span>
        </template>
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