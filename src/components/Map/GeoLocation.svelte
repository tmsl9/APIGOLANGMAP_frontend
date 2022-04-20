<script>
    import axios from "axios";
    import { onMount, onDestroy } from "svelte";
    import { userID, currentCoordinates, updateCurrentCoordinates } from "../../stores/store";
    import { position } from "../../Routes.svelte";

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
                () => {
                    updateCurrentCoordinates({})
                    isMounting = true
                },
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
    <form on:submit|preventDefault={submit} style="display:flex;color:black; justify-content:center;">
        <p style="margin-top:1%;">Current position: {$currentCoordinates.Latitude}, {$currentCoordinates.Longitude}</p>
        <button type="submit" class="submit" id="submit" style="margin-left: 10px">
                {#if isSubmitting}Registering...{:else}Register{/if}
        </button>
    </form>
{/if}
{#if message.success != null}
    <div class="alert {message.success ? 'alert-success' : 'alert-danger'}" role="alert">
        {message.display}
    </div>
{/if}

<style>

	#submit {
	  background: -webkit-linear-gradient(right, #a6f77b, #2dbd6e);
	  border: none;
	  border-radius: 21px;
	  box-shadow: 0px 1px 8px #24c64f;
	  cursor: pointer;
	  color: white;
	  font-family: "Raleway SemiBold", sans-serif;
	  height: 5%;
	  transition: 0.25s;
	  width: auto;
          display: flex;
          justify-content: center;
	}
	#submit:hover {
	  box-shadow: 0px 1px 18px #24c64f;
	}
	
</style>