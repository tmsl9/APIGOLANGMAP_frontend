<script>
	import '../css/auth.css'
	import { url, auth } from '../Routes.svelte'

	let username = ""
	let password = ""
	let isLoading = false;
  	let isSuccess = false;

	async function handleLogin() {
		isLoading = true ;
		console.log(url + auth.login)
		const res = await fetch(url + auth.login, {
			method: "POST",
			body: JSON.stringify({
				username,
				password,
			}),			
		})
		
		const json = await res.json()
		if(json.status == 200){
			isSuccess = true;
			isLoading = false;
		}else{
			isSuccess = false;
		}
	}
</script>


<form on:submit|preventDefault={handleLogin}>
	{#if isSuccess}
	  <div class="success">
		🔓
		<br />
		You've been successfully logged in.
	  </div>
	{:else}
	  <h1>👤</h1>
	  <!-- svelte-ignore a11y-label-has-associated-control -->
	  <label>Username</label>
	  <input name="username" placeholder="Set Your Username" bind:value={username}   />

	  <!-- svelte-ignore a11y-label-has-associated-control -->
	  <label>Password</label>
	  <input name="password" type="password" bind:value={password} placeholder="Set Your password" />

	  <button type="submit">

		{#if isLoading}Logging in...{:else}Log in 🔒{/if}
	  </button>


	{/if}
</form>

