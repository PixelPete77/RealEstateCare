import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { updateUserNotificationSetting, updateUserProfile, updateUserThemeSetting } from '@/services/userService';

export const useUserStore = defineStore('user', () => {
    // State
    const user = ref(null);

    // Actions
    const clearUser = () => {
        user.value = null;
    };

    const updateNotifications = async (value) => {
        // Since we are using a fake database, we can't actually save the setting. But let's pretend we can.
        try {
            await updateUserNotificationSetting(value); // Update the notifications setting in the fake database
            user.value.settings.notifications = value; // Update the user's notification setting
        } catch (error) {
            // Do something when the update to the notification setting fails
        }
    }

    const updateProfile = async (firstName, lastName) => {
        try {
            await updateUserProfile(firstName, lastName); // Update the profile data in the fake database
            user.value.firstName = firstName; // Update the user's name
            user.value.lastName = lastName;
            return { success: true };
        } catch (error) {
            // Do something when the profile update fails
            return { success: false };
        }
    }

    const updateTheme = async (value) => {
        try {
            await updateUserThemeSetting(value); // Update the theme setting in the fake database
            user.value.settings.theme = value; // Update the user's theme setting
        } catch (error) {
            // Do something when the theme update fails
        }
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