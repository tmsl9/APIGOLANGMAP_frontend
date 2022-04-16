<script>
	import "../css/auth.css";
	import axios from "axios";
	import { createEventDispatcher } from "svelte";
	import { updateStore } from "../stores/store";
	import { auth } from "../Routes.svelte";

	const dispatch = createEventDispatcher();
	let username = "";
	let password = "";
	let message = { success: null, display: "" };
	let isLoading = false;
	let isSuccess = false;

	$: submit = async () => {
		isLoading = true;
		document.getElementById("submit").disabled = true;
		const response = await axios.post(auth.login, {
			username,
			password,
		});

		if (response.status === 200) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
			updateStore(response.data.User.username, response.data.token, true)
			message = { success: true, display: response.data.message };
			new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
				isLoading = false;
				isSuccess = true
				dispatch("login_success", { tab: "Home" });
				document.getElementById("submit").disabled = false;
			});
		} else {
			message = { success: false, display: response.data.message };
			isLoading = false;
			isSuccess = false;
			document.getElementById("submit").disabled = false;
		}
	};
</script>

<form on:submit|preventDefault={submit}>
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
		<input name="username" placeholder="Set Your Username" bind:value={username} />

		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>Password</label>
		<input name="password" type="password" bind:value={password} placeholder="Set Your password" />

		<button type="submit" id="submit">
			{#if isLoading}Logging in...{:else}Log in 🔒{/if}
		</button>

		{#if message.success != null}
			<div class="alert {message.success ? 'alert-success' : 'alert-danger'}" role="alert">
				{message.display}
			</div>
		{/if}
	{/if}
</form>
