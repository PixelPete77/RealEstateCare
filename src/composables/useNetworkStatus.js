
export const useNetworkStatus = () => {
    const isOnline = ref(navigator.onLine); // Initialize the online status

    // Function to update the online status
    const updateOnlineStatus = () => {
        isOnline.value = navigator.onLine;
    };

    // Add event listeners for online and offline events
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Cleanup function to remove event listeners
    onUnmounted(() => {
        window.removeEventListener('online', updateOnlineStatus);
        window.removeEventListener('offline', updateOnlineStatus);
    });

    return { isOnline };
}