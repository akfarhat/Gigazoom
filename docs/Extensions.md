# Extensions

When we were first designing the application, we had a lot of ideas about great features that we would like to include. Unfortunately, we underestimated the amount of work that would be required to implement all these features and it took us a while to understand node.js and mongoDB well enough to begin doing the serious work. Here are some of the features that we had planned and some others that could be added to extent the app's functionality:

* Complete path integration:  
We were planning to integrate all the paths on the campus into our application so that we could allow above-ground paths, tunnels, or both. We also wanted to integrate our path finder with the rest of the map so that a user could navigate from any address to a specific building. However, a large portion of our time was spent manually entering data (building names, coordinates, path points, etc.) and we realized that it would virtually impossible to enter all that data within our time constrainsts so we decided to only find paths through tunnels. Also, the mapping software that we chose (leaflet.js) does not have automatic directions functionality (like Google Maps does) but it's much easier to setup and use. 

* Automatic day planner:
Another feature we planned to include was to allow users to register their courses for each day of the week and then have the app automatically generate their path each day. However, due to time constraints, we couldn't implement this.


