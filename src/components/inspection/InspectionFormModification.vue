<script setup>
    import { RouterLink } from 'vue-router';
    import { 
        IonInput, 
        IonLabel, 
        IonSelect, 
        IonSelectOption, 
        IonTextarea } from '@ionic/vue';

    const props = defineProps({
        mod: {
            type: Object,
            required: true
        }
    })
</script>

<template>
    <fieldset>
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
</template>

<style scoped>

</style>