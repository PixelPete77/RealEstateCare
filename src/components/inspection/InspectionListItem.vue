<script setup>
    import { IonButton } from '@ionic/vue';
    import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue';
</script>

<template>
    <li>
        <div>
            <h2>
                <slot name="id"></slot>
            </h2>
            <p>
                <span>Date:</span>
                <slot name="date"></slot>
            </p>
            <p>
                <span>Address:</span>
                <slot name="address"></slot>
            </p>
        </div>
        <ion-button>
            Go to inspection
            <ArrowRightIcon slot="end" />
        </ion-button>
    </li>
</template>

<style scoped>
    li {
        border-bottom: 1px solid hsl(0, 0%, 50%);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-block-end: 1.5rem;
    }

    @media screen and (min-width: 30rem) {
        li {
            flex-direction: row;
            align-items: end;
        }
    }

    div {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }

    @media screen and (min-width: 48rem) {
        div {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 1rem;
        }
    }

    h2 {
        flex: 1 1 100%;
        margin-block-end: 0;
    }

    span {
        display: block;
        opacity: .67;
    }

    ion-button {
        flex: 0 0 auto;
    }

    ion-button :deep(svg) {
        inline-size: 1rem;
        block-size: auto;
    }
</style>