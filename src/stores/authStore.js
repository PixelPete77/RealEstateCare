import { ref } from "vue";
import { defineStore } from "pinia";
import { fetchUsers } from "@/services/authService";

export const useAuthStore = defineStore('auth', () => {
    // State
    const authenticating = ref(false);
    const errors = ref(null);
    const user = ref(null);

    // Actions
    const authUser = async (username, password) => { 
        authenticating.value = true;
        errors.value = null; // Reset errors to clear possible previous error
        
        try {
            const users = await fetchUsers();

            // Since we don't need to specify if the username was not found or if the password did not match, 
            // we can check if the user exists and the password is correct at the same time 
            const currentUser = users.find(user => user.username === username && user.password === password);

            // Throw an error if the credentials are incorrect
            if (!currentUser) {
                throw new Error('Invalid username or password');
            }
            // Set the authenticated user in the state
            user.value = currentUser;
        } catch (error) {
            errors.value = error.message;
        } finally {
            authenticating.value = false;
        }
    }

    const verifyUser = (code) => {
        errors.value = null;
        // Check if the entered code matches the code in the user's data
        if (Number(code) === user.value.code) {
            return true;
        } else {
            errors.value = 'Invalid verification code';
            return false;
        }
    }
    
    // Getters

    // Make the state, actions and getters available to other components
    return {
        authenticating,
        errors,
        user,
        authUser,
        verifyUser
    }
})