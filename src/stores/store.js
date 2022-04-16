import { writable, get } from 'svelte/store';

// localStorage
export let username = writable(localStorage.getItem("username") || "");

// sessionStorage
export let token = writable(sessionStorage.getItem("token") || "");
export let authenticated = writable(sessionStorage.getItem("authenticated") || false);

username.subscribe((val) => (localStorage.username = val));
token.subscribe((val) => (sessionStorage.token = val));
authenticated.subscribe((val) => (sessionStorage.authenticated = val));

if (get(authenticated).toString() === "false" || get(token) === "" || get(username) === "undefined" ||
    get(token) === "undefined" || get(authenticated) === "undefined") {
    cleanStore()
}

export function cleanStore(){
    updateStore("", "", false)
}

export function updateStore(usrn, tkn, authd) {
    username.set(usrn)
    token.set(tkn)
    authenticated.set(authd)
}