import { ref } from "vue";
import { defineStore } from "pinia";
import { fetchInspections } from "@/services/inspectionService";

export const useInspectionsStore = defineStore('inspections', () => {
    // State
    const errors = ref(null);
    const inspections = ref([]);
    const loadingStatus = ref('loading');

    // Actions
    const fetchInspectionsData = async () => {
        loadingStatus.value = 'loading';
        try {
            const data = await fetchInspections();
            inspections.value = data;
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
        fetchInspectionsData,
        getInspectionById
    }
})