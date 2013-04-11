
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose') //blessed mongodb connector
  , validator = require('validator')
  , _ = require('underscore')
  , pathFinder = require('path-finder/path-finder')
  , Building
  , Point;

//connect to the databases
var buildingsDb = mongoose.createConnection('mongodb://localhost/buildings');
var pointsDb = mongoose.createConnection('mongodb://localhost/points');
var db = mongoose.connection;

buildingsDb.on('error', console.error.bind(console, 'buildings connection error:'));

//once the DB connection is open...
buildingsDb.once('open', function callback () {
	var entranceSchema = mongoose.Schema({
		coordinates: [Number],
		_id: false
	});
	
	var buildingSchema = mongoose.Schema({
		id: String,
		type: String,
		properties: {
			name: String,
			type: {type: String}
		},
		geometry: {
			type: {type: String},
			coordinates: [Number]
		},
		tunnelEntrances: [entranceSchema]
	});
	
	//Convert this schema into an instantiable "model" Class 
	Building = buildingsDb.model("Building", buildingSchema);
});

pointsDb.on('error', console.error.bind(console, 'points connection error:'));

//once the DB connection is open...
pointsDb.once('open', function callback () {
	var pointSchema = mongoose.Schema({
		id: String,
		type: String,
		properties: {
			type: {type: String}
		},
		geometry: {
			type: {type: String},
			coordinates: [Number]
		},
		adjacentPoints: [String]
	});
	
	//Convert this schema into an instantiable "model" Class 
	Point = pointsDb.model("Point", pointSchema);
});

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.map);

function findClosestBuilding(coords, buildings) {

	console.log("findClosestBuilding called");

	var clickedPoint = {x: coords.lng, y: coords.lat};
		
	var shortestDistance = 1000;
	var closestBuilding = null;
		
	for(var i = 0; i < buildings.length; i++) {
		var buildingPoint = {x: buildings[i].geometry.coordinates[1], y: buildings[i].geometry.coordinates[0]};
				
		var distance = pathFinder.distance(clickedPoint, buildingPoint)
				
		if(distance < shortestDistance) {
			closestBuilding = buildings[i];
			shortestDistance = distance;
		}
	}
	
	if(shortestDistance > 60) {
		return null;
	}
	else {		
		return closestBuilding;
	}
}

app.post("/buildingList", function(req, res) {
    Building.find({}, function(err, buildings) {
        if (err) {
			console.log("Can't find buildings");
        }
		else {
			var buildingsArray = [];
			
			for(var i = 0; i < buildings.length; i++) {
				buildingsArray[i] = buildings[i].properties.name;
			}
		
			res.end(JSON.stringify(buildingsArray));
		}
	});
});

app.post("/building", function(req, res) {

	console.log("In /building post.");

	Building.find({}, function(err,buildings) {
		if(err) {
			console.log("Can't find buildings");
		}
		else {
			console.log("In db callback");
			var building = findClosestBuilding(req.body, buildings);
			res.end(JSON.stringify(building));
		}
	});	
	
	console.log("After db query");
});

function validateLocation(location) {
	try {
		location  = validator.sanitize(location).trim();
		return location;
	}
	catch (ex) {
		return null;
	}
}

function findBuilding(info, buildings) {

	for(var i = 0; i < buildings.length; i++) {
		if(buildings[i].id === info.toUpperCase() 
		   || buildings[i].properties.name.toLowerCase() === info.toLowerCase())
		{
			return buildings[i];	
		}
	}
	
	return null;
}

app.post("/navigate", function(req, res, next) {
	var src = validateLocation(req.body.src);
	var dest = validateLocation(req.body.dest);

	if(src && dest) {
		Building.find({}, function(err,buildings) {
			if(err) {
				console.log("Can't find buildings");
			}
			else {
				var b1 = findBuilding(src, buildings);
				var b2 = findBuilding(dest, buildings);
				if(b1.tunnelEntrances && b2.tunnelEntrances) {
					if(b1.tunnelEntrances[0] && b2.tunnelEntrances[0]) {
						Point.find({}, function(err, points) {
							if(err) {
								console.log("Can't find points");
							}
							else {
								var p1 = null;
								var p2 = null;
								var pointsArray = [];
							
								var n = points.length;
								
								for(var i = 0; i < n; i++) {
									var tempPoint = { 
										label: points[i].id, 
										x: points[i].geometry.coordinates[1],
										y: points[i].geometry.coordinates[0],
										adjacentPoints: points[i].adjacentPoints
									};
									
									pointsArray.push(tempPoint);
									
									if(tempPoint.x === b1.tunnelEntrances[0].coordinates[1] 
									   && tempPoint.y === b1.tunnelEntrances[0].coordinates[0]) {
										p1 = tempPoint;
									}
									
									if(tempPoint.x === b2.tunnelEntrances[0].coordinates[1] 
									   && tempPoint.y === b2.tunnelEntrances[0].coordinates[0]) {
										p2 = tempPoint;
									}
								}
							
								if(p1 && p2 && pointsArray) {
									var pointPath = pathFinder.findPath(p1,p2,pointsArray);
								}
								else {
									console.log("Couldn't get the right point and pointsArray");
									var pointPath = null;
								}
								
								if(pointPath) {
									if(pointPath[0]) {
										
										//Get rid of all the circulatr references to adjacent points
										//so that it can be converted to JSON
										for(var i = 0; i < pointPath[0].points.length; i++) {
											delete pointPath[0].points[i].adjacentPoints;
										}
									
										res.end(JSON.stringify(pointPath[0]));
									}
								}
								else {
									res.end("");
								}
							}
						
						});
					}
				}
				else {
					res.end("");
				}
			}
		});
	}
	else {
		res.end("");
	}
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
