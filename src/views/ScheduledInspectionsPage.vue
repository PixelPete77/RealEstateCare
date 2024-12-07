<script setup>
    import { computed, onMounted } from 'vue';
    import { IonContent, IonPage } from '@ionic/vue';
    import InspectionListItem from '@/components/inspection/InspectionListItem.vue';
    import { useInspectionsStore } from '@/components/stores/inspectionsStore';

    const store = useInspectionsStore();

    // Fetch the inspections when the component is mounted
    onMounted(() => {
        store.fetchInspections()
    })

    // Computed properties
    const inspections = computed(() => {
        return store.inspections;
    })

    const sortedInspections = computed(() => {
        return store.inspections.slice().sort((a, b) => {
            return new Date(a.date) - new Date(b.date); // Sort the inspections by decending date
        });
    });

    const error = computed(() => {
        return store.errors;
    })

    const loading = computed(() => {
        return store.loadingStatus === 'loading';
    })

    // Methods
    
</script>

<template>
    <ion-page>
        <ion-content>
            <div class="wrapper">
                <h1>Scheduled inspections</h1>
                <!-- Show loading indicator when status = loading -->
                <div v-if="loading">
                    <h3 style="margin: 0 auto;">Loading...</h3>
                    
                </div>

                <!-- Show the error when loading inpections failed -->
                <div v-if="error" class="alert alert-danger">
                    <h3>Error!</h3>
                    <p>{{ error }}</p>
                </div>

                <!-- List with inspection data -->
                <ul v-if="sortedInspections && sortedInspections.length">
                    <InspectionListItem v-for="inspection of sortedInspections"
                        :key="inspection.id">
                        <template v-slot:id>Inspection #{{ inspection.id }}</template>
                        <template v-slot:date>{{ inspection.date }}</template>
                        <template v-slot:address>{{ inspection.address.street }}, {{ inspection.address.city }}, {{ inspection.address.province }}</template>
                    </InspectionListItem>
                </ul>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<style scoped>
    ul {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        list-style: none;
        padding: 0;
    }
</style>