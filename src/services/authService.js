import axios from "axios";

const url = 'https://my-json-server.typicode.com/PixelPete77/RealEstateCare/users';

export const fetchUsers = async () => {

    // Fetch the users from our fake database
    try {
        const response = await axios.get(url); 
        return response.data;  
    } catch (error) {
        throw new Error(`Failed to fetch users`);
    }
}