import * as ELEMENTS from '../Elements.js';
import { ChartHelper } from "../helpers.js";
import { binarySearch } from "../binarySearch.js";

// add chart elemnts on page
ELEMENTS.SUBMITNUMBER.addEventListener("click", () => {
    createChartElement(ELEMENTS.INPUTNUMBER.value);
});

// event handler for enter key
ELEMENTS.INPUTNUMBER.addEventListener("keypress", (e) => {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        createChartElement(ELEMENTS.INPUTNUMBER.value);
    }
})

function createChartElement(textValue) {
    if (textValue.length != 0 && !isNaN(textValue) == true) {
        // add chart number and chart lines
        let chartComp = document.createElement("div")
        chartComp.innerHTML = `
                        <div class="wrapper__chart__graph__items__item">
                        <div class="wrapper__chart__graph__items__item__line"></div>
                        <hr style="margin-top: 10px;" />
                           <p id="chartItemNumber" style="text-align: center;">${textValue}</p>
                        </div>
                    `
        ELEMENTS.CHARTID.appendChild(chartComp);

        // clear the input form and change the current focus for it
        ELEMENTS.INPUTNUMBER.value = null;
        ELEMENTS.INPUTNUMBER.focus();
    }
}

// start the search
ELEMENTS.STARTBTN.addEventListener("click", async () => {
    // disable the btn
    ELEMENTS.STARTBTN.disabled = true;
    // check if there is a key and numbers
    const GRAPHNUMBERS = document.querySelectorAll("#chartItemNumber");
    if (ELEMENTS.SEARCHKEY.value.length != 0 && GRAPHNUMBERS.length != 0) {
        // remove display_none from pointer
        ELEMENTS.POINTER.classList.remove("display_none");
        ELEMENTS.LABELS[1].classList.remove("display_none");

        // get chart numbers
        //  sort the numbers
        const chart = new ChartHelper(GRAPHNUMBERS);
        chart.updateTheChart(GRAPHNUMBERS);

        //  binary search
        let binarySearch_ = new binarySearch(0, (chart.getArrayOfChartNumbers.length) -1,chart.getSortedNumbers, ELEMENTS.SEARCHKEY.value);
        let result = await binarySearch_.search()
        console.log(result);
    }
})

ELEMENTS.RESETBTN.addEventListener("click", () => {
    location.reload();
})

