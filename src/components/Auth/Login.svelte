<script>
	import "../../css/auth.css"
	import axios from "axios";
	import { createEventDispatcher } from "svelte";
	import { updateStore, userID } from "../../store/store";
	import { auth } from "../../Routes.svelte";
	import { openSocket } from "../../websocket/websocket";

	const dispatch = createEventDispatcher();
	let username = "";
	let password = "";
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
			updateStore(response.data.User.ID, response.data.User.username, response.data.User.IsSOSActivated, response.data.token, true)
			swal(response.data.message, "", "success")
			openSocket($userID)
				isLoading = false;
				isSuccess = true
				dispatch("login_success", { tab: "Home" });
				document.getElementById("submit").disabled = false;
		} else {
			swal(response.data.message, "", "error")
			isLoading = false;
			isSuccess = false;
			document.getElementById("submit").disabled = false;
		}
	};
</script>

<!------------------------------------------->
<!----------------MARKUP----------------------->
<!------------------------------------------->

<div id="card">
	<div id="card-content">
		<div id="card-title">
			<h2>LOGIN</h2>
			<div class="underline-title"></div>
		</div>
		<form on:submit|preventDefault={submit} class="form">
			<label for="username" style="padding-top:13px; color:black;">
				&nbsp;Username
			</label>
			<input id="username" class="form-content" name="username" placeholder="Set Your Username" bind:value={username}  autocomplete="on" required />
			<div class="form-border"></div>
			<label for="password" style="padding-top:22px;color:black;">&nbsp;Password
			</label>
			<input id="password" class="form-content" name="password" type="password" bind:value={password} placeholder="Set Your password" required />
			<div class="form-border"></div>

			<button type="submit" id="submit">
				{#if isLoading}Logging in...{:else}Log in 🔒{/if}
			</button>
		</form>
	</div>
</div>
<!------------------------------------------->
<!----------------STYLE----------------------->
<!------------------------------------------->
<style>

	h2{
		color:black;
	}

	form{
		padding: 2%;
	}

	label {
		font-family: "Raleway", sans-serif;
		font-size: 11pt;
	}

	#card {
		background: #fbfbfb;
		border-radius: 8px;
		box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.65);
		height: 410px;
		margin: 6rem auto 8.1rem auto;
		margin-top: 3px;
		width: 329px;

	}
	#card-content {
		padding: 12px 44px;
	}
	#card-title {
		font-family: "Raleway Thin", sans-serif;
		letter-spacing: 4px;
		padding-bottom: 23px;
		padding-top: 13px;
		text-align: center;
	}

	#submit {
		background: -webkit-linear-gradient(right, #a6f77b, #2dbd6e);
		border: none;
		border-radius: 21px;
		box-shadow: 0px 1px 8px #24c64f;
		cursor: pointer;
		color: white;
		font-family: "Raleway SemiBold", sans-serif;
		height: 42.3px;
		margin: 0 auto;
		margin-top: 50px;
		transition: 0.25s;
		width: 153px;
	}
	#submit:hover {
		box-shadow: 0px 1px 18px #24c64f;
	}
	.form {
		align-items: left;
		display: flex;
		flex-direction: column;
	}
	.form-border {
		background: -webkit-linear-gradient(right, #a6f77b, #2ec06f);
		height: 1px;
		width: 100%;
	}
	.form-content {
		background: #fbfbfb;
		border: none;
		outline: none;
		padding-top: 14px;
	}
	.underline-title {
		background: -webkit-linear-gradient(right, #a6f77b, #2ec06f);
		height: 2px;
		margin: -1.1rem auto 0 auto;
		width: 89px;
	}

</style>

