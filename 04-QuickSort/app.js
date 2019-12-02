// example
/* input(1) : [4, 5, 9, 10, 0, 2]
*  output : [0, 2, 4, 5, 9, 10]
*/

//functions 
function quickSort(array, low, high) {
    if (array.length > 1) {
        // partition
        let index = partition(array, low, high)
        // QuickSort for left
        if (low < index - 1) {
            quickSort(array, low, index - 1);
        }
        // QuickSort for right
        if (high > index) {
            quickSort(array, index, high);
        }
    }
    else {
        return array;
    }
    return array;

}

function partition(array, low, high) {
    let pivot = array[low];
    // init i and j for left and righ
    let i = low; // first index
    let j = high // last element of corrent array

    // moving elements
    while (i <= j) {
        while (array[i] < pivot) {
            i++;
        }
        while (array[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(array,i, j)
            i++;
            j--;
        }
    }
    return i; // pivot is in the i now
}

function swap(array, firstIndex, lastIndex) {
    let tempArr = array[firstIndex];
    array[firstIndex] = array[lastIndex];
    array[lastIndex] = tempArr;
}

// init
let input = [4, 5, 9, 10, 0, 2]

// result
console.log(quickSort(input, 0, input.length - 1));
