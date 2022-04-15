<script>
    import './css/nav.css'
    import { navOptions } from  './Nav.svelte';
    let selected = navOptions[0];	// keep track of the selected 'page' object (default to the about component since we must have local db connection established first)
    let intSelected = 0;	// selected page index
    let loginID = 0;

    // change the selected component (the event.originalTarget.id is not accessible in Chrome so switched to event.srcElement.id)
    function changeComponent (event) {
        selected = navOptions[event.target.id];
        intSelected = event.target.id;
    }

    navOptions.forEach((element, index) => { if (element.page === "Login") { loginID = index }})
</script>

<main class="container">
    <div class="row flex flex-center">
        <div class="col-4 offset-4 mt-5">
            <!--app navigation -->
            <div class="row">
                {#each navOptions as option, i}
                    <div class="col tab-heading {intSelected == i ? 'tab-active' : ''}"
                         on:click={changeComponent} id={i}>
                        {option.page}
                    </div>
                {/each}
            </div>
            <!-- content wrapper -->
            <!-- this is where our main content is placed -->
            <svelte:component this={selected.component} on:register_success={() => {
                        document.getElementById(loginID).click()
                    }}/>
        </div>
    </div>
</main>
