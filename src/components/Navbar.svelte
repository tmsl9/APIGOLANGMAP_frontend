<script>
	import { Router, Route, Link } from "svelte-navigator";
	import Login from "./Login.svelte";
	import Register from "./Register.svelte";
	import { auth } from "../routes/Routes.svelte";

	let currentTab = "Home"

	let homeTab = () => {currentTab = "Home"}
	let loginTab = () => {currentTab = "Login"}
	let registerTab = () => {currentTab = "Register"}
</script>

<Router>
	<main class="container">
	<header>
		<div class="row flex flex-center">
			<div class="col-4 offset-4 mt-5">
				<nav>
					<div class="row link">
						<Link to="/" color="white" on:click={homeTab}>
							<div class="col tab-heading {currentTab === 'Home' ? 'tab-active': ''}">
								Home
							</div>
						</Link>
						<Link to={auth.login} color="white" on:click={loginTab}>
							<div class="col tab-heading {currentTab === 'Login' ? 'tab-active': ''}">
								Login
							</div>
						</Link>
						<Link to={auth.register} color="white" on:click={registerTab}>
							<div class="col tab-heading {currentTab === 'Register' ? 'tab-active': ''}">
								Register
							</div>
						</Link>
					</div>
				</nav>
			</div>
		</div>
	</header>
	</main>
	<Route>
		<h3>HOME</h3>
		<p>HOME</p>
	</Route>
	<Route path="/">
		<h3>HOME</h3>
		<p>HOME</p>
	</Route>
	<Route path={auth.login} component={Login} on:register_success={loginTab} />
	<Route path={auth.register} component={Register} />
</Router>

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
	 .link > :global(a) {
		text-decoration: none;
	 }
</style>