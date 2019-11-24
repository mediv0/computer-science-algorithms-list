let msgTable = [
    { char: 'E', count: 2 },
    { char: 'A', count: 3 },
    { char: 'D', count: 4 },
    { char: 'B', count: 5 },
    { char: 'C', count: 6 },
    { char: 'C', count: 6 }

]

createCodeTree(msgTable);


function createCodeTree(messageTable) {
    let codeTree = [];
    let tmp = 0;
    let i = 0;
    while (messageTable.length > 1) {
        tmp = messageTable[i].count + messageTable[i + 1].count;
        codeTree.push({
            value: tmp,
            left: messageTable[i].count,
            right: messageTable[i + 1].count,
            lc: messageTable[i].char,
            rc: messageTable[i + 1].char
        });
        messageTable.splice(i, 2);
        if (messageTable.length == 1) {
            messageTable.unshift({ count: tmp });
        }
        else {
            messageTable.push({ count: tmp });
        }

    }
}