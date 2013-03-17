
$(function() {

	/*** Stop the Sign In dropdown from disappearing ***/
	// Setup drop down menu
	$('.dropdown-toggle').dropdown();
	 
	// Fix input element click problem
	$('.dropdown input, .dropdown label').click(function(e) {
		e.stopPropagation();
	});

	/*** Create and display map ***/
	var map = L.map('map').setView([45.383404, -75.697560], 16);
	
	var mapLayer = L.tileLayer('http://{s}.tile.cloudmade.com/98b76834d5764b799fb407dfdf1f894b/997/256/{z}/{x}/{y}.png', {
		maxZoom: 18
	}).addTo(map);

	var popup = L.popup();

	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(map);
	}

	map.on('click', onMapClick);
	
	var myLayer = L.geoJson().addTo(map);
	
	var mapOverlayUrl = 'images/campus-map.png';
	var mapOverlayBounds = [[45.37810, -75.70185],[45.39285, -75.68870]];
	var mapOverlay = L.imageOverlay(mapOverlayUrl, mapOverlayBounds).addTo(map).bringToFront().setOpacity(1.0);
	
	L.control.layers({"Global Map": mapLayer},{"Campus Map": mapOverlay}).addTo(map);
});