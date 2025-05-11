import axios from "axios";

const url = 'https://my-json-server.typicode.com/PixelPete77/RealEstateCare/users';

export const authUser = async (username, password) => {
    try {
        // Fetch the users from our fake database
        const response = await axios.get(url);
        // Since we don't need to specify if the user was not found or if the password did not match, 
        // we can check if the user exists and the password is correct at the same time 
        const user = response.data.find(user => user.username === username && user.password === password);
        // Throw an error if the user is not found or the password does not match, else return the user
        if (!user) {
            throw new Error('Invalid username or password');
        }
        return user;
    } catch (error) {
        throw new Error(`Failed to fetch users: ${error.message}`);
    }
}