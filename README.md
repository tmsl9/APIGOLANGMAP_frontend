# svelte app

To run 

```bash
docker build -t svelte .
docker run --name svelte -p 8080:8080 svelte
```

To stop

```bash
docker stop svelte .
docker rm svelte # if necessary
```
