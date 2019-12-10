//graph routes

let paths = [
    ["A", "B", 9], ["A", "C", 7], ["A", "D", 3], ["A", "E", 2],
    ["B", "F", 4], ["B", "G", 2], ["B", "H", 1],
    ["C", "F", 2], ["C", "G", 7],
    ["D", "H", 11],
    ["E", "H", 8], ["E", "G", 11],
    ["F", "I", 6], ["F", "J", 5],
    ["G", "I", 4], ["G", "J", 3],
    ["H", "J", 5], ["H", "K", 6],
    ["I", "M", 4], ["J", "M", 2], ["K", "M", 5],
    ["M", "M", 0],
]

class MultiStageGraph {
    constructor(paths) {
        this.paths = paths;
        this.routeTable = [];
    }

    findPath(from, to) {
        from = from.toUpperCase();
        to = to.toUpperCase();
        if (this.routeTable.length === 0) {
            // create the table
            this.createTable();
        }
        this.routeTable.reverse();
        let resultPath = "";
        let nextPathIndex = 0;
        /*
            while(this.routetable[i][0] != to)
        */
        for (let i = 0; i < this.routeTable.length;) {
            // print current path
            // find next path
            // continue till path != to
            resultPath += `-> ${this.routeTable[i][0]}`;
            nextPathIndex = this.findRouteIndex(this.routeTable[nextPathIndex][1], 0, this.routeTable);
            i = nextPathIndex;

            if(this.routeTable[i][0] === to) {
                resultPath += `-> ${this.routeTable[i][0]}`;
                return resultPath;
            }

        }
    }

    createTable() {
        let graphIDs = [];
        let nextPaths = [];
        for (let i = this.paths.length - 1; i > 0; i--) {
            graphIDs.push(this.paths[i][0]);
        }
        // remove duplicate Values
        graphIDs = [...new Set(graphIDs)];

        for (let i = 0; i < graphIDs.length; i++) {
            // find next path from current id
            nextPaths = this.getRoutesFromCurrentPath(graphIDs[i]);
            if (nextPaths !== "CYCLE") {
                this.routeTable.push(this.minCost(...nextPaths));
            }
            else {
                this.routeTable.push([graphIDs[i], graphIDs[i], 0]);
            }
        }
    }

    minCost(...values) {
        let shortestPath = [];
        let min = Infinity;
        let result = values[0][2]
        if(values[0][0] === "A") {
            let k = 0;
        }

        // check what is the min cost
        // add the min route
        let tmpArr = [];
        let tmpChar;
        let nextIndex = -1;
        for (let j = 0; j < values.length; j++) {
            tmpChar = values[j][1];
            nextIndex = this.findRouteIndex(tmpChar, 0, this.routeTable);
            tmpArr.push(this.routeTable[nextIndex]);
            result += tmpArr[j][2];
            if (result < min) {
                shortestPath = [...values[j]];
                min = result;
                try {
                    result = values[j + 1][2];
                }
                catch(e) {}
            }
        }
        return shortestPath;

    }

    getRoutesFromCurrentPath(pathID) {
        let routes = [];
        let nextPathIndex = 0;
        // find if there is any routes that starting with pathID
        for (let i = 0; i < this.paths.length; i++) {
            if (this.paths[i][0] === pathID) {
                routes.push(this.paths[i]);
                nextPathIndex = this.findRouteIndex(this.paths[i][1], i)
                if (nextPathIndex === i) {
                    return "CYCLE"
                }
            }
        }
        return routes
    }

    findRouteIndex(pathID, index = 0, paths = this.paths) {
        let indexValue = -1;
        for (let i = index; i < paths.length; i++) {
            if (paths[i][0] === pathID) {
                indexValue = i;
                break;
            }
        }
        return indexValue;
    }
}

const _ = new MultiStageGraph(paths);

console.log("best path from A -> M :");

console.log(_.findPath("A", "M"));