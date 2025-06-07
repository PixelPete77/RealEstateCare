export const applyTheme = (theme) => {
    const htmlEl = document.documentElement;
    const themeClasses = ['system', 'light', 'dark']; // Define the theme classes
    
    htmlEl.classList.remove(...themeClasses); // Remove any of the theme classes from the html element, should there be any
    htmlEl.classList.add(theme); // Add the new theme class to the html element
}