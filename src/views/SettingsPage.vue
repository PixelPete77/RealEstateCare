<script setup>
    import { computed, ref } from 'vue';
    import { IonButton, IonContent, IonInput, IonPage, IonSelect, IonSelectOption, IonToast } from '@ionic/vue';
    import { useUserStore } from '@/stores/userStore';
    import { applyTheme } from '@/composables/applyTheme';

    const userStore = useUserStore();
    const user = computed(() => userStore.user);
    const firstName = ref(user.value.firstName);
    const lastName = ref(user.value.lastName);

    const toastClass = ref('');
    const toastMessage = ref('');
    const toastShow = ref(false);
    const setOpen = () => {
        toastShow.value = !toastShow.value;
    }


    const handleTheme = (event) => {
        const theme = event.detail.value;
        
        applyTheme(theme); // Apply the theme (set a CSS class on the body)

        userStore.updateTheme(theme); // Call the action in userStore to update the theme setting in the database
        
        localStorage.setItem('theme',  theme); // Save the theme setting to localStorage so we can use it even if the user is not logged in
    };

    const handleProfileUpdate = async () => {
        const result = await userStore.updateProfile(firstName.value, lastName.value);

        if (result.success) {
            toastMessage.value = 'Profile updated successfully';
            toastShow.value = true;
            toastClass.value = 'toast-success';
        } else {
            toastMessage.value = 'Failed to update profile';
            toastShow.value = true;
            toastClass.value = 'toast-error';
        }
    };
</script>

<template>
    <ion-page>
        <ion-content>
            <div class="wrapper">
                <h1>Settings</h1>
                <h2>Profile</h2>
                <form @submit.prevent="handleProfileUpdate()">
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
                        v-model="firstName"
                    ></ion-input>
                    <ion-input 
                        fill="outline"
                        label="Lastname" 
                        label-placement="stacked" 
                        v-model="lastName"
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
            <ion-toast swipe-gesture="vertical" :class="toastClass" :duration="5000" :is-open="toastShow" :message="toastMessage" @didDismiss="setOpen(false)"></ion-toast>
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