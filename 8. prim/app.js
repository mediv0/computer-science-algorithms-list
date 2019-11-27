// prim graph



// routes
// Assume costs are already calculated.
let unconnected = [
    { point: 1, routes: [30, 10, 45] },
    { point: 2, routes: [50, 40, 25, 10] },
    { point: 4, routes: [30, 20] },
    { point: 5, routes: [35, 40, 55, 45] },
    { point: 6, routes: [20, 15, 25, 55] },
    { point: 3, routes: [35, 15, 50] },
]


let result = prim(unconnected);
console.log("============================================");
console.log(`best path is: ${result}`);
console.log("============================================");

/**
 * @param {Array} routes list of routes and points
 * @returns {String} will return the path
 * @example 
 * return { 1 -> 2 -> 6 -> 3 -> 4 -> 5 }
 */
function prim(routes) {
    let routesLength = routes.length;
    let connected = [];
    let minRoute = 0;
    let nextPath;
    let isFirstRun = true;

    let i = 0;
    do {
        // find the shortest path to the next point in current 
        if (isFirstRun) {
            isFirstRun = false;
            minRoute = Math.min(...routes[i].routes);
        }
        else {
            minRoute = Math.min(...routes[i].routes, ...connected[connected.length - 1].routes);
            // search if minRoute is in current routes list
            let isFoundMinInRoutes = false;
            for (let j = 0; j < routes.length; j++) {
                try {
                    isFoundMinInRoutes = routes[j + 1].routes.includes(minRoute);
                }
                catch (e) {
                    //catch the overflow
                    isFoundMinInRoutes = routes[j].routes.includes(minRoute);
                }
                if (isFoundMinInRoutes) {
                    break;
                }
            }
            if (!isFoundMinInRoutes) {
                routes[i].routes.splice(routes[i].routes.indexOf(minRoute), 1);
                minRoute = Math.min(...routes[i].routes, ...connected[connected.length - 1].routes);
            }
        }
        // remove the minRoute element from current routes list
        routes[i].routes.splice(/* find index of minRoute in current route list */ routes[i].routes.indexOf(minRoute), 1);
        // we have to find next point with minRoute in it
        nextPath = shortestPath(minRoute, routes);
        if (nextPath != undefined) {
            nextPath.routes.splice(nextPath.routes.indexOf(minRoute), 1)
            // add the current element(based on index of the point) to connected array and remove it from routes
            connected.push(routes[i]);
            routes.shift();
            // remove the nextPath from route list
            routes.splice(routes.map(e => { return e.point }).indexOf(nextPath.point), 1);
            routes.unshift(nextPath);
        }
        else {
            // we found all points
            // display points
            connected.push(routes[i]);
            return display(connected);
            
        }
    } while (connected.length < routesLength);
    return "Something is wrong";
}


function shortestPath(minRoute, routesList) {
    return routesList.find(route => route.routes.find(number => { return number === minRoute }));
}

function display(points) {
    let result = "";
    for (let i = 0; i < points.length; i++) {
        result += `--> ${points[i].point} `;
    }
    return result;
}
