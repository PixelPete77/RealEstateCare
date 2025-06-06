import axios from 'axios';

export const fetchInspections = async (inspectorId) => {
    // Use the provided id so we can fetch inspections only for this specific inspector
    const url = `https://my-json-server.typicode.com/PixelPete77/RealEstateCare/inspections?inspectorId=${inspectorId}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch inspections: ${error.message}`);
    }
}

export const fetchInspection = async (id) => {
    const url = `https://my-json-server.typicode.com/PixelPete77/RealEstateCare/inspections?id=${id}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch inspection with id ${id}: ${error.message}`);
    }
}