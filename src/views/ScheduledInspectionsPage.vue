<script setup>
    import { computed, onMounted } from 'vue';
    import { IonButton, IonContent, IonPage } from '@ionic/vue';
    import { useInspectionsStore } from '@/components/stores/inspectionsStore';

    const store = useInspectionsStore();

    // Fetch the inspections when the component is mounted
    onMounted(() => {
        store.fetchInspections()
    })

    // Computed properties
    const inspections = computed(() => {
        console.log("Inspections: ", store.inspections);
        return store.inspections;
    })

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

                <!-- List with inpection data -->
                <ul v-if="inspections && inspections.length">
                    <li v-for="inspection of inspections"
                        :key="inspection.id">
                        <h4>{{ inspection.date }}</h4>
                        <p>{{ inspection.inspectorId }}</p>
                        <p>{{ inspection.address.street }}, {{ inspection.address.city }}</p>
                    </li>
                </ul>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<style scoped>
    
</style>