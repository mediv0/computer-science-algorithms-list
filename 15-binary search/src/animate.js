import { POINTER } from "./Elements.js.js";

export class Animation {

    /**
     * 
     * @param {Number} from 
     * @param {Number} to 
     */
    static execute(from, to) {
        return new Promise(resolve => {
            setTimeout(() => {
                let pos = from;
                let intervalID = setInterval(frame, 5);

                function frame() {
                    if (pos === to) {
                        clearInterval(intervalID);
                    }
                    else if(from < to) {
                        pos++;
                    }
                    else {
                        pos--;
                    }
                    POINTER.style.left = pos + "px";
                }
                resolve({step: 0});
            }, 2000);
        })

    }
}