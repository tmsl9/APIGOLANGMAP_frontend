<script>
	import { coordinates} from "../stores/store";

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
			<th scope="col">Date</th>
			<th scope="col">Latitude</th>
			<th scope="col"> Longitude</th>
			<th scope="col">Type</th>
		</tr>
	</thead>
	<tbody>
		{#if $coordinates.coords !== undefined}
			{#each $coordinates.coords as coords}
				<tr>
					<th scope="row">{formatDate(coords.UpdatedAt)}</th>
					<td>{coords.Latitude}</td>
					<td>{coords.Longitude}</td>
					<td>{$coordinates.type}{coords.ID !== undefined ? coords.ID : ""}</td>
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