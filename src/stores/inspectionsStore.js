import { ref } from 'vue';
import { defineStore } from 'pinia';
import { fetchInspections } from '@/services/inspectionService';
import { useUserStore } from './userStore';

export const useInspectionsStore = defineStore('inspections', () => {
    // State
    const errors = ref(null);
    const inspections = ref([]);
    const loadingStatus = ref('loading');
    const userStore = useUserStore();

    // Actions
    const fetchCompletedInspectionsData = async () => {
        loadingStatus.value = 'loading';
        const inspectorId = userStore.getUser?.id; // Get the user's id from the user store

        try {
            // Ideally we should only fetch inspections for this user which are not completed
            // But since we're using a fake database where we can't use 'null' as a parameter in the url, we're fetching all inspections and filtering them
            const data = await fetchInspections(inspectorId); // Fetch inspections for the specific user
            inspections.value = data.filter(inspection => inspection.completedDate !== null); // Filter out inspections which have a completed date (the value is not null)
        } catch (error) {
            errors.value = error.message;
        } finally {
            loadingStatus.value = 'notloading';
        }
    }

    const fetchScheduledInspectionsData = async () => {
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

    // Getters
    const getInspectionById = (id) => {
        return inspections.value.find(inspection => inspection.id === parseInt(id));
    }

    // Make the state, actions and getters available to other components
    return {
        errors,
        inspections,
        loadingStatus,
        fetchCompletedInspectionsData,
        fetchScheduledInspectionsData,
        getInspectionById
    }
})