import axios from "axios";
import { transformStatesData } from "./transformers";

const API_URI = "https://data.covid19india.org";
const STATES_API = '/data.json';
const DISTRICT_API = '/state_district_wise.json';

export const statesDataAPI = async () => {
    try {
        const api = `${API_URI}${STATES_API}`;
        const data = await axios.get(api);

        return transformStatesData(data)
    } catch(e) {
        throw Error(`States API Failed: ${e.message}`)
    }
}

export const districtWiseDataAPI = async () => {
    try {
        const api = `${API_URI}${DISTRICT_API}`;
        const data = await axios.get(api);
        console.log(data)

        return data
    } catch(e) {
        throw Error(`District wise Data API Failed: ${e.message}`)
    }
}