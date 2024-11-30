<script setup>
    import { IonContent, IonHeader, IonFooter, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
    import DashboardCard from '@/components/dashboard/DashboardCard.vue';
    import CompletedIcon from '@/components/icons/CompletedIcon.vue';
    import ScheduledIcon from '@/components/icons/ScheduledIcon.vue';
    import KnowledgeBaseIcon from '@/components/icons/KnowledgeBaseIcon.vue';
    import SettingsIcon from '@/components/icons/SettingsIcon.vue';
</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Blank</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <div id="wrapper">
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
            </div>
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <ion-title>Footer</ion-title>
            </ion-toolbar>
        </ion-footer>
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