
// Checks if an array contains a value x
function contains(array, x) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === x) {
            return true;
        }
    }
    return false;
}

// Checks if a point is equal to another point (same x and y coordinates)
var Point = { equals : function(p1, p2) {
    return ((p1.x == p2.x) && (p1.y == p2.y)) }}

// Making new points (could make a point class constructor if needed), visited is for the path search algorithm (making sure they are initialized to false)
var p1 = { x : 0, y : 0, adjacentPoints : new Array(), visited : false, label : "P1" };
var p2 = { x : 7, y : 7, adjacentPoints : new Array(), visited : false, label : "P2" };
var p3 = { x : 5, y : 5, adjacentPoints : new Array(), visited : false, label : "P3" };
var p4 = { x : 3, y : 9, adjacentPoints : new Array(), visited : false, label : "P4" };
var p5 = { x : 15, y : 3, adjacentPoints : new Array(), visited : false, label : "P5" };

// The points list with an add function (cascading enabled)
var pointList = { 
  points : new Array(),
  addPoint : function(p){
    this.points[this.points.length] = p;
    return this;
  } 
}

pointList.addPoint(p1).addPoint(p2).addPoint(p3).addPoint(p4);

// Adds to both the adjacent points lists of the two points
function makeAdjacentPoints(p1, p2){
  if (contains(p1.adjacentPoints, p2)) { return; }
  p1.adjacentPoints[p1.adjacentPoints.length] = p2;
  p2.adjacentPoints[p2.adjacentPoints.length] = p1;
}

// Finds the distance between two points
function distance(p1, p2){
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

// Clones a path object (needed for recursion)
function clone(pathTracker){
  var temp = {};
  temp.points = new Array();
  temp.distance = pathTracker.distance;
  for (var i = 0; i < pathTracker.points.length; i++){
    temp.points[i] = pathTracker.points[i];
  }
  return temp;
}

// Finds all the paths between p1 and p2. Returns an empty object with distance of 0 if there does not exist a path
function findPath(p1, p2){
  var allPaths = new Array(); // Keeps track of all the paths
  
  function helper(pathTracker, currP, dest, dist){              // The recursive calling function
    if (currP.visited){ return; }                               // If the point has been visited before, don't do anything
    pathTracker.points[pathTracker.points.length] = currP;      // Otherwise add the point to the path
    pathTracker.distance += dist;                               // And add the distance travelled to get to the point

    if (Point.equals(currP, dest)) {                            // If we have reached the destination
      allPaths[allPaths.length] = pathTracker;                  // Add the path to the path array and return
      return; 
    }

    currP.visited = true;                                       
    for (var i = 0; i < currP.adjacentPoints.length; i++){          // Calls the path finding algorithm on each adjacent point
                                                                    // Clone of the path is to prevent passing by reference (will change if too slow
      helper(clone(pathTracker), currP.adjacentPoints[i], dest, distance(currP, currP.adjacentPoints[i]));
    }
    currP.visited = false;                        // After all it's points have been recursed on, reinitialize the visited value to false
  } 

  helper({ points : new Array(), distance : 0 }, p1, p2, 0);           // Calls the recursive function initally
  
  allPaths.print = function(){                                        // Adds a print function to the list of paths being returned
    for (var i = 0; i < allPaths.length; i++){
      console.log("Path:", i+1);
      console.log("Distance: ", allPaths[i].distance);
      console.log("Path taken: ");

      for (var j = 0; j < allPaths[i].points.length; j++){
        console.log("Point ", allPaths[i].points[j].label, " to");
      }
      console.log(); console.log();
    }
  }
  return allPaths;                                                         // Returns the list of paths
}

makeAdjacentPoints(p1, p2);                                // Links the points
makeAdjacentPoints(p2, p4);
makeAdjacentPoints(p4, p3);
makeAdjacentPoints(p1, p5);
makeAdjacentPoints(p5, p3);
makeAdjacentPoints(p5, p4);

var paths = findPath(p1, p3);                                // Finds every path and prints them out
paths.print();


