# Extensions

When we were first designing the application, we had a lot of ideas about great features that we would like to include. Unfortunately, we underestimated the amount of work that would be required to implement all these features and it took us a while to understand node.js and mongoDB well enough to begin doing the serious work. Here are some of the features that we had planned and some others that could be added to extent the app's functionality:

* Complete path integration:  
We were planning to integrate all the paths on the campus into our application so that we could allow above-ground paths, tunnels, or both. We also wanted to integrate our path finder with the rest of the map so that a user could navigate from any address to a specific building. However, a large portion of our time was spent manually entering data (building names, coordinates, path points, etc.) and we realized that it would virtually impossible to enter all that data within our time constrainsts so we decided to only find paths through tunnels. Also, the mapping software that we chose (leaflet.js) does not have automatic directions functionality (like Google Maps does) but it's much easier to setup and use. 

* Automatic day planner:  
Another feature we planned to include was to allow users to register their courses for each day of the week and then have the app automatically generate their path each day. However, due to time constraints, we couldn't implement this even though it would not have been too difficult, technically. It would require us to store users in our database along with a list of their courses with locations and times. Then, when the user logs in, their information is retrieved and the paths are generated automatically based on the locations of their courses.

* Map edting:  
This feature was not planned before but it seems like it would be useful. Like all maps, ours has a few small bugs that are not easy to find. So it would be nice to allow users to submit fixes for the map and to suggest faster routes, especially when there construction or blocked tunnels. Another thing they can do if post images of the campus which can be displayed in the relevant places (similarly to Google Maps).

* Better directions:  
Our directions functionality is extremely basic. It looks at the order and location of the points in the path and decides whether the path goes north, south, etc. then based on the previous compass directions, it determines whether the user has to turn left, right, etc. This could be extended by including images of the intersections and pointing in the direction that the user should go. This would not be difficult to implement except for requiring a large amount of manual data entry.


