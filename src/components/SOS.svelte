<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { username, authenticated } from "../stores/store";
    import { auth, sos } from "../Routes.svelte";

    let message = { success: null, display: "" };
    let isMounting = true
    let isUpdating = false
    let sosActive = false
    let userID = 0

    onMount(async () => {
        if ($authenticated.toString() === "true") {
            const response = await axios.get(auth.getUser)

            if (response.status === 200) {
                sosActive = response.data.user.IsSOSActivated
                userID = response.data.user.ID
                isMounting = false
            }
        }
    });

    $: update = async () => {
        document.getElementById("update").disabled = true;
        isUpdating = true;
        let url = !sosActive ? sos.activate : sos.deactivate
        const response = await axios.post(url, {
            ID: userID,
            username: $username,
            IsSOSActivated: sosActive,
        });

        // this won't work because this routes are not sending '200' when SOS updated
        // also, I am assuming that a response field will be received as 'SOSactive'
        // as guarantee
        if (response.status === 200 || response.status === 406) {
            sosActive = response.data.SOSactive
            message = { success: true, display: response.data.message };
            isUpdating = false;
            document.getElementById("update").disabled = false;
        } else {
            message = { success: false, display: response.data.message };
            isUpdating = false;
            document.getElementById("update").disabled = false;
        }
    }
</script>

<div class="container mt-5 text-center">
    <h3>SOS</h3>
    {#if !isMounting}
        <button type="button" id="update" style="border-radius: 100%; background-color: {sosActive ? 'red' : 'green'}" on:click={update}>
            SOS
        </button>
    {/if}
    <h4>
        Clicking SOS will alert your followers and update them with your current location, if available.
    </h4>

    {#if message.success != null}
        <div class="alert {message.success ? 'alert-success' : 'alert-danger'}" role="alert">
            {message.display}
        </div>
    {/if}
</div>