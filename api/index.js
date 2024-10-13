import axios from "axios";

const API_KEY = '46478354-af56ed102148909dee093d6e0';

const apiUrl = `https://pixabay.com/api/?key=${API_KEY}`;

const formatUrl = (params) => {

    let uri = apiUrl + "&per_page=25&safesearch=true&editors_choice=true"
    // let uri = apiUrl + "&per_page=25&safesearch=true&editors_choice=true&lang=ru"

    if (!params) return uri;

    let paramKey = Object.keys(params);

    paramKey.map(key => {

        let value = key === 'q' ? encodeURIComponent(params[key]) : params[key];

        uri += `&${key}=${value}`

    })

    // console.log('final uri:', uri)

    return uri;

}

export const apiCall = async (params) => {
    try {

        const response = await axios.get(formatUrl(params));

        const {data} = response;
        return {success: true, data}

    } catch (error) {
        console.log('got error', error.message);
        return {success: false, msg: error.message};
    }
}