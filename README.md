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
