<script setup>
    import { RouterLink } from 'vue-router';
    import { IonButton, IonToolbar } from '@ionic/vue';
    import { AvatarIcon, NotificationsIcon } from '@/components/icons/'
</script>

<template>
    <ion-toolbar color="dark">
        <router-link to="/">
            <img src="/src/assets/images/RealEstateCare_logo.svg" class="logo" slot="start">
        </router-link>
        <div slot="end">
            <ion-button color="dark" size="large">
                <NotificationsIcon slot="icon-only"/>
            </ion-button>
            <ion-button color="dark" size="large">
                <AvatarIcon slot="icon-only" />
            </ion-button>
        </div>
    </ion-toolbar>
</template>

<style scoped>
    ion-toolbar {
        padding-inline: 1rem;
    }

    .logo {
        block-size: 56px;
        margin-block: .5rem;
    }

    button {
        background: none;
        color: inherit;
        padding: .75rem;
    }
    
    ion-button svg {
        inline-size: 1.5rem;
    }

</style>