<script setup>
    import { computed, onMounted } from 'vue';
    import { RouterLink, useRoute } from 'vue-router';
    import { useInspectionsStore } from '@/components/stores/inspectionsStore';
    import loaderAnim from '@/components/loader/loaderAnim.vue';
    import { 
        IonButton,
        IonCheckbox, 
        IonContent, 
        IonDatetime, 
        IonDatetimeButton, 
        IonInput, 
        IonLabel, 
        IonModal, 
        IonPage, 
        IonSelect, 
        IonSelectOption, 
        IonTextarea } from '@ionic/vue';
    import { formatDate } from '@/composables/formatDate';

    const route = useRoute();
    const store = useInspectionsStore();

    
    // --- Lifecycle hooks -----------------------------

    // Check if inspection data is present when the component is mounted
    onMounted(() => {
        if (!store.inspections.length) {
            store.fetchInspections();
        } 
    });

    // --- Computed properties -------------------------

    // Get the inspection data based on the id
    const inspection = computed(() => {
        return store.getInspectionById(route.params.id);
    });

    // Format the inspection date
    const formattedDate = computed(() => formatDate(inspection.value.date));

    // Format the date the inspection was completed, if not null
    const formattedCompletedDate = computed(() => {
        const date = inspection.value?.completedDate;
        return formatDate(date);
    });
</script>

<template>
    <ion-page>
        <ion-content>
            <div class="wrapper">
                <!-- TODO: dynamically change link based on where you came from (scheduled / completed) -->
                <router-link to="/scheduled">
                    Back to scheduled inspections
                </router-link>
                <h1>Inspection #{{ route.params.id }}</h1>
                <!-- Show loading indicator when fetching data -->
                <div class="loader" v-if="!store.inspections.length">
                    <loaderAnim />
                    <p>Loading inspection</p>
                </div>
                <!-- Show inspection data when available -->
                <div class="info" v-if="inspection">
                    <p>
                        <strong>Date:</strong><br>
                        {{ formattedDate  }}<br>
                        <br>
                        <template v-if="inspection.completedDate">
                            <strong>Completed on:</strong><br>
                            {{ formattedCompletedDate  }}
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
                    <h2>Record damage</h2>
                    <fieldset v-for="dmg in inspection.damage" :key="dmg.id">
                        <legend>Damage {{ dmg.id }}</legend>
                        <ion-label>Date:</ion-label>
                        <ion-datetime-button datetime="datetime"></ion-datetime-button>
                        <ion-input label="Location" label-placement="stacked" fill="outline" placeholder="Enter the location" :value="dmg.location"></ion-input>
                        <ion-select label="Type of damage" label-placement="stacked" fill="outline" placeholder="Select a type of damage" :value="dmg.type">
                            <ion-select-option value="intentional">Intentional</ion-select-option>
                            <ion-select-option value="wear">Wear</ion-select-option>
                            <ion-select-option value="force">Force</ion-select-option>
                            <ion-select-option value="normal">Normal use</ion-select-option>
                            <ion-select-option value="calamity">Calamity</ion-select-option>
                            <ion-select-option value="other">Other</ion-select-option>
                        </ion-select>
                        <ion-textarea label="Description" label-placement="stacked" fill="outline" placeholder="Enter a description of the damage":value="dmg.description"></ion-textarea>
                        <ion-checkbox label-placement="end" :checked="dmg.new">New damage</ion-checkbox>
                        <ion-checkbox label-placement="end" :checked="dmg.urgent">Urgent action required</ion-checkbox>
                        <!-- TODO: add option to add photo's -->

                        <ion-modal :keep-contents-mounted="true">
                            <ion-datetime id="datetime" presentation="date" :value="dmg.date"></ion-datetime>
                        </ion-modal>
                    </fieldset>
                    <h2>Record deferred maintenance</h2>
                    <fieldset v-for="mntnc in inspection.maintenance" :key="mntnc.id">
                        <legend>Deferred maintenance {{ mntnc.id }}</legend>
                        <ion-input label="Location" label-placement="stacked" fill="outline" placeholder="Enter the location" :value="mntnc.location"></ion-input>
                        <ion-select label="Type of maintenance" label-placement="stacked" fill="outline" placeholder="Select a type of maintenance" :value="mntnc.type">
                            <ion-select-option value="painting">Painting</ion-select-option>
                            <ion-select-option value="woodrot">Wood rot</ion-select-option>
                            <ion-select-option value="electricity">Electricity</ion-select-option>
                            <ion-select-option value="piping">Piping</ion-select-option>
                            <ion-select-option value="glass">Glass</ion-select-option>
                        </ion-select>
                        <ion-select label="Cost indication" label-placement="stacked" fill="outline" placeholder="Select a cost indication" :value="mntnc.costIndication">
                            <ion-select-option value="0-500">0 - 500</ion-select-option>
                            <ion-select-option value="500-1500">500 - 1.500</ion-select-option>
                            <ion-select-option value="1500+">1.500+</ion-select-option>
                        </ion-select>
                        <ion-checkbox label-placement="end" :checked="mntnc.urgent">Urgent action required</ion-checkbox>
                        <!-- TODO: add option to add photo's -->
                    </fieldset>
                    <h2>Inspect technical installations</h2>
                    <fieldset v-for="instal in inspection.installations" :key="instal.id">
                        <legend>Technical installation {{ instal.id }}</legend>
                        <ion-input label="Location" label-placement="stacked" fill="outline" placeholder="Enter the location" :value="instal.location"></ion-input>
                        <ion-select label="Type of installation" label-placement="stacked" fill="outline" placeholder="Select a type of installation" :value="instal.type">
                            <ion-select-option value="cooling">Cooling</ion-select-option>
                            <ion-select-option value="heating">Heating</ion-select-option>
                            <ion-select-option value="ventilation">Ventilation</ion-select-option>
                            <ion-select-option value="electricity">Electricity</ion-select-option>
                            <ion-select-option value="security">Security</ion-select-option>
                        </ion-select>
                        <ion-input label="Reported outages" label-placement="stacked" fill="outline" placeholder="Enter reported outages" :value="instal.fault"></ion-input>
                        <ion-label>Link to test procedure:</ion-label>
                        <!-- TODO: add link to PDF doc -->
                        <router-link to="">
                            PDF document
                        </router-link>
                        <ion-textarea label="Comments" label-placement="stacked" fill="outline" placeholder="Enter a comment" :value="instal.comments"></ion-textarea>
                        <ion-checkbox label-placement="end" :checked="inspection.installations.approved" :value="instal.approved">Approved</ion-checkbox>
                        <!-- TODO: add option to add photo's -->
                    </fieldset>
                    <h2>Inventory modifications</h2>
                    <fieldset v-for="mod in inspection.modifications" :key="mod.id">
                        <legend>Modification {{ mod.id }}</legend>
                        <!-- TODO: add link to PDF doc -->
                        <ion-label>Existing situation and already documented modifications:</ion-label>
                        <router-link to="">
                            PDF document
                        </router-link>
                        <ion-input label="Location of modification found" label-placement="stacked" fill="outline" placeholder="Enter the location" :value="mod.location"></ion-input>
                        <ion-select label="Modification done by" label-placement="stacked" fill="outline" placeholder="Select the executor" :value="mod.doneBy">
                            <ion-select-option value="tenant">Tenant</ion-select-option>
                            <ion-select-option value="contractor">Contractor</ion-select-option>
                            <ion-select-option value="unknown">Unknown</ion-select-option>
                        </ion-select>
                        <ion-textarea label="Modification description" label-placement="stacked" fill="outline" placeholder="Enter a description of the modification" :value="mod.description"></ion-textarea>
                        <ion-select label="Action to be taken" label-placement="stacked" fill="outline" placeholder="Select an action" :value="mod.action">
                            <ion-select-option value="accept">Accept</ion-select-option>
                            <ion-select-option value="inspect">Have it inspected</ion-select-option>
                            <ion-select-option value="remove">Have it removed</ion-select-option>
                            <ion-select-option value="adjust">Have it adjusted and inspected</ion-select-option>
                        </ion-select>
                        <ion-textarea label="Comments" label-placement="stacked" fill="outline" placeholder="Enter a comment" :value="mod.comments"></ion-textarea>
                        <!-- TODO: add option to add photo's -->
                    </fieldset>
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
    }

    @media screen and (min-width: 30rem) {
        .info {
            flex-direction: row;
        }
    }

    .info p {
        flex: 1 1 auto;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    @media screen and (min-width: 30rem) {
        form {
            align-items: start;
        }
    }
</style>