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

    :deep(svg) {
        inline-size: 1.25rem;
        margin-inline-end: .375rem;
    }
</style>