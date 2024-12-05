<script setup>
    import { IonContent, IonPage } from '@ionic/vue';
</script>

<template>
    <ion-page>
        <ion-content class="arc-bg" :fullscreen="true">
            <slot></slot>
        </ion-content>
    </ion-page>
</template>