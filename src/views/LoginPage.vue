<script setup>
    import { onBeforeUnmount, onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '@/stores/authStore';
    import { IonButton, IonContent, IonInput, IonPage, IonSpinner } from '@ionic/vue';
    import { EyeIcon, EyeOffIcon } from '@/components/icons';

    const auth = useAuthStore();
    const code = ref(Number);
    const password = ref('');
    const passwordVisible = ref('false');
    const router = useRouter();
    const step = ref('login');
    const usernameInput = ref(null);
    const username = ref('');

    const handleLogin = async () => {
        // Call the authUser method from the authStore to authenticate the user
        await auth.authUser(username.value, password.value);
        // If the user is authenticated, the authStore will return a user object and we can continue to the verification step
        if (auth.user) {
            history.pushState({ step: 'verify' }, '', '');  // Push a new state to the history stack, so the user can navigate back to the login step
            step.value = 'verify';
        }
    };

    const handlePopState = (event) => {
        // If the user moved back from 'verify' step, go back to 'login'
        step.value = event.state?.step === 'verify' ? 'verify' : 'login';
    };

    const handleVerification = () => {
        if (auth.verifyUser(code.value)) {
            // Redirect to the dashboard page if the verification is successful
            router.push('/');
        };
    }

    const togglePasswordVisibility = () => {
        passwordVisible.value = !passwordVisible.value;
    }

    // Check if the entered username input is a valid email address
    // Based on an example in the Ionic documentation: https://ionicframework.com/docs/api/input#helper--error-text
    const validateEmail = (email) => {
        return email.match(
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        );
    }
 
    const validate = (event) => {
        const value = event.target.value;
        const usernameInputEl = usernameInput.value?.$el;

        usernameInputEl.classList.remove('ion-valid', 'ion-invalid');

        // Stop if the username input is empty, else continue and call the validateEmail function
        if (value === '') return;

        // Add ion-valid class if validateEmail returns true, else add ion-invalid class
        validateEmail(value)
            ? usernameInputEl.classList.add('ion-valid')
            : usernameInputEl.classList.add('ion-invalid');
    }

    const markTouched = () => {
        const usernameInputEl = usernameInput.value?.$el;
        usernameInputEl.classList.add('ion-touched');
    }

    onMounted(() => {
        window.addEventListener('popstate', handlePopState);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('popstate', handlePopState);
    });
</script>

<template>
    <ion-page>
        <ion-content>
            <div class="wrapper">
                <img src="/src/assets/images/RealEstateCare_logo_v.svg">
                <h1>Login</h1>
                <form @submit.prevent="handleLogin" v-if="step === 'login'">
                    <p v-if="auth.errors">{{ auth.errors }}</p>
                    <ion-input 
                        ref="usernameInput" 
                        type="email" 
                        autocomplete="email"
                        fill="outline"
                        error-text="Please enter a valid e-mail address"
                        label="E-mail address" 
                        label-placement="stacked" 
                        placeholder="Enter your e-mail address" 
                        required
                        v-model="username"
                        @ionInput="validate"
                        @ionBlur="markTouched"
                    ></ion-input>
                    <ion-input 
                        :type="passwordVisible ? 'text': 'password'" 
                        autocomplete="current-password"
                        fill="outline" 
                        label="Password" 
                        label-placement="stacked" 
                        placeholder="Enter the password"
                        required
                        v-model="password"
                    >
                        <ion-button slot="end" fill="clear" @click="togglePasswordVisibility" :aria-label="passwordVisible ? 'Hide password' : 'Show password'">
                            <EyeIcon slot="icon-only" v-if="!passwordVisible" />
                            <EyeOffIcon slot="icon-only" v-if="passwordVisible"  />
                        </ion-button>
                    </ion-input>
                    <ion-button type="submit" expand="block" :disabled="auth.authenticating">
                        <ion-spinner v-if="auth.authenticating" name="dots" />
                        <template v-else>Log in</template>
                    </ion-button>
                </form>
                <form @submit.prevent="handleVerification" v-if="step === 'verify'">
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

    ion-spinner {
        margin-block: -.375rem;
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
            color: var(--ion-color-danger);
            margin-block: -1rem 1rem;
        }
    }
</style>