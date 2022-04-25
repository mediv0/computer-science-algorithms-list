const merger = (left, right) => {
    const result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    return [...result, ...left, ...right];
};

const mergeSort = (arr) => {
    if (arr.length < 2) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merger(mergeSort(left), mergeSort(right));
};

const array = [4, 8, 7, 2, 11, 1, 3];
console.log(mergeSort(array));

console.log(array);
