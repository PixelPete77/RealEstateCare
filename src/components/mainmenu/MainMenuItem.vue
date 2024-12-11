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
    <li class="main-menu-item">
        <router-link :to="link" class="main-menu-link">
            <slot></slot>
            {{ text }}
        </router-link>
    </li>
</template>

<style scoped>
    .main-menu-item {
        flex: 1 1 0%;
    }

    .main-menu-link {
        block-size: 100%;
        position: relative;
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: .875rem;
        line-height: 1.2;
        padding: .5rem;
        text-align: center;
        text-decoration: none;
    }

    .main-menu-link::after {
        position: absolute;
        left: calc(50% - 5px);
        bottom: -6px;
        inline-size: 10px;
        block-size: 10px;
        background-color: currentColor;
        content: '';
        transform: rotate(45deg) translateY(100%);
        transition: transform .2s ease;
        transform-origin: center;
    }

    .main-menu-link.router-link-active::after {
        transform: rotate(45deg) translateY(0);
    }

    :deep(svg) {
        inline-size: 1.5rem;
        margin-block-end: .25rem;
        opacity: .67;
        transition: opacity .2s ease;
    }

    .main-menu-link.router-link-active :deep(svg) {
        opacity: 1;
    }
</style>