<script setup>
    import { IonButton, IonContent, IonHeader, IonFooter, IonPage, IonToolbar } from '@ionic/vue';
    import DashboardCard from '@/components/dashboard/DashboardCard.vue';
    import MainMenu from '@/components/mainmenu/MainMenu.vue';
    import MainMenuItem from '@/components/mainmenu/MainMenuItem.vue';
    import { AvatarIcon, CompletedIcon, HelpIcon, KnowledgeBaseIcon, NotificationsIcon, ScheduledIcon, SettingsIcon } from '@/components/icons/'
</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="dark">
                <img src="/src/assets/images/RealEstateCare_logo.svg" class="logo" slot="start">
                <div slot="end">
                    <ion-button color="dark" size="large">
                        <NotificationsIcon slot="icon-only"/>
                    </ion-button>
                    <ion-button color="dark" size="large">
                        <AvatarIcon slot="icon-only" />
                    </ion-button>
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
                <MainMenu>
                    <MainMenuItem link="Scheduled inspections">
                        <ScheduledIcon />
                    </MainMenuItem>
                    <MainMenuItem link="Completed inspections">
                        <CompletedIcon />
                    </MainMenuItem>
                    <MainMenuItem link="Knowledge base">
                        <KnowledgeBaseIcon />
                    </MainMenuItem>
                    <MainMenuItem link="Help">
                        <HelpIcon />
                    </MainMenuItem>
                </MainMenu>
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
    
    ion-header ion-button svg {
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