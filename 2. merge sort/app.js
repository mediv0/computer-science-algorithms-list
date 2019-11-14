function mergeSort(array, half = array.length / 2) {

    if (array.length < 2) {
        return array  // it means we no longer divide the array
        // into smaller chunks
    }

    const left = array.splice(0, half); //left part of  the array

    return merger(mergeSort(left), mergeSort(array))
}

function merger(left, right) {
    const arr = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            arr.push(left.shift()) // remove from the left part and push into
            //the sorted array
        } else {
            arr.push(right.shift()) // remove from the right part and push into
            //the sorted array
        }
    }
    return [...arr, ...left, ...right];
}

console.log(mergeSort([10, 5, 3, 8, 2, 6, 4, 1, 7, 9]));
