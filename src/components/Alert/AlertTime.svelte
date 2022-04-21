<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { userID, username, isAuthenticated, updateStore } from "../../store/store";
    import { auth, alert } from "../../Routes.svelte";

    let message = { success: null, display: "" };
    let isMounting = true;
    let isUpdating = false;
    let oldAlertTime = 0;
    let newAlertTime = 0;

    //Callback executada assim que o componente é chamado
    onMount(async () => {
        if (isAuthenticated()) {
            const response = await axios.get(auth.getUser);

            if (response.status === 200) {
                updateStore(response.data.user.ID, response.data.user.username, response.data.user.IsSOSActivated, null, null);
                oldAlertTime = response.data.user.alertTime;
                newAlertTime = response.data.user.alertTime;
                isMounting = false;
            }
        }
    });

    $: update = async () => {
        if (oldAlertTime === newAlertTime) {
            return;
        }

        document.getElementById("update").disabled = true;
        isUpdating = true;
        const response = await axios.put(alert.alertTime, {
            ID: $userID,
            username: $username,
            alertTime: newAlertTime,
        });

        if (response.status === 201) {
            oldAlertTime = newAlertTime;
            message = { success: true, display: response.data.message };
            new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
                isUpdating = false;
            });
        } else {
            message = { success: false, display: response.data.message };
            isUpdating = false;
            document.getElementById("update").disabled = false;
        }
    };
</script>

<div class="container mt-5 text-center">
    {#if !isMounting}
        <h4>Alert time then: {oldAlertTime}h</h4>
        <h4 style="color: {oldAlertTime !== newAlertTime ? '#e78309' : 'white'}">Alert time now: {newAlertTime}h</h4>
        <input type="range" min="1" max="48" bind:value={newAlertTime} />

        {#if oldAlertTime !== newAlertTime}
            <button class="submit" type="button" id="update" on:click={update}>
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

<style>
    .submit {
        background: -webkit-linear-gradient(right, #ffd900 0%, #ed9121 100%);
        border: none;
        border-radius: 21px;
        box-shadow: 0px 1px 8px #24c64f;
        cursor: pointer;
        color: white;
        font-family: "Raleway SemiBold", sans-serif;
        height: 5%;
        margin: 0 auto;
        margin-top: 1%;
        transition: 0.25s;
        height:max-content;
        width: max-content;
    }
    .submit:hover {
        box-shadow: 0px 1px 18px #24c64f;
    }
</style>
