<script setup>
    import { computed } from 'vue';
    import { IonButton, IonContent, IonInput, IonPage, IonSelect, IonSelectOption } from '@ionic/vue';
    import { useUserStore } from '@/stores/userStore';

    const userStore = useUserStore();
    const user = computed(() => userStore.user);
</script>

<template>
    <ion-page>
        <ion-content>
            <div class="wrapper">
                <h1>Settings</h1>
                <h2>Profile</h2>
                <form @submit.prevent="userStore.updateProfile()">
                    <ion-input 
                        fill="outline"
                        label="Username" 
                        label-placement="stacked" 
                        :value="user.username"
                        disabled
                    ></ion-input>

                    <ion-button type="submit">Update Profile</ion-button>
                </form>
                <h2>Preferences</h2>
                <ion-select 
                    fill="outline" 
                    label="Theme" 
                    label-placement="stacked" 
                    v-model="user.settings.theme" 
                    @ionChange="(evt) => userStore.setTheme(evt.detail.value)"
                >
                    <ion-select-option value="system">System default</ion-select-option>
                    <ion-select-option value="light">Light</ion-select-option>
                    <ion-select-option value="dark">Dark</ion-select-option>
                </ion-select>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<style scoped>
    form {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 1rem;
        margin-block-end: 2rem;
    }

    ion-input, ion-select {
        max-inline-size: 30rem;
    }
</style>