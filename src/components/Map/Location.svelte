<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { isAuthenticated, updateStore } from "../../store/store";
    import { auth } from "../../Routes.svelte";
    import GeoLocation from "./GeoLocation.svelte";
    import Map from "./Map.svelte";

    let isMounting = true;

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
<div class="row">
    <div style="margin-left:4%;">
        <div id="card" style="margin-top:4.5%">
            <div id="card-content">
                <GeoLocation />
            </div>
        </div>
    </div>
</div>

<Map />


<style>

    #card {
        background: #fbfbfb;
        border-radius: 8px;
        box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.65);
        height: auto;
        width: 125%;
    }
    #card-content {
        padding-top: 20px;
        padding-bottom: 20px;
    }

</style>


