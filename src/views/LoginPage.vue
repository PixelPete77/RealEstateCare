<script setup>
    import { onBeforeUnmount, onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import AuthLoginForm from '@/components/authforms/AuthLoginForm.vue';
    import AuthVerificationForm from '@/components/authforms/AuthVerificationForm.vue';
    import { IonContent, IonPage } from '@ionic/vue';

    const router = useRouter();
    const step = ref('login');

    const handlePopState = (event) => {
        // If the user moved back from 'verify' step, go back to 'login'
        step.value = event.state?.step === 'verify' ? 'verify' : 'login';
    };

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
                <AuthLoginForm v-if="step === 'login'" @login-success="step = 'verify'" /> <!-- Change the step to 'verify' when the login is successful -->
                <AuthVerificationForm v-if="step === 'verify'" @verification-success="router.push('/')" /> <!-- Redirect to the dashboard page if the verification is successful -->
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
</style>