<script>
	import Login from "./Login.svelte";
	import Register from "./Register.svelte";

	function handleMessage(event) {
		alert(event.detail.text);
	}
	let currentTab = "Login";

	const changeTab = (tab) => {
		currentTab = tab;
	};
</script>

<main class="container">
	<div class="row flex flex-center">
		<div class="col-4 offset-4 mt-5">
			<div class="row">
				<div class="col tab-heading {currentTab == 'Login' ? 'tab-active': ''}" on:click={() => changeTab("Login")}>
					<span>Login</span>
				</div>
				<div class="col tab-heading {currentTab == 'Register' ? 'tab-active': ''}" on:click={() => changeTab("Register")}>
					<span>Register</span>
				</div>
			</div>
			{#if currentTab === "Login"}
				<Login />
			{:else}
				<Register on:register_success={ ()=> {
					currentTab = "Login";
				}} />
			{/if}
		</div>
	</div>
</main>

<style>
	.tab-heading {
		font-weight: bold;
		padding: 1rem;
		background-color: lightgray;
	}

	.tab-active {
		background: black;
		color: white;
	}
</style>