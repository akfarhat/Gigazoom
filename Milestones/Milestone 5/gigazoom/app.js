
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
  , User;

//connect to the "users" database
mongoose.connect('mongodb://localhost/users');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

//once the DB connection is open...
db.once('open', function callback () {
	//Create a mongoose Schema (document structure)
  var userSchema = mongoose.Schema({
		email: String,
		password: String
	});
	
	//Convert this schema into an instantiable "model" Class 
	User = mongoose.model("User", userSchema);
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

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
