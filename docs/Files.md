# Files

* app.js  
This is the server javascript file that is run by node.js. It handles incoming requests, accesses the database if necessary, and provides a response. 

* initialize_db.js  
This is a node script used to input the required data into the mongoDB database. It must be run before the app.

* package.json  
Lists the app's dependencies

* public/javascripts/script.js  
This is the client javascript file. It loads and displays the map, handles all user input, sends AJAX requests to the server, and displays the response.

* public/stylesheets/style.css  
The stylesheet for the page.

* public/images/campus-map.png  
Image that is overlayed on the map.

* routes/index.js  
Handles some basic URL routing.

* views/layout.jade  
The page header.

* views/map.jade  
The page's main content.

* node-modules/path-finder/path-finder.js  
This is used by the app.js file to find the path in between two points on the map.
