<script setup>
    import { ref, onMounted } from 'vue';
    import { IonContent, IonPage } from '@ionic/vue';

    const documents = ref({});

    const filePaths = import.meta.glob('@/assets/documents/**/*', { query: '?url', import: 'default', eager: true });

    onMounted(() => {
        for (const path in filePaths) {
            const url = filePaths[path];
            const pathParts = path.split('/');
            const fullFileName = pathParts[pathParts.length - 1]; // Get the last part of the path: the file name
            const folderName = pathParts[pathParts.length - 2]; // Get the second last part of the path: the folder name

            const dotIndex = fullFileName.lastIndexOf('.');
            const fileName = dotIndex !== -1 ? fullFileName.slice(0, dotIndex) : fullFileName;
            const extension = dotIndex !== -1 ? fullFileName.slice(dotIndex + 1).toUpperCase() : '';

            // Create folder key if not present
            if (!documents.value[folderName]) {
                documents.value[folderName] = [];
            }

            documents.value[folderName].push({
                name: fileName,
                extension,
                url,
            });
        }
    });
</script>

<template>
    <ion-page>
        <ion-content>
            <div class="wrapper">
                <h1>Knowledge base</h1>
                <div v-for="(group, folderName) in documents" :key="folderName">
                    <h2>{{ folderName }}</h2>
                    <ul>
                        <li v-for="(document, index) in group" :key="index">
                            {{ document.name }}
                            {{ document.extension }}
                            <a :href="document.url" target="_blank">Download</a>
                        </li>
                    </ul>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<style scoped>
    
</style>