<script setup>
    import { IonAccordion, IonAccordionGroup, IonContent, IonItem, IonLabel, IonPage } from '@ionic/vue';
    import { EmailIcon, PhoneIcon } from '@/components/icons';
</script>

<template>
    <ion-page>
        <ion-content>
            <div class="wrapper">
                <h1>Help</h1>
                <h2>Frequently Asked Questions</h2>
                <p>Here you'll find a list of frequently asked questions.</p>
                <ion-accordion-group>
                    <ion-accordion value="first">
                        <ion-item slot="header" color="light">
                            <ion-label>Can I change my password?</ion-label>
                        </ion-item>
                        <div class="ion-padding" slot="content">At the moment you cannot change your password unfortunately. This will be posssible soon.</div>
                    </ion-accordion>
                    <ion-accordion value="second">
                        <ion-item slot="header" color="light">
                            <ion-label>Can I add new items to a completed inspection?</ion-label>
                        </ion-item>
                        <div class="ion-padding" slot="content">While it is possible to edit existing data of a completed inspection, you cannot add new data to it. Only in scheduled inspections can new items be added. If you think this is necessary, please let us know.</div>
                    </ion-accordion>
                </ion-accordion-group>
                <h2>Contact</h2>
                <p>In case you have another question, you can call us or send us a message.</p>
                <div>
                    <PhoneIcon />
                    <a href="tel:0123456789">012 - 345 67 89</a>
                </div>
                <div>
                    <EmailIcon />
                    <a href="mailto:support@realestatecare.com">support@realestatecare.com</a>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<style scoped>
    ion-accordion-group {
        margin-block-start: 1.5rem;
        margin-block-end: 2rem;
    }

    ion-accordion div {
        padding: 1rem;
    }

    div > div {
        display: flex;
        align-items: center;
        gap: .5rem;
        margin-block-start: 1rem;
    }

    div > div > svg {
        inline-size: 1.5rem;
        flex: 0 0 auto
    }
</style>