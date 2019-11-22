// huffman
class Huffman {
    constructor(message) {
        this.message = message;
    }

    createMessageTB() {
        let tmpIndex = -1;
        let messageTable = [];
        // char , count
        for (let i = 0; i < this.message.length; i++) {
            if (messageTable.find(({ char }) => {
                return char === this.message[i];
            })) {
                // find index of current char
                tmpIndex = messageTable.map((e) => { return e.char }).indexOf(this.message[i]);
                // increase the count
                messageTable[tmpIndex].count++;

            }
            else {
                // push new char to the table
                messageTable.push({ char: this.message[i], count: 1 });
            }
        }
        return messageTable;
    }

}



// 1. message
let message = "AEEAADDDDBBBCCCCCCBB";


// init Huffman class
let huffman = new Huffman(message)

// create message table
let msgTable = huffman.createMessageTB();
console.log(msgTable);

// sort the msgTable ASC
msgTable.sort((a, b) => {
    if (a.count > b.count) {
        return 1;
    }
    if (a.count < b.count) {
        return -1;
    }
    return 0;
});

console.log("==================================");
console.log(msgTable);
