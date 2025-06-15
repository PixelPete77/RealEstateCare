<script setup>
    import { reactive } from 'vue';
    import { 
        IonCheckbox, 
        IonInput, 
        IonSelect, 
        IonSelectOption} from '@ionic/vue';

    const props = defineProps({
        mntncData: {
            type: Object,
            required: true
        }
    })

    const emit = defineEmits(['update-mntnc']);
    
    const localMntnc = reactive({...props.mntncData }); // Create a local copy of the maintenance object, spread the properties of the passed prop and make it reactive
    
    const emitUpdate = () => {
        emit('update-mntnc', localMntnc); // Emit updated data to the parent component when something in the local maintenance object changes
    };
</script>

<template>
    <fieldset>
        <legend>Deferred maintenance {{ localMntnc.id }}</legend>
        <ion-input label="Location" label-placement="stacked" fill="outline" placeholder="Enter the location" v-model="localMntnc.location" @ionChange="emitUpdate"></ion-input>
        <ion-select label="Type of maintenance" label-placement="stacked" fill="outline" placeholder="Select a type of maintenance" v-model="localMntnc.type" @ionChange="emitUpdate">
            <ion-select-option value="painting">Painting</ion-select-option>
            <ion-select-option value="woodrot">Wood rot</ion-select-option>
            <ion-select-option value="electricity">Electricity</ion-select-option>
            <ion-select-option value="piping">Piping</ion-select-option>
            <ion-select-option value="glass">Glass</ion-select-option>
        </ion-select>
        <ion-select label="Cost indication" label-placement="stacked" fill="outline" placeholder="Select a cost indication" v-model="localMntnc.costIndication" @ionChange="emitUpdate">
            <ion-select-option value="0-500">0 - 500</ion-select-option>
            <ion-select-option value="500-1500">500 - 1.500</ion-select-option>
            <ion-select-option value="1500+">1.500+</ion-select-option>
        </ion-select>
        <ion-checkbox label-placement="end" v-model="localMntnc.urgent" @ionChange="emitUpdate">Urgent action required</ion-checkbox>
        <!-- TODO: add option to add photo's -->
    </fieldset>
</template>

<style scoped>

</style>