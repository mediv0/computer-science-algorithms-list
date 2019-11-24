// huffman
class Huffman {
    constructor(message) {
        this.message = message;
        this.codeTree = [];
        this.codedTable = [];
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
        // check if array is odd or not
        if (messageTable.length & 1) {
            // push last element
            messageTable.push(messageTable[messageTable.length - 1]);
        }
        return messageTable;
    }

    encode(messageTable) {
        // clean the messageTable before encoding
        this.msgTBCleaner(messageTable);

        let isCreated = false;
        let tmp;
        let codeValue = "";
        let codedTable = [];
        let codedMessage = [];
        let branch = 0;
        for (let i = 0; i < messageTable.length; i++) {
            // value of first char
            branch = messageTable[i].count;
            isCreated = false;
            while (branch != this.codeTree[this.codeTree.length - 1].value) {
                tmp = branch;
                branch = this.codeTree.find(tree => tree.left === branch || tree.right === branch && (tree.lc === messageTable[i].char || tree.rc === messageTable[i].char || tree.lc == undefined || tree.rc == undefined))
                if (branch.left === tmp) {
                    // add 0
                    if (isCreated) {
                        codedTable[i].code += "0"
                    }
                    else {
                        codedTable.push({ char: messageTable[i].char, code: codeValue + "0" })
                    }
                }
                else {
                    // add 1
                    if (isCreated) {
                        codedTable[i].code += "1"
                    }
                    else {
                        codedTable.push({ char: messageTable[i].char, code: codeValue + "1" })
                    }
                }
                isCreated = true;
                branch = branch.value;
            }
        }
        // encode the message based on codedTable table
        for (let i = 0; i < message.length; i++) {
            let tmp = codedTable.find(code => code.char === message[i])
            codedMessage.push(tmp.code);
        }

        return codedMessage
    // let message = "AEEAADDDDBBBCCCCCCBB";

    }



    decode(encryptedMessage) {

    }

    /**
     * 
     * @param {Array} messageTable 
     */
    createCodeTree(messageTable) {
        let messageTableClone = [...messageTable];
        let tmp = 0;
        let i = 0;
        while (messageTableClone.length > 1) {
            tmp = messageTableClone[i].count + messageTableClone[i + 1].count;
            this.codeTree.push({
                value: tmp,
                left: messageTableClone[i].count,
                right: messageTableClone[i + 1].count,
                lc: messageTableClone[i].char,
                rc: messageTableClone[i + 1].char
            });
            messageTableClone.splice(i, 2);
            if (messageTableClone.length == 1) {
                messageTableClone.unshift({ count: tmp });
            }
            else {
                messageTableClone.push({ count: tmp });
            }

        }
    }

    /**
     * 
     * @param {Array} msgTable 
     */
    msgTBCleaner(msgTable) {
        let count = 0;
        for (let i = 0; i < msgTable.length; i++) {
            for (let j = 0; j < msgTable.length; j++) {
                if (msgTable[i].char === msgTable[j].char) {
                    count++;
                    if (count >= 2) {
                        // remove the j
                        msgTable.splice(j, 1);
                    }
                }
            }
            count = 0;
        }
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



// create code tree based on message
huffman.createCodeTree(msgTable);

// encode the message
let encryptedMessage = huffman.encode(msgTable);
console.log(encryptedMessage.toString());

// decode the message
huffman.decode(encryptedMessage);
