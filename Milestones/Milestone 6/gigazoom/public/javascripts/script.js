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
	
	var myLayer = L.geoJson().addTo(map);
	
	var markerLayer = L.layerGroup().addTo(map);
	
	var mapOverlayUrl = 'images/campus-map.png';
	var mapOverlayBounds = [[45.37810, -75.70185],[45.39285, -75.68870]];
	var mapOverlay = L.imageOverlay(mapOverlayUrl, mapOverlayBounds).addTo(map).bringToFront().setOpacity(1.0);
	
	L.control.layers({"Global Map": mapLayer},{"Campus Map": mapOverlay}).addTo(map);

	function onMapClick(e) {
	
		var coords = { lat: e.latlng.lat, lng: e.latlng.lng };
	
		$.post("/building", coords,
			function(buildingStr) {
				var building = null;
				
				try {
					building = $.parseJSON(buildingStr);
				}
				catch(ex){
					console.log(ex.message);
				}
			
				if(building != null) {
					popup
					.setLatLng(e.latlng)
					.setContent(building.properties.name)
					.openOn(map);
				}
			}
		);
	}

	map.on('click', onMapClick);

	/*** Handle navigation input ***/
	
	$("#nav_form_btn").on("click",function(){
	
		markerLayer.clearLayers();
	
		var formInfo = {
			src: $("#nav_form_src").val(),
			dest: $("#nav_form_dest").val()
		};
	
		$.post("/navigate", formInfo,
			function(pointsStr) {
				var points = null;
				
				try {
					points = $.parseJSON(pointsStr);
				}
				catch(ex){
					console.log(ex.message);
				}
			
				if(points != null) {
					var p1 = points[0].geometry.coordinates;
					var p2 = points[1].geometry.coordinates;
				
					L.marker(p1).addTo(markerLayer);
					L.marker(p2).addTo(markerLayer);
					
					var polyline = L.polyline([p1,p2],{color: "red", opacity: 1.0}).addTo(markerLayer);
					
					map.fitBounds(polyline.getBounds());
				}
			}
		);
	});
});