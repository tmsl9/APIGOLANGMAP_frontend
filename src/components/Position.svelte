<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { authenticated, updateStore } from "../stores/store";
    import { auth } from "../Routes.svelte";
    import GeoLocation from "./GeoLocation.svelte";

    let isMounting = true

    onMount(async () => {
        // se calhar esta condição não faz sentido, visto que ao fazer
        // o seguinte pedido já se vê se está realmente autenticado.
        if ($authenticated.toString() === "true") {
            const response = await axios.get(auth.getUser)

            if (response.status === 200) {
                updateStore(response.data.user.ID, response.data.user.username, response.data.user.isSOSActivated, null, null)
                isMounting = false
            }
        }
    });
</script>

<GeoLocation/>
