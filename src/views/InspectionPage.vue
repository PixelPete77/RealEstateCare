<script setup>
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { useInspectionsStore } from '@/components/stores/inspectionsStore';
    import { IonContent, IonPage } from '@ionic/vue';

    const route = useRoute();
    const store = useInspectionsStore();

    const inspection = computed(() => {
        return store.getInspectionById(route.params.id);
    });
</script>

<template>
    <ion-page>
        <ion-content>
            <div class="wrapper">
                <h1>Inspection #{{ inspection.id }}</h1>
                <p>Date: {{ inspection.date }}</p>
            </div>
        </ion-content>
    </ion-page>
</template>