import { writable, get } from 'svelte/store';

//user info
export let userID = writable(sessionStorage.getItem("userID") || 0);
export let username = writable(sessionStorage.getItem("username") || "");
//auth
export let token = writable(sessionStorage.getItem("token") || "");
export let authenticated = writable(sessionStorage.getItem("authenticated") || false);

userID.subscribe((val) => (sessionStorage.userID = val));
username.subscribe((val) => (sessionStorage.username = val));
token.subscribe((val) => (sessionStorage.token = val));
authenticated.subscribe((val) => (sessionStorage.authenticated = val));

// Have to manage this better.
// This (clean store when value invalid) should happen if only token isn't defined.
// Everything else can be obtained through auth.getUser route.
if (get(authenticated).toString() === "false" || get(token) === "" || get(userID) === "undefined"
    || get(username) === "undefined" || get(token) === "undefined" || get(authenticated) === "undefined") {
    cleanStore()
}

export function cleanStore(){
    updateStore(0, "", "", false)
}

export function updateStore(id, usrn, tkn, authd) {
    if (id    != null) { userID.set(id)           }
    if (usrn  != null) { username.set(usrn)       }
    if (tkn   != null) { token.set(tkn)           }
    if (authd != null) { authenticated.set(authd) }
}