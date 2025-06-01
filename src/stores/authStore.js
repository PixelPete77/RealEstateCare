import { ref } from "vue";
import { defineStore } from "pinia";
import { fetchUser } from "@/services/authService";

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
            // Since we don't need to specify if the username was not found or if the password did not match, 
            // we can check if the user exists and the password is correct at the same time 
            const currentUser = await fetchUser(username, password);
            
            // Throw an error if the credentials are incorrect (no user found)
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

    const logoutUser = () => {
        errors.value = null; // Reset errors (just in case, we shouldn't have any errors when a user was authenticated)
        user.value = null; // Clear the user data
        localStorage.removeItem('session'); // Remove the session from localStorage
    }

    const restoreUser = () => {
        // Check if there is a session in localStorage and if it has not expired
        const session = JSON.parse(localStorage.getItem('session'));
        if (session && Date.now() < session.expiresAt) {
            user.value = session.user;  // Restore the user data from session
        } else {
            user.value = null;
            localStorage.removeItem('session'); // Delete session if it has expired
        }
    };

    const verifyUser = (code) => {
        errors.value = null;
        // Check if the entered code matches the code in the user's data
        if (Number(code) === user.value.code) {
            // Define variables to store user data and set an expiration time for the session
            const { id, firstName, lastName, settings } = user.value;
            const expirationTime = 1000 * 60 * 60 * 24 * 14; // 14 days
            // Store the user data in localStorage so the user can stay logged in
            localStorage.setItem('session', JSON.stringify({
                user: { id, firstName, lastName, settings },
                expiresAt: Date.now() + expirationTime
            }));
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
        logoutUser,
        restoreUser,
        verifyUser
    }
})