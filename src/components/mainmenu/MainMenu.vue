<script setup>

</script>

<template>
    <nav id="main-menu">
        <ul>
            <slot></slot>
        </ul>
    </nav>
</template>

<style scoped>
    nav {
        display: flex;
        margin-inline: auto;
        max-inline-size: 42rem;
    }
    ul {
        display: contents;
        list-style: none;
    }
</style>