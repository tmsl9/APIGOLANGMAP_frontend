<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { userID, username, isAuthenticated, isSOSActivated, SOSActivated, updateStore } from "../../store/store";
    import { auth, sos } from "../../Routes.svelte";

    let isMounting = true;
    let isUpdating = false;
    let message = { success: null, display: null };

    const updateMsg = (success) => { message = { success, display: "SOS is turned " + (isSOSActivated() ? "ON" : "OFF") }};

    onMount(async () => {
        if (isAuthenticated()) {
            const response = await axios.get(auth.getUser);

            if (response.status === 200) {
                updateStore(response.data.user.ID, response.data.user.username, response.data.user.IsSOSActivated, null, null);
                updateMsg(true);
                isMounting = false;
            }
        }
    });

    $: update = async () => {
        document.getElementById("update").disabled = true;
        isUpdating = true;
        let url = !isSOSActivated() ? sos.activate : sos.deactivate;
        const response = await axios.post(url, {
            ID: $userID,
            username: $username,
        });

        if (response.status === 200) {
            updateStore(null, null, !isSOSActivated(), null, null);
            updateMsg(true);
            isUpdating = false;
            document.getElementById("update").disabled = false;
        } else if (response.status === 406) {
            updateMsg(true);
            isUpdating = false;
            document.getElementById("update").disabled = false;
        } else {
            updateMsg(false);
            isUpdating = false;
            document.getElementById("update").disabled = false;
        }
    };
</script>

<div class="container mt-5 text-center">
    {#if !isMounting}
        <button type="button" id="update" on:click={update} style="border-radius:100%;padding:20px;margin-bottom:2%;
                background-color:{$SOSActivated.toString() === 'true' ? 'red' : 'transparent'};
                border-color:{$SOSActivated.toString() === 'true' ? 'transparent' : 'green'};
                color:{$SOSActivated.toString() === 'true' ? 'white' : 'green'};">SOS</button>

        {#if message.success != null}
            <div class="alert {$SOSActivated.toString() === 'true' ? 'alert-success' : 'alert-danger'}" role="alert">
                {message.display}
            </div>
        {/if}
    {/if}
    <h4>
        Clicking SOS will alert your followers and update them with your current
        location, if available.
    </h4>

</div>
