import { POINTER } from "./Elements.js";
import { Animation } from "./animate.js";

export class Pointer {
    constructor() {
        this.position = POINTER.offsetLeft;
        this.tempPos = 0;
        this.tempValue = 0;
    }
    
    /**
     * @param {Number} positionValue
     */
    set setPosition(positionValue) {
        this.position = positionValue;
    }

    // get current position of the pointer
    get getPosition() {
        return this.position;
    }

    get getTempValue() {
        return this.tempValue;
    }
    set setTempValue(value) {
        this.tempValue = value;
    }

    // update
    async update() {
        await Animation.execute(this.tempPos, this.getPosition)
            .then(respond => {
                console.log(respond);
                // use this for countdown the STEPS of algorithm
                this.setTempValue = this.getTempValue + 1;
                console.log(this.getTempValue);
                document.getElementById("stepNumber").innerText = this.getTempValue;
        });;
        this.tempPos = this.getPosition;
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(0);
            }, 2000)
        })
    }
}


/*
    async update { 
        let status = await animation();
    }


*/