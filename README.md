# svelte app

Install dependencies
```bash
npm install
```

Run
```bash
npm run dev
```

Run (docker)

```bash
docker build -t svelte .
docker run --name svelte -p 8080:8080 svelte
```

Stop (docker)

```bash
docker stop svelte
docker rm svelte # if necessary
```

Use Server hosped in AWS/locally

-> Change in src/interceptors/axios.js
```js
const url = "ws://sheltered-mountain-58087.herokuapp.com/socket/"
//const url = "ws://localhost:8081/socket/"
```

-> And in src/websocket/websocket.js
```js
axios.defaults.baseURL = 'http://sheltered-mountain-58087.herokuapp.com/api/v1';
//axios.defaults.baseURL = 'http://localhost:8081/api/v1';
```
