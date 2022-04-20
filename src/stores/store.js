import { writable, get } from 'svelte/store';

//user info
export let userID = writable(sessionStorage.getItem("userID") || 0);
export let username = writable(sessionStorage.getItem("username") || "");
export let SOSActivated = writable(sessionStorage.getItem("SOSActivated") || false);
//auth
export let token = writable(sessionStorage.getItem("token") || "");
export let authenticated = writable(sessionStorage.getItem("authenticated") || false);
//coords
export let currentCoordinates = writable(sessionStorage.getItem("currentCoordinates") || {});
export let coordinates = writable(sessionStorage.getItem("coordinates") || {});

// subscribe
userID.subscribe((val) => (sessionStorage.userID = val));
username.subscribe((val) => (sessionStorage.username = val));
SOSActivated.subscribe((val) => (sessionStorage.SOSActivated = val));
token.subscribe((val) => (sessionStorage.token = val));
authenticated.subscribe((val) => (sessionStorage.authenticated = val));
currentCoordinates.subscribe((val) => (sessionStorage.currentCoordinates = val));
coordinates.subscribe((val) => (sessionStorage.coordinates = val));

// Have to manage this better.
// This (clean store when value invalid) should happen if only token isn't defined.
// Everything else (except 'authenticated' I think) can be obtained through auth.getUser route.
if (get(authenticated).toString() === "false" || get(token) === "" || get(userID) === "undefined"
    || get(username) === "undefined" || get(SOSActivated) === "undefined" || get(token) === "undefined"
    || get(authenticated) === "undefined" || get(currentCoordinates) === "undefined" || get(coordinates) === "undefined") {
    cleanStore()
}

export function isAuthenticated(){
    return (get(authenticated).toString() === "true")
}

export function isSOSActivated(){
    return (get(SOSActivated).toString() === "true")
}

export function cleanStore(){
    updateStore(0, "", false, "", false)
    updateCurrentCoordinates({})
    coordinates.set({})
}

// if param is null, store field won't be updated
export function updateStore(id, usrn, sos, tkn, authd) {
    if (id    != null) { userID.set(id)           }
    if (usrn  != null) { username.set(usrn)       }
    if (sos   != null) { SOSActivated.set(sos)    }
    if (tkn   != null) { token.set(tkn)           }
    if (authd != null) { authenticated.set(authd) }
}

export function updateCurrentCoordinates(coords) {
    if (coords != null) { currentCoordinates.set(coords) }
}

export function updateCoordinates(coords, type) {
    if (coords != null) { coordinates.set({ coords: coords, type: type }) }
}