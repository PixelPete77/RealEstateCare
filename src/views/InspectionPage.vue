<script setup>
    import { computed } from 'vue';
    import { RouterLink, useRoute } from 'vue-router';
    import { useInspectionsStore } from '@/components/stores/inspectionsStore';
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
                <p>Address:<br>
                    Street: {{ inspection.address.street }}<br>
                    City: {{ inspection.address.city }}<br>
                    Province: {{ inspection.address.province }}<br>
                    Zip code: {{ inspection.address.zipCode }}
                </p>
                <h2></h2>
                <form>
                    <fieldset>
                        <legend>Record damage</legend>
                        <ion-label>Date:</ion-label>
                        <ion-datetime-button datetime="datetime"></ion-datetime-button>
                        <ion-input label="Location" label-placement="stacked" fill="outline" placeholder="Enter the location"></ion-input>
                        <ion-select label="Type of damage" label-placement="stacked" fill="outline" placeholder="Select a type of damage">
                            <ion-select-option value="intentional">Intentional</ion-select-option>
                            <ion-select-option value="wear">Wear</ion-select-option>
                            <ion-select-option value="force">Force</ion-select-option>
                            <ion-select-option value="normal">Normal use</ion-select-option>
                            <ion-select-option value="calamity">Calamity</ion-select-option>
                            <ion-select-option value="other">Other</ion-select-option>
                        </ion-select>
                        <ion-textarea label="Description" label-placement="stacked" fill="outline" placeholder="Enter a description of the damage"></ion-textarea>
                        <ion-checkbox label-placement="end" :checked="inspection.damage.new">New damage</ion-checkbox>
                        <ion-checkbox label-placement="end" :checked="inspection.damage.urgent">Urgent action required</ion-checkbox>
                        <!-- TODO: add option to add photo's -->

                        <ion-modal :keep-contents-mounted="true">
                            <ion-datetime id="datetime" presentation="date"></ion-datetime>
                        </ion-modal>
                    </fieldset>
                    <fieldset>
                        <legend>Record deferred maintenance</legend>
                        <ion-input label="Location" label-placement="stacked" fill="outline" placeholder="Enter the location"></ion-input>
                        <ion-select label="Type of maintenance" label-placement="stacked" fill="outline" placeholder="Select a type of maintenance">
                            <ion-select-option value="painting">Painting</ion-select-option>
                            <ion-select-option value="woodrot">Wood rot</ion-select-option>
                            <ion-select-option value="electricity">Electricity</ion-select-option>
                            <ion-select-option value="piping">Piping</ion-select-option>
                            <ion-select-option value="glass">Glass</ion-select-option>
                        </ion-select>
                        <ion-select label="Cost indication" label-placement="stacked" fill="outline" placeholder="Select a cost indication">
                            <ion-select-option value="0-500">0 - 500</ion-select-option>
                            <ion-select-option value="500-1500">500 - 1.500</ion-select-option>
                            <ion-select-option value="1500+">1.500+</ion-select-option>
                        </ion-select>
                        <ion-checkbox label-placement="end" :checked="inspection.maintenance.urgent">Urgent action required</ion-checkbox>
                    </fieldset>
                    <fieldset>
                        <legend>Inspect technical installations</legend>
                        <ion-input label="Location" label-placement="stacked" fill="outline" placeholder="Enter the location"></ion-input>
                        <ion-select label="Type of installation" label-placement="stacked" fill="outline" placeholder="Select a type of installation">
                            <ion-select-option value="cooling">Cooling</ion-select-option>
                            <ion-select-option value="heating">Heating</ion-select-option>
                            <ion-select-option value="ventilation">Ventilation</ion-select-option>
                            <ion-select-option value="electricity">Electricity</ion-select-option>
                            <ion-select-option value="security">Security</ion-select-option>
                        </ion-select>
                        <ion-input label="Reported outages" label-placement="stacked" fill="outline" placeholder="Enter reported outages"></ion-input>
                        <ion-label>Link to test procedure:</ion-label>
                        <router-link :to="link">
                            PDF document
                        </router-link>
                        <ion-textarea label="Comments" label-placement="stacked" fill="outline" placeholder="Enter a comment"></ion-textarea>
                        <ion-checkbox label-placement="end" :checked="inspection.installations.approved">Approved</ion-checkbox>
                    </fieldset>
                    <fieldset>
                        <legend>Inventory modifications</legend>
                        <ion-label>Existing situation and already documented modifications:</ion-label>
                        <router-link :to="link">
                            PDF document
                        </router-link>
                        <ion-input label="Location of modification found" label-placement="stacked" fill="outline" placeholder="Enter the location"></ion-input>
                        <ion-select label="Modification done by" label-placement="stacked" fill="outline" placeholder="Select the executor">
                            <ion-select-option value="tenant">Tenant</ion-select-option>
                            <ion-select-option value="contractor">Contractor</ion-select-option>
                            <ion-select-option value="unknown">Unknown</ion-select-option>
                        </ion-select>
                        <ion-textarea label="Modification description" label-placement="stacked" fill="outline" placeholder="Enter a description of the modification"></ion-textarea>
                        <ion-select label="Action to be taken" label-placement="stacked" fill="outline" placeholder="Select an action">
                            <ion-select-option value="accept">Accept</ion-select-option>
                            <ion-select-option value="inspect">Have it inspected</ion-select-option>
                            <ion-select-option value="remove">Have it removed</ion-select-option>
                            <ion-select-option value="adjust">have it adjusted and inspected</ion-select-option>
                        </ion-select>
                        <ion-textarea label="Comments" label-placement="stacked" fill="outline" placeholder="Enter a comment"></ion-textarea>
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
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    @media screen and (min-width: 30rem) {
        form {
            align-items: start;
        }
    }
</style>