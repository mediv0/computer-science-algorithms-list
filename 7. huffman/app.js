// huffman
class Huffman {
    constructor(message) {
        this.message = message;
        this.codeTree = [];
        /*
            codeTree {
                value: ,
                left: ,
                right:
            }
        */
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

    encode() {

    }

    decode(encryptedMessage) {

    }

    /**
     * 
     * @param {Array} messageTable 
     */
    createCodeTree(messageTable) {
        let tmp = 0;
        let i = 0;
        while (messageTable.length > 1) {
            if (i === (messageTable.length - 1)) {
                this.codeTree.push({
                    value: messageTable[i].count,
                    left: messageTable[i].count,
                    right: messageTable[i].count,
                    lc: messageTable[i].char,
                    rc: messageTable[i].char
                })
                tmp = messageTable[i].count;
                messageTable.splice(i);
                messageTable.unshift({ count: tmp });
                i = 0;
                messageTable.reverse();
            }
            else {
                tmp = messageTable[i].count + messageTable[i + 1].count;
                this.codeTree.push({
                    value: tmp,
                    left: messageTable[i].count,
                    right: messageTable[i + 1].count,
                    lc: messageTable[i].char,
                    rc: messageTable[i + 1].char
                })
                messageTable.splice(i, 2);
                messageTable.unshift({ count: tmp });
                i++;
            }
        }
        console.log(this.codeTree);
    }

}



// 1. message
let message = "AEEAADDDDBBBCCCCCCBB";


// init Huffman class
let huffman = new Huffman(message)

// create message table
let msgTable = huffman.createMessageTB();

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

//console.log(msgTable);

// create code tree based on message
huffman.createCodeTree(msgTable);

// encode the message
huffman.encode();
