export const formatDate = (date) => {
    // Change received date format to dd/mm/yyyy
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
}