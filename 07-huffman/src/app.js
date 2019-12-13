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
        return messageTable;
    }

    encode(messageTable) {
        // clean the messageTable before encoding
        this.msgTBCleaner(messageTable);

        let leftDoneFlag = { flag: false }
        let rightDoneFlag = { flag: false }
        let isFirstinTree = true;
        let j = 0;
        let isCreated = false;
        let tmp;
        let codeValue = "";
        let codedMessage = [];
        let branch = 0;
        for (let i = 0; i < messageTable.length; i++) {
            // value of first char
            branch = messageTable[i].count;
            isCreated = false;
            j = 0;
            isFirstinTree = true;
            while (branch != this.codeTree[this.codeTree.length - 1].value) {
                tmp = branch;
                branch = this.codeTree.find(tree => (tree.left === branch || tree.right === branch) && (tree.lc === messageTable[i].char || tree.rc === messageTable[i].char || tree.lc == undefined || tree.rc == undefined))
                if (branch.left === tmp && branch.leftDone === false) {
                    branch.leftDone = true;
                    // add 0
                    if (isCreated) {
                        this.codedTable[i].code += "0"
                    }
                    else {
                        this.codedTable.push({ char: messageTable[i].char, code: codeValue + "0" })
                    }
                }
                else {
                    branch.rightDone = true
                    // add 1
                    if (isCreated) {
                        this.codedTable[i].code += "1"
                    }
                    else {
                        this.codedTable.push({ char: messageTable[i].char, code: codeValue + "1" })
                    }
                }
                if (isFirstinTree === true) {
                    isFirstinTree = false;
                    j++;
                }
                else {
                    /*
                    branch = codeTree.find(tree => (tree.left === branch || tree.right === branch) && (tree.lc === messageTable[i].char || tree.rc === messageTable[i].char || tree.lc == undefined || tree.rc == undefined))
                    */
                    // get child branch
                    let childBranch = this.codeTree.find(tree => (tree.value === branch.left || tree.value === branch.right) && (tree.lc === messageTable[i].char || tree.rc === messageTable[i].char || tree.lc == undefined || tree.rc == undefined))
                    // check if j l-r is true for j + 1
                    if (childBranch.leftDone === true && childBranch.rightDone === true) {
                        // set j + 1 left to true
                        if (branch.leftDone === true) {
                            leftDoneFlag.flag = true;
                        }
                        if (branch.rightDone === true) {
                            rightDoneFlag.flag = true;
                        }
                    }
                    else {
                        if (branch.leftDone === true && leftDoneFlag.flag === false) {
                            branch.leftDone = false;
                        }
                        if (branch.rightDone === true && rightDoneFlag.flag === false) {
                            branch.rightDone = false;
                        }
                    }
                }
                isCreated = true;
                branch = branch.value;
            }
        }
        // encode the message based on codedTable table
        for (let i = 0; i < message.length; i++) {
            let tmp = this.codedTable.find(code => code.char === message[i])
            codedMessage.push(tmp.code);
        }

        return codedMessage
        // let message = "AEEAADDDDBBBCCCCCCBB";

    }



    decode(encryptedMessage) {
        let tmp;
        let decodedMessage = [];

        for (let i = 0; i < encryptedMessage.length; i++) {
            tmp = this.codedTable.find(code_ => code_.code === encryptedMessage[i]);
            decodedMessage.push(tmp.char);
        }
        return decodedMessage;
    }

    set _codeTree(value) {
        this.codeTree.push(value);
    }

    get _codeTree() {
        return this.codeTree
    }

    /**
     * 
     * @param {Array} messageTable 
     */
    createCodeTree(messageTable) {
        let messageTableClone = [...messageTable];
        let tmp = 0;
        let i = 0;
        let result = 0;
        while (messageTableClone.length > 1) {
            // check if current result is >= table[0];
            if (result >= messageTableClone[i + 1].count && (result + messageTableClone[i].count <= messageTableClone[i].count + messageTableClone[i + 1].count )) {
                tmp = messageTableClone[i].count + result
                this._codeTree = {
                    value: tmp,
                    left: result,
                    right: messageTableClone[i].count,
                    lc: undefined,
                    rc: messageTableClone[i].char,
                    leftDone: false, rightDone: false
                };
                messageTableClone.splice(i, 1);
                // remove the last result from the tableClone
                messageTableClone.splice(messageTableClone.length - 1, 1);
            }
            else {
                tmp = messageTableClone[i].count + messageTableClone[i + 1].count;
                this._codeTree = {
                    value: tmp,
                    left: messageTableClone[i].count,
                    right: messageTableClone[i + 1].count,
                    lc: messageTableClone[i].char,
                    rc: messageTableClone[i + 1].char,
                    leftDone: false, rightDone: false
                };
                messageTableClone.splice(i, 2);
            }
            if (messageTableClone.length == 1) {
                messageTableClone.unshift({ count: tmp });
            }
            else {
                messageTableClone.push({ count: tmp });
            }

            result = tmp;

        }

        return this._codeTree;
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
//let message = "AEEAADDDDBBBCCCCCCBB";
let message = "AABBDDCC"

console.log("========================================")
console.log(`orginal message: ${message}`);
console.log("========================================")

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


console.log("========================================")
console.log("huffman message table: ");
console.log(msgTable);
console.log("========================================")


// create code tree based on message
let tree = huffman.createCodeTree(msgTable);

console.log("========================================")
console.log("huffman message tree: ");
console.log(tree);
console.log("========================================")

// encode the message
let encryptedMessage = huffman.encode(msgTable);

console.log("========================================")
console.log("encrypted message : " + encryptedMessage.toString());
console.log("========================================")

// decode the message
let decodedMessage = huffman.decode(encryptedMessage);

console.log("========================================")
console.log("decoded message : " + decodedMessage.toString());
console.log("========================================")
