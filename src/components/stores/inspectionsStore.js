import { defineStore } from "pinia";
import { fetchInspections } from "@/services/inspectionService";

export const useInspectionsStore = defineStore('inspections', {
    state: () => {
        return {
            loadingStatus: 'notloading',
            inspections: [],
            errors: null
        }
    },
    actions: {
        async fetchInspections() {
            this.loadingStatus = 'loading';
            try {
                const data = await fetchInspections();
                this.inspections = data;
            } catch (error) {
                this.errors = error.message;
            } finally {
                this.loadingStatus = 'notloading';
            }
        }
    },
    getters: {
        getInspectionById: (state) => (id) => {
            return state.inspections.find((inspection) => inspection.id === parseInt(id));
        },
    },
})