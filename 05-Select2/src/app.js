// import
import SelectionSort from "./moduls/SelectionSort.js.js";



// start
start();
function start() {
    let inputArray = [1, 5, 9, 6, 4, 19, 18, 7, 2, 23, 41, 17, 3, 11, 12, 4, 17, 11, 20, 29];
    let index = 10;
    let key = index;
    let activeArray = inputArray;

    console.log("INPUT VALUE: " + activeArray)
    let selectionSort = new SelectionSort();

    let i = 0;
    do {
        /// inside a loop
        console.log("STEP: " + i);
        i++;

        console.log("===============================================================")
        console.log("ACTIVE ARRAY: " + activeArray)
        console.log("NEW KEY : " + key)

        let dividedArray = selectionSort.divide(activeArray);

        let middles = selectionSort.findMidArrayIndex(dividedArray);

        console.log("===============================================================")
        console.log("MID ARRAY: " + middles.midArray);
        console.log("MID INDEX IS: " + middles.midIndex);

        let compareWithMid = selectionSort.compareWithMid(middles.midIndex, activeArray)

        console.log("===============================================================")
        console.log("ARRAYS LOWER THAN MID: " + compareWithMid.lowArray);
        console.log("ARRAYS EQUAL TO MID: " + compareWithMid.midArray);
        console.log("ARRAYS GREATER THAN MID: " + compareWithMid.highArray);

        let compareWithKey = selectionSort.compareWithKey(key, compareWithMid);
        activeArray = compareWithKey.arr;
        key = compareWithKey.key

        console.log("===============================================================")
        console.log("NEW ACTIVE ARRAY: " + activeArray)
        console.log("NEW KEY : " + key)

        console.log()

        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    //end of loop
    } while (activeArray.length >= 5)
    
    console.log(`INDEX ${index} value is ${activeArray[key - 1]} `);
};