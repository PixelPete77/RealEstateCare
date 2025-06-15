<script setup>
    import { computed, onMounted, ref, toRaw, watch } from 'vue';
    import { RouterLink, useRoute } from 'vue-router';
    import {
        createDamageItem,
        createInstallationItem,
        createMaintenanceItem,
        createModificationItem
    } from '@/factories/inspectionFactory';
    import { useInspectionsStore } from '@/stores/inspectionsStore';
    import { InspectionFormDamage, InspectionFormInstallation, InspectionFormMaintenance, InspectionFormModification } from '@/components/inspection';
    import loaderAnim from '@/components/loader/loaderAnim.vue';
    import { IonButton, IonContent, IonPage, IonToast } from '@ionic/vue';
    import { formatDate } from '@/composables/formatDate';

    const factories = {
        damage: createDamageItem,
        maintenance: createMaintenanceItem,
        installations: createInstallationItem,
        modifications: createModificationItem
    };
    const inspections = useInspectionsStore();
    const inspection = ref();
    const route = useRoute();

    const toastClass = ref('');
    const toastMessage = ref('');
    const toastShow = ref(false);
    const setOpen = () => {
        toastShow.value = !toastShow.value;
    }

    // Watch for changes in the inspection data and create a copy of it
    watch(() => inspections.inspection, (newInspection) => {
        inspection.value = structuredClone(toRaw(newInspection)); // Create a copy of the inspection data, so we can store changes without changing the original data
    }, { immediate: true });

    // Add a new item to the inspection data using the factory function based on the type
    function addItem(type) {
        inspection.value[type].push(factories[type]());
    }

    // Update inspection data in the store when the user saves the changes to the inspection
    const handleSaveInspection = async () => {
        const result = await inspections.updateInspection(route.params.id, inspection.value);

        if (result.success) {
            toastMessage.value = 'Inspection saved successfully';
            toastShow.value = true;
            toastClass.value = 'toast-success';
        } else {
            toastMessage.value = 'Failed to save inspection';
            toastShow.value = true;
            toastClass.value = 'toast-error';
        }
    }

    // Update the local copy of the inspections data
    function updateInspection(option, id, updatedItem) {
        const optionArray = inspection.value[option]; // First target the correct option array in the inspection data
        const foundIndex = optionArray.findIndex(x => x.id === id); // Find the index of the item in the array that matches the id (which was the key in the v-for loop)

        optionArray[foundIndex] = updatedItem; // Update the item in the array with the updated data
    }

    
    // --- Computed properties -------------------------

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
                <router-link to="/scheduled" v-if="!inspection?.completedDate">
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
                <form v-if="inspection" @submit.prevent="handleSaveInspection()">
                    <h2 v-if="!inspection.completedDate || inspection.damage.length > 0">Record damage</h2>
                    <InspectionFormDamage 
                        v-for="(dmg, index) in inspection.damage" 
                        :key="dmg.id" 
                        :dmgData="dmg" 
                        :index="index" 
                        @update-damage="localDmg => updateInspection('damage', dmg.id, localDmg)" 
                    />
                    <ion-button fill="outline" v-if="!inspection.completedDate" @click="addItem('damage')">
                        Add damage
                    </ion-button>

                    <h2 v-if="!inspection.completedDate || inspection.maintenance.length > 0">Record deferred maintenance</h2>
                    <InspectionFormMaintenance 
                        v-for="(mntnc, index) in inspection.maintenance" 
                        :key="mntnc.id" 
                        :mntncData="mntnc" 
                        :index="index" 
                        @update-mntnc="localMntnc => updateInspection('maintenance', mntnc.id, localMntnc)" 
                    />
                    <ion-button fill="outline" v-if="!inspection.completedDate" @click="addItem('maintenance')">
                        Add maintenance
                    </ion-button>

                    <h2 v-if="!inspection.completedDate || inspection.installations.length > 0">Inspect technical installations</h2>
                    <InspectionFormInstallation 
                        v-for="(instal, index) in inspection.installations" 
                        :key="instal.id" 
                        :instalData="instal" 
                        :index="index" 
                        @update-instal="localInstal => updateInspection('installations', instal.id, localInstal)" 
                    />
                    <ion-button fill="outline" v-if="!inspection.completedDate" @click="addItem('installations')">
                        Add inspect installation
                    </ion-button>

                    <h2 v-if="!inspection.completedDate || inspection.modifications.length > 0">Inventory modifications</h2>
                    <InspectionFormModification 
                        v-for="(mod, index) in inspection.modifications" 
                        :key="mod.id" 
                        :modData="mod" 
                        :index="index" 
                        @update-mod="localMod => updateInspection('modifications', mod.id, localMod)" 
                    />
                    <ion-button fill="outline" v-if="!inspection.completedDate" @click="addItem('modifications')">
                        Add modification
                    </ion-button>
                    <div>
                        <ion-button type="submit">
                            Save inspection
                        </ion-button>
                    </div>
                </form>
                <template v-else>
                    <p>Inspection not found.</p>
                </template>
            </div>
            <ion-toast swipe-gesture="vertical" :class="toastClass" :duration="5000" :is-open="toastShow" :message="toastMessage" @didDismiss="setOpen(false)"></ion-toast>
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

        & > div {
            position: sticky;
            bottom: 0;
            inline-size: calc(100% + 2rem);
            background: color-mix(in srgb, var(--c-wrapper-bg) 65%, transparent);
            backdrop-filter: blur(2px);
            margin-inline: -1rem;
            padding: 1rem;
            z-index: 10;

            & ion-button {
                inline-size: 100%;

                @media screen and (min-width: 30rem) {
                    inline-size: auto;
                }
            }
        }
    }
</style>