<script context="module">
	// main navigation for the application
	import Home from './components/Home.svelte';
	import Login from './components/Login.svelte';
    import Register from './components/Register.svelte';
    import Position from './components/Position.svelte';

	// these are our 'pages' to navigate through (in order for this export to work the script tag MUST include context="module")
	export const navOptions = [
		{ page: 'Home',     component: Home, loggedIn: "false" },
		{ page: 'Login',    component: Login, loggedIn: "false" },
        { page: 'Register', component: Register, loggedIn: "false" },
        { page: 'Position', component: Position, loggedIn: "true" },
	];
</script>