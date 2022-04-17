<script>
    import "./css/nav.css";
    import axios from "axios";
    import { authenticated, userID, username, cleanStore } from "./stores/store";
    import { navOptions } from "./Nav.svelte";
    import { auth } from "./Routes.svelte";

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

<main class="container">
    <div class="row flex flex-center">
        <div class="col-4 offset-4 mt-5">
            <!--app navigation -->
            <div class="row">
                {#each navOptions as option, i}
                    {#if option.page === "Home" || option.loggedIn === $authenticated.toString()}
                        <div class="col tab-heading {intSelected == i ? 'tab-active' : ''}" on:click={changeComponent} id={i}>
                            {option.page}
                        </div>
                    {/if}
                {/each}
                {#if $authenticated.toString() === "true"}
                    <div class="col tab-heading" on:click={logout}>Logout</div>
                    <div class="col tab-heading tab-active">{$username} #{$userID}</div>
                {/if}
            </div>
            <!-- content wrapper -->
            <!-- this is where our main content is placed -->
            <svelte:component
                this={selected.component}
                on:register_success={triggerTab}
                on:login_success={triggerTab}
                on:logged_out={triggerTab}
            />
        </div>
    </div>
</main>