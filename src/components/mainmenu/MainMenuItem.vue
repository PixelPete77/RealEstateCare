<script setup>
    const props = defineProps({
        link: {
            type: String,
            required: true
        }
    })
</script>

<template>
    <li>
        <a>
            <slot></slot>
            {{ link }}
        </a>
    </li>
</template>

<style scoped>
    li {
        flex: 1 1 0%;
    }

    a {
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: .875rem;
        line-height: 1.2;
        padding: .5rem;
        text-align: center;
    }

    :deep(svg) {
        inline-size: 1.5rem;
        margin-block-end: .25rem;
    }
</style>