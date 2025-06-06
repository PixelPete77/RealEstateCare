import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { fetchInspections, fetchInspection } from '@/services/inspectionService';
import { useUserStore } from './userStore';

export const useInspectionsStore = defineStore('inspections', () => {
    // State
    const completedInspections = ref([]);
    const errors = ref(null);
    const inspections = ref([]);
    const inspection = ref(null);
    const loadingStatus = ref('loading');
    const userStore = useUserStore();

    // Actions
    const fetchCompletedInspections = async () => {
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

    const fetchScheduledInspections = async () => {
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

    const fetchInspectionById = async (id) => {
        loadingStatus.value = 'loading';

        try {
            const data = await fetchInspection(id);
            inspection.value = data[0]; // Assuming the API returns an array, we take the first element and assign it to the inspection state
            console.log('Fetched inspection:', inspection.value);
        } catch (error) {
            errors.value = error.message;
        } finally {
            loadingStatus.value = 'notloading';
        }
    }

    // Inpsection data can be retreived from existing inspections or fetched from the AP
    const loadInspection = async (id) => {
        const existingInspection = getInspectionById(id); // Check if the inspection is already available
        if (existingInspection) {
            inspection.value = existingInspection; // If the inspection was found in the existing inspections, assign it to the inspection state
        } else {
            await fetchInspectionById(id); // Otherwise, fetch it using the provided id
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
        fetchCompletedInspections,
        fetchScheduledInspections,
        fetchInspectionById,
        loadInspection,
        getInspectionById
    }
})