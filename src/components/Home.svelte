<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { authenticated, updateStore, username } from "../stores/store";
    import { auth } from "../Routes.svelte";

    let isMounting = true

    onMount(async () => {
        if ($authenticated.toString() === "true") {
            const response = await axios.get(auth.getUser)

            if (response.status === 200) {
                updateStore(response.data.user.ID, response.data.user.username, response.data.user.IsSOSActivated, null, null)
            }
        }
    })
</script>

<div class="container mt-5 text-center">
    {#if !isMounting}
        <h3>Hi, {($username !== "") ? $username + " " : ""}you are {($authenticated.toString() === "true") ? "" : "not "}logged in</h3>
    {/if}
</div>
