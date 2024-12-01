<script setup>
    import { IonContent, IonHeader, IonFooter, IonPage, IonToolbar } from '@ionic/vue';
    import DashboardCard from '@/components/dashboard/DashboardCard.vue';
    import { AvatarIcon, CompletedIcon, KnowledgeBaseIcon, NotificationsIcon, ScheduledIcon, SettingsIcon } from '@/components/icons/'
</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="dark">
                <img src="/src/assets/images/RealEstateCare_logo.svg" class="logo" slot="start">
                <div slot="end">
                    <button>
                        <NotificationsIcon />
                    </button>
                    <button>
                        <AvatarIcon />
                    </button>
                </div>
            </ion-toolbar>
        </ion-header>

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
        <ion-footer>
            <ion-toolbar color="primary">
                
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>
  
<style scoped>
    ion-header ion-toolbar {
        padding-inline: 1rem;
    }

    ion-header .logo {
        block-size: 56px;
        margin-block: .5rem;
    }

    ion-header button {
        background: none;
        color: inherit;
        padding: .75rem;
    }
    
    ion-header button svg {
        inline-size: 1.5rem;
    }

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