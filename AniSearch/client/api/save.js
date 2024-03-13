import axios from "axios";

export const getSavedData = async (email) => {
    const savedData = await axios.post("https://ani-list-one.vercel.app/save/saved", {email})
    return savedData.data
}
export const saveData = async (showObj) => {
    const response = await axios.put("https://ani-list-one.vercel.app/save/save", showObj)
    console.log(response.data.data);
    return response.data.data;
}
export const removeData = async (id, email) => {
    await axios.put("https://ani-list-one.vercel.app/save/remove", {id, email})
}