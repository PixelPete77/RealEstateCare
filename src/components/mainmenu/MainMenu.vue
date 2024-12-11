<script setup>
    import { IonToolbar } from '@ionic/vue';
    import MainMenuItem from './MainMenuItem.vue';
    import { CompletedIcon, HelpIcon, KnowledgeBaseIcon, ScheduledIcon } from '@/components/icons/'
</script>

<template>
    <ion-toolbar color="primary">
        <nav id="main-menu">
            <ul>
                <MainMenuItem link="/scheduled" text="Scheduled inspections">
                    <ScheduledIcon />
                </MainMenuItem>
                <MainMenuItem link="/completed" text="Completed inspections">
                    <CompletedIcon />
                </MainMenuItem>
                <MainMenuItem link="/knowledge-base" text="Knowledge base">
                    <KnowledgeBaseIcon />
                </MainMenuItem>
                <MainMenuItem link="/help" text="Help">
                    <HelpIcon />
                </MainMenuItem>
            </ul>
        </nav>
    </ion-toolbar>
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