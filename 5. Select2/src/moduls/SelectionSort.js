export default class SelectionSort {

    divide(activeArray) {
        let arrays = {};
        let dividerIndex = Math.floor(activeArray.length / 5);

        // loop init
        let i = 0;
        let j = 0;
        while (i < activeArray.length) {
            arrays[j] = activeArray.slice(i, i + 5);
            j++;
            i += 5;
            if (j === dividerIndex) {
                break;
            }
        }
        return arrays;
    }

    findMidArrayIndex(arrayObj) {
        // get length of arrayObj
        let arrayObjLength = Object.keys(arrayObj).length;
        let index = 0;
        let dividedMids = [];
        for (let i = 0; i < arrayObjLength; i++) {
            dividedMids.push(this.findMid(this.bubbleSort(arrayObj[i]), 0, arrayObj[i].length - 1));
        }
        index = this.findMid(this.bubbleSort(dividedMids), 0, dividedMids.length - 1);
        return {
            midArray: dividedMids,
            midIndex: index
        }
    }

    /**
     * 
     * @param {Array} array 
     * @param {Number} l first index of the array. default is 0 
     * @param {Number} h last index of the array => arr.length - 1
     * @returns {Number} will return value of mid index in the passed array 
     */
    findMid(array, l = 0, h) {
        let mid = parseInt((l + h) / 2, 10);
        return array[mid];
    }

    // bubble sort for numbers
    /**
     * 
     * @param {Array} array unsorted array
     */
    bubbleSort(array) {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < (array.length - i - 1); j++) {
                if (array[j] > array[j + 1]) {
                    // change positions
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        return array;
    }

    /**
     * 
     * @param {Number} midIndex mid index of divided arrays 
     * @param {Array} array base unsorted array for compare
     * @returns {Object} will return a object with 3 array in it --> lowArray - highArray
     */
    compareWithMid(midIndex, array) {
        let comparedArratObj = {
            lowArray: [],
            highArray: [],
            midArray: []
        }
        for (let i = 0; i < array.length; i++) {
            if (array[i] < midIndex) {
                comparedArratObj.lowArray.push(array[i]);
            }
            else if (array[i] > midIndex) {
                comparedArratObj.highArray.push(array[i]);
            }

            else if (array[i] === midIndex) {
                comparedArratObj.midArray.push(array[i]);
            }
        }

        return comparedArratObj;
    }

    /**
     * 
     * @param {Number} key user input for index
     * @returns will return index of the array which is >= key 
     */
    compareWithKey(key, comparedArray) {
        // 0 == lowArray
        if (key < comparedArray["lowArray"].length) {
            return {
                arr: comparedArray["lowArray"],
                key: key
            }
        }
        else if (key < comparedArray["highArray"].length) {
            return {
                arr: comparedArray["highArray"],
                key: key
            }
        }
        else {
            // we will return a new key
            let result = comparedArray["lowArray"].length + comparedArray["midArray"].length
            key = Math.abs((key - result));
            return {
                arr: comparedArray["highArray"],
                key: key
            }
        }
    }
}