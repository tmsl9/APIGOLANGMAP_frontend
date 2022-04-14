<script context="module">
    import Register from '../auth/register.svelte'
    import Login from '../auth/login.svelte'
    export var component = null;
</script>

<div class="taskbar">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <button type="button" class="btn" on:click={() => {component=null}}>
        <i class="fa fa-home"></i>
    </button>
    <button type="button" on:click={() => {component=Register}}>Login</button>
    <button type="button" on:click={() => {component=Login}}>Register</button>
</div>
