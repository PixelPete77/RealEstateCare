export const updateUserNotificationSetting = async (value) => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate a delay for the fake database update
    return true; // Simulate a successful update
}

export const updateUserProfile = async (firstName, lastName) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return true;
}

export const updateUserThemeSetting = async (value) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return true;
}