<script setup>
    import { computed, onMounted } from 'vue';
    import { IonContent, IonPage } from '@ionic/vue';
    import { useInspectionsStore } from '@/stores/inspectionsStore';
    import InspectionListItem from '@/components/inspection/InspectionListItem.vue';
    import loaderAnim from '@/components/loader/loaderAnim.vue';

    const inspections = useInspectionsStore();

    // --- Computed properties -------------------------

    const sortedInspections = computed(() => {
        return inspections.inspections.slice().sort((a, b) => {
            return new Date(a.date) - new Date(b.date); // Sort the inspections by decending date
        });
    });

    const error = computed(() => {
        return inspections.errors;
    })

    const loading = computed(() => {
        return inspections.loadingStatus === 'loading';
    })
  
    // --- Events --------------------------------------

    // Fetch the inspections when the component is mounted
    onMounted(() => {
        inspections.fetchCompletedInspectionsData();
    })
</script>

<template>
    <ion-page>
        <ion-content>
            <div class="wrapper">
                <h1>Completed inspections</h1>
                <!-- Show loading indicator when status = loading -->
                <div class="loader" v-if="loading">
                    <loaderAnim />
                    <p>Loading inspections</p>  
                </div>

                <!-- Show the error when loading inpections failed -->
                <div v-if="error" class="alert alert-danger">
                    <h2>Error!</h2>
                    <p>{{ error }}</p>
                </div>

                <!-- List with inspection data -->
                <ul v-if="sortedInspections && sortedInspections.length">
                    <InspectionListItem v-for="inspection of sortedInspections"
                        :key="inspection.id"
                        :address="inspection.address"
                        :date="inspection.date"
                        :id="inspection.id">
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