var mongoose = require('mongoose');
var Building;

//An array of buildings that the database will be
//initialized with
var buildings = [
	{
		"id": "UC",
		"type": "Feature",
		"properties": {
			"name": "University Centre",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.3834, -75.69787]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.3834, -75.69834]}
		]
	},
	{
		"id": "HP",
		"type": "Feature",
		"properties": {
			"name": "Herzberg Laboratories",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38209, -75.69742]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38224, -75.69717]}
		]
	},
	{	
		"id": "TB",
		"type": "Feature",
		"properties": {
			"name": "Tory Building",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38277, -75.69817]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38294, -75.69855]},
			{ "coordinates": [45.38252, -75.69835]}
		]
	},
	{	
		"id": "AT",
		"type": "Feature",
		"properties": {
			"name": "Azrieli Theatre",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38334, -75.69868]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38294, -75.69855]}
		]
	},
	{	
		"id": "SC",
		"type": "Feature",
		"properties": {
			"name": "Steacie Building",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38273, -75.69684]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38256, -75.69661]}
		]
	},
	{	
		"id": "RB",
		"type": "Feature",
		"properties": {
			"name": "River Building",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38247, -75.69637]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38256, -75.69661]}
		]
	},
	{	
		"id": "PA",
		"type": "Feature",
		"properties": {
			"name": "Paterson Hall",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38188, -75.6985]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.382, -75.69869]}
		]
	},
	{	
		"id": "LS",
		"type": "Feature",
		"properties": {
			"name": "Life Sciences Research Building",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38125, -75.69807]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38139, -75.69812]}
		]
	},
	{	
		"id": "LA",
		"type": "Feature",
		"properties": {
			"name": "Loeb Building",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38087, -75.69896]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38105, -75.69914]},
			{ "coordinates": [45.38108, -75.69876]}
		]
	},
	{	
		"id": "SA",
		"type": "Feature",
		"properties": {
			"name": "Southam Hall",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38125, -75.69958]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38132, -75.69938]}
		]
	},
	{	
		"id": "HC",
		"type": "Feature",
		"properties": {
			"name": "Human Computer Interaction Building",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38059, -75.699]
		}
	},
	{	
		"id": "SR",
		"type": "Feature",
		"properties": {
			"name": "Social Sciences Research Building",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38037, -75.69994]
		}
	},
	{	
		"id": "VS",
		"type": "Feature",
		"properties": {
			"name": "Visualization & Simulation Building",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38053, -75.70015]
		}
	},
	{	
		"id": "ML",
		"type": "Feature",
		"properties": {
			"name": "MacOdrum Library",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38189, -75.69974]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38225, -75.69932]}
		]
	},
	{	
		"id": "DT",
		"type": "Feature",
		"properties": {
			"name": "Dunton Tower",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38267, -75.69927]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38248, -75.69909]}
		]
	},
	{	
		"id": "AP",
		"type": "Feature",
		"properties": {
			"name": "Azrieli Pavilion",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38286, -75.69893]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38265, -75.69874]}
		]
	},
	{	
		"id": "CB",
		"type": "Feature",
		"properties": {
			"name": "Canal Building",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38413, -75.69854]
		}
	},
	{	
		"id": "AA",
		"type": "Feature",
		"properties": {
			"name": "Architecture Building",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38398, -75.69737]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38395, -75.69777]}
		]
	},
	{	
		"id": "ME",
		"type": "Feature",
		"properties": {
			"name": "Mackenzie Building",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38439, -75.6977]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38419, -75.69784]},
			{ "coordinates": [45.38497, -75.69753]}
		]
	},
	{	
		"id": "MC",
		"type": "Feature",
		"properties": {
			"name": "Minto Centre",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38511, -75.69685]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38513, -75.69721]}
		]
	},
	{	
		"id": "MC",
		"type": "Feature",
		"properties": {
			"name": "Minto Centre",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38511, -75.69685]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38513, -75.69721]}
		]
	},
	{	
		"id": "RO",
		"type": "Feature",
		"properties": {
			"name": "Robertson Hall",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38335, -75.69429]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38319, -75.69465]}
		]
	},
	{	
		"id": "MB",
		"type": "Feature",
		"properties": {
			"name": "Maintenance Building",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.3842, -75.69453]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38469, -75.69481]}
		]
	},
	{	
		"id": "NB",
		"type": "Feature",
		"properties": {
			"name": "Nesbitt Building",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38389, -75.69332]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38401, -75.6934]}
		]
	},
	{	
		"id": "NW",
		"type": "Feature",
		"properties": {
			"name": "Nesbitt Building",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38409, -75.69278]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38401, -75.6934]}
		]
	},
	{	
		"id": "TT",
		"type": "Feature",
		"properties": {
			"name": "Carleton Technology & Training Centre",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38453, -75.69357]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38437, -75.69373]}
		]
	},
	{	
		"id": "CC",
		"type": "Feature",
		"properties": {
			"name": "Colonel By Child Care Centre",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38555, -75.69399]
		}
	},
	{	
		"id": "AC",
		"type": "Feature",
		"properties": {
			"name": "Athletics",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38631, -75.69398]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.386, -75.69399]}
		]
	},
	{	
		"id": "AH",
		"type": "Feature",
		"properties": {
			"name": "Alumni Hall",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38651, -75.69308]
		}
	},
	{	
		"id": "FH",
		"type": "Feature",
		"properties": {
			"name": "Fieldhouse",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38694, -75.69444]
		}
	},
	{	
		"id": "GY",
		"type": "Feature",
		"properties": {
			"name": "Gymnasium",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.3857, -75.69319]
		}
	},
	{	
		"id": "IH",
		"type": "Feature",
		"properties": {
			"name": "Careton Ice House",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.3858, -75.69247]
		}
	},
	{	
		"id": "TC",
		"type": "Feature",
		"properties": {
			"name": "Tennic Centre",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38812, -75.69493]
		}
	},
	{	
		"id": "PH",
		"type": "Feature",
		"properties": {
			"name": "Prescott House",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38575, -75.69663]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38575, -75.69751]}
		]
	},
	{	
		"id": "LH",
		"type": "Feature",
		"properties": {
			"name": "Lanark House",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38577, -75.69811]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38599, -75.69818]}
		]
	},
	{	
		"id": "FR",
		"type": "Feature",
		"properties": {
			"name": "Frontenac House",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.3861, -75.6983]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38599, -75.69818]}
		]
	},
	{	
		"id": "RH",
		"type": "Feature",
		"properties": {
			"name": "Renfrew House",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38616, -75.69699]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38611, -75.6974]}
		]
	},
	{	
		"id": "LX",
		"type": "Feature",
		"properties": {
			"name": "Lennox and Addngton House",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38646, -75.69706]
		}
	},
	{	
		"id": "GR",
		"type": "Feature",
		"properties": {
			"name": "Grenville House",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38654, -75.69839]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38688, -75.69835]}
		]
	},
	{	
		"id": "RU",
		"type": "Feature",
		"properties": {
			"name": "Russell House",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.387, -75.69838]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38688, -75.69835]}
		]
	},
	{	
		"id": "GH",
		"type": "Feature",
		"properties": {
			"name": "Glengarry House",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38677, -75.69718]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38688, -75.69734]}
		]
	},
	{	
		"id": "CO",
		"type": "Feature",
		"properties": {
			"name": "Residence Commons",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38714, -75.69718]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38688, -75.69734]}
		]
	},
	{	
		"id": "SD",
		"type": "Feature",
		"properties": {
			"name": "Stormont Dundas House",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38806, -75.69727]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38757, -75.69732]}
		]
	},
	{	
		"id": "SP",
		"type": "Feature",
		"properties": {
			"name": "St. Patrick's Building",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38752, -75.69819]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38758, -75.69794]}
		]
	},
	{	
		"id": "LE",
		"type": "Feature",
		"properties": {
			"name": "Leeds House",
			"type": "building"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38806, -75.69864]
		},
		"tunnelEntrances": [
			{ "coordinates": [45.38811, -75.69834]}
		]
	}
];

//callback after the database has been connected
var populateDb = function(Building) {

	var buildingsArray = buildings;
	
	//find all buildings already in the database
	Building.find({}, 
		function(err, foundBuildings) { //callback after buildings are found
		
			for(var i = 0; i < buildingsArray.length; i++) {
				//if the building isn't already in the db, add it
				if(foundBuildings.indexOf(buildingsArray[i]) < 0) {
					var newBuilding = new Building({
						id: buildingsArray[i].id,
						type: buildingsArray[i].type
					});
					
					newBuilding.properties = buildingsArray[i].properties;
					newBuilding.geometry = buildingsArray[i].geometry;
					
					//if this building has tunnel entrances, add them
					if(buildingsArray[i].tunnelEntrances) {
						newBuilding.tunnelEntrances = buildingsArray[i].tunnelEntrances;
					}
					else {
						newBuilding.tunnelEntrances = [];
					}
					
					newBuilding.save(function(err, newBuilding){
						console.log("successfully added building: " + newBuilding.id);
					});    
				}
				else {
					console.log("building: " + buildingsArray[i].id + " already in db.");
				}
			}
			
		}
	);

}

mongoose.connect('mongodb://localhost/buildings');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

//once the DB connection is open...
db.once('open', function callback () {
	console.log("Db opened...creating schema");
	
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
	Building = mongoose.model("Building", buildingSchema);
	
	//now the db can be populated using this model
	populateDb(Building);
});  


