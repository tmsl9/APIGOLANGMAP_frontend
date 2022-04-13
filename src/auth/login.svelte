<script context="module">
	import { url, auth } from '../routes/routes.svelte'
	let username = ""
	let password = ""
	let result = null

	async function submit() {
		console.log(url + auth.login)
		const res = await fetch(url + auth.login, {
			method: "POST",
			body: JSON.stringify({
				username,
				password,
			}),
		})

		const json = await res.json()
		result = JSON.stringify(json)
	}
</script>

<div class="login">
	<h1>Username:</h1>
	<input type="text" bind:value={username} placeholder="username" />
	<h1>Password:</h1>
	<input type="password" bind:value={password} placeholder="password" />
	<button type="button" on:click={submit}>
		Login
	</button>
</div>
<p>Result:</p>
<pre>
{result}
</pre>
