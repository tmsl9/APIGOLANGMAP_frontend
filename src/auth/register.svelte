<script>
	import { url, auth } from '../routes/routes.svelte'
	let username = ""
	let password = ""
	let confirm_password = ""
	let result = null
	let color_val_pass = ""

	async function submit() {
		console.log(url + auth.register)
		const res = await fetch(url + auth.register, {
			method: "POST",
			body: JSON.stringify({
				username,
				password,
			}),
		})

		const json = await res.json()
		result = JSON.stringify(json)
	}

	function validate_password() {
		if (confirm_password !== "") {
			confirm_password = (password !== confirm_password) ? "#b42020" : "#31a21f"
		} else {
			color_val_pass = ""
		}
	}
</script>

<div class="register">
	<h1>Username:</h1>
	<input type="text" bind:value={username} placeholder="username" />
	<h1>Password:</h1>
	<input type="password" bind:value={password} on:input="{validate_password}" placeholder="password" />
	<h1>Confirm password:</h1>
	<input type="password" id="confirm_password" bind:value={confirm_password}
		   on:input="{validate_password}" placeholder="password" style="background-color:{color_val_pass}"/>
	<button type="button" on:click={submit}>
		Register
	</button>
</div>
<p>Result:</p>
<pre>
{result}
</pre>
