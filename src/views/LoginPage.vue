<script setup>
    import { ref } from 'vue';
   
    import { useAuthStore } from '@/stores/authStore';
    import { IonButton, IonContent, IonInput, IonPage } from '@ionic/vue';

    const auth = useAuthStore();
    const username = ref('');
    const password = ref('');

    const handleLogin = async () => {
        console.log('Logging in with:', username.value, password.value);
        try {
            await auth.loginUser(username.value, password.value);
            // Redirect to the dashboard (home) after successful login
            console.log(auth.user);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    // const validateEmail = (email) => {
    //     return email.match(
    //       /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    //     );
    // }
 
    // const validate = (event) => {
    //     const value = event.target.value;

    //     $refs.usernameInput.$el.classList.remove('ion-valid');
    //     $refs.usernameInput.$el.classList.remove('ion-invalid');

    //     if (value === '') return;

    //     validateEmail(value)
    //         ? $refs.usernameInput.$el.classList.add('ion-valid')
    //         : $refs.usernameInput.$el.classList.add('ion-invalid');
    // }

    // const markTouched = () => {
    //     $refs.usernameInput.$el.classList.add('ion-touched');
    // }
</script>

<template>
    <ion-page>
        <ion-content>
            <div class="wrapper">
                <img src="/src/assets/images/RealEstateCare_logo_v.svg">
                <h1>Login</h1>
                <form @submit.prevent="handleLogin">
                    <p v-if="auth.errors">{{ auth.errors }}</p>
                    <ion-input 
                        ref="usernameInput" 
                        type="email" 
                        label="E-mail address" 
                        label-placement="stacked" 
                        fill="outline" 
                        placeholder="Enter your e-mail address" 
                        autocomplete="email"
                        v-model="username"
                    ></ion-input>
                    <ion-input 
                        type="password" 
                        label="Password" 
                        label-placement="stacked" 
                        fill="outline" 
                        placeholder="Enter the password" 
                        autocomplete="current-password"
                        v-model="password"
                    ></ion-input>
                    <ion-button type="submit" expand="block" :disabled="auth.authenticating">
                        <ion-spinner v-if="auth.authenticating" name="dots" />
                        <template v-else>Log in</template>
                    </ion-button>
                </form>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<style scoped>
    ion-content {
        --padding-top: .5rem;
        --padding-bottom: .5rem;
        --padding-start: .5rem;
        --padding-end: .5rem;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        margin-block-start: max(1rem, 10dvh);
        margin-inline: auto;
        max-inline-size: 32rem;
        min-block-size: 0;
    }

    img {
        inline-size: 12rem;
        margin-block-end: 1.5rem;
        margin-inline: auto;
    }

    form {
        & ion-input {
            margin-block-end: 1.5rem;
        }

        & p {
            color: red;
            margin-block: -1rem 1rem;
        }
    }
</style>