
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , bcrypt = require("bcrypt") //hashing algorithm
  , MongoStore = require('connect-mongo')(express) //session datastore using mongodb
  , mongoose = require('mongoose') //blessed mongodb connector
  , validator = require('validator')
  , _ = require('underscore')
  , pathFinder = require('path-finder/path-finder')
  , User
  , Building;

//connect to the databases
var usersDb = mongoose.createConnection('mongodb://localhost/users');
var buildingsDb = mongoose.createConnection('mongodb://localhost/buildings');
var db = mongoose.connection;

usersDb.on('error', console.error.bind(console, 'users connection error:'));

//once the DB connection is open...
usersDb.once('open', function callback () {
	//Create a mongoose Schema (document structure)
  var userSchema = mongoose.Schema({
		email: String,
		password: String
	});
	
	//Convert this schema into an instantiable "model" Class 
	User = usersDb.model("User", userSchema);
});

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

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  
  //enable cookies
  app.use(express.cookieParser());
  
  //setup session management
  app.use(express.session({
		  cookie: {maxAge: 60000 * 20} // 20 minutes
		, secret: "Shh... I'm a secret"
		, store: new MongoStore({ //use a mongo-connect store
      db: "sessions" 
    })
  }));
  
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res, next){
    //redirect to user page if logged in
    if(req.session.username){
        res.redirect("/users");
    }else{
        next();
    }
}, routes.map);

app.get('/users', 
	function(req, res, next){
		//redirect home if not logged in
		if(req.session.username){
			next();
		}else{
			res.redirect("/");
		}
	}, 
user.list);

app.get('/register', routes.register);

app.post("/register", function(req, res){
	var email = req.body.email;
	var password = req.body.password;
	User.find({email: email}, function(err, users){
	  //check if the user already exists
	  if(users.length!=0){
		  res.redirect("/?error=email already exists");	
		  return;
	  }
	  //generate a salt, with 10 rounds (2^10 iterations)
	  bcrypt.genSalt(10, function(err, salt) {
		  //hash the given password using the salt we generated
      bcrypt.hash(password, salt, function(err, hash) {
      	//create a new instance of the mongoose User model we defined above
      	var newUser = new User({
      		email: email,
      		password: hash
      	});	
      	
      	//save() is a magic function from mongoose that saves this user to our DB
      	newUser.save(function(err, newUser){
      		res.send("successfully registered user: "+newUser.email);
			res.redirect("/");
      	});    
      });
	  });	
	});	
});

app.post("/signin", function(req, res){
	var email = req.body.email;
	var password = req.body.password;
	//Search the Database for a User with the given username
	User.find({email: email}, function(err, users){
		//we couldn't find a user with that name
		if(err || users.length==0){
			res.redirect("/?error=invalid email or password");	
			return;
		}
		
		var user = users[0];
		//compare the hash we have for the user with what this password hashes to
		bcrypt.compare(password, user.password, function(err, authenticated){
			if(authenticated){
				req.session.email = user.email;
				res.redirect("/users");
			}else{
				res.redirect("/?error=invalid email or password");	
			}
		});
	});
});

app.post("/signout", function(req, res){
	req.session.destroy(function(err){
      if(err){
          console.log("Error: %s", err);
      }
      res.redirect("/");
  });	
});

function findClosestBuilding(coords, buildings) {

	console.log("findClosestBuilding called");

	var clickedPoint = {x: coords.lat, y: coords.lng};
		
	var shortestDistance = 1000;
	var closestBuilding = null;
		
	for(var i = 0; i < buildings.length; i++) {
		var buildingPoint = {x: buildings[i].geometry.coordinates[0], y: buildings[i].geometry.coordinates[1]};
				
		var distance = pathFinder.distance(clickedPoint, buildingPoint)
				
		if(distance < shortestDistance) {
			closestBuilding = buildings[i];
			shortestDistance = distance;
		}
	}
			
	return closestBuilding;
	
}

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

app.post("/navigate", function(req, res) {
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

				res.end(JSON.stringify([b1,b2]));
			}
		});
	}
	else {
		res.end();
	}
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
