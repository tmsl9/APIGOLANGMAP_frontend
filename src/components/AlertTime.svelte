<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { username, authenticated } from "../stores/store";
    import { auth, alert } from "../Routes.svelte";

    let message = { success: null, display: "" };
    let isMounting = true
    let isUpdating = false
    let oldAlertTime = 0;
    let newAlertTime = 0;
    let userID = 0;

    onMount(async () => {
        if ($authenticated.toString() === "true") {
            const response = await axios.get(auth.getUser)

            if (response.status === 200) {
                oldAlertTime = response.data.user.alertTime
                newAlertTime = response.data.user.alertTime
                userID = response.data.user.ID
                isMounting = false
            }
        }
    });

    $: update = async () => {
        if (oldAlertTime === newAlertTime) { return }

        document.getElementById("update").disabled = true;
        isUpdating = true;
        const response = await axios.put(alert.alertTime, {
            ID: userID,
            username: $username,
            alertTime: newAlertTime,
        });

        if (response.status === 201) {
            oldAlertTime = newAlertTime
            message = { success: true, display: response.data.message };
            new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
                isUpdating = false;
                document.getElementById("update").disabled = false;
            });
        } else {
            message = { success: false, display: response.data.message };
            isUpdating = false;
            document.getElementById("update").disabled = false;
        }
    }
</script>

<div class="container mt-5 text-center">
    <h3>Alert Time</h3>
    {#if !isMounting}
        <h4>
            Alert time then: {oldAlertTime}h
        </h4>
        <h4 style="color: {oldAlertTime !== newAlertTime ? 'dodgerblue' : 'white'}">
            Alert time now: {newAlertTime}h
        </h4>
        <input type=range min="1" max="48" bind:value={newAlertTime} />

        {#if oldAlertTime !== newAlertTime}
            <button type="button" id="update" on:click={update}>
                {#if isUpdating}Updating...{:else}Update{/if}
            </button>
        {/if}
    {:else}
        <h4>Loading user info...</h4>
    {/if}

    {#if message.success != null}
        <div class="alert {message.success ? 'alert-success' : 'alert-danger'}" role="alert">
            {message.display}
        </div>
    {/if}
</div>
