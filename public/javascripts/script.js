$(function() {

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
			function(pathStr) {
				var path = null;
				
				try {
					path = $.parseJSON(pathStr);
				}
				catch(ex){
					console.log(ex.message);
				}
			
				if(path != null) {
				
					var polyline = L.polyline([[path.points[0].y, path.points[0].x]],{color: "red", opacity: 0.8}).addTo(markerLayer);
					
					L.marker([path.points[0].y, path.points[0].x]).addTo(markerLayer);
						
					for(var i = 1; i < path.points.length; i++) {
						var point = [path.points[i].y, path.points[i].x];
						
						if(i === path.points.length-1) { 
							L.marker(point).addTo(markerLayer);
						}
						
						console.log(path.points[i].label);
						
						polyline.addLatLng(point);
					}
					
					map.fitBounds(polyline.getBounds());
					
					var list = "";
					
					if(path.directions) {
						for(var i = 0; i < path.directions.length; i++) {
							list += "<li>" + path.directions[i] + "</li>\n"
						}
					}
					
					$("#directionsList").html(list);
					
					if(list !== "") {
						$("#distanceLabel").html("Total Distance: " + Math.round(path.distance) + " m");
					}
					else {
						$("#distanceLabel").html("");
					}
				}
			}
		);
	});
	
	 // String array for the buildings (for the autocomplete form)
    var buildings = new Array();

    // Asks the database for the buildings 
    $.post("/buildingList", function(buildingsS){
		try {
			// Stores the buildings in the variable
			var temp = $.parseJSON(buildingsS);
			
			for(var i = 0; i < temp.length; i++) {
				buildings[i] = {label: temp[i]};
			}
		}
		catch(ex) {
			console.log(ex.message);
		}
	});

    // The autocomplete forms
    $("#nav_form_src").autocomplete({
        source: buildings
    });
	
    $("#nav_form_dest").autocomplete({
        source: buildings
    });
	
	//Current Location buttons
	
	var currentLocation;
	
	function onLocationFound(e) {
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
					currentLocation = building.properties.name;
				}
			}
		);
	}
		
	map.on('locationfound', onLocationFound);
	
	function onCurrentLocationClicked(input) {
		map.locate();
		
		input.val(currentLocation);
	}
	
	$("nav_form_src_btn").on('click', onCurrentLocationClicked($("nav_form_src")));
	$("nav_form_dest_btn").on('click', onCurrentLocationClicked($("nav_form_dest")));
});