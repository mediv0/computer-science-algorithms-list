let nodes = [
    [0, 9], [0, 7], [0, 11],
    [9, 0], [9, 10], [9, 8],
    [7, 0], [7, 11], [7, 6], [7, 3],
    [11, 7], [11, 0],
    [10, 1], [10, 9],
    [8, 1], [8, 12], [8, 9],
    [6, 5], [6, 7],
    [3, 2], [3, 4], [3, 7],
    [1, 10], [1, 8],
    [12, 8], [12, 2],
    [5, 6],
    [2, 12], [2, 3],
    [4 , 3]
]


class BFS {
    constructor(nodes) {
        this.rawNodes = nodes;
        this.queue = new Set();
    }

    get nodesCount() {
        let uniques = [];
        uniques.push(this.rawNodes[0]);
        for(let i = 1 ; i < this.rawNodes.length; i++) {
            if(this.rawNodes[i][0] !== uniques[uniques.length - 1][0]) {
                uniques.push(this.rawNodes[i]);
            }
        }
        return uniques.length;
    }

    getNeighborNodes(currentVertex) {
        let neighborNodes = [];
        for(let i = 0; i < this.rawNodes.length; i++) {
            if(this.rawNodes[i][0] === currentVertex) {
                neighborNodes.push(this.rawNodes[i]);
            }
        }
        return neighborNodes;
    }

    removeVisitedNeighbors(paths, neighborNodesList) {
        if(paths.length) {
            for(let i = 0 ; i < neighborNodesList.length; i++) {
                for(let j = 0 ; j < paths.length; j++) {
                    if (neighborNodesList[i][1] === paths[j]) {
                        // remove visited vertex
                        neighborNodesList.splice(i, 1);
                        i--;
                        break;
                    }
                }
            }
        }
    }

    queueAdd(value) {
        this.queue.add(value);
    }

    queueRemove() {
        // get first value
        let first = this.queue.values().next();
        this.queue.delete(first.value);
    }

    get currentQueueVertex() {
        return this.queue.values().next().value;
    }

    search() {
        let paths = [];
        // get length of graph
        let graphLength = this.nodesCount - 1;
        let neighbors = [];
        let currentVertex = this.rawNodes[0][0];
        this.queueAdd(this.rawNodes[0][0]);

        for(let i = 0 ; i < graphLength; i++) {
            // get neighbors of current vertex
            neighbors = this.getNeighborNodes(currentVertex);
            // check if there is any visited neighbors in the list
            this.removeVisitedNeighbors(paths, neighbors);
            // add current vertex and neighbors to the queue
            for(let j = 0 ; j < neighbors.length; j++) {
                this.queueAdd(neighbors[j][1]);
            }
            // add current vertex to the path list and remove it from the vertex
            paths.push(currentVertex);
            this.queueRemove();
            // get current vertex from queue
            currentVertex = this.currentQueueVertex;
        }
        return paths;
    }


}


let bfs = new BFS(nodes);
let paths = bfs.search();
console.log("==================== VISITED PATHS  =====================");
console.log(paths);
console.log("=========================================================");