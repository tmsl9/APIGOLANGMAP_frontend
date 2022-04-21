<script>
	import L from 'leaflet';
	import MapToolbar from './MapToolbar.svelte';
	import MarkerPopup from './MarkerPopup.svelte';
	import * as markerIcons from './markers.js';
	import {coordinates} from "../../store/store";
	import LocationFilter from "./LocationFilter.svelte";

	let map;

	let markerLocations = [];

	let initialView = [15.785282, 47.567475];

	function createMap(container) {
		let m = L.map(container, {preferCanvas: true}).setView(initialView, 5);
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

	function createMarker(loc, count) {
		let icon = markerIcon(count);
		let marker = L.marker(loc, {icon});
		bindPopup(marker, (m) => {
			return new MarkerPopup({
				target: m,
				props: {
					count,
					loc
				}
			});
		});

		return marker;
	}

	function createLines() {
		return L.polyline(markerLocations, { color: '#E4E', opacity: 0.5 });
	}

	let markerLayers;
	let lineLayers;

	function addMarkerLayersToMap(){
		markerLayers = L.layerGroup()
		var i = 0
		for(let location of markerLocations) {
			let m = createMarker(location, ++i);
			markerLayers.addLayer(m);
		}

		lineLayers = createLines();

		markerLayers.addTo(map);
		//lineLayers.addTo(map);
	}

	function mapAction(container) {
		map = createMap(container);
		toolbar.addTo(map);

		addMarkerLayersToMap()

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

	export function syncLocationsMap() {
		if($coordinates.coords.length === 0) return

		markerLayers.remove()
		markerLocations = []
		$coordinates.coords.forEach((c) => { markerLocations.push([c.Latitude, c.Longitude]) })
		addMarkerLayersToMap()
		viewMarker(markerLocations[0])
	}

	export const viewMarker = (marker) => {
		initialView = marker
		map.setView(initialView, map.getZoom())
	}
</script>

<svelte:window on:resize={resizeMap} />

<div class="container d-flex" style="height:100%;overflow:auto;justify-content:safe">
	<div class="col-sm-6" style="margin-right:10%">
		<LocationFilter on:syncLocationsMap={syncLocationsMap} on:viewMarker={(event) => viewMarker(event.detail)}/>
	</div>
	<div class="col-sm-5 map" style="overflow:hidden; height:60%;width:200%;margin-top:2%;border:1px solid black;" use:mapAction></div>
</div>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
	  integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
	  crossorigin=""/>

<style>
	.map :global(.marker-text) {
		width:100%;
		text-align:center;
		font-weight:600;
		background-color:#444;
		color:#EEE;
		border-radius:0.5rem;
	}

	.map :global(.map-marker) {
		width:150%;
		color: black;
		transform:translateX(-50%) translateY(-25%);
	}
</style>

