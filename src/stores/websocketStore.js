
// websocket

const url = "ws://localhost:8081/socket/"
let socket = null

// Connection opened
export function openSocket(id) {
    socket = new WebSocket(url + id);
    socket.addEventListener('open', function (event) {
        console.log("It's open", event.data);
    });
    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log("New msg websocket", event.data);
        alert(event.data)
    });
}

export function closeSocket() {
    console.log("It's closed");
    if(socket != null) { socket.close() }
}

