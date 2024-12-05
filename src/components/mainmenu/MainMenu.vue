<script setup>
    import { IonFooter, IonToolbar } from '@ionic/vue';
    import MainMenuItem from './MainMenuItem.vue';
    import { CompletedIcon, HelpIcon, KnowledgeBaseIcon, ScheduledIcon } from '@/components/icons/'
</script>

<template>
    <ion-footer>
        <ion-toolbar color="primary">
            <nav id="main-menu">
                <ul>
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
                </ul>
            </nav>
        </ion-toolbar>
    </ion-footer>
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