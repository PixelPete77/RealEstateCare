<script setup>
    import { ref, onMounted } from 'vue';
    import { IonContent, IonPage } from '@ionic/vue';

    const fileList = ref([]);

    const filePaths = import.meta.glob('@/assets/documents/**/*', { as: 'url', eager: true });

    onMounted(() => {
        fileList.value = Object.values(filePaths);
    });
</script>

<template>
    <ion-page>
        <ion-content>
            <div class="wrapper">
                <h1>Knowledge base</h1>
                <ul>
                    <li v-for="(file, index) in fileList" :key="index">
                        <a :href="file" target="_blank">{{ file }}</a>
                    </li>
                </ul>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<style scoped>
    
</style>