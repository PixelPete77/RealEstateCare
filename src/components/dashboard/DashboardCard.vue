<script setup>
    const props = defineProps({
        text: {
            type: String,
            required: true
        }
    })
</script>

<template>
    <div class="dashboard-card">
        <slot></slot>
        {{ text }}
    </div>
</template>

<style>
    .dashboard-card {
        --c-dashboard-card-icon: var(--c-primary);
        
        border-radius: .5rem;
        font-weight: 500;
        font-size: 1.5rem;
        text-align: center;
    }
    
    .dashboard-card svg {
        inline-size: 4rem;
        display: block;
        stroke: var(--c-dashboard-card-icon);
    }
</style>