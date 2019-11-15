// example
/* input(1) : [5, 0, 10, 6]
*  input(2) : [1, 2, 4]
*  output : [5, 10, 30, 26, 52, 24]
   The first input represents: "5 + 0x^1 + 10x^2 + 6x^3"
   The second represents: "1 + 2x^1 + 4x^2"
*/

// init 
let inputA = [5, 0, 10, 6];
let inputB = [1, 2, 4];

// start
let resultPoly = multPolynomials(inputA, inputB);
console.log(resultPoly);

/**
 * 
 * @param {Array} inputA 
 * @param {Array} inputB 
 * @returns {Array} will return result of inputA * inputB
 */
function multPolynomials(inputA, inputB) {
    // get length of inputA + inputB for result array
    let rLength = (inputA.length + inputB.length) - 1;

    // fill result array with 0 
    let result = new Array(rLength).fill(0);

    // now we have to multiply input[A] * input[B]
    for (let i = 0; i < inputA.length; i++) {
        // Multiply the current term of first polynomial 
        // with every term of second polynomial. 
        for (let j = 0; j < inputB.length; j++) {
            result[i + j] += inputA[i] * inputB[j];
        }
    }

    // will return results
    return result;
}