<script setup>
    import { reactive } from 'vue';
    import { RouterLink } from 'vue-router';
    import { 
        IonCheckbox, 
        IonInput, 
        IonLabel, 
        IonSelect, 
        IonSelectOption, 
        IonTextarea } from '@ionic/vue';

    const props = defineProps({
        instalData: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    })

    const emit = defineEmits(['update-instal']);
    
    const localInstal = reactive({...props.instalData }); // Create a local copy of the installation object, spread the properties of the passed prop and make it reactive
    
    const emitUpdate = () => {
        emit('update-instal', localInstal); // Emit updated data to the parent component when something in the local installation object changes
    };
</script>

<template>
    <fieldset>
        <legend>Technical installation {{ index + 1 }}</legend>
        <ion-input label="Location" label-placement="stacked" fill="outline" placeholder="Enter the location" v-model="localInstal.location" @ionChange="emitUpdate"></ion-input>
        <ion-select label="Type of installation" label-placement="stacked" fill="outline" placeholder="Select a type of installation" v-model="localInstal.type" @ionChange="emitUpdate">
            <ion-select-option value="cooling">Cooling</ion-select-option>
            <ion-select-option value="heating">Heating</ion-select-option>
            <ion-select-option value="ventilation">Ventilation</ion-select-option>
            <ion-select-option value="electricity">Electricity</ion-select-option>
            <ion-select-option value="security">Security</ion-select-option>
        </ion-select>
        <ion-input label="Reported outages" label-placement="stacked" fill="outline" placeholder="Enter reported outages" v-model="localInstal.fault" @ionChange="emitUpdate"></ion-input>
        <ion-label>Link to test procedure:</ion-label>
        <!-- TODO: add link to PDF doc -->
        <router-link to="">
            PDF document
        </router-link>
        <ion-textarea label="Comments" label-placement="stacked" fill="outline" placeholder="Enter a comment" v-model="localInstal.comments" @ionChange="emitUpdate"></ion-textarea>
        <ion-checkbox label-placement="end" v-model="localInstal.approved" @ionChange="emitUpdate">Approved</ion-checkbox>
        <!-- TODO: add option to add photo's -->
    </fieldset>
</template>

<style scoped>

</style>