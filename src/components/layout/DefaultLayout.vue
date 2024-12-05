<script setup>
    import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/vue';
    import HeaderContent from '../header/HeaderContent.vue';
    import MainMenu from '../mainmenu/MainMenu.vue';

</script>

<template>
    <ion-page>
        <ion-header>
            <HeaderContent />
        </ion-header>
        <ion-content class="arc-bg">
            <slot></slot>
        </ion-content>
        <ion-footer>
            <MainMenu />
        </ion-footer>
    </ion-page>
</template>