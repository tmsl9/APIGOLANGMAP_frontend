<script>
        import axios from "axios";
        import { onMount } from "svelte";
        import { isAuthenticated, userID } from "../../stores/store";
        import { follower } from "../../Routes.svelte";
        import { each } from "svelte/internal";

        let isMounting = true;
        let isSubmitting = false;
        let message = { success: null, display: "" };
        let followers = [];
        const emptyListMsg = "Empty list!";

        onMount(async () => {
                if (isAuthenticated()) {
                        const response = await axios.get(follower.getAllFollowers);

                        if (response.status === 200) {
                                if (response.data.message !== emptyListMsg) {
                                        updateFollowers(response.data.data);
                                }
                                isMounting = false;
                        }
                }
        });

        $: submit = async (followerID) => {
                document.getElementById(followerID.toString()).disabled = true;
                isSubmitting = true;
                const response = await axios.post(follower.deassocFollower, {
                        UserID: $userID,
                        FollowerUserID: followerID,
                });

                if (response.status === 200) {
                        message = { success: true, display: response.data.message };
                        let fol;
                        each(followers, (f) => { if (f.id === followerID) { fol = f; }});
                        followers[followers.indexOf(fol)].id = -1;
                        isSubmitting = false;
                } else {
                        message = { success: false, display: response.data.message };
                        document.getElementById(followerID.toString()).disabled = false;
                        isSubmitting = false;
                }
        };

        export function updateFollowers(followersUpd) { followers = followersUpd; }
</script>

<div class="container mt-5 text-center">
        {#if !isMounting}
                {#if followers.length !== 0}
                        <ul class="list-group">
                                {#each followers as follower}
                                        <li class="list-group-item list-group-item-light" style={follower.id === -1
                                                        ? "display:none"
                                                        : ""}>
                                                {follower.username} #{follower.id}
                                                <button type="button" id={follower.id} class="btn"
                                                        style="padding:3px 7px;border-radius:100%;background-color:red"
                                                        on:click={() => submit(follower.id)}>
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
