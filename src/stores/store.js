import { writable, get } from 'svelte/store';

//user info
//export let admin = writable(sessionStorage.getItem("access_mode") || false)
export let userID = writable(sessionStorage.getItem("userID") || 0);
export let username = writable(sessionStorage.getItem("username") || "");
export let isSOSActivated = writable(sessionStorage.getItem("isSOSActivated") || false);
//auth
export let token = writable(sessionStorage.getItem("token") || "");
export let authenticated = writable(sessionStorage.getItem("authenticated") || false);
//coords
export let coordinates = writable(sessionStorage.getItem("coordinates") || []);

userID.subscribe((val) => (sessionStorage.userID = val));
username.subscribe((val) => (sessionStorage.username = val));
isSOSActivated.subscribe((val) => (sessionStorage.isSOSActivated = val));
token.subscribe((val) => (sessionStorage.token = val));
authenticated.subscribe((val) => (sessionStorage.authenticated = val));
coordinates.subscribe((val) => (sessionStorage.coordinates = val));

// Have to manage this better.
// This (clean store when value invalid) should happen if only token isn't defined.
// Everything else (except 'authenticated' I think) can be obtained through auth.getUser route.
if (get(authenticated).toString() === "false" || get(token) === "" || get(userID) === "undefined"
    || get(username) === "undefined" || get(isSOSActivated) === "undefined" || get(token) === "undefined"
    || get(authenticated) === "undefined" || get(coordinates) === "undefined") {
    cleanStore()
}

export function cleanStore(){
    updateStore(0, "", false, "", false)
    updateCoordinates([])
}

// if param is null, store field won't be updated
export function updateStore(id, usrn, sos, tkn, authd) {
    if (id    != null) { userID.set(id)           }
    if (usrn  != null) { username.set(usrn)       }
    if (sos   != null) { isSOSActivated.set(sos)  }
    if (tkn   != null) { token.set(tkn)           }
    if (authd != null) { authenticated.set(authd) }
}

export function updateCoordinates(coords) {
    if (coords != null) { coordinates.set(coords) }
}