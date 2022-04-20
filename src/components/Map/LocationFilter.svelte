<script>
	import axios from "axios";
	import { createEventDispatcher } from "svelte";
	import { position } from "../../Routes.svelte";
	import { currentCoordinates, updateCoordinates } from "../../stores/store";
	import TableComponent from './TableComponent.svelte'

	const dispatch = createEventDispatcher();
	let message = { success: null, display: "" };
	let isSubmitting = false
	let startDate = ""
	let endDate = ""
	let followerID = 0
	let checked = false

	const type = {
		current:   "current",
		last:      "last",
		history:   "history",
		followers: "followers",
	}

	$: current_location = () => {
		updateCoordinates([$currentCoordinates], type.current)
		dispatch("syncLocationsMap")
	}

	$: last_location = async () => {
		document.getElementById("last_location").disabled = true;
		isSubmitting = true;
		const response = await axios.get(position.getMyLocation);
		if (response.status === 200) {
			updateCoordinates([response.data.location], type.last)
			dispatch("syncLocationsMap")
			message = { success: true, display: response.data.msg };
			isSubmitting = false;
			document.getElementById("last_location").disabled = false;
		} else {
			message = { success: false, display: response.data.msg };
			isSubmitting = false;
			document.getElementById("last_location").disabled = false;
		}
	}
	$: location_history = async () => {
		document.getElementById("location_history").disabled = true;
		isSubmitting = true;
		// test with valid dates, see if there is necessity of parsing date
		const response = await axios.post(position.getLocationHistory, {
			Start: checked ? startDate : "a",
			End: checked ? endDate : "a"
		});
		if (response.status === 200) {
			updateCoordinates(response.data.locations, type.history)
			dispatch("syncLocationsMap")
			let extra = response.data.extra === undefined ? "" : response.data.extra
			message = { success: true, display: response.data.message + extra };
			isSubmitting = false;
			document.getElementById("location_history").disabled = false;
		} else {
			message = { success: false, display: response.data.message };
			isSubmitting = false;
			document.getElementById("location_history").disabled = false;
		}
	}

	$: follower_locations = async () => {
		document.getElementById("follower_locations").disabled = true;
		isSubmitting = true;

		let dates = []
		if (checked) {
			dates = endDate === "" ? [ startDate ] : [ startDate, endDate ]
		}
		const response = await axios.post(position.getUsersLocationWithFilters, {
			UserId: [followerID],
			Dates: dates
		});
		if (response.status === 200) {
			updateCoordinates(response.data.locations, type.followers)
			dispatch("syncLocationsMap")
			message = { success: true, display: response.data.message };
			isSubmitting = false;
			document.getElementById("follower_locations").disabled = false;
		} else {
			message = { success: false, display: response.data.message };
			isSubmitting = false;
			document.getElementById("follower_locations").disabled = false;
		}
	}
</script>

<div id="card" style="margin-top:4.5%">
	<div id="card-content">
		<div id="card-title">
			<h2>Filters</h2>
			<div class="underline-title"></div>
		</div>
	
	<div class="row">
		<button class="submit" id="current_location" on:click={current_location}>Current Location</button>
		<button class="submit" id="last_location" on:click={last_location}>Last Location</button>
		<button class="submit" id="location_history" on:click={location_history}>Location History</button>
	</div>

	<div class="row" style="color:black;display:flex; justify-content:center; margin-top:10%">
		<div class="col-sm-6" style="margin-left:2%;">
			<label for="idFilter" style="color:black;">Follower ID</label>
			<input type="number" name="idFilter" id="idFilter" bind:value={followerID} style="width:75%; margin-top:3%;display:flex; justify-content:center;align-items:center;">
		</div>
		<button class="submit" id="follower_locations"  style="margin-top:0%;" on:click={follower_locations}>Follower Location</button>
	</div>

	<div class="col-sm-12">
		<div class="row" style="margin-top:10%">
			<div class="col-sm-5">
				<input type="date" id="sdFilter" style="width:100%;background-color:white;color:black; margin-top:3%;display:flex; justify-content:center;align-items:center;" name="filterDate" bind:value={startDate} placeholder="Search by Start Date" disabled={!checked}>
			</div>

			<div class="col-sm-5">
				<input type="date"  style="width:100%; background-color:white; color:black;margin-top:3%;display:flex; justify-content:center;align-items:center;" id="edFilter" name="filterDate" bind:value={endDate} placeholder="Search by End Date" disabled={!checked}>
			</div>
			<div class="col-sm-2">
				<input type="checkbox" id="filterDate" name="filterDate" bind:checked>
			</div>
		</div>
	</div>


	<div class="col-sm-12">
		<div class="row" style="margin-top:2%;height:200px; overflow-y: scroll">
			<TableComponent on:viewMarker={(event) => dispatch("viewMarker", event.detail)}/>
		</div>
	</div>
	{#if message.success != null}
		<div class="alert {message.success ? 'alert-success' : 'alert-danger'}" role="alert">
			{message.display}
		</div>
	{/if}
</div>
</div>
<style>
	.submit {
		background: -webkit-linear-gradient(right, #ffd900 0%, #ed9121 100%);
		border: none;
		border-radius: 21px;
		box-shadow: 0px 1px 8px #24c64f;
		cursor: pointer;
		color: white;
		font-family: "Raleway SemiBold", sans-serif;
		height: 5%;
		margin: 0 auto;
		margin-top: 1%;
		transition: 0.25s;
		height:max-content;
		width: 25%;
	}
	.submit:hover {
		box-shadow: 0px 1px 18px #24c64f;
	}

	h2{
		color:black;
	}


	label {
		font-family: "Raleway", sans-serif;
		font-size: 11pt;
	}

	#card {
		background: #fbfbfb;
		border-radius: 8px;
		box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.65);
		height: auto;
		margin: 6rem auto 8.1rem auto;
		margin-top: 3px;
		width: 100%;

	}
	#card-content {
		padding: 12px 44px;
	}
	#card-title {
		font-family: "Raleway Thin", sans-serif;
		letter-spacing: 4px;
		padding-bottom: 23px;
		padding-top: 13px;
		text-align: center;
	}
	
	.underline-title {
		background: -webkit-linear-gradient(right, #a6f77b, #2ec06f);
		height: 2px;
		margin: -1.1rem auto 0 auto;
		width: 89px;
	}


	input[type=checkbox] {
		--active: #ed9121;
		--active-inner: #fff;
		--focus: 2px rgba(39, 94, 254, .3);
		--border: #797979;
		--border-hover: #ed9121;
		--background: #fff;
		--disabled: #F6F8FF;
		--disabled-inner: #E1E6F9;
		-webkit-appearance: none;
		-moz-appearance: none;
		height: 21px;
		outline: none;
		display: inline-block;
		vertical-align: top;
		position: relative;
		margin: 0;
		cursor: pointer;
		border: 1px solid var(--bc, var(--border));
		background: var(--b, var(--background));
		transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
	}

	input[type=checkbox]:not(.switch) {
		--active: #ed9121;
		--active-inner: #fff;
		--focus: 2px rgba(39, 94, 254, .3);
		--border: #797979;
		--border-hover: #ed9121;
		--background: #fff;
		--disabled: #F6F8FF;
		--disabled-inner: #E1E6F9;
		-webkit-appearance: none;
		-moz-appearance: none;
		height: 25px;
		outline: none;
		display: inline-block;
		vertical-align: top;
		position: relative;
		margin: 0;
		cursor: pointer;
		border: 1px solid var(--bc, var(--border));
		background: var(--b, var(--background));
		transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
	}

	input[type=checkbox]:after {
		content: "";
		display: block;
		left: 0;
		top: 0;
		position: absolute;
		transition: transform var(--d-t, 0.3s) var(--d-t-e, ease), opacity var(--d-o, 0.2s);
	}

	input[type=checkbox]:checked {
		--b: var(--active);
		--bc: var(--active);
		--d-o: .3s;
		--d-t: .6s;
		--d-t-e: cubic-bezier(.2, .85, .32, 1.2);
	}

	input[type=checkbox]:disabled {
		--b: var(--disabled);
		cursor: not-allowed;
		opacity: 0.9;
	}

	input[type=checkbox]:disabled:checked {
		--b: var(--disabled-inner);
		--bc: var(--border);
	}



	input[type=checkbox]:hover:not(:checked):not(:disabled) {
		--bc: var(--border-hover);
	}

	input[type=checkbox]:focus {
		box-shadow: 0 0 0 var(--focus);
	}

	input[type=checkbox]:not(.switch) {
		width: 25px;
	}

	input[type=checkbox]:not(.switch):after {
		opacity: var(--o, 0);
	}

	input[type=checkbox]:not(.switch):checked {
		--o: 1;
	}

	input[type=checkbox]:not(.switch) {
		border-radius: 7px;
	}

	input[type=checkbox]:not(.switch):after {
		width: 9px;
		height: 15px;
		border: 2px solid var(--active-inner);
		border-top: 0;
		border-left: 0;
		left: 7px;
		top: 2px;
		transform: rotate(var(--r, 20deg));
	}

	input[type=checkbox]:not(.switch):checked {
		--r: 43deg;
	}

</style>
