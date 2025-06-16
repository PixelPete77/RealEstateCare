// Save inspection data to localStorage (in case the user is offline)
export const saveQueueToLocalStorage = (id, data) => {
    const queue = JSON.parse(localStorage.getItem('offline-inspection-queue') || '[]'); // Retrieve the existing data or initialize it as an empty array
    queue.push({ id, data });
    localStorage.setItem('offline-inspection-queue', JSON.stringify(queue));
};