
// intial values
let inputArray = [1, 2, 3, 0, 9, 18, 4, 5, 2, 20];
//let inputArray = [12,0,1,2,0,9,1,3,5,9,30,10,12]
//let inputArray = [9,2,3,30,5,4,12]
//let inputArray = [17, 99, 9, 2, 3, 14, 23, 11, 1, 2, -4, 4];



// run the functiin 
let result = findMinMax(inputArray);

// show the results
console.log(`INPUT ARRAY: ${inputArray}`);
console.log(`===================================================`);
console.log(`MIN: ${result.min} and MAX: ${result.max}`);


/**
 * 
 * @param {Array} array
 * @returns will retun min, max numbers in the array
 * @example
 * let array =  [1, 2, 3, 0, 9, 18, 4, 5, 2, 20];
 * 
 * output: {
 *  min: 0,
 *  max: 20 
 * }
 */
function findMinMax(array) {
    let _min = array[0];
    let _max = 0;
    // i = index 0 of array
    // j = last index of array
    let i = 0;
    let j = (array.length - 1);

    while (i < j) {
        if (array[i] > array[j]) {
            if (array[i] > _max) {
                _max = array[i];
            }
            if (array[j] < _min) {
                _min = array[j];
            }
            // Moving i to a higher index
            i++;
        }
        else if (array[i] < array[j]) {
            if (array[j] > _max) {
                _max = array[j];
            }
            if (array[i] < _min) {
                _min = array[i];
            }
            // Moving j to a lower index
            j--;
        }
        // if numbers were equal, we have to move both i and j
        else {
            i++;
            j--;
        }
    }

    return {
        min: _min,
        max: _max
    }
}