<script setup>
    import { RouterLink } from 'vue-router';

    const props = defineProps({
        link: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    })
</script>

<template>
    <router-link :to="link">
        <slot></slot>
        {{ text }}
    </router-link>   
</template>

<style scoped>
    a {
        block-size: 100%;
        color: inherit;
        display: flex;
        line-height: 1.2;
        padding: .75rem 1rem;
        text-align: center;
        text-decoration: none;
    }

    a:last-of-type {
        border-block-end: 1px solid color-mix(in srgb, currentColor 20%, transparent);
    }

    :deep(svg) {
        block-size: auto;
        inline-size: 1.25rem;
        margin-inline-end: .375rem;
    }
</style>