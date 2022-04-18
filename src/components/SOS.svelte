<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { userID, username, isSOSActivated, authenticated, updateStore } from "../stores/store";
    import { auth, sos } from "../Routes.svelte";

    let isMounting = true
    let isUpdating = false
    let sosActive = null
    let message = { success: null, display: null };

    const updateSOSActive = () => { sosActive = ($isSOSActivated.toString() === "true") }
    const updateMsg = (success) => { message = { success, display: "SOS is turned " + (sosActive ? "ON" : "OFF") } }

    onMount(async () => {
        if ($authenticated.toString() === "true") {
            const response = await axios.get(auth.getUser)

            if (response.status === 200) {
                updateStore(response.data.user.ID, response.data.user.username, response.data.user.IsSOSActivated, null, null)
                updateSOSActive()
                updateMsg(true)
                isMounting = false
            }
        }
    });

    $: update = async () => {
        document.getElementById("update").disabled = true;
        isUpdating = true;
        let url = !sosActive ? sos.activate : sos.deactivate
        const response = await axios.post(url, {
            ID: $userID,
            username: $username,
            IsSOSActivated: $isSOSActivated,
        });

        if (response.status === 200 || response.status === 406) {
            updateStore(null, null, !sosActive, null, null)
            updateSOSActive()
            updateMsg(true)
            isUpdating = false;
            document.getElementById("update").disabled = false;
        } else {
            updateMsg(false)
            isUpdating = false;
            document.getElementById("update").disabled = false;
        }
    }
</script>

<div class="container mt-5 text-center">
    {#if !isMounting}
        <button type="button" id="update" on:click={update}
                style="border-radius:100%;padding:20px;margin-bottom:2%;background-color:{sosActive ? 'red' : 'transparent'};
                border-color:{sosActive ? 'transparent' : 'green'};color:{sosActive ? 'white' : 'green'};">
            SOS
        </button>

        {#if message.success != null}
            <div class="alert {message.success ? 'alert-success' : 'alert-danger'}" role="alert">
                {message.display}
            </div>
        {/if}
    {/if}
    <h4>
        Clicking SOS will alert your followers and update them with your current location, if available.
    </h4>
</div>