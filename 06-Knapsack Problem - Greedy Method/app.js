
// define our objects 
let objects = [
    { id: 1, profit: 10, weight: 2, cp: 0 },
    { id: 2, profit: 5,  weight: 3, cp: 0 },
    { id: 3, profit: 15, weight: 5, cp: 0 },
    { id: 4, profit: 7,  weight: 7, cp: 0 },
    { id: 5, profit: 6,  weight: 1, cp: 0 },
    { id: 6, profit: 18, weight: 4, cp: 0 },
    { id: 7, profit: 3,  weight: 1, cp: 0 },
]

// 1. we have to calculate the cp for each object
/**
 * 
 * @param {Array} array
 * @returns {Array} 
 */
function realProfit(array) {
    // profit / weight = realProfit
    for (let i = 0; i < array.length; i++) {
        array[i].cp = (array[i].profit / array[i].weight).toFixed(1);
    }
}
// run the function
realProfit(objects);

// compare method and sort it based on cp
function compare(a, b) {
    // reverse sort
    if (a.cp < b.cp) {
        return 1;
    }
    if (a.cp > b.cp) {
        return -1;
    }
    return 0;
}
objects.sort(compare);


// start the Knapsack
knapsack(15, objects);

// Knapsack
/**
 * 
 * @param {Number} bagSize size of our bag
 * @param {Array} array 
 */
 //{id: 0, usedObjects: false}
function knapsack(bagSize, array) {
    let bag = [];

    // init i for array 
    let i = 0;
    while (bagSize > 0) {
        if (bagSize >= array[i].weight) {
            bag.push({
                id: array[i].id,
                isUsed: true,
                value: 1
            });
            // Subtraction bagSize from current wight
            bagSize -= array[i].weight;
        }
        else {
            bag.push({
                id: array[i].id,
                isUsed: true,
                value: (bagSize / array[i].weight).toFixed(1) 
            });
            bagSize = 0;
        }
        i++;
    }

    // show status
    console.log(objects);
    console.log("=============================================");
    // show the total profit and weight
    let totalWeight = showWeight(array, bag);
    console.log(`total weight is: ${totalWeight}`);

    let totalProfit = showProfit(array, bag);
    console.log(`total profit is: ${totalProfit}`);
}

/**
 * 
 * @param {Array} baseArray 
 * @param {Array} inBagArray 
 * @returns will return total of Weight
 */
function showWeight(baseArray, inBagArray) {
    let result = 0;
    for (let i = 0; i < inBagArray.length; i++) {
        result += baseArray[i].weight * inBagArray[i].value;
    }
    return result;
}

/**
 * 
 * @param {Array} baseArray 
 * @param {Array} inBagArray 
 * @returns will return total of Weight
 */
function showProfit(baseArray, inBagArray) {
    let result = 0;
    for (let i = 0; i < inBagArray.length; i++) {
        result += baseArray[i].profit * inBagArray[i].value;
    }
    return result;
}

