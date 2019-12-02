let vertecies = ["A", "B", "C", "D", "E"]

let routes = [
    ["A", "B", 6], ["A", "D", 1],
    ["D", "A", 1], ["D", "B", 2], ["D", "E", 1],
    ["B", "A", 6], ["B", "D", 2], ["B", "E", 2],
    ["B", "C", 5],
    ["E", "D", 1], ["E", "B", 2], ["E", "C", 5],
    ["C", "B", 5], ["C", "E", 5],

];

class Dijkstra {
    constructor(vertecies, routes) {
        this.routingTable = [];
        this.vertecies = vertecies
        this.routes = routes;
        /*
            vertex: "A",
            shortestDis: 0,
            previousVertex: NAN,
        */
    }
    
    createTable() {
        // create baseTable from vertex array
        // firsIndex is from where we started and we set it to 0
        this.routingTable.push([this.vertecies[0], 0, null]);
        for (let i = 1; i < this.vertecies.length; i++) {
            this.routingTable.push([this.vertecies[i], Infinity, null]);
        } 
    }

    routing() {
        let calcTmp = 0;
        let currentVertex = this.vertecies[0];
        let previousVertex = "NAN"
        let nVertecies;
        let visited = [];
        while (this.vertecies.length > 0) {
            // find unvisited neighbors based on current vertex
            nVertecies = this.unvisitedNeighbors(currentVertex, visited);
            if (nVertecies.length === 0) { visited.push(currentVertex); break;}
            // calculate neighbors from current vertex
            for (let i = 0; i < this.routingTable.length; i++) {
                for (let j = 0; j < nVertecies.length; j++) {
                    if (this.routingTable[i][0] === nVertecies[j][1]) {
                        // current Vertex value + nVertecies value
                        calcTmp = nVertecies[j][2] + this.findVertexValue(currentVertex);
                        if (this.routingTable[i][1] > calcTmp) {
                            this.routingTable[i][1] = calcTmp;
                            // add previous vertex to current vertex
                            this.routingTable[i][2] = currentVertex;
                        }
                        nVertecies.shift();
                    }
                }
            }
            // get previous vertex
            previousVertex = currentVertex;
            // remove current Vertex
            visited.push(currentVertex);
            this.vertecies.shift();
            // add minimum Vertex to index 0 of vertecies
            let vertexIndex = this.getMinimumVertexValues();
            // update current Vertex to new one
            currentVertex = this.getVertexIdByValue(vertexIndex, currentVertex);
            this.vertecies.splice(this.vertecies.indexOf(currentVertex), 1);
            this.vertecies.unshift(currentVertex);
        }
    }

    /**
     * 
     * @param {String} from start position 
     * @param {String} to end position 
     */
    find(from, to) {
        from = from.toUpperCase();
        to = to.toUpperCase();

        let to_;
        let from_;
        let path = [];
        for (let i = 0; from_ !== from ; i++) {
            // find to element position
            if (this.routingTable[i][0] === to) {
                to_ = this.routingTable[i][0];
                from_ = this.routingTable[i][2];

                // update to and save the current route
                path.push(to_);
                to = from_;
                // reset the loop
                i = -1;
            }
        }
        // push last element to path
        path.push(from_);
        return path.reverse();
    }

    get dijkstraTable() {
        return this.routingTable;
    }

    unvisitedNeighbors(vertex,  visited) {
        let nVertecies = [];
        // check if any routes start with vertex
        for (let i = 0; i < this.routes.length; i++) {
            // check if the route is in vertecies then add it to nVertecies
            if (this.routes[i][0] === vertex && (!visited.includes(this.routes[i][1]))) {
                nVertecies.push(this.routes[i]);
            }
        }
        return nVertecies;
    }

    findVertexValue(vertex) {
        let value = 0;
        for (let i = 0; i < this.routingTable.length; i++) {
            if (vertex === this.routingTable[i][0]) {
                value = this.routingTable[i][1];
            }
        }
        return value
    }

    getMinimumVertexValues() {
        let verteciesValues = []
        for (let i = 0; i < this.routingTable.length; i++) {
            if (this.routingTable[i][1] !== Infinity && (this.vertecies.indexOf(this.routingTable[i][0]) != -1))  {
                verteciesValues.push(this.routingTable[i][1]);
            }
        }
        return Math.min(...verteciesValues);
    }

    getVertexIdByValue(index, currentVertex) {
        let vertexChar
        for (let i = 0; i < this.routingTable.length; i++) {
            if (this.routingTable[i][1] === index && this.vertecies.includes(this.routingTable[i][0])) {
                vertexChar = this.routingTable[i][0];
            }
        }
        return vertexChar;
    }
}



let d = new Dijkstra(vertecies, routes);
d.createTable();
d.routing();

console.log("=============== routing table ===============");
console.log(d.dijkstraTable);

console.log("=============== BEST PATH FROM A -> C  ===============");
console.log(d.find("A", "C"))

// change value if you want

