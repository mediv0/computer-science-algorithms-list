import { ChartHelper } from "./helpers.js";
import { Pointer } from "./pointer.js";
import { Labels } from "./Labels.js";


export class binarySearch {
    /**
     * @param {Number} low
     * @param {Number} high
     * @param {Array} sortedArray
     * @param {Number} key
     */
    constructor(low, high, sortedArray, key) {
        this.low = low;
        this.high = high;
        this.sortedArray = sortedArray;
        this.key = parseInt(key);
    }

    async search() {
        // objects
        const pointer = new Pointer();
        const chartHelper = new ChartHelper(document.querySelectorAll("#chartItemNumber"));
        let mid = 0;
         
        while (this.low <= this.high) {
            // find the mid index
            mid = parseInt(((this.low + this.high) / 2), 10);
            // set the position of pointer equal to mid position
            pointer.position = chartHelper.getPosition(mid);
            Labels.moveMid(mid);
            await pointer.update();
            if (this.sortedArray[mid] == this.key ) {
                // key is found
                chartHelper.foundedKey(this.key, true);
                return new Promise(resolve => {
                    resolve(1);
                })
            }
            else if (this.sortedArray[mid] < this.key) {
                this.low = mid + 1;
                chartHelper.setActiveChartNumbers = this.sortedArray.slice(mid + 1);
                await chartHelper.updateActiveChart(chartHelper.getActiveChartNumbers);
            }
            else {
                this.high = mid - 1;
                chartHelper.setActiveChartNumbers = this.sortedArray.slice(0, mid);
                this.sortedArray = chartHelper.getActiveChartNumbers;
                await chartHelper.updateActiveChart(chartHelper.getActiveChartNumbers);
            }
        }
        return new Promise(resolve => {
            chartHelper.foundedKey(this.key);
            resolve(-1);
        })
    }
}



