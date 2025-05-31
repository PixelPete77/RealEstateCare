<script setup>
    import { LogoutIcon } from '@/components/icons/';

    
</script>

<template>
    <button>
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
        inline-size: 1.25rem;
        margin-inline-end: .375rem;
    }
</style>