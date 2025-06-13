<script setup>
    import { computed, onMounted } from 'vue';
    import { RouterLink, useRoute } from 'vue-router';
    import { useInspectionsStore } from '@/stores/inspectionsStore';
    import { InspectionFormDamage, InspectionFormInstallation, InspectionFormMaintenance, InspectionFormModification } from '@/components/inspection';
    import loaderAnim from '@/components/loader/loaderAnim.vue';
    import { IonButton, IonContent, IonPage } from '@ionic/vue';
    import { formatDate } from '@/composables/formatDate';

    const route = useRoute();
    const inspections = useInspectionsStore();

    // --- Computed properties -------------------------

    const inspection = computed(() => inspections.inspection);

    // Format the inspection date
    const formattedDate = computed(() => formatDate(inspection.value.date));

    // Format the date the inspection was completed, if not null
    const formattedCompletedDate = computed(() => formatDate(inspection.value?.completedDate));

    const loading = computed(() => {
        return inspections.loadingStatus === 'loading';
    })

    // --- Events --------------------------------------

    // Get the inspection data when the component is mounted
    onMounted(() => {
        inspections.loadInspection(route.params.id);
    });
</script>

<template>
    <ion-page>
        <ion-content>
            <div class="wrapper">
                <router-link to="/completed" v-if="inspection?.completedDate">
                    Back to completed inspections
                </router-link>
                <router-link to="/scheduled" v-else>
                    Back to scheduled inspections
                </router-link>
                <h1>Inspection #{{ route.params.id }}</h1>
                <!-- Show loading indicator when fetching data -->
                <div class="loader" v-if="loading">
                    <loaderAnim />
                    <p>Loading inspection</p>
                </div>
                <!-- Show inspection data when available -->
                <div class="info" v-if="inspection">
                    <p>
                        <strong>Date:</strong><br>
                        {{ formattedDate }}<br>
                        <br>
                        <template v-if="inspection.completedDate">
                            <strong>Completed on:</strong><br>
                            {{ formattedCompletedDate }}
                        </template>
                    </p>
                    <p>
                        <strong>Address:</strong><br>
                        Street: {{ inspection.address.street }}<br>
                        City: {{ inspection.address.city }}<br>
                        Province: {{ inspection.address.province }}<br>
                        Zip code: {{ inspection.address.zipCode }}
                    </p>
                </div>
                <form v-if="inspection">
                    <h2 v-if="!inspection.completedDate || inspection.damage.length > 0">Record damage</h2>
                    <InspectionFormDamage v-for="dmg in inspection.damage" :key="dmg.id" :dmg="dmg" />
                    <ion-button fill="outline" v-if="!inspection.completedDate">
                        Add damage
                    </ion-button>
                    <h2 v-if="!inspection.completedDate || inspection.maintenance.length > 0">Record deferred maintenance</h2>
                    <InspectionFormMaintenance v-for="mntnc in inspection.maintenance" :key="mntnc.id" :mntnc="mntnc" />
                    <ion-button fill="outline" v-if="!inspection.completedDate">
                        Add maintenance
                    </ion-button>
                    <h2 v-if="!inspection.completedDate || inspection.installations.length > 0">Inspect technical installations</h2>
                    <InspectionFormInstallation v-for="instal in inspection.installations" :key="instal.id" :instal="instal"/>
                    <ion-button fill="outline" v-if="!inspection.completedDate">
                        Add inspect installation
                    </ion-button>
                    <h2 v-if="!inspection.completedDate || inspection.modifications.length > 0">Inventory modifications</h2>
                    <InspectionFormModification v-for="mod in inspection.modifications" :key="mod.id" :mod="mod"/>
                    <ion-button fill="outline" v-if="!inspection.completedDate">
                        Add modification
                    </ion-button>
                    <ion-button>
                        Save inspection
                    </ion-button>
                </form>
            </div>
        </ion-content>
    </ion-page>
</template>

<style scoped>
    .info {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-block-end: 2rem;
    
        @media screen and (min-width: 30rem) {
            flex-direction: row;
        }
    
        & p {
            flex: 1 1 auto;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        @media screen and (min-width: 30rem) {
            align-items: start;
        }
    }
</style>