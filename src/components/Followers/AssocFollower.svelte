<script>
    import axios from "axios";
    import { createEventDispatcher } from "svelte";
    import { userID } from "../../store/store";
    import { follower } from "../../Routes.svelte";
    const dispatch = createEventDispatcher();
    let isSubmitting = false
    let followerID = 0

    $: submit = async () => {
        document.getElementById("submit").disabled = true;
        isSubmitting = true;

        const response = await axios.post(follower.assocFollower, {
            UserID: $userID,
            FollowerUserID: parseInt(followerID)
        });

        if (response.status === 201) {
            swal(response.data.message, "", "success")
            isSubmitting = false;
            dispatch("follower_added", {followers: response.data.followers})
            document.getElementById("submit").disabled = false;
        } else {
            swal(response.data.message, "", "error")
            isSubmitting = false;
            document.getElementById("submit").disabled = false;
        }
    }
</script>

<div class="row" style="margin-top:2%">

    <div class="col-sm-12">

        <form on:submit|preventDefault={submit} style="height:20%">
            <!-- svelte-ignore a11y-label-has-associated-control -->

            <div class="row">

                <div class="col-sm-6" style="margin-left:30px;">
                    <label style="color:black;">Follower ID</label>
                    <input type="number" name="followerID" style="width:75%; display:flex; justify-content:center;align-items:center;"  min=0 placeholder="Set Follower ID" bind:value={followerID} />
                </div>
                <button type="submit" id="submit" style="margin-top:4%;width:100px;display:inline-block;">
                    {#if isSubmitting}Adding...{:else}Add{/if}
                </button>

            </div>

        </form>
    </div>
</div>


<style>

    form{
        padding: 2%;
    }


    label {
        font-family: "Raleway", sans-serif;
        font-size: 11pt;
    }

    #submit {
        background: -webkit-linear-gradient(right, #a6f77b, #2dbd6e);
        border: none;
        border-radius: 21px;
        box-shadow: 0px 1px 8px #24c64f;
        cursor: pointer;
        color: white;
        font-family: "Raleway SemiBold", sans-serif;
        height: 5%;
        margin: 0 auto;
        margin-top: 50px;
        transition: 0.25s;
        width: 25%;
        display: flex;
        justify-content: center;
    }
    #submit:hover {
        box-shadow: 0px 1px 18px #24c64f;
    }

</style>