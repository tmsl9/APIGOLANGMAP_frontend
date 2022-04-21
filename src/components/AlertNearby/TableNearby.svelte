<script>
    import axios from "axios";
    import { currentCoordinates } from "../../store/store";
    import { position } from "../../Routes.svelte";

    let isSubmitting = false
    let lat = $currentCoordinates.Latitude === undefined ? 0 : $currentCoordinates.Latitude
    let long =$currentCoordinates.Longitude === undefined ? 0 : $currentCoordinates.Longitude
    let radius = 0
    let followers = []

    $: submit = async () => {
        document.getElementById("submit").disabled = true;
        isSubmitting = true;

        const response = await axios.post(position.getAllUsersUnderXKms, {
            Latitude: lat,
            Longitude: long,
            Meters: parseInt(radius)
        });

        if (response.status === 200) {
            swal(response.data.message, "", "success")
            isSubmitting = false;
            followers =response.data.userid
            document.getElementById("submit").disabled = false;
        } else {
            swal(response.data.message, "", "error")
            isSubmitting = false;
            document.getElementById("submit").disabled = false;
        }
    }
</script>

<div class="col-sm-12 text-center">
    <div id="card" style="margin-top:4.5%">
        <div id="card-content">
            <div id="card-title">
                <h2 style="color:black">Search Location in X Kms</h2>
                <div class="underline-title"></div>
            </div>
            <form on:submit|preventDefault={submit} style="height:20%">
                <div class="col-sm-12">
                    <div class="row" style="width:100%; background-color:white; color:black;margin-top:3%;display:flex; justify-content:center;align-items:center;">

                        <div class="col-sm-4">
                            <label>Latitude</label>
                            <input type="number" step="0.00000000000001" bind:value={lat} id="lat" >
                        </div>

                        <div class="col-sm-4">
                            <label>Longitude</label>
                            <input type="number" step="0.00000000000001"  bind:value={long} id="long">
                        </div>

                        <div class="col-sm-4">
                            <label>Radius</label>
                            <input type="number" min=0 bind:value={radius} id="radius" required>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-sm-4">
                        </div>
                        <div class="col-sm-4">
                            <button type="submit" class="submit" id="submit">
                                {#if isSubmitting}Searching...{:else}Search{/if}
                            </button>
                        </div>
                        <div class="col-sm-4">
                        </div>
                    </div>
                </div>
            </form>
            <table class="table" style="margin-top:5%">
                <thead>
                <tr>
                    <th scope="col">#User ID</th>
                </tr>
                </thead>
                <tbody>
                {#each followers as follower}
                    <tr>
                        <td>{follower}</td>
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>

<style>
    #card {
        background: #fbfbfb;
        border-radius: 8px;
        box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.65);
        height: auto;
        width: auto;
    }
    #card-content {
        padding-top: 20px;
        padding-bottom: 20px;
    }
    #card-title {
        font-family: "Raleway Thin", sans-serif;
        letter-spacing: 4px;
        padding-bottom: 23px;
        padding-top: 13px;
        text-align: center;
    }
    .submit {
        background: -webkit-linear-gradient(right, #ffd900 0%, #ed9121 100%);
        border: none;
        border-radius: 21px;
        box-shadow: 0px 1px 8px #24c64f;
        cursor: pointer;
        color: white;
        font-family: "Raleway SemiBold", sans-serif;
        height: 5%;
        margin: 0 auto;
        margin-top: 2%;
        transition: 0.25s;
        height:max-content;
        width: 30%;
    }
    .submit:hover {
        box-shadow: 0px 1px 18px #24c64f;
    }
</style>
