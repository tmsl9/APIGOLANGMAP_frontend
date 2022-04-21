<script context="module">
	// main navigation for the application
	import Home      from './components/Home.svelte';
	import Login     from './components/Auth/Login.svelte';
    import Register  from './components/Auth/Register.svelte';
    import Location  from './components/Map/Location.svelte';
    import Follower  from './components/Followers/Follower.svelte';
    import SOS       from './components/SOS/SOS.svelte';
    import AlertTime from './components/Alert/AlertTime.svelte';
    import AlertNearBy from './components/AlertNearBy/TableNearBy.svelte'

    // these are our 'pages' to navigate through (in order for this export to work the script tag MUST include context="module")
	export const navOptions = [
		{ page: 'Home',       component: Home,      loggedIn: "false" },
		{ page: 'Login',      component: Login,     loggedIn: "false" },
        { page: 'Register',   component: Register,  loggedIn: "false" },
        { page: 'Location',   component: Location,  loggedIn: "true" },
        { page: 'Followers NearBy', component: AlertNearBy, loggedIn: "true"},
        { page: 'Follower',   component: Follower,  loggedIn: "true" },
        { page: 'SOS',        component: SOS,       loggedIn: "true" },
        { page: 'Alert Time', component: AlertTime, loggedIn: "true" }
	];
</script>