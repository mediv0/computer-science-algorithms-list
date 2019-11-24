let message = "AEEAADDDDBBBCCCCCCBB";

let msgTable = [
    { char: 'E', count: 2 },
    { char: 'A', count: 3 },
    { char: 'D', count: 4 },
    { char: 'B', count: 5 },
    { char: 'C', count: 6 },

]

let codeTree = [
    { value: 5, left: 2, right: 3, lc: 'E', rc: 'A' },
    { value: 9, left: 4, right: 5, lc: 'D', rc: 'B' },
    { value: 6, left: 6, right: 6, lc: 'C', rc: 'C' },
    { value: 14, left: 5, right: 9, lc: undefined, rc: undefined },
    { value: 6, left: 6, right: 6, lc: undefined, rc: undefined },
    { value: 20, left: 14, right: 6, lc: undefined, rc: undefined }
]

encode(codeTree, message, msgTable);

function encode(codeTree, message, messageTable) {
    let isCreated = false;
    let tmp;
    let codeValue = "";
    let codedMessage = [];
    let branch = 0;
    for (let i = 0; i < messageTable.length; i++) {
        // value of first char
        branch = messageTable[i].count;
        isCreated = false;
        while (branch != codeTree[codeTree.length - 1].value) {
            tmp = branch;
            branch = codeTree.find(tree => tree.left === branch || tree.right === branch && (tree.lc === messageTable[i].char || tree.rc === messageTable[i].char || tree.lc == undefined || tree.rc == undefined))
            if (branch.left === tmp) {
                // add 0
                if (isCreated) {
                    codedMessage[i].code += "0"
                }
                else {
                    codedMessage.push({ char: messageTable[i].char, code: codeValue + "0" })
                }
            }
            else {
                // add 1
                if (isCreated) {
                    codedMessage[i].code += "1"
                }
                else {
                    codedMessage.push({ char: messageTable[i].char, code: codeValue + "1" })
                }
            }
            isCreated = true;
            branch = branch.value;
        }
    }
}
