<script>

	import axios from 'axios';
	import { createEventDispatcher } from 'svelte'
    import { auth } from '../../Routes.svelte'

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
			isLoading = true;
			document.getElementById("submit").disabled = true;
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
				message = { success: false, display: response.data.message };
				isLoading = false;
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


	<div id="card">
		<div id="card-content">
		  <div id="card-title">
			<h2>Create An Account</h2>
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
			<input id="password" class="form-content" name="password" type="password" bind:value={password} placeholder="Set Your password"  on:input="{validate_password}" style="background-color:{color_val_pass}" required />
			<div class="form-border"></div>
			
			<label for="confirmpassword" style="padding-top:22px;color:black;">&nbsp;Confirm Your Password
			</label>
			<input id="confirmpassword" class="form-content" name="password" type="password" placeholder="Confirm Your Password"
			bind:value={confirm_password} on:input="{validate_password}" style="background-color:{color_val_pass}" required />
			<div class="form-border"></div>
			
			<button type="submit" id="submit">
				{#if isLoading}Registering...{:else}Register 🔒{/if}
			</button>
			<br/>
			<br/>
			{#if message.success != null}
            <div class="alert {message.success ? 'alert-success' : 'alert-danger'}" role="alert">
                {message.display}
            </div>
        {/if}
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
  height: 560px;
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

