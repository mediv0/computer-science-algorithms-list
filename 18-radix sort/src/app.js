function radixSort(...values) {
    let numbersList = new Map();
    let numberLength = (Math.max(...values)).toString().length;
    let numberMaxPlace = Math.pow(10, numberLength);
    let sortedArray = [];

    for(let i = 1 ; i < numberMaxPlace; i *= 10) {
        for(let j = 0 ; j < values.length; j++) {
            numbersList.set(values[j], Math.floor(values[j]/i % 10));
        }
        // sort the list
        sortedArray = [...numbersList.entries()].sort((a, b) => a[1] - b[1])
        numbersList = new Map(sortedArray);
    }
    
    return sortedArray;
    
}


console.log("======================== SORTED LIST ========================");
radixSort(170, 45, 75, 90, 802, 24, 2, 1, 99, 66).forEach(val => {
    console.log(val[0]);
});