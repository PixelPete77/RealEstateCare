import { ref, toRaw } from 'vue';
import { defineStore } from 'pinia';
import { useNetworkStatus } from '@/composables/useNetworkStatus';
import { useOfflineInspectionStorage } from '@/composables/useOfflineInspectionStorage';
import { fetchInspections, fetchInspection, updateInspectionInDb } from '@/services/inspectionService';
import { useUserStore } from './userStore';

export const useInspectionsStore = defineStore('inspections', () => {
    const { addQueueToLocalStorage } = useOfflineInspectionStorage();
    const isOnline  = useNetworkStatus();
    const userStore = useUserStore();

    // State
    const completedInspections = ref([]);
    const errors = ref(null);
    const inspections = ref([]);
    const inspection = ref(null);
    const loadingStatus = ref('loading');

    // Actions
    const completedInspectionsData = async () => {
        if (completedInspections.value.length) return; // Check if the completed inpections are already in the state (not an empty array) so we don't unnecessarily fetch it again

        loadingStatus.value = 'loading';
        const inspectorId = userStore.getUser?.id; // Get the user's id from the user store

        try {
            // Ideally we should only fetch inspections for this user which are not completed
            // But since we're using a fake database where we can't use 'null' as a parameter in the url, we're fetching all inspections and filtering them
            const data = await fetchInspections(inspectorId); // Fetch inspections for the specific user
            completedInspections.value = data.filter(inspection => inspection.completedDate !== null); // Filter out inspections which have a completed date (the value is not null)
        } catch (error) {
            errors.value = error.message;
        } finally {
            loadingStatus.value = 'notloading';
        }
    }

    const scheduledInspectionsData = async () => {
        if (inspections.value.length) return; // Check if the completed inpections are already in the state (not an empty array) so we don't unnecessarily fetch it again

        loadingStatus.value = 'loading';
        const inspectorId = userStore.getUser?.id; // Get the user's id from the user store

        try {
            const data = await fetchInspections(inspectorId); // Fetch inspections for the specific user
            inspections.value = data.filter(inspection => inspection.completedDate === null); // Filter out inspections which don't have a completed date
        } catch (error) {
            errors.value = error.message;
        } finally {
            loadingStatus.value = 'notloading';
        }
    }

    const inspectionById = async (id) => {
        loadingStatus.value = 'loading';

        try {
            const data = await fetchInspection(id);
            inspection.value = data[0]; // Assuming the API returns an array, we take the first element and assign it to the inspection state
        } catch (error) {
            errors.value = error.message;
        } finally {
            loadingStatus.value = 'notloading';
        }
    }

    const loadInspection = async (id) => {
        // Inspection data can be retreived from existing inspections or fetched if not available
        const existingInspection = getInspectionById(id); // Check if the inspection is already available
        if (existingInspection) {
            inspection.value = existingInspection; // If the inspection was found in the existing inspections, assign it to the inspection state
        } else {
            await inspectionById(id); // Otherwise, fetch it using the provided id
        }
    }

    const updateInspection = async (id, data) => {
        const cleanData = toRaw(data); // Ensure the data is not a proxy but a plain object

        if (!isOnline.value) {
            addQueueToLocalStorage(id, cleanData);  // Send the data to be saved in the local storage if the user is offline
            Object.assign(inspection.value, cleanData); // Mutate the inpection state with the new data
            return { success: true };
        }

        try {
            await updateInspectionInDb(id, cleanData); // Update the inspection data in the fake database
            Object.assign(inspection.value, cleanData); // Mutate the inpection state with the new data
            console.log('Inspection updated successfully:', inspection.value);
            return { success: true };
        } catch (error) {
            return { success: false };
        }
    }
    
    // Getters
    const getInspectionById = (id) => {
        // Find the inspection by id in completed or scheduled inspections
        return inspections.value.find(inspection => inspection.id === parseInt(id)) ||
                            completedInspections.value.find(inspection => inspection.id === parseInt(id));
    }

    // Make the state, actions and getters available to other components
    return {
        completedInspections,
        errors,
        inspections,
        inspection,
        loadingStatus,
        completedInspectionsData,
        scheduledInspectionsData,
        loadInspection,
        updateInspection,
        getInspectionById
    }
})