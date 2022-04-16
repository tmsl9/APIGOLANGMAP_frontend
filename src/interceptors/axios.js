import axios from "axios";
import { get } from 'svelte/store';
import { auth } from "../Routes.svelte"
import { token, authenticated } from "../stores/store"

axios.defaults.baseURL = 'http://localhost:8081/api/v1';
axios.defaults.headers.common['content-type'] = "application/json";
axios.defaults.headers.common['Authorization'] = get(token)

let refresh = false;

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true;

        const response = await axios.put(auth.refresh_token, {}, { withCredentials: true });

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
    return error;
});
