var mongoose = require('mongoose');
var Building;
var Point;

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
			"name": "National Wildlife Research Building",
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
			"name": "Carleton Ice House",
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
			"name": "Tennis Centre",
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
			"name": "Lennox and Addington House",
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

var buildingsDb = mongoose.createConnection('mongodb://localhost/buildings');

buildingsDb.on('error', console.error.bind(console, 'connection error:'));

//once the DB connection is open...
buildingsDb.once('open', function callback () {
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
	Building = buildingsDb.model("Building", buildingSchema);
	
	//now the db can be populated using this model
	populateDb(Building);
});  

var points = [
	{
		"id": "0001",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38811, -75.69834]
		},
		"adjacentPoints": ["0002"]
	},
	{
		"id": "0002",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38809, -75.69781]
		},
		"adjacentPoints": ["0001", "0003"]
	},
	{
		"id": "0003",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38763, -75.69781]
		},
		"adjacentPoints": ["0002", "0004"]
	},
	{
		"id": "0004",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38762, -75.69773]
		},
		"adjacentPoints": ["0003", "0005"]
	},
	{
		"id": "0005",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38758, -75.69773]
		},
		"adjacentPoints": ["0004", "0006", "0007", "0008"]
	},
	{
		"id": "0006",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38758, -75.69794]
		},
		"adjacentPoints": ["0005"]
	},
	{
		"id": "0007",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38757, -75.69732]
		},
		"adjacentPoints": ["0005"]
	},
	{
		"id": "0008",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38698, -75.69773]
		},
		"adjacentPoints": ["0005", "0009"]
	},
	{
		"id": "0009",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38697, -75.6977]
		},
		"adjacentPoints": ["0008", "0010"]
	},
	{
		"id": "0010",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38689, -75.69769]
		},
		"adjacentPoints": ["0009", "0011", "0012", "0013"]
	},
	{
		"id": "0011",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38688, -75.69835]
		},
		"adjacentPoints": ["0010"]
	},
	{
		"id": "0012",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38688, -75.69734]
		},
		"adjacentPoints": ["0010"]
	},
	{
		"id": "0013",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38613, -75.69765]
		},
		"adjacentPoints": ["0010", "0014"]
	},
	{
		"id": "0014",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38601, -75.6976]
		},
		"adjacentPoints": ["0013", "0015", "0016", "0018"]
	},
	{
		"id": "0015",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38599, -75.69818]
		},
		"adjacentPoints": ["0014"]
	},
	{
		"id": "0016",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38601, -75.69742]
		},
		"adjacentPoints": ["0014", "0017"]
	},
	{
		"id": "0017",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38611, -75.6974]
		},
		"adjacentPoints": ["0016"]
	},
	{
		"id": "0018",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38575, -75.69751]
		},
		"adjacentPoints": ["0016", "0019"]
	},
	{
		"id": "0019",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38521, -75.6973]
		},
		"adjacentPoints": ["0018", "0020"]
	},
	{
		"id": "0020",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38513, -75.69721]
		},
		"adjacentPoints": ["0019", "0021", "0022"]
	},
	{
		"id": "0021",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38497, -75.69753]
		},
		"adjacentPoints": ["0020"]
	},
	{
		"id": "0022",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.3845, -75.69663]
		},
		"adjacentPoints": ["0020", "0023", "0038"]
	},
	{
		"id": "0023",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38444, -75.6956]
		},
		"adjacentPoints": ["0022", "0024"]
	},
	{
		"id": "0024",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38484, -75.69428]
		},
		"adjacentPoints": ["0023", "0025", "0029"]
	},
	{
		"id": "0025",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38501, -75.69437]
		},
		"adjacentPoints": ["0024", "0026"]
	},
	{
		"id": "0026",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.3851, -75.69436]
		},
		"adjacentPoints": ["0025", "0027"]
	},
	{
		"id": "0027",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38591, -75.69482]
		},
		"adjacentPoints": ["0026", "0028"]
	},
	{
		"id": "0028",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.386, -75.69399]
		},
		"adjacentPoints": ["0027"]
	},
	{
		"id": "0029",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.3843, -75.69395]
		},
		"adjacentPoints": ["0024", "0030", "0031"]
	},
	{
		"id": "0030",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38437, -75.69373]
		},
		"adjacentPoints": ["0029"]
	},
	{
		"id": "0031",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38394, -75.69376]
		},
		"adjacentPoints": ["0029", "0032", "0034"]
	},
	{
		"id": "0032",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38404, -75.69342]
		},
		"adjacentPoints": ["0031", "0033"]
	},
	{
		"id": "0033",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38401, -75.6934]
		},
		"adjacentPoints": ["0032"]
	},
	{
		"id": "0034",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38384, -75.69405]
		},
		"adjacentPoints": ["0031", "0035"]
	},
	{
		"id": "0035",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38373, -75.69411]
		},
		"adjacentPoints": ["0034", "0036"]
	},
	{
		"id": "0036",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38351, -75.69484]
		},
		"adjacentPoints": ["0035", "0037"]
	},
	{
		"id": "0037",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38319, -75.69465]
		},
		"adjacentPoints": ["0036"]
	},
	{
		"id": "0038",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38395, -75.69782]
		},
		"adjacentPoints": ["0022","0039", "0041"]
	},
	{
		"id": "0039",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38413, -75.69799]
		},
		"adjacentPoints": ["0038", "0040"]
	},
	{
		"id": "0040",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38419, -75.69784]
		},
		"adjacentPoints": ["0039"]
	},
	{
		"id": "0041",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38361, -75.6985]
		},
		"adjacentPoints": ["0038", "0042"]
	},
	{
		"id": "0042",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.3834, -75.69834]
		},
		"adjacentPoints": ["0041", "0043", "0050"]
	},
	{
		"id": "0043",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38297, -75.6979]
		},
		"adjacentPoints": ["0042", "0044"]
	},
	{
		"id": "0044",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.3827, -75.69734]
		},
		"adjacentPoints": ["0043", "0045"]
	},
	{
		"id": "0045",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38256, -75.69722]
		},
		"adjacentPoints": ["0044", "0046", "0071"]
	},
	{
		"id": "0046",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38236, -75.69703]
		},
		"adjacentPoints": ["0045", "0047", "0048"]
	},
	{
		"id": "0047",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38256, -75.69661]
		},
		"adjacentPoints": ["0046"]
	},
	{
		"id": "0048",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.3823, -75.69717]
		},
		"adjacentPoints": ["0046", "0049"]
	},
	{
		"id": "0049",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38224, -75.69717]
		},
		"adjacentPoints": ["0048"]
	},
	{
		"id": "0050",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38308, -75.69897]
		},
		"adjacentPoints": ["0042", "0051"]
	},
	{
		"id": "0051",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38285, -75.69874]
		},
		"adjacentPoints": ["0050", "0052", "0053"]
	},
	{
		"id": "0052",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38294, -75.69855]
		},
		"adjacentPoints": ["0051"]
	},
	{
		"id": "0053",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38271, -75.6986]
		},
		"adjacentPoints": ["0051", "0054", "0074"]
	},
	{
		"id": "0054",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38265, -75.69874]
		},
		"adjacentPoints": ["0053", "0055"]
	},
	{
		"id": "0055",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38248, -75.69909]
		},
		"adjacentPoints": ["0054", "0056"]
	},
	{
		"id": "0056",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38234, -75.6994]
		},
		"adjacentPoints": ["0055", "0057"]
	},
	{
		"id": "0057",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38225, -75.69932]
		},
		"adjacentPoints": ["0056", "0058"]
	},
	{
		"id": "0058",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38187, -75.69899]
		},
		"adjacentPoints": ["0057", "0059", "0060"]
	},
	{
		"id": "0059",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.382, -75.69869]
		},
		"adjacentPoints": ["0058", "0073"]
	},
	{
		"id": "0060",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38169, -75.69936]
		},
		"adjacentPoints": ["0058", "0061"]
	},
	{
		"id": "0061",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38156, -75.69961]
		},
		"adjacentPoints": ["0060", "0062"]
	},
	{
		"id": "0062",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38132, -75.69938]
		},
		"adjacentPoints": ["0061", "0063"]
	},
	{
		"id": "0063",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38105, -75.69914]
		},
		"adjacentPoints": ["0062", "0064", "0067"]
	},
	{
		"id": "0064",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38103, -75.69919]
		},
		"adjacentPoints": ["0063", "0065"]
	},
	{
		"id": "0065",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38093, -75.69909]
		},
		"adjacentPoints": ["0064", "0066"]
	},
	{
		"id": "0066",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38097, -75.69899]
		},
		"adjacentPoints": ["0065", "0067", "0068"]
	},
	{
		"id": "0067",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38108, -75.69907]
		},
		"adjacentPoints": ["0063", "0066"]
	},
	{
		"id": "0068",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38108, -75.69876]
		},
		"adjacentPoints": ["0066", "0069"]
	},
	{
		"id": "0069",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38139, -75.69812]
		},
		"adjacentPoints": ["0068", "0070"]
	},
	{
		"id": "0070",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38143, -75.69805]
		},
		"adjacentPoints": ["0069", "0071"]
	},
	{
		"id": "0071",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38221, -75.69797]
		},
		"adjacentPoints": ["0070", "0045", "0072"]
	},
	{
		"id": "0072",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38232, -75.69807]
		},
		"adjacentPoints": ["0071", "0073"]
	},
	{
		"id": "0073",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38228, -75.69816]
		},
		"adjacentPoints": ["0072", "0074", "0059"]
	},
	{
		"id": "0074",
		"type": "Feature",
		"properties": {
			"type": "path_point"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [45.38252, -75.69835]
		},
		"adjacentPoints": ["0073", "0053"]
	}
];

//callback after the database has been connected
var populatePointDb = function(Point) {

	var pointsArray = points;
	
	//find all points already in the database
	Point.find({}, 
		function(err, foundPoints) { //callback after points are found
		
			for(var i = 0; i < pointsArray.length; i++) {
				//if the point isn't already in the db, add it
				if(foundPoints.indexOf(pointsArray[i]) < 0) {
					var newPoint = new Point({
						id: pointsArray[i].id,
						type: pointsArray[i].type
					});
					
					newPoint.properties = pointsArray[i].properties;
					newPoint.geometry = pointsArray[i].geometry;
					newPoint.adjacentPoints = pointsArray[i].adjacentPoints;
					
					newPoint.save(function(err, newPoint){
						console.log("successfully added point: " + newPoint.id);
					});    
				}
				else {
					console.log("point: " + pointsArray[i].id + " already in db.");
				}
			}
			
		}
	);

}

var pointsDb = mongoose.createConnection('mongodb://localhost/points');

pointsDb.on('error', console.error.bind(console, 'pointsDb: connection error:'));

//once the DB connection is open...
pointsDb.once('open', function callback () {
	console.log("Points Db opened...creating schema");
	
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
	
	//now the db can be populated using this model
	populatePointDb(Point);
});  
