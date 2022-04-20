<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { isAuthenticated, updateStore } from "../../stores/store";
    import { auth } from "../../Routes.svelte";
    import AssocFollower from "./AssocFollower.svelte";
    import ListFollowers from "./ListFollowers.svelte";

    let isMounting = true;
    let listFollowersCompo;

    onMount(async () => {
        // se calhar esta condição não faz sentido, visto que ao fazer
        // o seguinte pedido já se vê se está realmente autenticado.
        if (isAuthenticated()) {
            const response = await axios.get(auth.getUser);

            if (response.status === 200) {
                updateStore( response.data.user.ID, response.data.user.username, response.data.user.isSOSActivated, null, null);
                isMounting = false;
            }
        }
    });
</script>

{#if !isMounting}
    <AssocFollower on:follower_added={(event) => { listFollowersCompo.updateFollowers(event.detail.followers) }} />
    <!-- <ListFollowers bind:this={listFollowersCompo} /> -->
{/if}
