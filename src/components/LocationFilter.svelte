<script>
	import L from 'leaflet';
	import MapToolbar from './MapToolbar.svelte';
	import MarkerPopup from './MarkerPopup.svelte';
	import * as markerIcons from './markers.js';

	let map;
	
	const markerLocations = [
		[29.8283, -96.5795],
		[37.8283, -90.5795],
		[43.8283, -102.5795],
		[48.40, -122.5795],
		[43.60, -79.5795],
		[36.8283, -100.5795],
		[38.40, -122.5795],
	];
	
	const initialView = [39.8283, -98.5795];
	function createMap(container) {
	  let m = L.map(container, {preferCanvas: true }).setView(initialView, 5);
    L.tileLayer(
	    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
	    {
	      attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
	        &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
	      subdomains: 'abcd',
	      maxZoom: 14,
	    }
	  ).addTo(m);

    return m;
  }
	
	let eye = true;
	let lines = true;
	
	let toolbar = L.control({ position: 'topright' });
	let toolbarComponent;
	toolbar.onAdd = (map) => {
		let div = L.DomUtil.create('div');
		toolbarComponent = new MapToolbar({
			target: div,
			props: {}
		});

		toolbarComponent.$on('click-eye', ({ detail }) => eye = detail);
		toolbarComponent.$on('click-lines', ({ detail }) => lines = detail);
		toolbarComponent.$on('click-reset', () => {
			map.setView(initialView, 5, { animate: true })
		})

		return div;
	}

	toolbar.onRemove = () => {
		if(toolbarComponent) {
			toolbarComponent.$destroy();
			toolbarComponent = null;
		}
	};
	
	// Create a popup with a Svelte component inside it and handle removal when the popup is torn down.
	// `createFn` will be called whenever the popup is being created, and should create and return the component.
	function bindPopup(marker, createFn) {
		let popupComponent;
		marker.bindPopup(() => {
			let container = L.DomUtil.create('div');
			popupComponent = createFn(container);
			return container;
		});

		marker.on('popupclose', () => {
			if(popupComponent) {
				let old = popupComponent;
				popupComponent = null;
				// Wait to destroy until after the fadeout completes.
				setTimeout(() => {
					old.$destroy();
				}, 500);

			}
		});
	}
	
	let markers = new Map();
	
	function markerIcon(count) {
		let html = `<div class="map-marker"><div>${markerIcons.library}</div><div class="marker-text">${count}</div></div>`;
		return L.divIcon({
			html,
			className: 'map-marker'
		});
	}
	

	function createMarker(loc) {
		let count = Math.ceil(Math.random() * 25);
		let icon = markerIcon(count);
		let marker = L.marker(loc, {icon});
		bindPopup(marker, (m) => {
			let c = new MarkerPopup({
				target: m,
				props: {
					count
				}
			});
			
			c.$on('change', ({detail}) => {
				count = detail;
				marker.setIcon(markerIcon(count));
			});
			
			return c;
		});
		
		return marker;
	}
	
	function createLines() {
		return L.polyline(markerLocations, { color: '#E4E', opacity: 0.5 });
	}

	let markerLayers;
	let lineLayers;
  function mapAction(container) {
    map = createMap(container); 
		toolbar.addTo(map);
		
		markerLayers = L.layerGroup()
 		for(let location of markerLocations) {
 			let m = createMarker(location);
			markerLayers.addLayer(m);
 		}
		
		lineLayers = createLines();
		
		markerLayers.addTo(map);
		//lineLayers.addTo(map);
		
    return {
       destroy: () => {
				 toolbar.remove();
				 map.remove();
				 map = null;
			 }
    };
	}
	
	// We could do these in the toolbar's click handler but this is an example
	// of modifying the map with reactive syntax.
	$: if(markerLayers && map) {
		if(eye) {
			markerLayers.addTo(map);
		} else {
			markerLayers.remove();
		}
	}
	
	

	function resizeMap() {
	  if(map) { map.invalidateSize(); }
  }

</script>
<svelte:window on:resize={resizeMap} />







<div class="container d-flex " style="height:100%;overflow:auto; justify-content:safe">
	<div class="col-sm-6" style="margin-right:10%">
		<div id="card" style="margin-top:4.5%">
			<div id="card-content">
			  <div id="card-title">
				<h2>Filters</h2>
				<div class="underline-title"></div>
			  </div>
			<div class="row">
				<button id="lastLocation" class="submit">Get Last Location</button>
				<button id="locationHistory" class="submit">Location History</button>
				<button id="followerLocation" class="submit">Follower Locations</button>
			</div>
			 
				
			<div id="card-title">
				<h2>Filters</h2>
				<div class="underline-title"></div>
			  </div>
				<div class="underline-title"></div>
				<input id="searchID" class="form-content" name="username" type="number" autocomplete="on" required />



			<div class="row" style="margin-top:2%">
				<table class="table table-striped">
					<thead>
					  <tr>
						<th>Username</th>
						<th>Latitude</th>
						<th>Longitude</th>
					  </tr>
					</thead>
					<tbody>
					  <tr>
						<td>John</td>
						<td>Doe</td>
						<td>john@example.com</td>
					  </tr>
					  <tr>
						<td>Mary</td>
						<td>Moe</td>
						<td>mary@example.com</td>
					  </tr>
					  <tr>
						<td>July</td>
						<td>Dooley</td>
						<td>july@example.com</td>
					  </tr>
					</tbody>
				  </table>
			</div>
			  
			</div>
		  </div>
	</div>
	<div class="col-sm-6 map" style="height:70%;width:200%;margin-top:2%;border:1px solid black;"  use:mapAction ></div>

</div>


<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
crossorigin=""/>

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
  width: 153px;
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
  height: 635px;
  margin: 6rem auto 8.1rem auto;
  margin-top: 3px;
  width: 560px;

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

  </style>

  
