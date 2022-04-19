<script>
    import axios from "axios";
    import { onMount, onDestroy } from "svelte";
    import { userID, coordinates, updateCoordinates } from "../stores/store";
    import { get } from 'svelte/store';
    import { position } from "../Routes.svelte";

    let message = { success: null, display: "" };
    let isMounting = true
    let isSubmitting = false

    let _geoWatch;

    onMount(async () => {
        if (navigator.geolocation) {
            _geoWatch = navigator.geolocation.watchPosition(
                p => {
                    updateCoordinates([{
                        latitude: p.coords.latitude,
                        longitude: p.coords.longitude
                    }])
                    isMounting = false
                },
                console.error,
                {
                    enableHighAccuracy: true,
                    maximumAge: Infinity
                }
            );
        } else {
            alert("Browser does not support geolocation!")
        }
    });
    onDestroy(() => {
        if (_geoWatch) {
            navigator.geolocation.clearWatch(_geoWatch);
        }
    });

    $: submit = async () => {
        document.getElementById("submit").disabled = true;
        isSubmitting = true;

        const response = await axios.post(position.registerLocation, {
            UserID: $userID,
            Latitude: get(coordinates)[0].latitude,
            Longitude: get(coordinates)[0].longitude
        });
        if (response.status === 200) {
            message = { success: true, display: response.data.msg };
            isSubmitting = false;
            document.getElementById("submit").disabled = false;
        } else {
            message = { success: false, display: response.data.msg };
            isSubmitting = false;
            document.getElementById("submit").disabled = false;
        }
    }
</script>

{#if !isMounting}
    <form on:submit|preventDefault={submit} style="display:flex; justify-content:center;">
        Current position: {get(coordinates)[0].latitude}, {get(coordinates)[0].longitude}
        <button type="submit" id="submit" style="margin-left: 20px">
                {#if isSubmitting}Registering...{:else}Register{/if}
        </button>
    </form>
{/if}
{#if message.success != null}
    <div class="alert {message.success ? 'alert-success' : 'alert-danger'}" role="alert">
        {message.display}
    </div>
{/if}
