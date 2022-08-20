import axios from "axios";

const API_URI = "https://api.covid19india.org";
const STATES_API = '/data.json';
const DISTRICT_API = '/state_district_wise.json';

export const statesData = async () => {
    try {
        const api = `${API_URI}${STATES_API}`;
        const data = await axios.get(api);
        console.log(data)

        return data
    } catch(e) {
        throw Error(`States API Failed: ${e.message}`)
    }
}

export const districtWiseData = async () => {
    try {
        const api = `${API_URI}${DISTRICT_API}`;
        const data = await axios.get(api);
        console.log(data)

        return data
    } catch(e) {
        throw Error(`District wise Data API Failed: ${e.message}`)
    }
}