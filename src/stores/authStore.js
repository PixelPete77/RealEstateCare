import { ref } from "vue";
import { defineStore } from "pinia";
import { authUser } from "@/services/authService";

export const useAuthStore = defineStore('auth', () => {
    // State
    const authenticating = ref(false);
    const errors = ref(null);
    const user = ref(null);

    // Actions
    const loginUser = async (username, password) => {
        authenticating.value = true;
        try {
            const authenticatedUser = await authUser(username, password);
            user.value = authenticatedUser;
        } catch (error) {
            errors.value = error.message;
        } finally {
            authenticating.value = false;
        }
    }

    // Getters
    

    // Make the state, actions and getters available to other components
    return {
        errors,
        user,
        authenticating,
        loginUser
    }
})