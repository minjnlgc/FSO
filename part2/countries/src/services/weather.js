import axios from "axios"

const api_key = import.meta.env.VITE_SOME_KEY;
const baseUrl = "https://api.openweathermap.org/data/3.0/onecall?";

const getByLatAndLon = (lat, lon) => {
    return axios.get(`${baseUrl}&lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`).then(response => response.data);
}

export default {getByLatAndLon}