<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { authenticated } from "../stores/store";
    import { position } from "../Routes.svelte";

    let loggedOutMsg = "Hi, you are not logged in";
    let loggedInMsg = "Hi, you are logged in";
    let message = ""

    onMount(async () => {
        const response = await axios.get(position.getMyLocation);
        console.log(response)
        if ($authenticated.toString() === "true") {
            message = loggedInMsg
        } else {
            message = loggedOutMsg
        }
    });
</script>

<div class="container mt-5 text-center">
    <h3>{message}</h3>
</div>
