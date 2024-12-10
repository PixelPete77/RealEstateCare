import axios from "axios";

const url = 'https://my-json-server.typicode.com/PixelPete77/RealEstateCare/inspections';
// const url = 'https://my-json-server.typicode.com/PixelPete77/RealEstateCare/inspections?inspectorId=1';

export const fetchInspections = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch inspections: ${error.message}`);
    }
}