<script setup>
    import { defineProps, emit, reactive, watch } from 'vue';
    import { 
        IonCheckbox, 
        IonDatetime, 
        IonDatetimeButton, 
        IonInput, 
        IonLabel, 
        IonModal, 
        IonSelect, 
        IonSelectOption, 
        IonTextarea } from '@ionic/vue';

    const props = defineProps({
        dmg: {
            type: Object,
            required: true
        }
    })

    const localDmg = reactive({...props.dmg }); // Create a local copy of the damage object, spread the properties of the passed prop

    watch(localDmg, () => {
        emit('update:dmg', localDmg); // Emit updated data to the parent component when something in the local damage object changes
    }, { deep: true });
</script>

<template>
    <fieldset>
        <legend>Damage {{ dmg.id }}</legend>
        <ion-label>Date:</ion-label>
        <ion-datetime-button datetime="datetime"></ion-datetime-button>
        <ion-input label="Location" label-placement="stacked" fill="outline" placeholder="Enter the location" v-model="localDmg.location"></ion-input>
        <ion-select label="Type of damage" label-placement="stacked" fill="outline" placeholder="Select a type of damage" :value="localDmg.type">
            <ion-select-option value="intentional">Intentional</ion-select-option>
            <ion-select-option value="wear">Wear</ion-select-option>
            <ion-select-option value="force">Force</ion-select-option>
            <ion-select-option value="normal">Normal use</ion-select-option>
            <ion-select-option value="calamity">Calamity</ion-select-option>
            <ion-select-option value="other">Other</ion-select-option>
        </ion-select>
        <ion-textarea label="Description" label-placement="stacked" fill="outline" placeholder="Enter a description of the damage":value="localDmg.description"></ion-textarea>
        <ion-checkbox label-placement="end" :checked="dmg.new">New damage</ion-checkbox>
        <ion-checkbox label-placement="end" :checked="dmg.urgent">Urgent action required</ion-checkbox>
        <!-- TODO: add option to add photo's -->

        <ion-modal :keep-contents-mounted="true">
            <ion-datetime id="datetime" presentation="date" :value="dmg.date"></ion-datetime>
        </ion-modal>
    </fieldset>
</template>

<style scoped>

</style>