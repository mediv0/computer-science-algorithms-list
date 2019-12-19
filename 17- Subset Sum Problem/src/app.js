function hasSubsetSum(sum, values) {
    let subsetMatrix = [];
    let subsetMatrixTemp = [];

    let sumArray = [...Array(sum + 1).keys()]


    for(let i = 0; i < values.length; i++) {
        for(let j = 0; j <= sum; j++) {
            // create first row
            if(i === 0) {
                if (j === 0) {
                    subsetMatrixTemp.push(true);
                }
                // check if current i - current j = 0;
                else if(values[i] - sumArray[j] === 0) {
                    subsetMatrixTemp.push(true);
                }
                else {
                    subsetMatrixTemp.push(false);
                }
            }
            else if(j === 0) {
                subsetMatrixTemp.push(true);
            }
            else if(values[i] > sumArray[j]) {
                // get the value from top
                subsetMatrixTemp.push(subsetMatrix[i - 1][j]);
            }
            else if (values[i] <= sumArray[j]) {
                // get the value from [i - 1][j - sumArray[j]];
                if(subsetMatrix[i-1][j] !== true) {
                    subsetMatrixTemp.push(subsetMatrix[i - 1][j - values[i]]);
                }
                else {
                    subsetMatrixTemp.push(true);
                }
            }
        }
        subsetMatrix.push(subsetMatrixTemp);
        subsetMatrixTemp = [];
    }
    // return matrix[last i][last j]
    let row = subsetMatrix.length - 1;
    let col = sumArray.length - 1;
    return subsetMatrix[row][col];
}

let hasSS = hasSubsetSum(11, [2, 3, 7, 8, 10]);
console.log("========================== has subset sum? ==========================");
console.log(hasSS);
