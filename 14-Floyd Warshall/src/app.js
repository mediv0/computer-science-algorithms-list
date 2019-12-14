

let paths = [
    ["A", "B", 7], ["A", "C", 3],
    ["B", "A", 2],
    ["C", "A", 8], ["C", "D", 2],
    ["D", "B", 1], ["D", "A", 5]
];

class FW {
    constructor(paths) {
        this.paths = paths;
        // get route's Char from paths
        this.vertecies = [...this.getPathsChar(this.paths)];
    }

    createBasePathTable() {
        let baseTable = [];
        let tmpTable = [];
        for (let i = 0; i < this.vertecies.length; i++) {
            for (let j = 0; j < this.vertecies.length; j++) {
                if (this.vertecies[i] === this.vertecies[j]) {
                    tmpTable.push(0);
                }
                else {
                    // find value from i to j;
                    tmpTable.push(this.getCurrentPath(this.vertecies[i], this.vertecies[j])[2] || Infinity);

                }
            }
            baseTable.push(tmpTable);
            tmpTable = [];
        }
        return baseTable;
    }

    getAllPathsTable(baseTable) {
        let perviousTable = [...baseTable];
        let pathsTable = [];
        let tmpTable_1dArray = [];
        let tmpTable_2dArray = [];

        for(let k = 0; k < this.vertecies.length; k++) {
            for (let i = 0; i < this.vertecies.length; i++) {
                for (let j = 0; j < this.vertecies.length; j++) {
                    // if k === i and j - copy from previous table
                    if (k === i || k === j) {
                        tmpTable_1dArray.push(perviousTable[i][j]);
                    }
                    else if(this.vertecies[i] === this.vertecies[j]) {
                        tmpTable_1dArray.push(0);
                    }
                    else {
                        // calculate new paths
                        let indirectPathsResult = 0;
                        let indirectPaths = this.getIndirectPaths(this.vertecies[i], this.vertecies[j]);
                        if(indirectPaths != undefined) {
                            for (let v = 0; v < indirectPaths.length; v++) {
                                indirectPathsResult += indirectPaths[v][2];
                            }
                        }
                        else {
                            indirectPathsResult = Infinity;
                        }
                        tmpTable_1dArray.push(Math.min(perviousTable[i][j], indirectPathsResult));
                    }
                }
                tmpTable_2dArray.push(tmpTable_1dArray);
                tmpTable_1dArray = [];
            }
            perviousTable = [...tmpTable_2dArray];
            pathsTable.push(tmpTable_2dArray);
            tmpTable_2dArray = [];
        }
        return pathsTable;
    }

    getPathsChar(pathsList) {
        let pathChars = [];
        for(let i = 0 ; i < this.paths.length; i++) {
            pathChars.push(pathsList[i][0]);
        }

        return new Set(pathChars);
    }

    getCurrentPath(from, to) {
        for(let i = 0 ; i < this.paths.length; i++) {
            if (this.paths[i][0] === from && this.paths[i][1] === to) {
                return this.paths[i];
            }
        }
        return Infinity;
    }

    getAllPaths(from) {
        let paths = [];
        for (let i = 0; i < this.paths.length; i++) {
            if (this.paths[i][0] === from) {
                paths.push(this.paths[i]);
            }
        }
        return paths;
    }

    getIndirectPaths(from, to) {
        let indirectPaths = this.getAllPaths(from);
        let innerPathList
        let pathList;
        let j = 0;
        for(let i = 0 ; i < indirectPaths.length; i++) {
            innerPathList = this.getAllPaths(indirectPaths[i][1]);
            for (j ;j < innerPathList.length; j++) {
                if (innerPathList[j][1] == to) {
                    // add current paths
                    pathList = [innerPathList[j], indirectPaths[i]];
                    j++;
                    break;
                }
            }
        }
        return pathList;
    }

    display(paths) {
        for(let i = 0; i < this.vertecies.length; i++) {
            console.log(`TABLE ${this.vertecies[i]} :`);
            console.log(paths[i]);
        }
    }
}


let fw = new FW(paths);
let baseTable = fw.createBasePathTable();
let allPaths = fw.getAllPathsTable(baseTable);
fw.display(allPaths);