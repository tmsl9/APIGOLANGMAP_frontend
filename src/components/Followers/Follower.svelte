<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { isAuthenticated, updateStore } from "../../store/store";
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
    <div id="card" style="margin-top:4.5%;">
        <div id="card-content">
            <div id="card-title">
                <h2>Add Follower</h2>
                <div class="underline-title"></div>
            </div>
        </div>
        <AssocFollower on:follower_added={(event) => { listFollowersCompo.updateFollowers(event.detail.followers) }} />
        <div class="col-sm-12" style="width:100%; display:flex; justify-content:center;align-items:center;" >
            <div id="card-content">
                <div id="card-title">
                    <h2>List Followers</h2>
                    <div class="underline-title2"></div>
                </div>
            </div>
        </div>
        <div class="col-sm-12" style="margin-top:0px; width:100%; display:flex; justify-content:center;align-items:center;" >
            <div class="row" style="margin-top:2%;height:255px;width:100%; overflow-y: scroll">


                <ListFollowers bind:this={listFollowersCompo} />
            </div>
        </div>
    </div>
{/if}




<style>

    h2{
        color:black;
    }

    #card {
        background: #fbfbfb;
        border-radius: 8px;
        box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.65);
        height: auto;
        margin: 6rem auto 8.1rem auto;
        margin-top: 3px;
        width: 500PX;

    }
    #card-content {
        padding: 12px 44px;
    }
    #card-title {
        font-family: "Raleway Thin", sans-serif;
        letter-spacing: 4px;
        padding-bottom: 23px;
        padding-top: 13px;
        text-align: center;
    }

    .underline-title {
        background: -webkit-linear-gradient(right, #a6f77b, #2ec06f);
        height: 2px;
        margin: -1.1rem auto 0 auto;
        width: 55%;
    }

    .underline-title2 {
        background: -webkit-linear-gradient(right, #a6f77b, #2ec06f);
        height: 2px;
        margin: -1.1rem auto 0 auto;
        width: 90%;
    }


</style>