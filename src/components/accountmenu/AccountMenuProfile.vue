<script setup>
    import { useAuthStore } from '@/stores/authStore';
    
    const auth = useAuthStore();
</script>

<template>
    <span>
        {{ auth.user.firstName }} {{ auth.user.lastName }}
    </span>
    {{ auth.user.username }}
</template>

<style scoped>
    
</style>