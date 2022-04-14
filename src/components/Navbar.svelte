<script>
	import { Router, Route, Link } from "svelte-navigator";
	import Login from "./Login.svelte";
	import Register from "./Register.svelte";
	import { auth } from "../routes/Routes.svelte";

</script>

<Router>
	<main class="container">
	<header>
		<div class="row flex flex-center">
			<div class="col-4 offset-4 mt-5">
				<nav>
					<div class="row link">
						<Link to="/" color="white"><div class="col tab-heading tab-active">Home</div></Link>
						<Link to={auth.login} color="white"><div class="col tab-heading">Login</div></Link>
						<Link to={auth.register} color="white"><div class="col tab-heading">Register</div></Link>
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
	<Route path={auth.login} component={Login} />
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