import axios from "axios";
import { get } from 'svelte/store';
import { auth } from "../Routes.svelte"
import { token, authenticated } from "../stores/store"

//axios.defaults.baseURL = 'http://sheltered-mountain-58087.herokuapp.com/api/v1';
axios.defaults.baseURL = 'http://localhost:8081/api/v1';
axios.defaults.headers.common['content-type'] = "application/json";
axios.defaults.headers.common['Authorization'] = get(token)

let refresh = false;

// refresh token if request with authorization gives 401
axios.interceptors.response.use(resp => resp, async error => {

    // if it's login or logout don't refresh token
    if (error.config.url === auth.login || error.config.url === auth.logout) {
        return error.response
    }

    if (error.response.status === 401 && !refresh) {
        refresh = true;

        const response = await axios.put(auth.refresh_token, {});

        if (response.status === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            token.set(response.data.token)
            authenticated.set(true)

            return axios(error.config);
        } else {
            axios.defaults.headers.common['Authorization'] = ""
            token.set("")
            authenticated.set(false)
        }
    }
    refresh = false;
    return error.response;
});
