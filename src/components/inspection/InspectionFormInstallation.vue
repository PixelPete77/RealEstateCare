<script setup>
    import { RouterLink } from 'vue-router';
    import { 
        IonCheckbox, 
        IonInput, 
        IonLabel, 
        IonSelect, 
        IonSelectOption, 
        IonTextarea } from '@ionic/vue';

    const props = defineProps({
        instal: {
            type: Object,
            required: true
        }
    })
</script>

<template>
    <fieldset>
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
        <ion-checkbox label-placement="end" :checked="instal.approved" :value="instal.approved">Approved</ion-checkbox>
        <!-- TODO: add option to add photo's -->
    </fieldset>
</template>

<style scoped>

</style>