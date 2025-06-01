<script setup>
    import { ref } from 'vue';
    import { useAuthStore } from '@/stores/authStore';
    import { IonButton, IonInput, IonSpinner } from '@ionic/vue';
    import { EyeIcon, EyeOffIcon } from '@/components/icons';

    const auth = useAuthStore();
    const emit = defineEmits(['login-success']);
    const password = ref('');
    const passwordVisible = ref(false);
    const usernameInput = ref(null);
    const username = ref('');

    const handleLogin = async () => {
        // Call the authUser method from the authStore to authenticate the user
        await auth.authUser(username.value, password.value);
        // If the user is authenticated, the authStore will return a user object and we can continue to the verification step
        if (auth.user) {
            history.pushState({ step: 'verify' }, '', '');  // Push a new state to the history stack, so the user can navigate back to the login step
            emit('login-success'); // Emit the login was a success to the parent component, so we can switch to the verification step
        }
    };

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
</script>

<template>
    <form class="authform" @submit.prevent="handleLogin">
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
</template>

<style scoped>
    ion-spinner {
        margin-block: -.375rem;
    }
</style>