<script setup>
    import router from '@/router';
    import { IonButton } from '@ionic/vue';
    import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue';
    import { formatDate } from '@/composables/formatDate';

    const props = defineProps({
        address: { type: Object, required: true },
        id: { type: Number, required: true },
        date: { type: String, required: true }
    });

    const formattedDate = formatDate(props.date);

    // --- Methods -------------------------------------

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
    <li class="insp-list-item">
        <div>
            <h2 class="insp-list-item-title">
                Inspection #{{ id }}
            </h2>
            <p>
                <span class="insp-list-item-label">Date:</span>
                {{ formattedDate }}
            </p>
            <p>
                <span class="insp-list-item-label">Address:</span>
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
    .insp-list-item {
        border-bottom: 1px solid hsl(0, 0%, 50%);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-block-end: 1.5rem;
    }

    @media screen and (min-width: 30rem) {
        .insp-list-item {
            flex-direction: row;
            align-items: end;
        }
    }

    .insp-list-item > div {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }

    @media screen and (min-width: 48rem) {
        .insp-list-item > div {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 1rem;
        }
    }

    .insp-list-item-title {
        flex: 1 1 100%;
        margin-block-end: 0;
    }

    .insp-list-item-label {
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