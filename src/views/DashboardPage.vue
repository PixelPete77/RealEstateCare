<script setup>
    import { IonContent } from '@ionic/vue';
    import DashboardCard from '@/components/dashboard/DashboardCard.vue';
    import { AvatarIcon, CompletedIcon, HelpIcon, KnowledgeBaseIcon, NotificationsIcon, ScheduledIcon, SettingsIcon } from '@/components/icons/'
</script>

<template>
    <ion-content class="arc-bg" :fullscreen="true">
        <h1 class="sr-only">Dashboard</h1>
        <nav id="wrapper">
            <DashboardCard text="Scheduled inspections">
                <ScheduledIcon />
            </DashboardCard>
            <DashboardCard text="Completed inspections">
                <CompletedIcon />
            </DashboardCard>
            <DashboardCard text="Knowledge base">
                <KnowledgeBaseIcon />
            </DashboardCard>
            <DashboardCard text="Settings">
                <SettingsIcon />
            </DashboardCard>
        </nav>
    </ion-content>
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