<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { authenticated, username } from "../stores/store";
    import { auth } from "../Routes.svelte";

    onMount(async () => { if ($authenticated.toString() === "true") { await axios.get(auth.getUser) }})
</script>

<div class="container mt-5 text-center">
    <h3>Hi, {($username !== "") ? $username + " " : ""}you are {($authenticated.toString() === "true") ? "" : "not "}logged in</h3>
</div>
