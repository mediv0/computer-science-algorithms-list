import { STATUSMESSAGE } from "./Elements.js";

export class ChartHelper {
    constructor(nodeList) {
        // list of chart Items
        this.nodeList = nodeList;
        this.activeChart = null;
    }
    // return list of numbers in chart
    get getArrayOfChartNumbers() {
        let chartNumbers = Array.from(this.nodeList);
        let value = [];
        for (let i = 0; i < chartNumbers.length; i++) {
            
            value.push(parseInt(chartNumbers[i].textContent, 10));
        }
        // set the activeChart in firstPlace
        this.setActiveChartNumbers = value;
        return value;
    } 

    // sort the Array
    get getSortedNumbers() {
        let array = this.getArrayOfChartNumbers;
        return this.bubbleSort(array);
    }

    // get active chart items
    get getActiveChartNumbers() {
        return this.activeChart;
    }

    /**
     * @param {Array} activeNumbers
     */
    set setActiveChartNumbers(activeNumbers) {
        // it will take active array from binary search
        this.activeChart = activeNumbers;
    }

    // update the value of the chart
    updateTheChart(chartNode) {
        let sortedNumbers = this.getSortedNumbers;
        for (let i = 0; i < chartNode.length; i++) {
            chartNode[i].textContent = sortedNumbers[i];
        }
    }

    // bubble sort for numbers
    /**
     * 
     * @param {Array} array 
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

    // get position of mid item in the chart
    /**
     * 
     * @param {Number} index 
     */
    getPosition(index) {
        let value = Array.from(this.nodeList);
        return parseInt((value[index].offsetLeft), 10);
    }

    // change active chart
    /**
     * 
     * @param {Array} activeChart
     * @param {Number} timeOut
     */
    updateActiveChart(activeChart, timeOut = 1000) {
        let value = this.getSortedNumbers;
        return new Promise(resolve => {
            setTimeout(() => {
                for (let i = 0; i < value.length; i++) {
                    if (!(activeChart.includes(value[i]))) {
                        document.querySelectorAll(".wrapper__chart__graph__items__item")[i].classList.add("inactive", "noselect");
                    }
                }
                resolve("inactiveCharts removed from the list");
            }, timeOut)
        })
    }

    // remove extra chart elements after finding the key
    /**
     * 
     * @param {Number} index 
     * @param {Boolean} status
     */
    async foundedKey(indexValue, status = false) {
        if (status === true) {
            await this.updateActiveChart([indexValue], 100);
            // we found the key
            // get sortedNumbers
            let value = this.getSortedNumbers;
            let index = value.indexOf(indexValue);
            document.getElementById("indexNumber").innerText = index;
            document.querySelectorAll(".wrapper__chart__graph__items__item__line")[index].classList.add("success_label");
            STATUSMESSAGE.classList.remove("display_none");
        }
        else {
            // key is not found
            document.getElementById("indexNumber").innerText = -1
            STATUSMESSAGE.classList.remove("display_none");
            STATUSMESSAGE.classList.add("error_label_text");
            STATUSMESSAGE.innerText = "Key is not found";
        }
    }
}