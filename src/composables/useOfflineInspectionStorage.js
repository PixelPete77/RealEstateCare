import { watch } from 'vue';
import { useNetworkStatus } from "./useNetworkStatus";
import { updateInspectionInDb } from '@/services/inspectionService';

const isOnline = useNetworkStatus();

const getQueue = () => {
    const queue = localStorage.getItem('inspection-queue');
    return queue ? JSON.parse(queue) : []; // Retrieve the queue from localStorage or return an empty array if it doesn't exist
};

const saveQueue = (queue) => {
    localStorage.setItem('inspection-queue', JSON.stringify(queue)); // Save the queue to localStorage
};

const flushQueue = async () => {
    const queue = getQueue();
    if (!queue.length) return; // No need to continue if the queue is empty

    const remaining = [];

    for (const { id, data } of queue) {
        try {
            await updateInspectionInDb(id, data); // Update the inspection in the database with the stored data
        } catch (err) {
            remaining.push({ id, data }); // Keep failed items in case of an error
        }
    }

    saveQueue(remaining);
};

// Save inspection data to localStorage (in case the user is offline)
const addQueueToLocalStorage = (id, data) => {
    const queue = getQueue(); // First, retrieve the current queue from localStorage
    queue.push({ id, data }); // Then add the new inspection data to the queue
    saveQueue(queue);
};

// Automatically get the stored data and update the database when we're back online
watch(isOnline, (online) => {
    if (online) {
        flushQueue();
    }
});


export const useOfflineInspectionStorage = () => {
    return {
        addQueueToLocalStorage
    };
};