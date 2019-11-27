// prim graph



// routes
// Assume costs are already calculated.
let unconnected = [
    {
        point: 1, routes: [2, 4, 5],
        links: [{ to: 4, value: 2 }, { to: 2, value: 4 }, { to: 3, value: 5 },]
    },
    {
        point: 2, routes: [2, 4, 1],
        links: [{ to: 1, value: 4 }, { to: 4, value: 1 }, { to: 5, value: 2 },]
    },
    {
        point: 3, routes: [5, 8, 1],
        links: [{ to: 1, value: 5 }, { to: 4, value: 8 }, { to: 7, value: 1 },]
    },
    {
        point: 4, routes: [1, 3, 2, 7, 4, 8],
        links: [{ to: 1, value: 2 }, { to: 3, value: 8 }, { to: 2, value: 1 }, { to: 7, value: 4 }, { to: 6, value: 7 }, { to: 5, value: 3 }, ]
    },
    {
        point: 5, routes: [2, 10, 3],
        links: [{ to: 2, value: 2 }, { to: 4, value: 3 }, { to: 6, value: 10 },]
    },
    {
        point: 6, routes: [10, 7, 6],
        links: [{ to: 5, value: 10 }, { to: 4, value: 7 },{ to: 7, value: 6 },]
    },
    {
        point: 7, routes: [1, 4, 6],
        links: [{ to: 3, value: 1 }, { to: 4, value: 4 }, { to: 6, value: 6 },]
    },
]

let result = prim(unconnected);
console.log("======================================================================");
console.log(`best path is: ${result}`);
console.log("======================================================================");

/**
 * @param {Array} routes list of routes and points
 * @returns {String} will return the path
 * @example 
 * return { 1 -> 2 -> 6 -> 3 -> 4 -> 5 }
 */
function prim(routesList) {
    let routes = [...routesList];
    let routesLength = routes.length;
    let connected = [];
    let minRoute = 0;
    let nextPath;
    let hasCycle = false;
    let checkCyclePath;

    // add first route to connect
    connected.push(routes[0]);

    let i = 0;
    do {
        // get min path from connected routes
        minRoute = getMinimumPath(connected);
        // check if there is a cycle in routes
        checkCyclePath = shortestPath(connected[connected.length - 1], minRoute, connected);
        // check if cycle is in connected routes
        while (connected.includes(checkCyclePath)) {
            // there is a cycle
            // remove the current minRoute from last connected route
            connected[connected.length - 1].routes.splice(connected[connected.length - 1].routes.indexOf(minRoute), 1);
            checkCyclePath.routes.splice(checkCyclePath.routes.indexOf(minRoute), 1);
            // calculate the new min
            minRoute = getMinimumPath(connected);
            checkCyclePath.routes.splice(checkCyclePath.routes.indexOf(minRoute), 1);
            // change the route
            hasCycle = true;
            checkCyclePath = shortestPath(checkCyclePath, minRoute, connected);

        }
        if (hasCycle) {
            nextPath = checkCyclePath
            hasCycle = false;
        }
        else {
            // remove the minRoute element from current routes list
            connected[connected.length - 1].routes.splice(connected[connected.length - 1].routes.indexOf(minRoute), 1);
            // we have to find next point with minRoute in it
            nextPath = shortestPath(connected[connected.length - 1], minRoute, connected);
        }
        if (nextPath != undefined) {
            nextPath.routes.splice(nextPath.routes.indexOf(minRoute), 1)
            // add the current element(based on index of the point) to connected array and remove it from routes
            connected.push(nextPath);
            routes.shift();
            // remove the nextPath from route list
            routes.splice(routes.map(e => { return e.point }).indexOf(nextPath.point), 1);
            routes.unshift(nextPath);
        }
    } while (connected.length < routesLength);
    return display(connected);
}


function shortestPath(connectedRoute,minRoute, connectedList) {
    let nextPathValue = connectedRoute.links.find(link => { return minRoute === link.value });
    if (nextPathValue == undefined) {
        connectedRoute = connectedList.find(list => list.links.find(link => { return minRoute === link.value }));
        nextPathValue = connectedRoute.links.find(link => { return minRoute === link.value });
        let i = 0;
    }
    return unconnected.find(route => route.point === nextPathValue.to);
}

function display(points) {
    let result = "";
    for (let i = 0; i < points.length; i++) {
        result += `->   ${points[i].point}   `;
    }
    return result;
}

function getMinimumPath(connected) {
    let minRoute = Infinity;
    let tmpMin = 0
    for (let k = 0; k < connected.length; k++) {
        tmpMin = Math.min(...connected[k].routes)
        if (tmpMin < minRoute) {
            minRoute = tmpMin
        }
    }
    return minRoute;
}