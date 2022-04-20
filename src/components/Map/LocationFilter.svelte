<script>

	import axios from "axios";
	import { position } from "../../Routes.svelte";
	import { coordinates, currentCoordinates, updateCoordinates } from "../../stores/store";
	import TableComponent from './TableComponent.svelte'
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

	$: last_location = async () => {
		document.getElementById("last_location").disabled = true;
		isSubmitting = true;
		const response = await axios.get(position.getMyLocation);
		if (response.status === 200) {
			updateCoordinates([response.data.location], type.last)
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
			Start: checked ? startDate : "",
			End: checked ? endDate : ""
		});
		if (response.status === 200) {
			updateCoordinates(response.data.locations, type.history)
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
	$: delete_location = async (locationID) => {
		document.getElementById(locationID.toString()).disabled = true;
		isSubmitting = true;
		const response = await axios.delete(position.deleteLocation, { id: locationID });}

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
			updateCoordinates(response.data.locations, type.history)
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
	</div>
	<div class="row">
		<button class="submit" id="current_location" on:click={() => updateCoordinates([$currentCoordinates], type.current)}>
			Current Location
		</button>
		<button class="submit" id="last_location" on:click={last_location}>Last Location</button>
		<button class="submit" id="location_history" on:click={location_history}>Location History</button>
		
	</div>
	 
	<div clas="row" style="color:black;display:flex; justfiy-content:center; margin-top:10%">
		
			<label for="searchID" style="text-align:center;margin-left:1%; margin-top:3%">Search By ID</label>
			<div class="col-sm-6">
				<input id="idFilter" class="form-content" style="margin-top:3%"  type="number" bind:value={followerID} autocomplete="on" />
			</div>
			<button class="submit" id="follower_locations"  style="margin-top:0%;" on:click={follower_locations}>Follower Location</button>

			<!--button id="followerLocation" on:click={followerLocation}>Follower Locations</button-->


	</div>
	<div class="row" style="margin-top:2%">
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
	<div class="col-sm-12">
	<div class="row" style="margin-top:2%;height:200px; overflow-y: scroll">
		
		<TableComponent></TableComponent>
	</div>
</div>
	{#if message.success != null}
	<div class="alert {message.success ? 'alert-success' : 'alert-danger'}" role="alert">
		{message.display}
	</div>
{/if}
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
	  height: 42.3px;
	  margin: 0 auto;
	  margin-top: 10px;
	  transition: 0.25s;
	  height:max-content;
	  width: 120px;
	}
	.submit:hover {
	  box-shadow: 0px 1px 18px #24c64f;
	}
		.map :global(.marker-text) {
			width:100%;
			text-align:center;
			font-weight:600;
			background-color:#444;
			color:#EEE;
			border-radius:0.5rem;
		}
		
		.map :global(.map-marker) {
			width:30px;
			transform:translateX(-50%) translateY(-25%);
		}
		section {
		  padding-top: 5%;
	
		}
	  
		h2{
			color:black;
		}
	  
		section a {
		  text-decoration: none;
		}
	  
		.wave-img {
		  width: 100%;
		  height: auto;
		}
		
		form{
			padding: 2%;
		}
		a {
	  text-decoration: none;
	}
	
	label {
	  font-family: "Raleway", sans-serif;
	  font-size: 11pt;
	}
	#forgot-pass {
	  color: #2dbd6e;
	  font-family: "Raleway", sans-serif;
	  font-size: 10pt;
	  margin-top: 3px;
	  text-align: right;
	}
	#card {
	  background: #fbfbfb;
	  border-radius: 8px;
	  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.65);
	  height: auto;
	  margin: 6rem auto 8.1rem auto;
	  margin-top: 3px;
	  width: 500PX;
	
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
	#signup {
	  color: #2dbd6e;
	  font-family: "Raleway", sans-serif;
	  font-size: 10pt;
	  margin-top: 16px;
	  text-align: center;
	}
	#submit {
	  background: -webkit-linear-gradient(right, #a6f77b, #2dbd6e);
	  border: none;
	  border-radius: 21px;
	  box-shadow: 0px 1px 8px #24c64f;
	  cursor: pointer;
	  color: white;
	  font-family: "Raleway SemiBold", sans-serif;
	  height: 42.3px;
	  margin: 0 auto;
	  margin-top: 50px;
	  transition: 0.25s;
	  width: 153px;
	}
	#submit:hover {
	  box-shadow: 0px 1px 18px #24c64f;
	}
	.form {
	  align-items: left;
	  display: flex;
	  flex-direction: column;
	}
	.form-border {
	  background: -webkit-linear-gradient(right, #a6f77b, #2ec06f);
	  height: 1px;
	  width: 100%;
	}
	.form-content {
	  background: #fbfbfb;
	  border-radius: 8px;
	  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.65);
	
	  padding-top: 14px;
	}
	.underline-title {
	  background: -webkit-linear-gradient(right, #a6f77b, #2ec06f);
	  height: 2px;
	  margin: -1.1rem auto 0 auto;
	  width: 89px;
	}
	
	h4 {
	  margin: 2rem 0rem 1rem;
	}
	
	
</style>