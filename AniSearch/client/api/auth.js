import Axios from "axios";

export const signup = async (userData) => {
    const user = await Axios.post('http://localhost:3001/auth/register', userData);
    console.log(user.data);
    return user.data;
}

export const login = async (userData) => {
    const user = await Axios.post('http://localhost:3001/auth/login', userData);
    localStorage.setItem('user', JSON.stringify(user.data))
    return user.data;
}