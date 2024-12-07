import { defineStore } from "pinia";
import axios from "axios";

const url = 'https://my-json-server.typicode.com/PixelPete77/RealEstateCare/inspections';

export const useInspectionsStore = defineStore('inspections', {
    state: () => {
        return {
            loadingStatus: 'notloading',
            inspections: [],
            errors: null
        }
    },
    actions: {
        fetchInspections() {
            this.loadingStatus = 'loading';
            // http request
            axios.get(url)
                .then(result => {
                    // Data successfully retrieved
                    this.loadingStatus = 'notloading';
                    this.inspections = result.data;
                    this.errors = null;
                })
                .catch(err => {
                    // Error retrieving data
                    this.loadingStatus = 'notloading';
                    this.inspections = [];
                    this.errors = err.message;
                })
        }
    },
    getters: {
        
    }
})