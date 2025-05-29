<script setup>
    import { ref } from 'vue';
    import { useAuthStore } from '@/stores/authStore';
    import { IonButton, IonInput, IonSpinner } from '@ionic/vue';

    const auth = useAuthStore();
    const code = ref(Number);
    const emit = defineEmits(['verification-success']);

    const handleVerification = () => {
        if (auth.verifyUser(code.value)) {
            emit('verification-success'); // Emit the verification was a success to the parent component
        };
    }
</script>

<template>
    <form class="authform" @submit.prevent="handleVerification">
        <p v-if="auth.errors">{{ auth.errors }}</p>
        <ion-input 
            type="number" 
            fill="outline"
            error-text="The code must be 6 digits"
            label="Verfication code" 
            label-placement="stacked" 
            placeholder="000000" 
            required
            v-model="code"
        ></ion-input>
        <ion-button type="submit" expand="block">
            Verify
        </ion-button>
    </form>
</template>

<style scoped>
    
</style>