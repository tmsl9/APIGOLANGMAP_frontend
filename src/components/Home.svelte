<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { authenticated } from "../stores/store";
    import { position } from "../Routes.svelte";


    let message = "You are not logged in";

    /*onMount(async () => {
        const response = await axios.get(position.getMyLocation, {}, { withCredentials: true });
        console.log(response)
        if ($authenticated.toString() === "true") {
            message = `Hi, you are at ${response.data.location}`;
        }
    });*/
</script>

<div class="container mt-5 text-center">
    <h3>{message}</h3>
</div>
