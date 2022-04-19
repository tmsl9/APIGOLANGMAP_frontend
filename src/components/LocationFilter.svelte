<script>

	import axios from "axios";
	import { position } from "../Routes.svelte";
	import { coordinates, currentCoordinates, updateCoordinates, userID } from "../stores/store";
	import { each } from "svelte/internal";

	let message = { success: null, display: "" };
	let isSubmitting = false
	let startDate = "init"
	let endDate = "init"
	let checked = false

	const type = {
		current:   "current",
		last:      "last",
		history:   "history",
		followers: "followers",
	}

	$: last_location = async () => {
		document.getElementById("submit").disabled = true;
		isSubmitting = true;

		const response = await axios.get(position.getMyLocation);
		if (response.status === 200) {
			updateCoordinates([response.data.location], type.last)
			message = { success: true, display: response.data.msg };
			isSubmitting = false;
			document.getElementById("submit").disabled = false;
		} else {
			message = { success: false, display: response.data.msg };
			isSubmitting = false;
			document.getElementById("submit").disabled = false;
		}
	}

	$: location_history = async () => {
		document.getElementById("submit").disabled = true;
		isSubmitting = true;

		// test with valid dates, see if there is necessity of parsing date
		const response = await axios.post(position.getLocationHistory, {
			Start: startDate,
			End: endDate
		});
		if (response.status === 200) {
			updateCoordinates(response.data.locations, type.history)
			let extra = response.data.extra === undefined ? "" : response.data.extra
			message = { success: true, display: response.data.message + extra };
			isSubmitting = false;
			document.getElementById("submit").disabled = false;
		} else {
			message = { success: false, display: response.data.message };
			isSubmitting = false;
			document.getElementById("submit").disabled = false;
		}
	}

	$: delete_location = async (locationID) => {
		document.getElementById(locationID.toString()).disabled = true;
		isSubmitting = true;
		const response = await axios.delete(position.deleteLocation, { id: locationID });

		if (response.status === 200) {
			message = { success: true, display: response.data.message };
			let coord;
			// testttttt
			let coords = $coordinates.coords
			each(coords, (c) => { if (c.ID === locationID) { coord = c; }});
			coords[coords.indexOf(coord)].ID = -1;
			updateCoordinates(response.data.locations, $coordinates.type)
			isSubmitting = false;
		} else {
			message = { success: false, display: response.data.message };
			document.getElementById(locationID.toString()).disabled = false;
			isSubmitting = false;
		}
	};
</script>

<div class="container d-flex " style="height:100%; justify-content:right">
	<div class="col-sm-6" style="margin-right:10%">
		<div class="row">
			<label for="idFilter">ID</label>
			<input type="text" id="idFilter" placeholder="Search By Id">
		</div>
		<div class="row">
			<button id="current_location" on:click={() => updateCoordinates([$currentCoordinates], type.current)}>
				Get Current Location
			</button>
			<button id="last_location" on:click={last_location}>Get Last Location</button>
			<button id="location_history" on:click={location_history}>Location History</button>
			<!--button id="followerLocation" on:click={followerLocation}>Follower Locations</button-->
		</div>
		<div class="row">
			<input type="checkbox" id="filterDate" name="filterDate" bind:checked>
			<div class="col-sm-6">
				<label for="sdFilter">Start Date</label>
				<input type="date" id="sdFilter" name="filterDate" bind:value={startDate} placeholder="Search by Start Date" disabled={!checked}>
			</div>
			<div class="col-sm-6">
				<label for="edFilter">End Date</label>
				<input type="date" id="edFilter" name="filterDate" bind:value={endDate} placeholder="Search by End Date" disabled={!checked}>
			</div>
		</div>
		<div class=row>
			<table class="table">
				<thead class="thead-dark">
					<tr>
						<th scope="col">Date</th>
						<th scope="col">Latitude</th>
						<th scope="col">Longitude</th>
						<th scope="col">Type</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
				{#if $coordinates.coords !== undefined}
						{#each $coordinates.coords as coords}
							<tr>
								<th scope="row">{coords.UpdatedAt}</th>
								<td>{coords.Latitude}</td>
								<td>{coords.Longitude}</td>
								<td>{$coordinates.type}</td>
								<td>
									{#if $coordinates.type !== type.current && $coordinates.type !== type.followers}
										<button type="button" id={coords.ID} class="btn"
												style="padding:3px 7px;border-radius:100%;background-color:red"
												on:click={() => delete_location(coords.ID)}>
											x
										</button>
									{/if}
								</td>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</div>
		{#if message.success != null}
			<div class="alert {message.success ? 'alert-success' : 'alert-danger'}" role="alert">
				{message.display}
			</div>
		{/if}
	</div>
</div>



