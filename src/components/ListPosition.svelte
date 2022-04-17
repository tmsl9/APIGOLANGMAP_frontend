<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { authenticated, userID } from "../stores/store";
    import { position } from "../Routes.svelte";

    let isMounting = true
    let message = { success: null, display: "" };
    let positions = [];
    const emptyListMsg = "Empty list!"

    onMount(async () => {
            if ($authenticated.toString() === "true") {
                    const response = await axios.get(position.getMyLocation, {
                            userid: userID
                    })

                    console.log(response.data)
                    if (response.status === 200) {
                            if (response.data.message !== emptyListMsg){
                                positions = response.data.data
                                console.log(response.data.data)
                            }
                            isMounting = false
                    }
                    
            }
    });
    
</script>
<!-- 
<div class="container mt-5 text-center">
    {#if !isMounting}
            {#if positions.length !== 0}
                    <ul class="list-group">
                            {#each positions as position, i}
                                    <li class="list-group-item list-group-item-light">
                                            {position.latitude} #{position.longitude}
                                    </li>
                            {/each}
                    </ul>
            {:else}
                    {emptyListMsg}
            {/if}
    {:else}
            <h4>Loading Positions...</h4>
    {/if}

    {#if message.success != null}
            <div class="alert {message.success ? 'alert-success' : 'alert-danger'}" role="alert">
                    {message.display}
            </div>
    {/if}
</div> -->