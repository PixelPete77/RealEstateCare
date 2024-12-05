<script setup>
    import { IonButton, IonHeader, IonToolbar } from '@ionic/vue';
    import { AvatarIcon, NotificationsIcon } from '@/components/icons/'
</script>

<template>
    <ion-header>
        <ion-toolbar color="dark">
            <img src="/src/assets/images/RealEstateCare_logo.svg" class="logo" slot="start">
            <div slot="end">
                <ion-button color="dark" size="large">
                    <NotificationsIcon slot="icon-only"/>
                </ion-button>
                <ion-button color="dark" size="large">
                    <AvatarIcon slot="icon-only" />
                </ion-button>
            </div>
        </ion-toolbar>
    </ion-header>
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