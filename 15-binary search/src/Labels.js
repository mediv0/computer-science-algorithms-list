import { ChartHelper } from "./helpers.js";


export class Labels {

    
    static init() {
        return new ChartHelper(document.querySelectorAll("#chartItemNumber")); 
    }
    static run(index, position, chartModifier = this.init()) {
        document.querySelectorAll(".wrapper__chart__graph__labels__label")[index].style.left = (chartModifier.getPosition(position) - 34) + "px";
    }
    /**
     * 
     * @param {Number} lowIndex 
     
    static moveLow(lowIndex) {
        this.run(0, lowIndex);
    }
    */

    /**
     * 
     * @param {Number} midIndex 
     */
    static moveMid(midIndex) {
        this.run(1, midIndex);
    }

    
    /**
     * 
     * @param {Number} highIndex 
    static moveHigh(highIndex) {
        this.run(2, highIndex);
    }
    */
}