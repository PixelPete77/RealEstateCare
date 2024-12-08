<script setup>
    import { computed } from 'vue';
    import router from '@/router';
    import { IonButton } from '@ionic/vue';
    import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue';

    const props = defineProps({
        address: { type: Object, required: true },
        id: { type: Number, required: true },
        date: { type: String, required: true }
    });

    // Computed properties
    const formattedDate = computed(() => {
        // Change received JSON date format to dd/mm/yyyy
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(props.date).toLocaleDateString('en-GB', options);
    })

    // Methods
    const goToInspection = (id) => {
        router.push({
            name: 'inspection',
            params: {
                id: id
            }
        });
    }
</script>

<template>
    <li>
        <div>
            <h2>
                Inspection #{{ id }}
            </h2>
            <p>
                <span>Date:</span>
                {{ formattedDate }}
            </p>
            <p>
                <span>Address:</span>
                {{ address.street }}, {{ address.city }}, {{ address.zipCode }}, {{ address.province }}
            </p>
        </div>
        <ion-button @click="goToInspection(id)">
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
        margin-inline-start: .125em;
    }
</style>