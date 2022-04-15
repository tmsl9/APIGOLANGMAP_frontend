<script>
	import '../css/auth.css'
	import axios from 'axios';
	import { createEventDispatcher } from 'svelte'
    import { auth } from '../Routes.svelte'

	const dispatch = createEventDispatcher();
	let username = ""
	let password = ""
	let confirm_password = ""
	let color_val_pass = ""
	let message = { success: null, display: "" };
	let validPw = false;
	let isLoading = false;

	$: submit = async () => {
		if (validPw){
			document.getElementById("submit").disabled = true;
			isLoading = true;
			const response = await axios.post(auth.register, {
				username,
				password
			});
			if(response.status === 201){
				message = { success: true, display: response.data.message };
				new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
					isLoading = false;
					dispatch('register_success', { tab: "Login" })
					document.getElementById("submit").disabled = false;
				})
			}else {
				isLoading = false;
				message = { success: false, display: response.data.message };
				document.getElementById("submit").disabled = false;
			}
		} else {
			message = { success: false, display: "Confirm your password!" };
		}
	}

	function validate_password() {
		if (confirm_password !== "") {
			if (password !== confirm_password){
				color_val_pass = "#b42020"
				validPw = false;
			}else {
				color_val_pass = "#31a21f"
				validPw = true;
			}
		} else {
			color_val_pass = ""
			validPw = false;
		}
	}
</script>

<form on:submit|preventDefault={submit}>
	<div class="form-widget">
		<h1 class="header">Eternal Dev Community</h1>
		<p class="description">Create an account and join the community of developers</p>
		<div class="form-group">
			<label for="username">Username</label>
			<input
				id='username' class="form-control" type="text" placeholder="Set Your Username"
				bind:value={username}
			/>
		</div>
		<div class="form-group">
			<label for="password">Password</label>
			<input
				id='password' class="form-control" type="password" placeholder="Set Your Password"
				bind:value={password} on:input="{validate_password}" style="background-color:{color_val_pass}"
			/>
		</div>
		<div class="form-group">
			<label for="confirmpassword">Confirm Password</label>
			<input
				id='confirmpassword' class="form-control" type="password" placeholder="Confirm Your Password"
				bind:value={confirm_password} on:input="{validate_password}" style="background-color:{color_val_pass}"
			/>
		</div>
		
		<button type="submit" id="submit">
			{#if isLoading}Registering...{:else}Register{/if}
		</button>

		{#if message.success != null}
			<div class="alert {message.success ? 'alert-success' : 'alert-danger'}" role="alert">
				{message.display}
			</div>
		{/if}
	</div>
</form>
