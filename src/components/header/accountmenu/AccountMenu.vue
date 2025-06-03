<script setup>
    import { IonButton, IonPopover } from '@ionic/vue';
    import { AccountMenuItem, AccountMenuLogout, AccountMenuProfile } from '@/components/header/accountmenu/';
    import { AvatarIcon, SettingsIcon } from '@/components/icons/';
</script>

<template>
    <ion-button color="dark" size="large" id="account-menu">
        <AvatarIcon slot="icon-only" />
    </ion-button>
    <ion-popover trigger="account-menu" :dismiss-on-select="true">
        <AccountMenuProfile />
        <AccountMenuItem link="/settings" text="Settings">
            <SettingsIcon />
        </AccountMenuItem>
        <AccountMenuLogout />
    </ion-popover>
</template>

<style scoped>
    button {
        background: none;
        color: inherit;
        padding: .75rem;
    }
    
    ion-button svg {
        inline-size: 1.5rem;
    }

    ion-popover {
        --width: fit-content;
    }
    
    ion-popover::part(backdrop) {
        background-color: var(--ion-color-dark);
    }
</style>