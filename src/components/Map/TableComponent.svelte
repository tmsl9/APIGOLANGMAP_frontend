<script>
	import { createEventDispatcher } from "svelte";
	import { coordinates } from "../../store/store";

	const dispatch = createEventDispatcher();

	function formatDate(d) {
		var date = new Date(d);

		return ("00" + (date.getMonth() + 1)).slice(-2)
				+ "/" + ("00" + date.getDate()).slice(-2)
				+ "/" + date.getFullYear() + " "
				+ ("00" + date.getHours()).slice(-2) + ":"
				+ ("00" + date.getMinutes()).slice(-2)
				+ ":" + ("00" + date.getSeconds()).slice(-2);
	}
</script>

<table class="table">
	<thead>
	<tr>
		<th scope="col">#</th>
		<th scope="col">Date</th>
		<th scope="col">Latitude</th>
		<th scope="col"> Longitude</th>
		<th scope="col">Type</th>
	</tr>
	</thead>
	<tbody>
	{#if $coordinates.coords !== undefined}
		{#each $coordinates.coords as coords, i}
			<tr on:click={dispatch("viewMarker", [coords.Latitude, coords.Longitude])}>
				<th scope="row">{i+1}</th>
				<td>{formatDate(coords.UpdatedAt)}</td>
				<td>{coords.Latitude}</td>
				<td>{coords.Longitude}</td>
				<td>{$coordinates.type}</td>
			</tr>
		{/each}
	{:else}
		<div class="col-sm-12" style="width:100%">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label style="display:flex; justify-content:right;">No entries found</label>
		</div>
	{/if}
	</tbody>
</table>