let message = "AEEAADDDDBBBCCCCCCBB";

let result = createMessageTB(message);
console.log(result);

function createMessageTB(message) {

    let tmpArray = [];
    let tmpIndex = -1;
    let messageTable = [];
    // char , count
    for (let i = 0; i < message.length; i++) {
        if (messageTable.find(({ char }) => {
            return char === message[i];
        })) {
            // find index of current char
            tmpIndex = messageTable.map((e) => { return e.char }).indexOf(message[i]);
            // increase the count
            messageTable[tmpIndex].count++;

        }
        else {
            // push new char to the table
            messageTable.push({ char: message[i], count: 1 });
        }
    }
    // check if array is odd or not
    if (messageTable.length & 1) {
        // push last element
        messageTable.push(messageTable[messageTable.length - 1]);
    }
    return messageTable;
}