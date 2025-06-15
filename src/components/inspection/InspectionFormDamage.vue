<script setup>
    import { reactive } from 'vue';
    import { 
        IonCheckbox, 
        IonInput, 
        IonSelect, 
        IonSelectOption, 
        IonTextarea } from '@ionic/vue';

    const props = defineProps({
        dmgData: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    })
    console.log('index prop:', props.index, typeof props.index);
    const emit = defineEmits(['update-damage']);
    
    const localDmg = reactive({...props.dmgData }); // Create a local copy of the damage object, spread the properties of the passed prop and make it reactive
    
    const emitUpdate = () => {
        emit('update-damage', localDmg); // Emit updated data to the parent component when something in the local damage object changes
    };
</script>

<template>
    <fieldset>
        <legend>Damage {{ index + 1 }}</legend>
        <ion-input label="Location" label-placement="stacked" fill="outline" placeholder="Enter the location" v-model="localDmg.location" @ionChange="emitUpdate"></ion-input>
        <ion-select label="Type of damage" label-placement="stacked" fill="outline" placeholder="Select a type of damage" v-model="localDmg.type" @ionChange="emitUpdate">
            <ion-select-option value="intentional">Intentional</ion-select-option>
            <ion-select-option value="wear">Wear</ion-select-option>
            <ion-select-option value="force">Force</ion-select-option>
            <ion-select-option value="normal">Normal use</ion-select-option>
            <ion-select-option value="calamity">Calamity</ion-select-option>
            <ion-select-option value="other">Other</ion-select-option>
        </ion-select>
        <ion-textarea label="Description" label-placement="stacked" fill="outline" placeholder="Enter a description of the damage" v-model="localDmg.description" @ionChange="emitUpdate"></ion-textarea>
        <ion-checkbox label-placement="end" v-model="localDmg.new" @ionChange="emitUpdate">New damage</ion-checkbox>
        <ion-checkbox label-placement="end" v-model="localDmg.urgent" @ionChange="emitUpdate">Urgent action required</ion-checkbox>
        <!-- TODO: add option to add photo's -->
    </fieldset>
</template>

<style scoped>

</style>