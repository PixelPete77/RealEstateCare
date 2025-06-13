<script setup>
    import { 
        IonCheckbox, 
        IonInput, 
        IonSelect, 
        IonSelectOption} from '@ionic/vue';

    const props = defineProps({
        mntnc: {
            type: Object,
            required: true
        }
    })
</script>

<template>
    <fieldset>
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
</template>

<style scoped>

</style>