<script setup>
    import { useAuthStore } from '@/stores/authStore';
    
    const auth = useAuthStore();
</script>

<template>
    <p>
        <span>
            {{ auth.user?.firstName }} {{ auth.user?.lastName }}
        </span>
        {{ auth.user?.username }}
    </p>
    
</template>

<style scoped>
    p {
        padding: .2rem 1rem;

        & span {
            display: block;
            font-weight: 700;
        }
    }
</style>