<script>
    import axios from "axios";
    import { createEventDispatcher } from "svelte";
    import { userID } from "../stores/store";
    import { position } from "../Routes.svelte";

    const dispatch = createEventDispatcher();
    let message = { success: null, display: "" };
    let isSubmitting = false
    let coordinates = []
    let long = 0
    let lat = 0

    $: submit = async () => {
            document.getElementById("submit").disabled = true;
            isSubmitting = true;
            // giving error message "Check syntax!"
            const response = await axios.post(position.registerLocation, {
                    //userid: $userID,
                    UserID: $userID,
                    Latitude: lat,
                    Longitude: long
            });

            if (response.status === 201) {
                    message = { success: true, display: response.data.message };
                    new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
                            isSubmitting = false;
                            //dispatch("position_added", {followers: response.data.followers})
                            document.getElementById("submit").disabled = false;
                    });
            } else {
                    message = { success: false, display: response.data.message };
                    isSubmitting = false;
                    document.getElementById("submit").disabled = false;
            }
    }
</script>

<form on:submit|preventDefault={submit}>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label>New Coordinates</label>
    <input name="latitude" placeholder="Set Follower ID" bind:value={lat} />
    <input name="longitude" placeholder="Set Follower ID" bind:value={long} />
    <button type="submit" id="submit">
            {#if isSubmitting}Adding...{:else}Add{/if}
    </button>
</form>

{#if message.success != null}
    <div class="alert {message.success ? 'alert-success' : 'alert-danger'}" role="alert">
            {message.display}
    </div>
{/if}