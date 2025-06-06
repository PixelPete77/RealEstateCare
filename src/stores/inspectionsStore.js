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
            inspection.value = data[0]; // Assuming the API returns an array, we take the first element
            console.log('Fetched inspection:', inspection.value);
        } catch (error) {
            errors.value = error.message;
        } finally {
            loadingStatus.value = 'notloading';
        }
    }

    // Getters
    const getInspectionById = (id) => {
        // Find the inspection by id in completed or scheduled inspections and return it
        return inspections.value.find(inspection => inspection.id === parseInt(id)) ||
                completedInspections.value.find(inspection => inspection.id === parseInt(id));
    }

    const getInspection = computed(() => inspection.value);

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
        getInspectionById,
        getInspection
    }
})