import axios from "axios";

export const getSavedData = async (email) => {
    const savedData = await axios.post("http://localhost:3001/save/saved", {email})
    return savedData.data
}
export const saveData = async (showObj) => {
    const response = await axios.put("http://localhost:3001/save/save", showObj)
    console.log(response.data.data);
    return response.data.data;
}
export const removeData = async (id, email) => {
    await axios.put("http://localhost:3001/save/remove", {id, email})
}