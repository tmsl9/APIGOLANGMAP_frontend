<script>
        import axios from "axios";
        import { createEventDispatcher } from "svelte";
        import { userID } from "../stores/store";
        import { follower } from "../Routes.svelte";

        const dispatch = createEventDispatcher();
        let message = { success: null, display: "" };
        let isSubmitting = false
        let followerID = 0

        $: submit = async () => {
                document.getElementById("submit").disabled = true;
                isSubmitting = true;

                const response = await axios.post(follower.assocFollower, {
                        UserID: $userID,
                        FollowerUserID: parseInt(followerID)
                });

                if (response.status === 201) {
                        message = { success: true, display: response.data.message };
                        isSubmitting = false;
                        dispatch("follower_added", {followers: response.data.followers})
                        document.getElementById("submit").disabled = false;
                } else {
                        message = { success: false, display: response.data.message };
                        isSubmitting = false;
                        document.getElementById("submit").disabled = false;
                }
        }
</script>

<form on:submit|preventDefault={submit}>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>Follower ID</label>
        <input name="followerID" placeholder="Set Follower ID" bind:value={followerID} />

        <button type="submit" id="submit">
                {#if isSubmitting}Adding...{:else}Add{/if}
        </button>
</form>

{#if message.success != null}
        <div class="alert {message.success ? 'alert-success' : 'alert-danger'}" role="alert">
                {message.display}
        </div>
{/if}