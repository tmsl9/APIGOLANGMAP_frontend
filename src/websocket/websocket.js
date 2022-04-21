import { websocket } from '../store/store'
import {get} from "svelte/store";

export function openSocket(id) {
    const url = "ws://sheltered-mountain-58087.herokuapp.com/socket/"
    //const url = "ws://localhost:8081/socket/"

    websocket.set(new WebSocket(url + id))
    // Listen for opened connection
    get(websocket).addEventListener('open', function (event) {
        console.log("Websocket connection opened");
    });
    // Listen for messages
    get(websocket).addEventListener('message', function (event) {
        console.log("Websocket new message", event.data);
        alert(event.data)
    });
    // Listen for closed connection
    get(websocket).addEventListener('close', function (event) {
        console.log("Websocket connection closed");
    });
}

export function closeSocket() {
    console.log("Websocket connection closed");
    if (get(websocket) !== null && get(websocket).toString() !== "null") {
        try { get(websocket).close() } catch (e) { websocket.set(null) }
    }
}
