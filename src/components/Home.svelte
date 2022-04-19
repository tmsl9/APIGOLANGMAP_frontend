<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { authenticated, updateStore, username } from "../stores/store";
    import { auth } from "../Routes.svelte";
    import DATA from "../data/data";
    
    let isMounting = true

    onMount(async () => {
        if ($authenticated.toString() === "true") {
            const response = await axios.get(auth.getUser)
            
            if (response.status === 200) {
                isMounting = false;
                updateStore(response.data.user.ID, response.data.user.username, response.data.user.IsSOSActivated, null, null)
            }
        }
    })
</script>
  <!------------------------------------------->
  <!----------------MARKUP----------------------->
  <!------------------------------------------->
  <section class="main-bgcolor light-color" id="banner">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h1>Go & Svelte</h1>
          {#if !isMounting}

          <p>Welcome {($username !== "") ? $username + " " : ""}, this project has the objective to help you dont get in danger by sending your location in a period of time.</p>
          {:else}
          <p>Welcome, register on our APP! One step to do it!</p>
          {/if}
        </div>
        <div class="col-md-6">
          <img src="images/map-logo.png" alt="" width="70%" class="img-fluid" />
        </div>
      </div>
    </div>
  
    <img src="images/wave1.png" alt="" class="wave-img" />
    
  </section>

  
  <!------------------------------------------->
  <!----------------STYLE----------------------->
  <!------------------------------------------->
  <style>
    section {
      padding-top: 2%;
    }
  
    h1 {
      font-size: 40px;
      font-weight: 600;
      margin-top: 100px;
      text-transform: uppercase;
    }
  
    .watch-btn {
      margin: auto 20px;
      position: relative;
      top: 8px;
    }
  
    section a {
      text-decoration: none;
    }
  
    .wave-img {
      width: 100%;
      height: auto;
    }
  </style>
