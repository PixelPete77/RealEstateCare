import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
    // State
    const user = ref(null);

    // Actions
    const clearUser = () => {
        user.value = null;
    };

    const updateNotifications = (value) => {
        // Since we are using a fake database, we can't actually save the setting. But let's pretend we can.
        user.value.settings.notifications = value; // Update the user's notification setting
    }

    const updateProfile = (firstName, lastName ) => {
        user.value.firstName = firstName; // Update the user's name
        user.value.lastName = lastName;
    }

    const updateTheme = (value) => {
        user.value.settings.theme = value; // Update the user's theme setting
    }

    const setUser = (userData) => {
        user.value = userData; // Set the received user data in the state
    };

    // Getters
    const getUser = computed(() => user.value);

    // Make the state, actions and getter available to other components
    return {
        user,
        clearUser,
        updateNotifications,
        updateProfile,
        updateTheme,
        setUser,
        getUser
    };
})