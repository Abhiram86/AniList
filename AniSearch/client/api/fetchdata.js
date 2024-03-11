import Axios from 'axios';

export const fetchData = async (page, type) => {
    let response = [];
    response = await Axios.get(`https://shikimori.one/api/animes?page=${page}&limit=12&order=${type}`);
    return response.data;
}

export const fetchAnime = async (name) => {
    let response = [];
    response = await Axios.get(`https://shikimori.one/api/animes?search=${name}&limit=30&censored=true`);
    return response.data;
}