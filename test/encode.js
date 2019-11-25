let message = "AABBCCDD";


let msgTable = [
    { char: 'E', count: 2 },
    { char: 'A', count: 3 },
    { char: 'D', count: 4 },
    { char: 'B', count: 5 },
    { char: 'C', count: 6 },
    { char: 'C', count: 6 }

]

let codeTree = [{ value: 5, left: 2, right: 3, lc: 'E', rc: 'A', leftDone: false, rightDone: false },
    { value: 9, left: 4, right: 5, lc: 'D', rc: 'B', leftDone: false, rightDone: false },
    { value: 12, left: 6, right: 6, lc: 'C', rc: 'C', leftDone: false, rightDone: false },
    { value: 14, left: 5, right: 9, lc: undefined, rc: undefined, leftDone: false, rightDone: false },
    { value: 26, left: 14, right: 12, lc: undefined, rc: undefined, leftDone: false, rightDone: false }]

/*
let msgTable = [
    { char: 'A', count: 2 },
    { char: 'B', count: 2 },
    { char: 'C', count: 2 },
    { char: 'D', count: 2 }]

let codeTree = [
    { value: 4, left: 2, right: 2, lc: 'A', rc: 'B', leftDone: false, rightDone: false },
    { value: 4, left: 2, right: 2, lc: 'C', rc: 'D', leftDone: false, rightDone: false },
    { value: 8, left: 4, right: 4, lc: undefined, rc: undefined, leftDone: false, rightDone: false }]


*/
encode(codeTree, message, msgTable);


function msgTBCleaner(msgTable) {
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

function encode(codeTree, message, messageTable) {
    // clean the messageTable before encoding
    msgTBCleaner(messageTable);


    let leftDoneFlag = { flag: false }
    let rightDoneFlag = { flag: false }
    let isFirstinTree = true;
    let j = 0;
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
        j = 0;
        isFirstinTree = true;
        while (branch != codeTree[codeTree.length - 1].value) {
            tmp = branch;
            branch = codeTree.find(tree => (tree.left === branch || tree.right === branch) && (tree.lc === messageTable[i].char || tree.rc === messageTable[i].char || tree.lc == undefined || tree.rc == undefined))
            if (branch.left === tmp && branch.leftDone === false) {
                branch.leftDone = true;
                // add 0
                if (isCreated) {
                    codedTable[i].code += "0"
                }
                else {
                    codedTable.push({ char: messageTable[i].char, code: codeValue + "0" })
                }
            }
            else {
                branch.rightDone = true
                // add 1
                if (isCreated) {
                    codedTable[i].code += "1"
                }
                else {
                    codedTable.push({ char: messageTable[i].char, code: codeValue + "1" })
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
                let childBranch = codeTree.find(tree => (tree.value === branch.left || tree.value === branch.right) && (tree.lc === messageTable[i].char || tree.rc === messageTable[i].char || tree.lc == undefined || tree.rc == undefined)) 
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
        let tmp = codedTable.find(code => code.char === message[i])
        codedMessage.push(tmp.code);
    }

    return codedMessage;
    // let message = "AEEAADDDDBBBCCCCCCBB"
}
