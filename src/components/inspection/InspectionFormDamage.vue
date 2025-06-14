<script setup>
    import { reactive, watch } from 'vue';
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
        }
    })

    const emit = defineEmits(['update-damage']);
    
    const localDmg = reactive({...props.dmgData }); // Create a local copy of the damage object, spread the properties of the passed prop and make it reactive
    console.log('Local damage data initialized:', localDmg);

    watch(localDmg, () => {
        console.log('Damage data updated:', localDmg);
        emit('update-damage', localDmg); // Emit updated data to the parent component when something in the local damage object changes
        
    }, { deep: true });
</script>

<template>
    <fieldset>
        <legend>Damage {{ localDmg.id }}</legend>
        <ion-input label="Location" label-placement="stacked" fill="outline" placeholder="Enter the location" v-model="localDmg.location"></ion-input>
        <ion-select label="Type of damage" label-placement="stacked" fill="outline" placeholder="Select a type of damage" v-model="localDmg.type">
            <ion-select-option value="intentional">Intentional</ion-select-option>
            <ion-select-option value="wear">Wear</ion-select-option>
            <ion-select-option value="force">Force</ion-select-option>
            <ion-select-option value="normal">Normal use</ion-select-option>
            <ion-select-option value="calamity">Calamity</ion-select-option>
            <ion-select-option value="other">Other</ion-select-option>
        </ion-select>
        <ion-textarea label="Description" label-placement="stacked" fill="outline" placeholder="Enter a description of the damage" v-model="localDmg.description"></ion-textarea>
        <ion-checkbox label-placement="end" v-model="localDmg.new">New damage</ion-checkbox>
        <ion-checkbox label-placement="end" v-model="localDmg.urgent">Urgent action required</ion-checkbox>
        <!-- TODO: add option to add photo's -->
    </fieldset>
</template>

<style scoped>

</style>