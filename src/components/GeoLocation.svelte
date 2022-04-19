<script>
    import axios from "axios";
    import { onMount, onDestroy } from "svelte";
    import { userID, currentCoordinates, updateCurrentCoordinates } from "../stores/store";
    import { position } from "../Routes.svelte";

    let message = { success: null, display: "" };
    let isMounting = true
    let isSubmitting = false

    let _geoWatch;

    onMount(async () => {
        if (navigator.geolocation) {
            _geoWatch = navigator.geolocation.watchPosition(
                p => {
                    updateCurrentCoordinates({
                        Latitude: p.coords.latitude,
                        Longitude: p.coords.longitude,
                        UpdatedAt: new Date(p.timestamp)
                    })
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
            Latitude: $currentCoordinates.Latitude,
            Longitude: $currentCoordinates.Longitude
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
    <form on:submit|preventDefault={submit} style="display:inline">
        Current position: {$currentCoordinates.Latitude}, {$currentCoordinates.Longitude}
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
