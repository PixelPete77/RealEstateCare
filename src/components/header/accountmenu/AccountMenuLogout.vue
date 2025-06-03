<script setup>
    import router from '@/router';
    import { useAuthStore } from '@/stores/authStore';
    import { LogoutIcon } from '@/components/icons/';

    const auth = useAuthStore();

    const handleLogout = () => {
        auth.logoutUser(); // Call the logout method from the auth store to clear user data and remove the session
        router.push({ name: 'Login' }); // Redirect to the Login page
    };
</script>

<template>
    <button @click="handleLogout">
        <LogoutIcon />
        Logout
    </button>   
</template>

<style scoped>
    ion-popover button {
        block-size: 100%;
        color: var(--ion-color-danger);
        display: flex;
        font-size: 1rem;
        line-height: 1.2;
        padding: .75rem 1rem;
        text-align: center;
        text-decoration: none;
    }

    svg {
        block-size: auto;
        inline-size: 1.25rem;
        margin-inline-end: .375rem;
    }
</style>