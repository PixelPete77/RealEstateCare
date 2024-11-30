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

<style scoped>
    .dashboard-card {
        --dashboard-bg: hsl(0deg 0% 100% / .8);
        --dashboard-card-icon-color: var(--c-primary);
        --dashboard-shadow-color: 0deg 0% 63%;
        --dashboard-shadow: 0 .4px .5px hsl(var(--dashboard-shadow-color) / 0.33),
                            0 1.2px 1.3px -0.8px hsl(var(--dashboard-shadow-color) / 0.33),
                            .1px 3px 3.4px -1.7px hsl(var(--dashboard-shadow-color) / 0.33),
                            .2px 7.2px 8.1px -2.5px hsl(var(--dashboard-shadow-color) / 0.33);
        
        background: var(--dashboard-bg);
        backdrop-filter: blur(5px);
        border-radius: .5rem;
        box-shadow: var(--dashboard-shadow);
        display: grid;
        align-items: center;
        justify-items: center;
        gap: 1rem;
        font-weight: 500;
        font-size: 1.5rem;
        padding: 1rem;
        text-align: center;
    }
    
    :deep(svg) {
        inline-size: 5rem;
        stroke: var(--dashboard-card-icon-color);
    }
</style>