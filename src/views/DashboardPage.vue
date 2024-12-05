<script setup>
    import { IonContent, IonPage } from '@ionic/vue';
    import DashboardCard from '@/components/dashboard/DashboardCard.vue';
    import { CompletedIcon, KnowledgeBaseIcon, ScheduledIcon, SettingsIcon } from '@/components/icons/'
</script>

<template>
    <ion-page>
        <ion-content>
            <h1 class="sr-only">Dashboard</h1>
            <nav id="wrapper">
                <DashboardCard link="scheduled" text="Scheduled inspections">
                    <ScheduledIcon />
                </DashboardCard>
                <DashboardCard link="completed" text="Completed inspections">
                    <CompletedIcon />
                </DashboardCard>
                <DashboardCard link="knowledge-base" text="Knowledge base">
                    <KnowledgeBaseIcon />
                </DashboardCard>
                <DashboardCard link="settings" text="Settings">
                    <SettingsIcon />
                </DashboardCard>
            </nav>
        </ion-content>
    </ion-page>
</template>
  
<style scoped>
    #wrapper {
        block-size: 100%;
        max-inline-size: 42rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin: auto;
        padding: 1rem;
    }
</style>