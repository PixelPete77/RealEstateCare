<script setup>
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { IonContent, IonPage } from '@ionic/vue';

    const route = useRoute();

    const inspectionId = computed(() => +route.params.id);
</script>

<template>
    <ion-page>
        <ion-content>
            <div class="wrapper">
                <h1>Inspection #{{ inspectionId }}</h1>
            </div>
        </ion-content>
    </ion-page>
</template>