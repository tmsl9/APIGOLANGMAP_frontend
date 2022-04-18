<script>
    //import "./css/nav.css";
    import axios from "axios";
    import { authenticated, userID, username, cleanStore } from "./stores/store";
    import { navOptions } from "./Nav.svelte";
    import { auth } from "./Routes.svelte";
    
    import DATA from "./Data/data";
    import Footer from "./components/Footer.svelte";
    import Map from "./components/Map.svelte"

    let selected = navOptions[0];
    let intSelected = 0; // selected page index

    function changeComponent(event) {
        selected = navOptions[event.target.id];
        intSelected = event.target.id;
    }

    export function triggerTab(event) {
        navOptions.forEach((element, index) => {
            if (element.page === event.detail.tab) {
                document.getElementById(index).click();
            }
        });
    }

    $: logout = async () => {
        const response = await axios.post(auth.logout, {});
        if (response.status === 200) {
            axios.defaults.headers.common['Authorization'] = '';
            cleanStore()
            triggerTab({ detail: { tab: "Home" }});
        }
    };
</script>

<section id="nav-bar">
    <nav class="navbar main-bgcolor navbar-expand-md navbar-dark">
      <!--app navigation -->
      <ul class="nav nav-tabs">
          {#each navOptions as option, i}
      {#if option.page === "Home" || option.loggedIn === $authenticated.toString()}
          <li class="nav-item">
              <a class="nav-link light-color on:click" on:click={changeComponent} id={i} role="tab">{option.page}</a>
          </li>
      {/if}
          {/each}
      {#if $authenticated.toString() === "true"}
                      <button on:click={logout}>Logout</button>
                      <button>{$username} #{$userID}</button>
                  {/if}
      </ul>
  </nav>
     
  
  </section>
   <!-- content wrapper -->
   <svelte:component this={selected.component}/>







    <!------------------------------------------->
    <!----------------STYLE----------------------->
    <!------------------------------------------->
    <style>
      #nav-bar {
        position: sticky;
        top: 0;
        z-index: 10;
      }
    
      .navbar {
        padding: 0 20px !important;
      }
    
      .navbar-nav li {
        padding: 0 0 0 20px;
      }
    
      .navbar-nav li a {
        font-weight: 600;
        text-transform: uppercase;
        float: right;
        text-align: left;
      }
    </style>
