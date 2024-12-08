<template>
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="anim" d="M3.21179 30.0025L29.9975 56.7845L56.7832 30.0025L29.9975 3.21182L3.21179 30.0025ZM0 30.0025L29.9975 3.05176e-05L60 30.0025L29.9975 60L0 30.0025Z"/>
        <path d="M3.21179 30.0025L29.9975 56.7845L56.7832 30.0025L29.9975 3.21182L3.21179 30.0025ZM0 30.0025L29.9975 3.05176e-05L60 30.0025L29.9975 60L0 30.0025Z"/>
    </svg>
</template>

<style scoped>
    svg {
        inline-size: 3.75rem;
        block-size: auto;
        fill: var(--c-primary);
    }

    @media (prefers-reduced-motion: no-preference) {
        #anim {
            animation: loader 1s cubic-bezier(0.095, 0.655, 0.29, 0.93) infinite both;
            transform-origin: center;
        }
    }

    @keyframes loader {
        0% {
            transform: scale(0) rotate(-45deg);
        }
        50%, 100% {
            transform: scale(1) rotate(0deg);
        }
    }
</style>