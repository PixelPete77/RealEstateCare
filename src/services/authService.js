import axios from 'axios';

export const fetchUser = async (username, password) => {
    const url = `https://my-json-server.typicode.com/PixelPete77/RealEstateCare/users?username=${username}&password=${password}`;
    // Fetch the user from our fake database, using the username and password
    try {
        const response = await axios.get(url); 
        return response.data[0] || null; // Return the user object from the array (we can assume that the response will always return an array with only one user object)
    } catch (error) {
        throw new Error(`Failed to fetch user`);
    }
}

export const fetchUserByToken = async (token) => {
    const url = `https://my-json-server.typicode.com/PixelPete77/RealEstateCare/users?token=${token}`;
    // Fetch the user from our fake database, using the token
    try {
        const response = await axios.get(url);
        return response.data[0] || null; // Return the user object from the array (we can assume that the response will always return an array with only one user object)   
    } catch (error) {
        throw new Error(`Failed to fetch user by token`);
    }
}