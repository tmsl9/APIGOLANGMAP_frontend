<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { authenticated } from "../stores/store";
    import { position } from "../Routes.svelte";

    let loggedOutMsg = "Hi, you are not logged in";
    let loggedInMsg = "Hi, you are logged in";

    onMount(async () => { if ($authenticated.toString() === "true") { await axios.get(position.getMyLocation) }});
</script>

<div class="container mt-5 text-center">
    <h3>{($authenticated.toString() === "true") ? loggedInMsg : loggedOutMsg}</h3>
</div>
