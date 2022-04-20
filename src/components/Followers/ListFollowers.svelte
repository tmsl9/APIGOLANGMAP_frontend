<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" >
</svelte:head>
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

<div class="container text-center">
        {#if !isMounting}
                {#if followers.length !== 0}
<table class="table">
	<thead>
		<tr> 
			<th scope="col">#</th>
			<th scope="col">Username</th>
			<th scope="col"></th>
			
		</tr>
	</thead>
	<tbody>
                
		{#each followers as follower}
                        {#if follower.id !== -1}
			<tr>
			        <td>{follower.id}</td>
				<td>{follower.username}</td>
				<td><button type="button" id={follower.id} class="btn btn-danger"

                                        on:click={() => submit(follower.id)}>
                                        <i class="mi mi-delete"><span class="u-sr-only"></span></i>
                                </button></td>
			</tr>
                        {/if}
		{/each}

		
	</tbody>
</table>
                {:else}
                        {emptyListMsg}
                {/if}
        {:else}
                <h4>Loading followers...</h4>
        {/if}

        {#if message.success != null}
        {message.success ? swal(message.display,"", "success") : swal(message.display,"" ,"error") }
        {/if}
</div>
