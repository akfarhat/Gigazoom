/*** Stop the Sign In dropdown from disappearing ***/
$(function() {
	// Setup drop down menu
	$('.dropdown-toggle').dropdown();
	 
	// Fix input element click problem
	$('.dropdown input, .dropdown label').click(function(e) {
		e.stopPropagation();
	});

	var map = L.map('map').setView([45.383404, -75.697560], 16);
	
	L.tileLayer('http://{s}.tile.cloudmade.com/98b76834d5764b799fb407dfdf1f894b/997/256/{z}/{x}/{y}.png', {
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
	
	
});