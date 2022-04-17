<script>
        import axios from "axios";
        import { onMount } from "svelte";
        import { authenticated, userID } from "../stores/store";
        import { follower } from "../Routes.svelte";

        let isMounting = true
        let isSubmitting = false
        let message = { success: null, display: "" };
        let followers = [];
        const emptyListMsg = "Empty list!"

        onMount(async () => {
                if ($authenticated.toString() === "true") {
                        const response = await axios.get(follower.getAllFollowers, {
                                userid: userID
                        })

                        console.log(response.data)
                        if (response.status === 200) {
                                if (response.data.message !== emptyListMsg){
                                        followers = response.data.data
                                }
                                isMounting = false
                        }
                }
        });
        
        $: submit = async (followerID, i) => {
                document.getElementById(followerID.toString()).disabled = true;
                isSubmitting = true;
                const response = await axios.post(follower.deassocFollower, {
                        //userid: $userID,
                        UserID: $userID,
                        FollowerUserID: followerID
                });

                if (response.status === 200) {
                        message = { success: true, display: response.data.message };
                        new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
                                followers.splice(i, 1); // rem follower
                                isSubmitting = false;
                                document.getElementById(followerID.toString()).disabled = false;
                        });
                } else {
                        message = { success: false, display: response.data.message };
                        isSubmitting = false;
                        document.getElementById(followerID.toString()).disabled = false;
                }
        }
</script>

<div class="container mt-5 text-center">
        {#if !isMounting}
                {#if followers.length !== 0}
                        <ul class="list-group">
                                {#each followers as follower, i}
                                        <li class="list-group-item list-group-item-light">
                                                {follower.username} #{follower.ID}
                                                <button type="button" id="{follower.ID}" style="border-radius: 100%"
                                                        class="btn btn-outline-danger" on:click={() => submit(follower.ID, i)}>
                                                        x
                                                </button>
                                        </li>
                                {/each}
                        </ul>
                {:else}
                        {emptyListMsg}
                {/if}
        {:else}
                <h4>Loading followers...</h4>
        {/if}

        {#if message.success != null}
                <div class="alert {message.success ? 'alert-success' : 'alert-danger'}" role="alert">
                        {message.display}
                </div>
        {/if}
</div>