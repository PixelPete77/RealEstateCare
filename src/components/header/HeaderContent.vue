<script setup>
    import { RouterLink } from 'vue-router';
    import { IonToolbar } from '@ionic/vue';
    import AccountMenu from './accountmenu/AccountMenu.vue';
    import SettingsButton from './settingsbutton/SettingsButton.vue';
</script>

<template>
    <ion-toolbar color="dark">
        <router-link to="/">
            <img src="/src/assets/images/RealEstateCare_logo.svg" class="logo" slot="start">
        </router-link>
        <div slot="end">
            <SettingsButton />
            <AccountMenu />
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
</style>