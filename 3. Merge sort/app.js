// example
/* input(1) : [4, 5, 9, 10, 0, 2]
*  output : [0, 2, 4, 5, 9, 10]
*/

// init
let input = [4, 5, 9, 10, 0, 2]


//functions 
/**
 * 
 * @param {Array} array
 * @returns {Array} will return a sorted array 
 */
function mergeSort(array) {
    // we need the middle index for
    let indexMid = Math.floor(array.length / 2);
    // now we have to divide arrays into 2 chunks with index
    let left = array.slice(0, indexMid);
    let right = array.slice(indexMid);

    // combine left and right and return the sortet array
    return merger(mergeSort(left), mergeSort(right));
}

function merger(left, right) {
    // we need a result array for return
    let resultArray = [];
    // we need i and j for iterate between left and right and compare them with each other
    let i = 0;
    let j = 0;

    // compare left and right side
    while (i <= left.length && j <= right.length) {
        // check if left < right  
        if (left[i] < right[j]) {
            resultArray.push(left[i]);
            i++;
        }
        else {
            resultArray.push(right[j]);
            j++;
        }
    }

    // we have results in left and right array
    // we have to join them in one array
    return resultArray.concat(left.slice(i)).concat(right.slice(j));
}