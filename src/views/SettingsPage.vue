<script setup>
    import { computed } from 'vue';
    import { IonButton, IonContent, IonInput, IonPage, IonSelect, IonSelectOption } from '@ionic/vue';
    import { useUserStore } from '@/stores/userStore';
    import { applyTheme } from '@/composables/applyTheme';

    const userStore = useUserStore();
    const user = computed(() => userStore.user);

    const handleTheme = (event) => {
        const theme = event.detail.value;
        
        applyTheme(theme); // Apply the theme

        userStore.updateTheme(theme); // Call the action in userStore to update the theme setting in the database

        localStorage.setItem('theme',  theme); // Save the theme setting to localStorage so we can use it even if the user is not logged in
    };
</script>

<template>
    <ion-page>
        <ion-content>
            <div class="wrapper">
                <h1>Settings</h1>
                <h2>Profile</h2>
                <form @submit.prevent="userStore.updateProfile(user.firstName, user.lastName)">
                    <ion-input 
                        fill="outline"
                        label="Username" 
                        label-placement="stacked" 
                        :value="user.username"
                        disabled
                    ></ion-input>
                    <ion-input 
                        fill="outline"
                        label="Firstname" 
                        label-placement="stacked" 
                        v-model="user.firstName"
                    ></ion-input>
                    <ion-input 
                        fill="outline"
                        label="Lastname" 
                        label-placement="stacked" 
                        v-model="user.lastName"
                    ></ion-input>

                    <ion-button type="submit">Update Profile</ion-button>
                </form>
                <h2>Preferences</h2>
                <ion-select 
                    fill="outline" 
                    label="Theme" 
                    label-placement="stacked" 
                    v-model="user.settings.theme" 
                    @ionChange="handleTheme($event)"
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