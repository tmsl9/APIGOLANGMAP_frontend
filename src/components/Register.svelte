<script>
    import { url, auth } from '../routes/Routes.svelte'
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let username = ""
	let password = ""
	let confirm_password = ""
	let color_val_pass = ""
	let loading = false;
	let message = { success: null, display: "" };
	let validPw = false;
	let isLoading = false;

	async function handleRegister() {
		if (validPw){
			console.log(url + auth.register)
			try{
				const res = await fetch(url + auth.register, {
					method: "POST",
					body: JSON.stringify({
						username,
						password,
					}),
				})

				const json = await res.json()

				if(json.status == 200){
					isLoading = false;
					dispatch('register_success');
				}else {
					isLoading = true;
				}
			}catch(error){
				let errorMsg = error.error_description || error.message;
				message = { success: false, display: errorMsg };
			}finally{
				loading = false;
			}
		}
		else{
			message = { success: false, display: "Confirm your password!" };
		}
	}

	function validate_password() {
		if (confirm_password !== "") {
			if (password !== confirm_password){
				color_val_pass = "#b42020"

				console.log("Diferente" + password +" cf "+  confirm_password)
				validPw = false;
			}else {
				color_val_pass = "#31a21f"
				validPw = true;
				console.log("Igual" + password +" cf "+  confirm_password )
			}
		} else {
			color_val_pass = ""
			validPw = false;
		}
	}
</script>



<form on:submit|preventDefault={handleRegister}>
	<div class="form-widget">
		<h1 class="header">Eternal Dev Community</h1>
		<p class="description">Create an account and join the community of developers</p>
		<div class="form-group">
			<label for="email">Email address</label>
			<input
				id='email' class="form-control" type="text" placeholder="Set Your Username" 
				bind:value={username}
			/>
		</div>
		<div class="form-group">
			<label for="password">Password</label>
			<input
				id='password' class="form-control"   placeholder="Set Your Password"
				bind:value={password}  on:input="{validate_password}" style="background-color:{color_val_pass}"
			/>
		</div>
		<div class="form-group">
			<label for="confirmpassword">Confirm Password</label>
			<input
				id='confirmpassword' class="form-control"    placeholder="Confirm Your Password"
				bind:value={confirm_password} on:input="{validate_password}" style="background-color:{color_val_pass}"
			/>
		</div>
		
		<button type="submit"> 
		
			{#if isLoading}Logging in...{:else}Log in 🔒{/if}
		</button>
	
		

		{#if message.success != null}
			<div class="alert {message.success ? 'alert-success' : 'alert-danger'}" role="alert">
				{message.display}
			</div>
		{/if}
	</div>
</form>

<style>
	form {
	  background: #fff;
	  padding: 50px;
	  width: 250px;
	  height: 400px;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  box-shadow: 0px 20px 14px 8px rgba(0, 0, 0, 0.58);
	}
	label {
	  margin: 10px 0;
	  align-self: flex-start;
	  font-weight: 500;
	}
	input {
	  border: none;
	  border-bottom: 1px solid #ccc;
	  margin-bottom: 20px;
	  transition: all 300ms ease-in-out;
	  width: 100%;
	}
	input:focus {
	  outline: 0;
	  border-bottom: 1px solid #666;
	}
	button {
	  margin-top: 20px;
	  background: black;
	  color: white;
	  padding: 10px 0;
	  width: 200px;
	  border-radius: 25px;
	  text-transform: uppercase;
	  font-weight: bold;
	  cursor: pointer;
	  transition: all 300ms ease-in-out;
	}
	button:hover {
	  transform: translateY(-2.5px);
	  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.58);
	}
	h1 {
	  margin: 10px 20px 30px 20px;
	  font-size: 40px;
	}
	.errors {
	  list-style-type: none;
	  padding: 10px;
	  margin: 0;
	  border: 2px solid #be6283;
	  color: #be6283;
	  background: rgba(190, 98, 131, 0.3);
	}
	.success {
	  font-size: 24px;
	  text-align: center;
	}
</style>