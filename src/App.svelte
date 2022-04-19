<script>
    import axios from "axios";
    import { userID, username, cleanStore, authenticated } from "./stores/store";
    import { navOptions } from "./Nav.svelte";
    import { auth } from "./Routes.svelte";

    let selected = navOptions[0];
    let intSelected = 0;

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
            axios.defaults.headers.common["Authorization"] = "";
            cleanStore();
            triggerTab({ detail: { tab: "Home" } });
        }
    };
</script>

<section id="nav-bar">
    <nav class="navbar main-bgcolor navbar-collapse navbar-expand-md navbar-dark" style="justify-content: center;">
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
                <a class="nav-link light-color on:click" style="float:right;" on:click={logout}>Logout</a>
                <a class="nav-link light-color">{$username} #{$userID}</a>
            {/if}
        </ul>
    </nav>
</section>
<!-- content wrapper -->
<section class="main-bgcolor light-color" id="banner" style="height: 100%">
    <div class="container" style="height: 100%">
        <!-- content wrapper -->
        <svelte:component this={selected.component}
            on:register_success={triggerTab}
            on:login_success={triggerTab}
            on:logged_out={triggerTab}
        />
    </div>
    <img src="images/wave1.png" alt="" class="wave-img" style="position: fixed;bottom: 0"/>
</section>

<!------------------------------------------->
<!----------------STYLE----------------------->

<!------------------------------------------->
<style>
    #nav-bar {
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

    #banner {
        padding-top: 2%;
    }

    .wave-img {
        width: 100%;
        height: auto;
    }
</style>
