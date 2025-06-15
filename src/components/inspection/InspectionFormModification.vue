<script setup>
    import { reactive } from 'vue';
    import { RouterLink } from 'vue-router';
    import { 
        IonInput, 
        IonLabel, 
        IonSelect, 
        IonSelectOption, 
        IonTextarea } from '@ionic/vue';

    const props = defineProps({
        modData: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    })

    
    const emit = defineEmits(['update-mod']);
    
    const localMod = reactive({...props.modData }); // Create a local copy of the modification object, spread the properties of the passed prop and make it reactive
    
    const emitUpdate = () => {
        emit('update-mod', localMod); // Emit updated data to the parent component when something in the local modification object changes
    };
</script>

<template>
    <fieldset>
        <legend>Modification {{ index + 1 }}</legend>
        <!-- TODO: add link to PDF doc -->
        <ion-label>Existing situation and already documented modifications:</ion-label>
        <router-link to="">
            PDF document
        </router-link>
        <ion-input label="Location of modification found" label-placement="stacked" fill="outline" placeholder="Enter the location" v-model="localMod.location" @ionChange="emitUpdate"></ion-input>
        <ion-select label="Modification done by" label-placement="stacked" fill="outline" placeholder="Select the executor" v-model="localMod.doneBy" @ionChange="emitUpdate">
            <ion-select-option value="tenant">Tenant</ion-select-option>
            <ion-select-option value="contractor">Contractor</ion-select-option>
            <ion-select-option value="unknown">Unknown</ion-select-option>
        </ion-select>
        <ion-textarea label="Modification description" label-placement="stacked" fill="outline" placeholder="Enter a description of the modification" v-model="localMod.description" @ionChange="emitUpdate"></ion-textarea>
        <ion-select label="Action to be taken" label-placement="stacked" fill="outline" placeholder="Select an action" v-model="localMod.action" @ionChange="emitUpdate">
            <ion-select-option value="accept">Accept</ion-select-option>
            <ion-select-option value="inspect">Have it inspected</ion-select-option>
            <ion-select-option value="remove">Have it removed</ion-select-option>
            <ion-select-option value="adjust">Have it adjusted and inspected</ion-select-option>
        </ion-select>
        <ion-textarea label="Comments" label-placement="stacked" fill="outline" placeholder="Enter a comment" v-model="localMod.comments" @ionChange="emitUpdate"></ion-textarea>
        <!-- TODO: add option to add photo's -->
    </fieldset>
</template>

<style scoped>

</style>