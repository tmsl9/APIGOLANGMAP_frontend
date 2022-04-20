<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { isAuthenticated, updateStore, username } from "../stores/store";
  import { auth } from "../Routes.svelte";

  let isMounting = true;

  onMount(async () => {
    if (isAuthenticated()) {
      const response = await axios.get(auth.getUser);

      if (response.status === 200) {
        updateStore( response.data.user.ID, response.data.user.username, response.data.user.IsSOSActivated, null, null);
        isMounting = false;
      }
    }
  });
</script>

<!------------------------------------------->
<!----------------MARKUP----------------------->
<!------------------------------------------->
<div class="row">
  <div class="col-md-6">
    <h1>Go & Svelte</h1>
    {#if !isMounting}
      <p>
        Welcome {$username !== "" ? $username + " " : ""}, this project has the
        objective to help you dont get in danger by sending your location in a
        period of time.
      </p>
    {:else}
      <p>Welcome, register on our APP! One step to do it!</p>
    {/if}
  </div>
  <div class="col-md-6 d-flex" style="justify-content:center; align-items:center;">
    <img src="images/map-logo.png" alt="" width="70%" class="img-fluid" />
  </div>
</div>

<!------------------------------------------->
<!----------------STYLE----------------------->

<!------------------------------------------->
<style>
  h1 {
    font-size: 40px;
    font-weight: 600;
    margin-top: 100px;
    text-transform: uppercase;
  }
</style>
