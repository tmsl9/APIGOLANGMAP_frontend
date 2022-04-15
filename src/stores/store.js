import { writable } from 'svelte/store';

// localStorage
export let username = writable(localStorage.getItem("username") || "");

// sessionStorage
export let token = writable(sessionStorage.getItem("token") || "");
export let authenticated = writable(sessionStorage.getItem("authenticated") || false);

username.subscribe((val) => (localStorage.username = val));
token.subscribe((val) => (sessionStorage.token = val));
authenticated.subscribe((val) => (sessionStorage.authenticated = val));
