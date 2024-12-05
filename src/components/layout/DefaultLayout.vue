<script setup>
    import { IonContent, IonPage } from '@ionic/vue';
    import HeaderContent from '../header/HeaderContent.vue';
    import MainMenu from '../mainmenu/MainMenu.vue';

</script>

<template>
    <ion-page>
        <HeaderContent />
        <ion-content>
            <slot></slot>
        </ion-content>
        <MainMenu />
    </ion-page>
</template>