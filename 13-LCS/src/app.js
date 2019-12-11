let message1 = "abcdaf";
let message2 = "acbcf";


class LCS {
    constructor(message1, message2) {
        this.rowMessage = message1.toUpperCase().split("");
        this.colMessage = message2.toUpperCase().split("");

        this.matrix = [];
    }

    find() {

        let matrixValue = 0;
        for (let i = 0; i < this.colMessage.length; i++) {
            let tmpArr = [];
            for (let j = 0; j < this.rowMessage.length; j++) {
                if (this.colMessage[i] === this.rowMessage[j]) {
                    // change matrix value based on matrix[i - 1][j - 1]
                    matrixValue = this.nextMatrixValue(this.matrix, i, j);
                    tmpArr.push(matrixValue);
                }
                else {
                    // get max of matrix[col][row + 1]
                    if (tmpArr.length >= 1 && i > 0) {
                        let tmpMaxValue = this.getMaxValue(this.matrix, i, j, tmpArr[j - 1]);
                        if (tmpMaxValue != undefined) { matrixValue = tmpMaxValue };
                    }
                    tmpArr.push(matrixValue);
                }
            }
            this.matrix.push(tmpArr);
            matrixValue = 1;
        }
    }

    getLcs() {
        let lcsString = [];
        let currentValue = this.matrix[this.matrix.length - 1][this.matrix.length];
        let biggestSub = currentValue;
        let previousValues = [];
        let tmpValue = 0;

        let j = ( this.matrix.length - 1 ) + 1;
        for (let i = this.matrix.length - 1; i >= 0; i--) {
            while(j >= 0) {
                for (let k = i, l = j; previousValues.length != 2; k-- , l++) {
                    if(l === 0) {
                        tmpValue = 0;   
                        // break the loop and k--
                    }
                    else {
                        try {
                            tmpValue = this.matrix[k][l - 1];
                        }
                        catch(e) {
                            tmpValue = 0;
                        }
                    }
                    previousValues.push(tmpValue);
                }

                if (previousValues[0] === previousValues[1]) {
                    lcsString.push(this.colMessage[i]);
                    try {
                        currentValue = this.matrix[i - 1][j - 1];
                    }
                    catch(e) {
                        currentValue = 0;
                    }
                    j--;
                    break;
                }
                else if (previousValues[0] > previousValues[1]) {
                    currentValue = this.matrix[i][j - 1];
                }
                else if(previousValues[0] < previousValues[1]) {
                    currentValue = this.matrix[i - 1][j];
                    break;
                }


                previousValues = [];
                j--;
            }
            previousValues = [];
        }
        return {
            lcsString,
            biggestSub
        }
    }

    display() {
        let lcsString = this.getLcs();
        console.log("===================== Longest Common Subsequence =====================")
        console.log(lcsString.lcsString.reverse());

        console.log("===================== BIGGEST SUB STRING =====================")
        console.log(lcsString.biggestSub)
    }

    nextMatrixValue(matrix, currentRow, currentCol) {
        let matrixValue = 0;
        try {
            matrixValue = matrix[currentRow - 1][currentCol - 1];
            matrixValue++;
        }
        catch (e) {
            // overflow - out of range
            matrixValue = 1;
        }
        return matrixValue;
    }

    getMaxValue(matrix, currentRow, currentCol, currentValue) {
        if (matrix.length != 0) {
            try {
                let rowNumber = matrix[currentRow - 1][currentCol];
                return Math.max(rowNumber, currentValue);
            }
            catch (e) { }
        }
        else {
            return;
        }
    }
}


let lcs = new LCS(message1, message2);

lcs.find();
lcs.display();