<script setup>
    import { useUserStore } from '@/stores/userStore';
    
    const userStore = useUserStore();
</script>

<template>
    <p>
        <span>
            {{ userStore.user?.firstName }} {{ userStore.user?.lastName }}
        </span>
        {{ userStore.user?.username }}
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