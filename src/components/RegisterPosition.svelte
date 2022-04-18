<script>
    import axios from "axios";
    import { createEventDispatcher, onDestroy, onMount } from "svelte";
    import { userID } from "../stores/store";

    const dispatch = createEventDispatcher();
    let message = { success: null, display: "" };
    let isSubmitting = false

    let coords;
    let _geoWatch;

    onMount(async () => {
        if (navigator.geolocation) {
            const setGeo = p => dispatch("current_position", {coords: p.coords})
            const settings = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: Infinity
            };
            _geoWatch = navigator.geolocation.watchPosition(
                setGeo,
                console.error,
                settings
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

            const response = await axios.post("position.registerLocation", {
                    UserID: $userID,
                    Latitude: coords[0],
                    Longitude: coords[1]
            });

            if (response.status === 201) {
                    message = { success: true, display: response.data.msg };
                    new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
                            isSubmitting = false;
                            //dispatch("position_added", {followers: response.data.followers})
                            document.getElementById("submit").disabled = false;
                    });
            } else {
                    message = { success: false, display: response.data.msg };
                    isSubmitting = false;
                    document.getElementById("submit").disabled = false;
            }
    }
</script>















<form on:submit|preventDefault={submit}>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <!--label>Coordinates</label>
    <input name="latitude"  type=number step="0.01" placeholder="Set Your Latitude" bind:value={lat} />
    <input name="longitude" type=number step="0.01" placeholder="Set Your Longitude"  bind:value={long}/>
    <button type="submit" id="submit">
            {#if isSubmitting}Adding...{:else}Add{/if}
    </button-->
</form>

{#if message.success != null}
    <div class="alert {message.success ? 'alert-success' : 'alert-danger'}" role="alert">
            {message.display}
    </div>
{/if}