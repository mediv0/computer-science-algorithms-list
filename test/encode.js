let message = "AABBCCDD";

let msgTable = [
    { char: 'A', count: 2 },
    { char: 'B', count: 2 },
    { char: 'C', count: 2 },
    { char: 'D', count: 2 }]

let codeTree = [
    { value: 4, left: 2, right: 2, lc: 'A', rc: 'B' },
    { value: 4, left: 2, right: 2, lc: 'C', rc: 'D' },
    { value: 8, left: 4, right: 4, lc: undefined, rc: undefined }]

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
        while (branch != codeTree[codeTree.length - 1].value) {
            tmp = branch;
            branch = codeTree.find(tree => tree.left === branch || tree.right === branch && (tree.lc === messageTable[i].char || tree.rc === messageTable[i].char || tree.lc == undefined || tree.rc == undefined))
            let d = -1;
            try {
               d = codedTable.map(e => { return e.char }).indexOf(messageTable[i - 1].char);
            }
            catch (e) {
                
            }
            console.log(d);
            if (branch.left === tmp && d === -1 ) {
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
