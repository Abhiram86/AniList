import Axios from "axios";

export const signup = async (userData) => {
    const user = await Axios.post('https://ani-list-one.vercel.app/auth/register', userData);
    console.log(user.data);
    return user.data;
}

export const login = async (userData) => {
    const user = await Axios.post('https://ani-list-one.vercel.app/auth/login', userData);
    localStorage.setItem('user', JSON.stringify(user.data))
    return user.data;
}