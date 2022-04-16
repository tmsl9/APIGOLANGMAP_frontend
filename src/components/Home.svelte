<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { authenticated } from "../stores/store";
    import { position } from "../Routes.svelte";

    onMount(async () => { if ($authenticated.toString() === "true") { await axios.get(position.getMyLocation) }});
</script>

<div class="container mt-5 text-center">
    <h3>Hi, you are {($authenticated.toString() === "true") ? "" : "not "}logged in</h3>
</div>
